import type { Task } from "../../types";
import { sortByDeadline } from "../../utils/deadline";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function TaskList({ tasks, onComplete, onEdit, onDelete }: TaskListProps) {
  const sorted = sortByDeadline(tasks);

  return (
    <ul className="space-y-3">
      {sorted.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
