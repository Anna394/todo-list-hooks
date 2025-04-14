import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList.jsx';
import Footer from './components/Footer';
import './index.css';

const initialTasks = [
  {
    id: 1,
    description: 'Completed task',
    done: true,
    created: Date.now(),
    isRunning: false,
    timeLeft: 300,
    initialTime: 300,
  },
  {
    id: 2,
    description: 'Editing task',
    done: false,
    created: Date.now(),
    isRunning: false,
    timeLeft: 300,
    initialTime: 300,
  },
  {
    id: 3,
    description: 'Active task',
    done: false,
    created: Date.now(),
    isRunning: false,
    timeLeft: 300,
    initialTime: 300,
  },
];

function AppTodo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [allTasks, setAllTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState('All');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const timers = useRef({});

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearInterval);
    };
  }, []);

  const startTimer = (id) => {
    if (timers.current[id]) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const timeLeft = task.timeLeft <= 0 ? task.initialTime : task.timeLeft;
          return { ...task, isRunning: true, timeLeft };
        }
        return task;
      })
    );

    timers.current[id] = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            const newTime = task.timeLeft - 1;

            if (newTime <= 0) {
              clearInterval(timers.current[id]);
              delete timers.current[id];
              return { ...task, timeLeft: 0, isRunning: false };
            }

            return { ...task, timeLeft: newTime };
          }
          return task;
        })
      );
    }, 1000);
  };

  const stopTimer = (id) => {
    if (!timers.current[id]) return;

    clearInterval(timers.current[id]);
    delete timers.current[id];

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isRunning: false } : task)));
  };

  const updateTasks = (filterFn, updateFn) => {
    setTasks((prev) => prev.map((t) => (filterFn(t) ? updateFn(t) : t)));
    setAllTasks((prev) => prev.map((t) => (filterFn(t) ? updateFn(t) : t)));
  };

  const addTask = (description, min, sec) => {
    const newTask = {
      id: Date.now(),
      description,
      done: false,
      created: Date.now(),
      timeLeft: Number(min) * 60 + Number(sec),
      initialTime: Number(min) * 60 + Number(sec),
      isRunning: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setAllTasks((prev) => [...prev, newTask]);
  };

  const toggleTaskStatus = (id) => {
    updateTasks(
      (task) => task.id === id,
      (task) => ({ ...task, done: !task.done })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setAllTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    const active = allTasks.filter((task) => !task.done);
    setTasks(active);
    setAllTasks(active);
  };

  const onActive = () => {
    setTasks(allTasks.filter((task) => !task.done));
    setActiveFilter('Active');
  };

  const onCompleted = () => {
    setTasks(allTasks.filter((task) => task.done));
    setActiveFilter('Completed');
  };

  const onAll = () => {
    setTasks(allTasks);
    setActiveFilter('All');
  };

  const startEditing = (id) => {
    console.log('Начало редактирования:', id);
    setEditingTaskId(id);
  };

  const stopEditing = () => {
    console.log('Остановка редактирования');
    setEditingTaskId(null);
  };

  const editTask = (id, newDescription) => {
    console.log('Редактируем задачу с ID:', id, 'Новый текст:', newDescription);
    updateTasks(
      (task) => task.id === id,
      (task) => ({ ...task, description: newDescription })
    );
    setEditingTaskId(null);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          onToggle={toggleTaskStatus}
          onDelete={deleteTask}
          onEdit={editTask}
          onStartEditing={startEditing}
          onStopEditing={stopEditing}
          editingTaskId={editingTaskId}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
      </section>
      <Footer
        onClearCompleted={clearCompleted}
        onActive={onActive}
        onComplited={onCompleted}
        onAll={onAll}
        selected={activeFilter}
        activeCount={allTasks.filter((task) => !task.done).length}
      />
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppTodo />);

export default AppTodo;
