import { useEffect, useState } from "react";
import { formatMilliseconds } from "../../services/convertms";

interface TodoProgressBarProps {
  createdAt: string;
  dueDate: string;
}

const TodoProgressBar = ({ createdAt, dueDate }: TodoProgressBarProps) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);

  const calculateProgress = () => {
    if (!createdAt || !dueDate) return 0;

    const now = new Date();
    const start = new Date(createdAt);
    const end = new Date(dueDate);

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = now.getTime() - start.getTime();
    const calculatedProgress = (elapsedDuration / totalDuration) * 100;
    const remainingDuration = totalDuration - elapsedDuration;
    setDuration(remainingDuration);

    //returns between 0 and 100 regardless of - below 0 or + above 100
    return Math.min(Math.max(calculatedProgress, 0), 100);
  };

  useEffect(() => {
    const updateProgress = () => {
      setProgress(calculateProgress());
    };

    updateProgress();

    const intervalId = setInterval(updateProgress, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getProgressColor = (progress: number | null) => {
    if (progress === null) return "bg-gray-200";
    if (progress >= 100) return "bg-red-500";
    if (progress >= 80) return "bg-orange-500";
    return "bg-green-500";
  };

  const colorClass = getProgressColor(progress);

  // if (progress === null) return null;

  return (
    <div className="h-1 w-full bg-gray-200">
      <div
        className={`h-full ${colorClass}`}
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex justify-end text-sm font-light text-gray-600 dark:text-gray-200 mr-6 mt-1">
        {duration > 0 ? formatMilliseconds(duration) : ""}
      </div>
    </div>
  );
};

export default TodoProgressBar;
