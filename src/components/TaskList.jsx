import React from 'react';

import Task from './Task';
import './TaskList.css';

function TaskList({
  tasks,
  onDelete,
  onToggle,
  onEdit,
  onStartEditing,
  onStopEditing,
  editingTaskId,
  onStartTimer,
  onStopTimer,
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          done={task.done}
          created={task.created}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={onEdit}
          isEditing={task.id === editingTaskId} // Проверяем, редактируется ли задача
          onStartEditing={onStartEditing}
          onStopEditing={onStopEditing}
          onStartTimer={() => onStartTimer(task.id)}
          onStopTimer={() => onStopTimer(task.id)}
          timeLeft={task.timeLeft}
        />
      ))}
    </ul>
  );
}

export default TaskList;
