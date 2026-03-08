import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Loading } from '@components/index';
import MainLayout from '@/layouts/MainLayout';
import { Task } from '@/types';
import './TasksPage.css';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading tasks from API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      description: '',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  if (isLoading) {
    return <Loading message="Loading tasks..." />;
  }

  return (
    <MainLayout>
      <div className="tasks">
        <div className="tasks__header">
          <h1>Tasks</h1>
          <p>Manage and track your tasks</p>
        </div>

        <Card title="Add New Task" className="tasks__card">
          <div className="tasks__form">
            <Input
              placeholder="Enter task title"
              value={newTask}
              onChange={setNewTask}
            />
            <Button variant="primary" onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        </Card>

        {tasks.length === 0 ? (
          <Card className="tasks__card">
            <p className="tasks__empty">No tasks yet. Create one to get started!</p>
          </Card>
        ) : (
          <div className="tasks__list">
            {tasks.map((task) => (
              <Card key={task.id} className="tasks__task-card">
                <div className="task__header">
                  <h3 className="task__title">{task.title}</h3>
                  <button
                    className="task__delete"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    ✕
                  </button>
                </div>
                <div className="task__meta">
                  <span className={`task__status task__status--${task.status}`}>
                    {task.status}
                  </span>
                  <span className={`task__priority task__priority--${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="task__actions">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleUpdateTaskStatus(task.id, e.target.value as Task['status'])
                    }
                    className="task__status-select"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TasksPage;
