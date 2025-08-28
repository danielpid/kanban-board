import { useEffect } from "react";
import Board from "./components/Board";
import { useLocalStorageState } from "./hooks/useLocalStorage";
import { taskByStatus } from "./data/tasks";
import type { Task, Status } from "./types";

export default function App() {
  const [tasks, setTasks] = useLocalStorageState<Status, Task[]>("kanban.tasks", taskByStatus);

  useEffect(() => {
    if (!tasks.size) {
      setTasks(taskByStatus);
    }
  }, []);

  const todoLength = tasks.get('todo')?.length ?? 0;
  const inProgressLength = tasks.get('in-progress')?.length ?? 0;
  const doneLength = tasks.get('done')?.length ?? 0;
  const totalLength = todoLength + inProgressLength + doneLength;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <p className="mb-4 text-sm flex justify-end">Total {totalLength}</p>
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}