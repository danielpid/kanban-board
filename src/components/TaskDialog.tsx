import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Field,
	Fieldset,
	Input,
	Label,
} from "@headlessui/react";
import { type Dispatch, type SetStateAction, useId, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { Status, Task } from "../types";
import styles from "./TaskDialog.module.css";

type TaskDialogProps = {
	isOpen: boolean;
	setIsOpen: (v: boolean) => void;
	status: Status;
	statusTitle: string;
	tasks: Task[];
	setTasks: Dispatch<SetStateAction<Map<Status, Task[]>>>;
};

export const TaskDialog = ({
	isOpen,
	setIsOpen,
	status,
	statusTitle,
	setTasks,
	tasks,
}: TaskDialogProps) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const titleId = useId();
	const descriptionId = useId();

	const handleClose = () => {
		setIsOpen(false);
		setTitle("");
		setDescription("");
	};

	const handleSave = () => {
		setTasks((prev) => {
			const newTask = {
				id: uuidv4(),
				title,
				description,
				status,
				createdAt: new Date().toISOString(),
			};
			const next = new Map(prev);
			const newTasks = [...tasks, newTask];
			next.set(status, newTasks);
			return next;
		});
		handleClose();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={() => setIsOpen(false)}
			className="relative z-50"
		>
			<DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4">
				<DialogPanel className="max-w-lg w-full space-y-4 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-card">
					<DialogTitle className="font-bold text-lg">{`Create new ${statusTitle} task`}</DialogTitle>
					<Fieldset className="flex-row">
						<Field className="pb-4">
							<Label
								htmlFor={titleId}
								className="block text-sm text-zinc-600 dark:text-zinc-300"
							>
								Title
							</Label>
							<Input
								id={titleId}
								name={titleId}
								value={title}
								onChange={({ target }) => setTitle(target.value)}
								className={styles.input}
							/>
						</Field>
						<Field className="pb-4">
							<Label
								htmlFor={descriptionId}
								className="block text-sm text-zinc-600 dark:text-zinc-300"
							>
								Description
							</Label>
							<Input
								id={descriptionId}
								name={descriptionId}
								value={description}
								onChange={({ target }) => setDescription(target.value)}
								className={styles.input}
							/>
						</Field>
					</Fieldset>
					<div className="flex justify-end gap-2">
						<button
							type="button"
							className={`${
								styles.button
							} bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-zinc-300 dark:border-zinc-700`}
							onClick={handleClose}
						>
							Cancel
						</button>
						<button
							type="button"
							className={`${styles.button} bg-primary-600 text-white hover:bg-primary-700 border-primary-600`}
							onClick={handleSave}
						>
							Save
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};
