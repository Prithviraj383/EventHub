import { NavLink } from "react-router-dom";

const Sidebar = ({ title, items }) => {
  return (
    <aside className="glass-panel h-fit w-full p-6 lg:sticky lg:top-24">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/10"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
