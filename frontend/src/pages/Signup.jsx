import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    const success = await register(formData);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel p-8">
        <h2 className="text-3xl font-semibold text-ink">Create your account</h2>
        <p className="mt-2 text-sm text-ink/70">
          Join EventHub to register for events and track your activity.
        </p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
              placeholder="Alex Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
              placeholder="Create a secure password"
            />
          </div>
          <button className="primary-btn w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-sm text-ink/70">
          Already registered?{" "}
          <Link className="font-semibold text-brand" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
