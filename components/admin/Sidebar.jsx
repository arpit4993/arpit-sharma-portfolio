"use client";

import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Settings", href: "/admin/settings" },
];

const Sidebar = () => {

  const router = useRouter();

const handleLogout = () => {

  localStorage.removeItem("admin-auth");

  router.replace("/admin/login");

};

  return (
    <aside className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen p-4" aria-label="Admin sidebar">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="block rounded px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
  onClick={handleLogout}
  className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold transition"
>
  Logout
</button>
    </aside>
  );
};

export default Sidebar;
