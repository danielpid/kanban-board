import { useDraggable } from "@dnd-kit/core";
import type { Dispatch, SetStateAction } from "react";
import TrashButton from "../buttons/trash";
import type { Status, Task } from "../types";
import styles from "./TaskCard.module.css";

interface Props {
	task: Task;
	columnId: Status;
	sortIndex: number;
	setTasks: Dispatch<SetStateAction<Map<Status, Task[]>>>;
}

export default function TaskCard({
	task,
	columnId,
	sortIndex,
	setTasks,
}: Props) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: task.id,
			data: { columnId, sortIndex },
		});
	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	const handleDelete = () => {
		setTasks((prev) => {
			const next = new Map(prev);
			const newTasks =
				prev.get(columnId)?.filter((t) => t.id !== task.id) ?? [];
			next.set(columnId, newTasks);
			return next;
		});
	};

	return (
		<article
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className={`${styles.article} ${isDragging ? "opacity-70" : ""}`}
			aria-grabbed={isDragging}
		>
			<div className={styles["text-wrapper"]}>
				<div className="text-sm font-medium">{task.title}</div>
				<div className="text-xs opacity-80">{task.description}</div>
			</div>
			<TrashButton onClick={handleDelete} />
		</article>
	);
}
