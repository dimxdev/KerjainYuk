import { createContext, useEffect, useState, type ReactNode } from "react";
import type { HistoryTask, Task } from "../types";
import { STORAGE_KEYS, getItem, setItem } from "../services/localStorageService";
import { isOverdue } from "../utils/deadline";
import { toTitleCase } from "../utils/formatter";

/** Bentuk HistoryTask dari sebuah Task untuk dipindahkan ke riwayat. */
function toHistory(task: Task, status: HistoryTask["status"]): HistoryTask {
  const now = new Date().toISOString();
  return {
    id: task.id,
    title: task.title,
    categoryId: task.categoryId,
    deadline: task.deadline,
    status,
    completedAt: status === "completed" ? now : undefined,
    movedAt: now,
  };
}

export interface NewTaskInput {
  title: string;
  categoryId: string;
  deadline: string; // ISO string
}

export interface TasksContextValue {
  tasks: Task[];
  history: HistoryTask[];
  addTask: (input: NewTaskInput) => void;
  editTask: (id: string, input: NewTaskInput) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  deleteHistory: (id: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext<TasksContextValue | null>(null);

/**
 * Auto Missed System: muat data dari LocalStorage, lalu pindahkan tugas yang
 * sudah lewat deadline ke riwayat dengan status "missed". Dijalankan sekali
 * saat inisialisasi state sehingga tidak memicu cascading render.
 */
function loadInitialState(): { tasks: Task[]; history: HistoryTask[] } {
  const tasks = getItem<Task[]>(STORAGE_KEYS.tasks, []);
  const history = getItem<HistoryTask[]>(STORAGE_KEYS.history, []);

  const now = new Date();
  const overdue = tasks.filter((t) => isOverdue(t.deadline, now));
  if (overdue.length === 0) return { tasks, history };

  return {
    tasks: tasks.filter((t) => !isOverdue(t.deadline, now)),
    history: [...overdue.map((t) => toHistory(t, "missed")), ...history],
  };
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(loadInitialState);
  const [tasks, setTasks] = useState<Task[]>(initial.tasks);
  const [history, setHistory] = useState<HistoryTask[]>(initial.history);

  useEffect(() => {
    setItem(STORAGE_KEYS.tasks, tasks);
  }, [tasks]);

  useEffect(() => {
    setItem(STORAGE_KEYS.history, history);
  }, [history]);

  function addTask(input: NewTaskInput) {
    const now = new Date().toISOString();
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: toTitleCase(input.title.trim()),
        categoryId: input.categoryId,
        deadline: input.deadline,
        createdAt: now,
      },
    ]);
  }

  function editTask(id: string, input: NewTaskInput) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: toTitleCase(input.title.trim()),
              categoryId: input.categoryId,
              deadline: input.deadline,
            }
          : t
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function completeTask(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setHistory((prev) => [toHistory(task, "completed"), ...prev]);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function getTask(id: string) {
    return tasks.find((t) => t.id === id);
  }

  function deleteHistory(id: string) {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <TasksContext.Provider
      value={{ tasks, history, addTask, editTask, deleteTask, completeTask, getTask, deleteHistory }}
    >
      {children}
    </TasksContext.Provider>
  );
}
