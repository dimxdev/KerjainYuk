import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) {
    throw new Error("useTasks harus dipakai di dalam <TasksProvider>");
  }
  return ctx;
}
