import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Popup from 'reactjs-popup';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'reactjs-popup/dist/index.css';
import './App.css';
import PopupForm from './components/PopupForm';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupMode, setPopupMode] = useState('create');
  const [currentEvent, setCurrentEvent] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (date) => {
    setSelectedDate(date);
    setPopupMode('create');
    setCurrentEvent(null);
    setIsPopupOpen(true);
  };

  const handleSelectEvent = (event) => {
    setPopupMode('edit');
    setCurrentEvent(event);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveEvent = (title, location) => {
    const newEvent = {
      title,
      location,
      start: selectedDate,
      end: moment(selectedDate).add(1, 'hours').toDate(),
    };
    setEvents([...events, newEvent]);
    handleClosePopup();
  };

  const handleEditEvent = (updatedTitle, updatedLocation) => {
    const updatedEvents = events.map((ev) =>
      ev === currentEvent ? { ...ev, title: updatedTitle, location: updatedLocation } : ev
    );
    setEvents(updatedEvents);
    handleClosePopup();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((ev) => ev !== currentEvent));
    handleClosePopup();
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === 'past') return moment(ev.start).isBefore(moment());
    if (filter === 'upcoming') return moment(ev.start).isSameOrAfter(moment());
    return true;
  });

  return (
    <div className="App">
      <h1>Event Tracker Calendar</h1>
      <div className="filters">
        <button className="btn" onClick={() => setFilter('all')}>All</button>
        <button className="btn" onClick={() => setFilter('past')}>Past</button>
        <button className="btn" onClick={() => setFilter('upcoming')}>Upcoming</button>
      </div>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        selectable
        onSelectSlot={(slotInfo) => openPopup(slotInfo.start)}
        onSelectEvent={(event) => handleSelectEvent(event)}
        style={{ height: 500, margin: '50px' }}
        eventPropGetter={(event) => {
          const isPast = moment(event.start).isBefore(moment());
          return {
            style: {
              backgroundColor: isPast ? 'rgb(222, 105, 135)' : 'rgb(140, 189, 76)',
            },
          };
        }}
      />

      <Popup open={isPopupOpen} onClose={handleClosePopup} modal nested>
        {(close) => (
          <div>
            <h3>{popupMode === 'create' ? 'Create Event' : 'Edit/Delete Event'}</h3>
            <PopupForm
              mode={popupMode}
              event={currentEvent}
              onSave={handleSaveEvent}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          </div>
        )}
      </Popup>
    </div>
  );
}

export default App;
