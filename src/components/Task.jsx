import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function Task({
  id,
  description,
  done,
  onToggle,
  onDelete,
  isEditing,
  onStartEditing,
  onEdit,
  onStopEditing,
  onStartTimer,
  onStopTimer,
  timeLeft,
  created,
}) {
  const [editText, setEditText] = useState(description);

  useEffect(() => {
    if (!isEditing) {
      setEditText(description);
    }
    console.log(`Task ${id} -> isEditing:`, isEditing);
  }, [description, isEditing, id]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleChange = (event) => {
    setEditText(event.target.value);
  };

  const handleSave = () => {
    if (editText.trim()) {
      console.log('Сохранение задачи ID:', id, 'Текущий текст:', editText);
      onEdit(id, editText);
    }
    onStopEditing();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      onStopEditing();
    }
  };

  return (
    <li className={done ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={onToggle} />
        {isEditing ? (
          <input
            type="text"
            className="edit"
            value={editText}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <label>
            <span className="description">{description}</span>
            <span className="created">
              <button className="icon icon-play" onClick={onStartTimer}></button>
              <button className="icon icon-pause" onClick={onStopTimer}></button>
              {formatTime(timeLeft)}
            </span>
            <span className="created">{formatDistanceToNow(new Date(created), { addSuffix: true })}</span>
          </label>
        )}
        {!isEditing && <button type="button" className="icon icon-edit" onClick={() => onStartEditing(id)} />}
        <button type="button" className="icon icon-destroy" onClick={onDelete} />
      </div>
    </li>
  );
}
