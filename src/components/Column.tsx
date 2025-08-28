import { useState, type Dispatch, type SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";
import type { Task, Status } from "../types";
import PlusIcon from "../buttons/plus";
import { TaskDialog } from "./TaskDialog";

interface Props { 
  id: Status; 
  title: string; 
  count: number; 
  tasks: Task[]; 
  setTasks: Dispatch<SetStateAction<Map<Status, Task[]>>>; 
}

export default function Column({ id, title, count, tasks, setTasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id, data: { columnId: id } });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section ref={setNodeRef} 
      className={`rounded-2xl p-3 min-h-64 border bg-white/80 dark:bg-zinc-800/70 shadow-card ${isOver ? "outline outline-2 outline-primary-400" : ""}`} 
      aria-labelledby={`col-${id}`}
    >
      <div className="flex justify-between p-2 border-b border-zinc-200 dark:border-zinc-700">
        <h2 id={`col-${id}`} className="font-semibold mb-2 text-zinc-800 dark:text-zinc-100">{`${title} (${count})`}</h2>
        <PlusIcon onClick={() => setIsOpen(true)} />
      </div>
      <div className="space-y-2 pt-2">
        {tasks.map((t, index) => (
          <TaskCard key={t.id} task={t} columnId={id} sortIndex={index} setTasks={setTasks} />
        ))}
      </div>
      <TaskDialog isOpen={isOpen} setIsOpen={setIsOpen} status={id} statusTitle={title} tasks={tasks} setTasks={setTasks} />
    </section>
  );
}