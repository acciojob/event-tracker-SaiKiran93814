import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Popup from 'react-popup';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';
import PopupForm from './components/PopupForm';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupMode, setPopupMode] = useState('create');
  const [currentEvent, setCurrentEvent] = useState(null);
  const [filter, setFilter] = useState('all');

  const openPopup = (date) => {
    setSelectedDate(date);
    setPopupMode('create');
    setCurrentEvent(null);
    Popup.create({
      title: 'Create Event',
      content: <PopupForm mode="create" onSave={handleSaveEvent} />,
      buttons: {}
    });
  };

  const handleSelectEvent = (event) => {
    setPopupMode('edit');
    setCurrentEvent(event);
    Popup.create({
      title: 'Edit/Delete Event',
      content: (
        <PopupForm
          mode="edit"
          event={event}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      ),
      buttons: {}
    });
  };

  const handleSaveEvent = (title, location) => {
    const newEvent = {
      title,
      location,
      start: selectedDate,
      end: moment(selectedDate).add(1, 'hours').toDate(),
    };
    setEvents([...events, newEvent]);
    Popup.close();
  };

  const handleEditEvent = (updatedTitle, updatedLocation) => {
    const updatedEvents = events.map((ev) =>
      ev === currentEvent ? { ...ev, title: updatedTitle, location: updatedLocation } : ev
    );
    setEvents(updatedEvents);
    Popup.close();
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((ev) => ev !== currentEvent));
    Popup.close();
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
      <Popup />
    </div>
  );
}

export default App;
