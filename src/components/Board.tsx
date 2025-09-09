import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useEffect, type Dispatch, type SetStateAction } from 'react';

import type { Status, Task } from '../types';
import Column from './Column';

const columns: { id: Status; title: string }[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

interface Props {
  tasks: Map<Status, Task[]>;
  setTasks: Dispatch<SetStateAction<Map<Status, Task[]>>>;
}

export default function Board({ tasks, setTasks }: Props) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const activeColumnId = active.data.current?.columnId as Status;
    const overId = over.id as Status;

    setTasks((prev) => {
      const next = new Map<Status, Task[]>(prev);
      const sourceColumn = next.get(activeColumnId);
      const destinationColumn = next.get(overId);
      if (
        !sourceColumn ||
        !destinationColumn ||
        destinationColumn.some((task) => task.id === activeId)
      ) {
        return prev;
      }
      const task = next.get(activeColumnId)?.find((t) => t.id === activeId);
      if (!task) {
        return prev;
      }
      const newTask = { ...task, status: overId } as Task;

      const newSourceColumn = sourceColumn.filter((el) => el.id !== activeId);
      next.set(activeColumnId, newSourceColumn);
      const newDestinationColumn = [...destinationColumn, newTask];
      next.set(overId, newDestinationColumn);

      return next;
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <SortableContext
            key={col.id}
            items={tasks.get(col.id)?.map((t) => t.id) ?? []}
            strategy={rectSortingStrategy}
          >
            <Column
              id={col.id}
              title={col.title}
              count={tasks.get(col.id)?.length ?? 0}
              tasks={tasks.get(col.id) || []}
              setTasks={setTasks}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
