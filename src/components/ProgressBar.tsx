import React from "react";

interface IProgressBar {
  progress: number;
}

const ProgressBar = ({ progress }: IProgressBar) => {
  return (
    <div className="bg mt-2 flex h-2 w-full rounded-xl bg-zinc-700">
      <div
        role="progressbar"
        aria-label="progresso de hábitos do dia"
        avria-valuenow={progress}
        className="h-2 rounded-xl bg-violet-600"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
