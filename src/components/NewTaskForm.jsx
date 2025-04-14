import React, { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ onAddTask }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddTask(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" placeholder="Task" onChange={onLabelChange} value={label} />
      <input className="new-todo-form__timer" placeholder="Min" onChange={onMinChange} value={min} type="number" />
      <input className="new-todo-form__timer" placeholder="Sec" onChange={onSecChange} value={sec} type="number" />
      <button type="submit"></button>
    </form>
  );
}

export default NewTaskForm;
