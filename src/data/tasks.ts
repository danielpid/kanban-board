import type { Task } from "../types"

export const tasksSeed: Task[] = [
    {
        "id": "t1",
        "title": "Set up project",
        "description": "Vite + TS + Tailwind",
        "status": "todo",
        "createdAt": "2025-01-01T10:00:00Z"
    },
    {
        "id": "t2",
        "title": "Board layout",
        "description": "Columns and cards",
        "status": "in-progress",
        "createdAt": "2025-01-02T10:00:00Z"
    },
    {
        "id": "t3",
        "title": "Drag and drop",
        "description": "Move tasks",
        "status": "done",
        "createdAt": "2025-01-03T10:00:00Z"
    }
]