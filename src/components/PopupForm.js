import React, { useState } from 'react';

function PopupForm({ mode, event, onSave, onEdit, onDelete }) {
  const [title, setTitle] = useState(event?.title || '');
  const [location, setLocation] = useState(event?.location || '');

  return (
    <div>
      <input
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Event Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {mode === 'create' && (
        <div className="mm-popup__box__footer__right-space">
          <button className="mm-popup__btn" onClick={() => onSave(title, location)}>Save</button>
        </div>
      )}
      {mode === 'edit' && (
        <>
          <button className="mm-popup__btn--info" onClick={() => onEdit(title, location)}>Edit</button>
          <button className="mm-popup__btn--danger" onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PopupForm;
