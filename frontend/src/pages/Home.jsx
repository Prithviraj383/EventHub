import { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/events");
        setEvents(response.data.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to fetch events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="space-y-10">
      <div className="glass-panel relative overflow-hidden p-10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-mist to-brand/10" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              EventHub
            </p>
            <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
              Discover, register, and manage events in one modern workspace.
            </h1>
            <p className="text-base text-ink/70">
              EventHub keeps your event journey organized. Browse upcoming gatherings, secure
              your spot, and manage registrations with a simple, responsive dashboard.
            </p>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/80 px-6 py-4 text-sm text-ink/70">
            <p className="font-semibold text-ink">Quick stats</p>
            <p className="mt-1">{events.length} upcoming events listed</p>
            <p>Secure login + role-based admin tools</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink">Upcoming events</h2>
          <span className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
            Latest
          </span>
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-ink/10 bg-white p-6 text-sm text-ink/60">
            No events are live yet. Check back soon.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
