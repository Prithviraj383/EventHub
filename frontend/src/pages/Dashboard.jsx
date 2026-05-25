import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const response = await api.get("/api/registrations/my-events");
      setRegistrations(response.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to load registrations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (eventId) => {
    try {
      await api.delete(`/api/registrations/${eventId}`);
      toast.success("Registration cancelled");
      setRegistrations((prev) => prev.filter((item) => item.event_id !== eventId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to cancel registration");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <Sidebar
        title="My dashboard"
        items={[
          { label: "Overview", to: "/dashboard" },
          { label: "Browse events", to: "/" },
        ]}
      />
      <div className="space-y-6">
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold text-ink">Welcome, {user?.name}</h2>
          <p className="mt-2 text-sm text-ink/70">
            {user?.email} · Role: {user?.role}
          </p>
        </div>
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink">Registered events</h3>
            <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
              {registrations.length} total
            </span>
          </div>
          {isLoading ? (
            <Loader />
          ) : registrations.length === 0 ? (
            <p className="mt-4 text-sm text-ink/60">You have not registered for any events yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-ink">{reg.title}</p>
                    <p className="text-sm text-ink/60">
                      {new Date(reg.event_date).toLocaleString()} · {reg.venue}
                    </p>
                  </div>
                  <button
                    className="ghost-btn"
                    type="button"
                    onClick={() => handleCancel(reg.event_id)}
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
