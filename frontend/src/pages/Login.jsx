import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }
    const success = await login(formData);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel p-8">
        <h2 className="text-3xl font-semibold text-ink">Welcome back</h2>
        <p className="mt-2 text-sm text-ink/70">
          Log in to manage registrations and keep track of upcoming events.
        </p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
          </div>
          <button className="primary-btn w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-ink/70">
          New to EventHub?{" "}
          <Link className="font-semibold text-brand" to="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
