import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="glass-panel p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">404</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">Page not found</h2>
        <p className="mt-3 text-sm text-ink/70">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link className="primary-btn mt-6 inline-flex" to="/">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
