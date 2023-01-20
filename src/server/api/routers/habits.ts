import {
  createTRPCContext,
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";
import { z } from "zod";
import dayjs from "dayjs";

const createHabitSchema = z.object({
  title: z.string(),
  weekDays: z.array(z.number().min(0).max(6)),
});

interface DayData {
  id: string;
  date: string;
  completed: number;
  total: number;
}

export const habitsRouter = createTRPCRouter({
  getHabits: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.habit.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  // Criar habito
  createHabit: protectedProcedure
    .input(createHabitSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.habit.create({
        data: {
          title: input.title,
          HabitWeekDays: {
            create: input.weekDays.map((day) => {
              return {
                week_day: day,
              };
            }),
          },
          userId: ctx.session.user.id,
        },
      });
    }),

  // Obter dia
  getDayHabits: protectedProcedure
    .input(
      z.object({
        date: z.coerce.date(),
      })
    )
    .query(async ({ input, ctx }) => {
      const parsedDate = dayjs(input.date).startOf("day");
      const weekDay = parsedDate.get("day");

      const possibleHabits = await ctx.prisma.habit.findMany({
        where: {
          userId: ctx.session.user.id,
          created_at: {
            lte: input.date,
          },
          HabitWeekDays: {
            some: {
              week_day: weekDay,
            },
          },
        },
      });

      const day = await ctx.prisma.day.findUnique({
        where: {
          date: parsedDate.toDate(),
        },
        include: {
          DayHabit: true,
        },
      });

      const completedHabits = day?.DayHabit.map((dayHabit) => {
        return dayHabit.habit_id;
      });

      return {
        possibleHabits,
        completedHabits,
      };
    }),

  // Marcar (desmarcar) hábito
  toggleHabit: protectedProcedure
    .input(
      z.object({
        habitId: z.string().uuid(),
      })
    )
    .query(async ({ input, ctx }) => {
      const today = dayjs().startOf("day").toDate();

      let day = await ctx.prisma.day.findUnique({ where: { date: today } });

      if (!day) {
        day = await ctx.prisma.day.create({
          data: {
            date: today,
          },
        });
      }

      const dayHabit = await ctx.prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: input.habitId,
          },
        },
      });

      if (dayHabit) {
        // Já esta marcado, então precisa remover
        await ctx.prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        });

        return false;
      } else {
        await ctx.prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: input.habitId,
          },
        });

        return true;
      }
    }),

  // Sumário de dias
  getSummary: protectedProcedure.query(async ({ ctx }) => {
    const summary: DayData[] = await ctx.prisma.$queryRaw`
      SELECT 
        D.id,
        D.date,
        (
          SELECT cast(count(*) as float)
          FROM DayHabit DH
          WHERE DH.day_id = D.id

        ) as completed,
        (
          SELECT cast(count(*) as float)
          FROM HabitWeekDays HWD
          JOIN Habit H ON HWD.habit_id = H.id
          WHERE
            HWD.week_day = cast(strftime("%w", D.date/1000.0, "unixepoch") as int)
            AND H.created_at <= D.date
            AND H.userId = ${ctx.session.user.id}
        ) as total
      FROM Day D
    `;

    return summary;
  }),
});
