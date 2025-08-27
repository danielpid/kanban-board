import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";
import type { Task, Status } from "../types";

const columns: { id: Status; title: string }[] = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

interface Props { tasks: Task[]; onChange: (tasks: Task[]) => void; }

export default function Board({ tasks, onChange }: Props) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Moving across columns
    const targetColumn = columns.find(c => c.id === (over.data.current?.columnId as Status))?.id;

    onChange(prev => {
      let next = [...prev];
      const idx = next.findIndex(t => t.id === activeId);
      if (idx === -1) return prev;

      if (targetColumn && next[idx].status !== targetColumn) {
        next[idx] = { ...next[idx], status: targetColumn };
      }

      // Reorder within column if over has sortIndex
      const activeColumnTasks = next.filter(t => t.status === next[idx].status);
      const activeIndexes = activeColumnTasks.map(t => t.id);
      const from = activeIndexes.indexOf(activeId);
      const to = over.data.current?.sortIndex ?? from;

      if (from !== -1 && to !== -1 && from !== to) {
        const ids = activeIndexes;
        const reorderedIds = arrayMove(ids, from, to);
        // map reordered ids back into next
        const map = new Map(reorderedIds.map((id, order) => [id, order]));
        next = next.sort((a, b) => {
          if (a.status !== next[idx].status || b.status !== next[idx].status) return 0;
          return (map.get(a.id) ?? 0) - (map.get(b.id) ?? 0);
        });
      }
      return next;
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => (
          <SortableContext key={col.id} items={tasks.filter(t => t.status === col.id).map(t => t.id)} strategy={rectSortingStrategy}>
            <Column id={col.id} title={col.title} tasks={tasks.filter(t => t.status === col.id)} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}