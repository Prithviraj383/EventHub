import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/api/events");
      setEvents(response.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/api/events/${eventId}`);
      toast.success("Event deleted");
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete event");
    }
  };

  const handleViewParticipants = async (eventItem) => {
    setSelectedEvent(eventItem);
    try {
      const response = await api.get(`/api/events/${eventItem.id}/participants`);
      setParticipants(response.data.data || []);
    } catch (error) {
      setParticipants([]);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <Sidebar
        title="Admin console"
        items={[
          { label: "All events", to: "/admin" },
          { label: "Create event", to: "/admin/events/new" },
          { label: "Home", to: "/" },
        ]}
      />
      <div className="space-y-6">
        <div className="glass-panel p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Admin dashboard</h2>
              <p className="mt-1 text-sm text-ink/70">Manage events and oversee registrations.</p>
            </div>
            <Link className="primary-btn" to="/admin/events/new">
              Create event
            </Link>
          </div>
        </div>
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink">Event management</h3>
            <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
              {events.length} total
            </span>
          </div>
          {isLoading ? (
            <Loader />
          ) : events.length === 0 ? (
            <p className="mt-4 text-sm text-ink/60">No events available yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-4 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <p className="font-semibold text-ink">{event.title}</p>
                    <p className="text-sm text-ink/60">
                      {new Date(event.event_date).toLocaleString()} · {event.venue}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link className="ghost-btn" to={`/admin/events/${event.id}/edit`}>
                      Edit
                    </Link>
                    <button className="ghost-btn" type="button" onClick={() => handleDelete(event.id)}>
                      Delete
                    </button>
                    <button
                      className="primary-btn"
                      type="button"
                      onClick={() => handleViewParticipants(event)}
                    >
                      View participants
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedEvent && (
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-ink">
              Participants · {selectedEvent.title}
            </h3>
            {participants.length === 0 ? (
              <p className="mt-3 text-sm text-ink/60">
                Participant data is not returned by the current API.
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {participants.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-ink">{person.name}</span>
                    <span className="text-ink/60">{person.email}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
