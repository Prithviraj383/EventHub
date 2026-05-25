import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/events/${id}`);
        setEvent(response.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to fetch event details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!isAuthenticated) {
        setRegistrations([]);
        return;
      }
      try {
        const response = await api.get("/api/registrations/my-events");
        setRegistrations(response.data.data || []);
      } catch (error) {
        setRegistrations([]);
      }
    };

    fetchRegistrations();
  }, [isAuthenticated, id]);

  const isRegistered = useMemo(() => {
    return registrations.some((item) => String(item.event_id) === String(id));
  }, [registrations, id]);

  const handleRegister = async () => {
    setIsActionLoading(true);
    try {
      await api.post(`/api/registrations/${id}`);
      toast.success("Registration confirmed");
      setRegistrations((prev) => [...prev, { event_id: id }]);
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to register";
      toast.error(message);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsActionLoading(true);
    try {
      await api.delete(`/api/registrations/${id}`);
      toast.success("Registration cancelled");
      setRegistrations((prev) => prev.filter((item) => String(item.event_id) !== String(id)));
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to cancel registration";
      toast.error(message);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!event) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-6 text-sm text-ink/70">
        Event details are not available.
      </div>
    );
  }

  const eventDate = event.event_date ? new Date(event.event_date) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="glass-panel p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Event</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">{event.title}</h1>
        <p className="mt-4 text-base text-ink/70">{event.description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-white p-4 text-sm">
            <p className="text-ink/60">Venue</p>
            <p className="mt-1 font-semibold text-ink">{event.venue}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-4 text-sm">
            <p className="text-ink/60">Date & time</p>
            <p className="mt-1 font-semibold text-ink">
              {eventDate ? eventDate.toLocaleString() : "TBA"}
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-4 text-sm">
            <p className="text-ink/60">Capacity</p>
            <p className="mt-1 font-semibold text-ink">{event.max_participants}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-4 text-sm">
            <p className="text-ink/60">Registration status</p>
            <p className="mt-1 font-semibold text-ink">
              {isAuthenticated ? (isRegistered ? "Registered" : "Not registered") : "Login required"}
            </p>
          </div>
        </div>
      </div>

      <aside className="glass-panel h-fit p-6">
        <h3 className="text-lg font-semibold text-ink">Action panel</h3>
        <p className="mt-2 text-sm text-ink/70">
          Reserve your place and manage your registration from here.
        </p>
        {!isAuthenticated ? (
          <Link className="primary-btn mt-6 w-full" to="/login">
            Login to register
          </Link>
        ) : isRegistered ? (
          <button
            className="ghost-btn mt-6 w-full"
            type="button"
            onClick={handleCancel}
            disabled={isActionLoading}
          >
            {isActionLoading ? "Cancelling..." : "Cancel registration"}
          </button>
        ) : (
          <button
            className="primary-btn mt-6 w-full"
            type="button"
            onClick={handleRegister}
            disabled={isActionLoading}
          >
            {isActionLoading ? "Registering..." : "Register for event"}
          </button>
        )}
        <p className="mt-4 text-xs text-ink/60">
          Full capacity is enforced server-side. If the event is full you will be notified.
        </p>
      </aside>
    </div>
  );
};

export default EventDetails;
