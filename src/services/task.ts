import { Task, CreateTaskInput, UpdateTaskInput, PaginatedResponse } from '@/types';
import { apiService } from './api';

/**
 * Task Service - Handles task-related API calls
 */
class TaskService {
  /**
   * Get all tasks
   */
  async getTasks(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Task>> {
    const response = await apiService.get<PaginatedResponse<Task>>('/tasks', {
      params: { page, limit },
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch tasks');
  }

  /**
   * Get task by ID
   */
  async getTask(id: string): Promise<Task> {
    const response = await apiService.get<Task>(`/tasks/${id}`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch task');
  }

  /**
   * Create new task
   */
  async createTask(input: CreateTaskInput): Promise<Task> {
    const response = await apiService.post<Task>('/tasks', input);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to create task');
  }

  /**
   * Update task
   */
  async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    const response = await apiService.put<Task>(`/tasks/${id}`, input);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to update task');
  }

  /**
   * Delete task
   */
  async deleteTask(id: string): Promise<void> {
    const response = await apiService.delete(`/tasks/${id}`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to delete task');
    }
  }

  /**
   * Update task status
   */
  async updateTaskStatus(id: string, status: 'todo' | 'in-progress' | 'done'): Promise<Task> {
    return this.updateTask(id, { status });
  }
}

export const taskService = new TaskService();

export default TaskService;
