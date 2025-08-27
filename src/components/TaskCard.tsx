import { useDraggable } from "@dnd-kit/core";
import type { Task, Status } from "../types";

interface Props { task: Task; columnId: Status; sortIndex: number; }

export default function TaskCard({ task, columnId, sortIndex }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task.id, data: { columnId, sortIndex } });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <article
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`rounded-xl border p-3 bg-white text-black dark:bg-zinc-800 dark:text-white shadow ${isDragging ? "opacity-70" : ""}`}
      role="button"
      tabIndex={0}
      aria-grabbed={isDragging}
    >
      <div className="text-sm font-medium">{task.title}</div>
      <div className="text-xs opacity-80">{task.description}</div>
    </article>
  );
}