import { useEffect, useMemo } from "react";
import Board from "./components/Board";
import { useLocalStorageState } from "./hooks/useLocalStorage";
import { tasksSeed } from "./data/tasks";
import type { Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useLocalStorageState<Task[]>("kanban.tasks", tasksSeed);

  useEffect(() => {
    if (!tasks.length) setTasks(tasksSeed);
  }, []);

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    done: tasks.filter(t => t.status === "done").length,
  }), [tasks]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <p className="mb-4 text-sm">Total {stats.total} • Todo {stats.todo} • In progress {stats.inProgress} • Done {stats.done}</p>
      <Board tasks={tasks} onChange={setTasks} />
    </div>
  );
}