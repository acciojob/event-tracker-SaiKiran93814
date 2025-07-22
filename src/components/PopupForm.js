import React, { useState } from "react";
import moment from "moment";

const PopupForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start || !end) return;

    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
    };

    onAddEvent(newEvent);

    setTitle("");
    setStart("");
    setEnd("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input data-cy="title-input" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Start</label>
      <input data-cy="start-input" type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />

      <label>End</label>
      <input data-cy="end-input" type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />

     <button type="submit" className="btn" data-cy="submit-btn">
  Add Event
</button>

    </form>
  );
};

export default PopupForm;
