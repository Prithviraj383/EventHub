import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const date = event?.event_date ? new Date(event.event_date) : null;
  return (
    <div className="glass-panel flex h-full flex-col p-6">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-ink">{event.title}</h3>
        <p className="mt-2 text-sm text-ink/70">{event.description}</p>
        <div className="mt-4 space-y-1 text-sm text-ink/70">
          <p>
            <span className="font-semibold text-ink">Venue:</span> {event.venue}
          </p>
          <p>
            <span className="font-semibold text-ink">Date:</span>{" "}
            {date ? date.toLocaleString() : "TBA"}
          </p>
          <p>
            <span className="font-semibold text-ink">Capacity:</span> {event.max_participants}
          </p>
        </div>
      </div>
      <Link className="primary-btn mt-6 w-full" to={`/events/${event.id}`}>
        View details
      </Link>
    </div>
  );
};

export default EventCard;
