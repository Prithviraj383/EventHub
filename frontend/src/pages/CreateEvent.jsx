import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loader from "../components/Loader";

const toInputDateTime = (value) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
};

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    event_date: "",
    max_participants: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(Boolean(id));

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        return;
      }
      try {
        const response = await api.get(`/api/events/${id}`);
        const data = response.data.data;
        setFormData({
          title: data.title || "",
          description: data.description || "",
          venue: data.venue || "",
          event_date: toInputDateTime(data.event_date),
          max_participants: data.max_participants || "",
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Unable to load event");
      } finally {
        setIsFetching(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.title || !formData.venue || !formData.event_date || !formData.max_participants) {
      toast.error("Please fill in the required fields");
      return;
    }
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        max_participants: Number(formData.max_participants),
      };
      if (id) {
        await api.put(`/api/events/${id}`, payload);
        toast.success("Event updated successfully");
      } else {
        await api.post("/api/events", payload);
        toast.success("Event created successfully");
      }
      navigate("/admin");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to save event");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass-panel p-8">
        <h2 className="text-2xl font-semibold text-ink">{id ? "Edit event" : "Create event"}</h2>
        <p className="mt-2 text-sm text-ink/70">
          Keep event details crisp and accurate for attendees.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="title">
              Event title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
              placeholder="Design sprint kickoff"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
              placeholder="Share the event purpose and agenda."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="venue">
                Venue
              </label>
              <input
                id="venue"
                name="venue"
                type="text"
                value={formData.venue}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
                placeholder="Main hall, Building A"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink" htmlFor="event_date">
                Date & time
              </label>
              <input
                id="event_date"
                name="event_date"
                type="datetime-local"
                value={formData.event_date}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="max_participants">
              Maximum participants
            </label>
            <input
              id="max_participants"
              name="max_participants"
              type="number"
              min={1}
              value={formData.max_participants}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="primary-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save event"}
            </button>
            <button className="ghost-btn" type="button" onClick={() => navigate("/admin")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
