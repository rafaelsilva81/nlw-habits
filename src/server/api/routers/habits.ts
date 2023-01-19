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

const getDayHabitsSchema = z.object({
  date: z.coerce.date(),
});

export const habitsRouter = createTRPCRouter({
  getHabits: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.habit.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

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

  getDayHabits: protectedProcedure
    .input(getDayHabitsSchema)
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
});
