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
    <div className="container-app">
      <div className="flex items-end justify-between mb-4">
        <h1 className="app-title">Kanban Board</h1>
        <p className="muted">Total {totalLength}</p>
      </div>
      <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}