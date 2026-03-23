import { atom } from 'jotai';
import { Task } from '@/types';

/**
 * Task atom for managing tasks state
 */
export const tasksAtom = atom<Task[]>([]);

/**
 * Filter atom for tasks
 */
export const tasksFilterAtom = atom<'all' | 'todo' | 'in-progress' | 'done'>('all');

/**
 * Loading atom for async operations
 */
export const isLoadingAtom = atom(false);

/**
 * Error atom for error messages
 */
export const errorAtom = atom<string | null>(null);
