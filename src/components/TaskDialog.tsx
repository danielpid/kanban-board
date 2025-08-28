import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop, Input, Fieldset, Field, Label } from '@headlessui/react';

import type { Status, Task } from '../types';
import styles from './TaskDialog.module.css'

type TaskDialogProps = {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    status: Status;
    statusTitle: string;
    tasks: Task[]; 
    setTasks: (tasks: Map<Status, Task[]>) => void;
}

export const TaskDialog = ({ isOpen, setIsOpen, status, statusTitle, setTasks, tasks }: TaskDialogProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setIsOpen(false);
        setTitle('');
        setDescription('');
    }

    const handleSave = () => {
        setTasks(prev => {
            const newTask = {
                id: uuidv4(),
                title,
                description,
                status,
                createdAt: new Date().toISOString()                
            };
            const next = new Map(prev);
            const newTasks = [...tasks, newTask];
            next.set(status, newTasks);
            return next;
        })
        handleClose();
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                    <DialogTitle className="font-bold">{`Create new ${statusTitle} task`}</DialogTitle>
                    <Fieldset className='flex-row'>
                        <Field className='pb-4'>
                            <Label htmlFor='title' className='block'>Title</Label>
                            <Input id='title' name='title' value={title} onChange={({ target }) => setTitle(target.value)} className='mt-1 block border' />
                        </Field>
                        <Field className='pb-4'>
                            <Label htmlFor='description' className='block'>Description</Label>
                            <Input id='description' name='description' value={description} onChange={({ target }) => setDescription(target.value)} className='mt-1 block border' />
                        </Field>
                    </Fieldset>
                    <div className="flex justify-end gap-4">
                        <button className={styles.button} onClick={handleClose}>Cancel</button>
                        <button className={styles.button} onClick={handleSave}>Save</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

