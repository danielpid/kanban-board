import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import type { Task, Status } from "../types";

interface Props { id: Status; title: string; tasks: Task[]; }

export default function Column({ id, title, tasks }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id, data: { columnId: id } });
  return (
    <section ref={setNodeRef} className={`rounded-2xl p-3 min-h-64 border ${isOver ? "outline outline-2" : ""}`} aria-labelledby={`col-${id}`}>
      <h2 id={`col-${id}`} className="font-semibold mb-2">{title}</h2>
      <div className="space-y-2">
        {tasks.map((t, index) => (
          <TaskCard key={t.id} task={t} columnId={id} sortIndex={index} />
        ))}
      </div>
    </section>
  );
}