import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Popup from "reactjs-popup";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PopupForm from "./components/PopupForm";

const localizer = momentLocalizer(moment);

const App = () => {
  const [events, setEvents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
    setPopupOpen(false);
  };

  return (
    <div className="App">
      <h1>Event Tracker Calendar</h1>

      {/* ✅ Button with data-cy attribute */}
      <button
        data-cy="open-popup-btn"
        onClick={() => setPopupOpen(true)}
      >
        Create Event
      </button>

      {/* Popup to add new events */}
      <Popup open={popupOpen} onClose={() => setPopupOpen(false)} modal nested>
        <PopupForm onAddEvent={handleAddEvent} />
      </Popup>

      {/* Calendar display */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default App;
