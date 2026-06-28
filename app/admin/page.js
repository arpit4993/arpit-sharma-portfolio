"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const sections = [
    {
      title: "Hero Section",
      description: "Manage hero content",
      link: "/admin/hero",
    },
    {
      title: "About",
      description: "Manage about section",
      link: "/admin/about",
    },
    {
      title: "Experience",
      description: "Manage experience section",
      link: "/admin/experience",
    },
    {
      title: "Services",
      description: "Manage services",
      link: "/admin/services",
    },
    {
      title: "Portfolio Categories",
      description: "Manage portfolio categories",
      link: "/admin/portfolio/categories",
    },
    {
      title: "Portfolio Projects",
      description: "Manage portfolio projects",
      link: "/admin/portfolio/projects",
    },
    {
      title: "Contact",
      description: "Manage contact information",
      link: "/admin/contact",
    },
    {
      title: "Footer",
      description: "Manage footer",
      link: "/admin/footer",
    },
  ];

  return (
    <main>

      {/* Heading */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">
          Dashboard
        </h1>

        <p className="text-white/50 mt-3 text-lg">
          Welcome to your website admin panel.
        </p>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">

        {sections.map((section) => (

          <Link
            key={section.link}
            href={section.link}
            className="group border border-white/10 rounded-3xl bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
          >

            <h2 className="text-2xl font-black mb-3 group-hover:text-white">
              {section.title}
            </h2>

            <p className="text-white/50 leading-relaxed mb-8">
              {section.description}
            </p>

            <span className="inline-flex items-center text-sm font-semibold tracking-wide uppercase">
              Manage →
            </span>

          </Link>

        ))}

      </div>

    </main>
  );
}