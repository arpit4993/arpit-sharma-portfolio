"use client"

import { useEffect, useState } from "react"

import {
  collection,
  getDocs,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

export default function HomePage() {
  const [projects, setProjects] = useState(0)
  const [clients, setClients] = useState(0)
  const [years, setYears] = useState(0)

  const [
    portfolioProjects,
    setPortfolioProjects,
  ] = useState([])

  const [selectedProject, setSelectedProject] =
  useState(null)

  const [fullscreenImage, setFullscreenImage] =
  useState(null)

  const [currentImageIndex, setCurrentImageIndex] =
  useState(0)

  const [imageDirection, setImageDirection] =
  useState("")

  useEffect(() => {
    const animateCounter = (
      setter,
      target,
      duration = 2000
    ) => {
      let start = 0

      const increment =
        target / (duration / 16)

      const counter = setInterval(() => {
        start += increment

        if (start >= target) {
          setter(target)
          clearInterval(counter)
        } else {
          setter(Math.floor(start))
        }
      }, 16)
    }

    animateCounter(setProjects, 150)
    animateCounter(setClients, 80)
    animateCounter(setYears, 6)

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "section-visible"
              )
            }
          })
        },
        {
          threshold: 0.15,
        }
      )

    const sections =
      document.querySelectorAll(
        ".section-hidden"
      )

    sections.forEach((section) => {
      observer.observe(section)
    })

    const handleTimeline = () => {
      const timeline =
        document.querySelector(
          ".timeline-progress"
        )

      if (!timeline) return

      const section =
        document.querySelector(
          "#experience"
        )

      const rect =
        section.getBoundingClientRect()

      const windowHeight =
        window.innerHeight

      const progress = Math.min(
        Math.max(
          (windowHeight - rect.top) /
            rect.height,
          0
        ),
        1
      )

      timeline.style.height = `${
        progress * 100
      }%`
    }

    const fetchProjects = async () => {
      try {
        const querySnapshot =
          await getDocs(
            collection(db, "portfolio")
          )

        const projectsData =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          )

        setPortfolioProjects(
          projectsData
        )
      } catch (error) {
        console.log(error)
      }
    }

    fetchProjects()

    window.addEventListener(
      "scroll",
      handleTimeline
    )

    handleTimeline()

    return () => {
      observer.disconnect()

      window.removeEventListener(
        "scroll",
        handleTimeline
      )
    }
  }, [])

  return (
    <main
      id="top"
      className="min-h-screen bg-black text-white overflow-hidden"
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(80px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }

          to {
            width: 100%;
          }
        }

        @keyframes marqueeMove {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .fade-up {
          animation: fadeUp 1s ease forwards;
        }

        .fade-right {
          animation: fadeRight 1.2s ease forwards;
        }

        .typing-animation {
          width: 0;
          animation: typing 1.6s ease-out forwards;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
        }

        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 28px;
          width: max-content;
          animation: marqueeMove 60s linear infinite;
        }

        .divider {
          width: 1px;
          height: 28px;
          background: rgba(255, 255, 255, 0.2);
        }

        .section-hidden {
          opacity: 0;
          transform: translateY(80px);
          transition:
            opacity 1s ease,
            transform 1s ease;
        }

        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card {
          perspective: 1200px;
          height: 220px;
        }

        .service-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s ease;
          transform-style: preserve-3d;
        }

        .service-card:hover .service-card-inner {
          transform: rotateY(180deg);
        }

        .service-front,
        .service-back {
          position: absolute;
          inset: 0;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.1);
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: #050505;
          overflow: hidden;
        }
          @keyframes slideFromRight {
  0% {
    opacity: 0;
    transform: translateX(120px) rotateY(-10deg);
  }

  100% {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
}

@keyframes slideFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-120px) rotateY(10deg);
  }

  100% {
    opacity: 1;
    transform: translateX(0) rotateY(0deg);
  }
}

.image-slide-right {
  animation: slideFromRight 0.45s ease;
}

.image-slide-left {
  animation: slideFromLeft 0.45s ease;
}

        .service-front {
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.03),
            rgba(255,255,255,0.01)
          );
        }

        .service-back {
          transform: rotateY(180deg);
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.02)
          );
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="text-2xl font-bold">
            Gokul Grover
          </a>

          <nav className="hidden md:flex items-center gap-12 text-sm uppercase tracking-wide text-white/80">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            Let’s Talk
          </a>
        </div>
      </header>

      <section className="min-h-screen flex items-center pt-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-6 fade-up">
              Graphic Designer
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8">
              <span className="typing-animation pb-4">
                Building
                <span className="block text-white/40">Visual</span>
                Brands.
              </span>
            </h1>

            <p className="text-lg text-white/70 max-w-xl leading-relaxed mb-10">
              I create premium branding, social media creatives, product
              visuals, advertising designs, and modern digital experiences that
              help businesses stand out.
            </p>

            <div className="flex gap-5 flex-wrap mb-16">
              <a
                href="#portfolio"
                className="bg-white text-black px-10 py-5 rounded-full font-semibold"
              >
                View Portfolio
              </a>

              <a
                href="#contact"
                className="border border-white/20 px-10 py-5 rounded-full font-semibold"
              >
                Hire Me
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-lg">
              <div>
                <h3 className="text-4xl font-bold">{projects}+</h3>
                <p className="text-white/50 mt-2">Projects</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">{clients}+</h3>
                <p className="text-white/50 mt-2">Clients</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">{years}+</h3>
                <p className="text-white/50 mt-2">Years</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end fade-right lg:-mt-20">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 max-w-md">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-8">
        <div className="marquee-wrapper">
          <div className="marquee-track text-xl md:text-3xl font-bold uppercase tracking-[0.2em]">
            <span>Brand Identity</span>
            <span className="divider"></span>
            <span>Social Media Design</span>
            <span className="divider"></span>
            <span>Packaging Design</span>
            <span className="divider"></span>
            <span>Advertising Creatives</span>
            <span className="divider"></span>
            <span>Logo Design</span>
            <span className="divider"></span>
            <span>Thumbnail Design</span>
            <span className="divider"></span>
            <span>Product Retouching</span>
            <span className="divider"></span>
            <span>UI Design</span>
            <span className="divider"></span>
            <span>Motion Graphics</span>
            <span className="divider"></span>
            <span>Print Design</span>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-28 px-6 lg:px-10 section-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-6">
            About Me
          </p>

          <h2 className="text-4xl lg:text-6xl font-black leading-tight max-w-4xl mb-8">
            I design modern visuals that make brands look premium and memorable.
          </h2>

          <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
            I specialize in creating high-end branding, social media creatives,
            packaging, product visuals, and digital experiences with a strong
            focus on aesthetics, clarity, and brand impact.
          </p>
        </div>
      </section>
      <section
        id="experience"
        className="py-20 px-6 lg:px-10 section-hidden"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-4">
              My Experience
            </p>

            <h2 className="text-4xl lg:text-6xl font-black">
              My Creative Journey
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/10 -translate-x-1/2 hidden md:block overflow-hidden">
            <div className="timeline-progress absolute top-0 left-0 w-full bg-white h-0 transition-all duration-300"></div>
          </div>

            {[
              {
                year: "2019",
                company: "Design Square",
                role: "Trainee",
                duration: "2019 - 2020",
                side: "left",
              },
              {
                year: "2020",
                company: "Pranshinuts",
                role: "Junior Graphic Designer",
                duration: "2020 - 2023",
                side: "right",
              },
              {
                year: "2023",
                company: "TVS Automobile Solution Pvt. Ltd.",
                role: "Graphic Designer",
                duration: "2023 - Present",
                side: "left",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative grid md:grid-cols-2 items-center mb-16"
              >
                <div
                  className={`${
                    item.side === "right"
                      ? "md:col-start-2 md:pl-12"
                      : "md:pr-12"
                  }`}
                >
                  <div className="bg-white/[0.02] border border-white/10 rounded-[24px] p-7 hover:border-white/20 transition-all duration-500">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-white/35 block mb-3">
                      {item.duration}
                    </span>

                    <h3 className="text-2xl lg:text-3xl font-black leading-tight mb-2">
                      {item.company}
                    </h3>

                    <p className="text-white/60 text-base">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full border-2 border-white bg-black"></div>

                    <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 -top-5 hidden md:block">
                  <div className="bg-white text-black text-[11px] font-bold px-4 py-1.5 rounded-full">
                    {item.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="services"
        className="py-28 px-6 lg:px-10 section-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-16">Services</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Brand Identity",
                desc: "Premium branding systems that create a strong and memorable visual identity.",
              },
              {
                title: "Social Media Design",
                desc: "Modern creatives and ad visuals designed for engagement and brand growth.",
              },
              {
                title: "Packaging Design",
                desc: "Clean and premium packaging concepts that improve shelf impact.",
              },
              {
                title: "Advertising Creatives",
                desc: "High-converting ad creatives for campaigns, promotions, and launches.",
              },
              {
                title: "Product Retouching",
                desc: "Professional product editing and enhancement for premium presentation.",
              },
              {
                title: "Retail Branding",
                desc: "Shop branding, storefront visuals, signage systems, and in-store branding design.",
              },
              {
                title: "Video Editing",
                desc: "Professional video edits, motion cuts, reels, and cinematic visual storytelling.",
              },
            ].map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-card-inner">
                  <div className="service-front">
                    <h3 className="text-2xl font-bold text-center">
                      {service.title}
                    </h3>
                  </div>

                  <div className="service-back">
                    <p className="text-white/70 text-center leading-relaxed text-lg">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}

<section
  id="portfolio"
  className="py-32 px-6 lg:px-10"
>
  <div className="max-w-7xl mx-auto">

    {/* TOP HEADING */}

    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-24">

      <div>
        <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-5">
          Selected Work
        </p>

        <h2 className="text-5xl lg:text-7xl font-black leading-tight">
          Featured Portfolio
        </h2>
      </div>

      <p className="text-white/50 max-w-md leading-relaxed">
        Branding, advertising creatives, retail branding,
        packaging design, social media campaigns, and
        visual systems crafted for modern brands.
      </p>

    </div>

    {/* PORTFOLIO GRID */}

    <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">

      {/* RETAIL BRANDING */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "retail-branding"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              Retail Branding
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      {/* PACKAGING DESIGN */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "packaging-design"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              Packaging Design
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      {/* SOCIAL MEDIA CREATIVE */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "social-media-creative"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              Social Media Creative
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      {/* POSTER DESIGN */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "poster-design"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              Poster Design
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      {/* BROCHURE DESIGN */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "brochure-design"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              Brochure Design
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      {/* LOGO DESIGN */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "logo-design"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              Logo Design
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      {/* E-COMMERCE CREATIVE */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "ecommerce-creative"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              E-Commerce Creative
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      {/* VIDEO EDITING */}

      {portfolioProjects
        .filter(
          (project) =>
            project.category ===
            "video-editing"
        )
        .slice(0, 1)
        .map((project) => (

          <div key={project.id}>

            <h3 className="text-3xl lg:text-5xl font-black mb-10">
              Video Editing
            </h3>

            <div
              onClick={() =>
                setSelectedProject(project)
              }
              className="group relative overflow-hidden rounded-[36px]
              border border-white/10 bg-white/[0.02]
              cursor-pointer transition-all duration-500
              hover:border-white/20 hover:-translate-y-2"
            >

              <div className="overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-[520px] object-cover
                  transition-transform duration-700
                  group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10">

                <span className="text-[10px] uppercase tracking-[0.3em]
                text-white/45 block mb-5">
                  CATEGORY
                </span>

                <h3 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                  {project.title}
                </h3>

                <p className="text-white/65 leading-relaxed max-w-lg text-lg">
                  {project.description}
                </p>

              </div>

            </div>

          </div>

        ))}

    </div>

  </div>
</section>

{/* FULLSCREEN GALLERY */}

{selectedProject && (

  <div className="fixed inset-0 z-[999] bg-black overflow-y-auto">

    <div className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">

        <div>
          <h2 className="text-3xl lg:text-5xl font-black mb-2">
            {selectedProject.title}
          </h2>

          <p className="text-white/50">
            {selectedProject.description}
          </p>
        </div>

        <button
          onClick={() =>
            setSelectedProject(null)
          }
          className="w-14 h-14 rounded-full border border-white/10
          text-2xl hover:bg-white hover:text-black
          transition-all duration-300"
        >
          &times;
        </button>

      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

      {selectedProject.category ===
        "video-editing" ? (

        <div className="grid md:grid-cols-2 gap-8">

          {[...(selectedProject.videos || [])]
            .reverse()
            .map((video, index) => (

              <video
                key={index}
                src={video}
                controls
                className="w-full rounded-[28px]
                border border-white/10"
              />

            ))}

        </div>

      ) : (

      <div className="columns-1 md:columns-2 gap-6 space-y-6">

            {[...(selectedProject.images || [])]
              .reverse()
              .map(
                (image, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-[28px]
              border border-white/10 bg-white/[0.02]"
            >

              <img
                src={image}
                alt=""
                className="w-full object-cover hover:scale-[1.02]
                transition-transform duration-500 cursor-zoom-in"
                onClick={() => {

                  const reversedImages =
                    [...selectedProject.images].reverse()

                  const actualIndex =
                    selectedProject.images.findIndex(
                      (img) => img === image
                    )

                  setCurrentImageIndex(actualIndex)

                  setFullscreenImage(true)
                }}
              />

            </div>

          )
        )}

      </div>
      )}
    </div>
  </div>

)}



{/* IMAGE FULLSCREEN */}

{fullscreenImage && (

  <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6">

    {/* CLOSE */}

    <button
      onClick={() =>
        setFullscreenImage(false)
      }
      className="absolute top-6 right-6 w-14 h-14 rounded-full
      border border-white/10 text-3xl
      hover:bg-white hover:text-black
      transition-all duration-300 z-50"
    >
      &times;
    </button>

    {/* LEFT */}

    <button
      onClick={() => {
  setImageDirection("left")

  setCurrentImageIndex((prev) =>
    prev === 0
      ? selectedProject.images.length - 1
      : prev - 1
  )
}}
      className="absolute left-6 top-1/2 -translate-y-1/2
      w-14 h-14 rounded-full border border-white/10
      text-3xl hover:bg-white hover:text-black
      transition-all duration-300 z-50"
    >
      ←
    </button>

    {/* IMAGE */}

    <img
      src={
  selectedProject.images[currentImageIndex]
}
      alt=""
      className={`max-w-full max-h-full object-contain rounded-[20px]
${
  imageDirection === "right"
    ? "image-slide-right"
    : "image-slide-left"
}`}
    />

    {/* RIGHT */}

    <button
      onClick={() => {
  setImageDirection("right")

  setCurrentImageIndex((prev) =>
    prev ===
    selectedProject.images.length - 1
      ? 0
      : prev + 1
  )
}}
      className="absolute right-6 top-1/2 -translate-y-1/2
      w-14 h-14 rounded-full border border-white/10
      text-3xl hover:bg-white hover:text-black
      transition-all duration-300 z-50"
    >
      →
    </button>

  </div>

)}
      <section
        id="contact"
        className="py-28 px-6 lg:px-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-6">
            Contact
          </p>

          <h2 className="text-5xl lg:text-7xl font-black mb-8">
            Let’s Build Something Great.
          </h2>

          <p className="text-white/60 text-lg mb-12">
            Available for freelance projects, branding work, and creative
            collaborations.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">
            <a
              href="https://wa.me/918699966924"
              target="_blank"
              className="bg-white text-black px-10 py-5 rounded-full font-semibold"
            >
              WhatsApp
            </a>

            <a
              href="mailto:gokulgrover123@gmail.com"
              className="border border-white/20 px-10 py-5 rounded-full font-semibold"
            >
              Let’s Talk
            </a>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 py-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        <div>
          <h3 className="text-3xl font-black mb-3">
            Gokul Grover
          </h3>

          <p className="text-white/50 max-w-md leading-relaxed">
            Graphic Designer focused on branding, social media creatives,
            advertising visuals, and premium digital experiences.
          </p>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            IG
          </a>

          <a
            href="https://behance.net/yourusername"
            target="_blank"
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            BE
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            IN
          </a>

          <a
            href="https://youtube.com/@yourchannel"
            target="_blank"
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            YT
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-sm">
        © 2026 Gokul Grover. All Rights Reserved.
      </div>
    </footer>
    </main>
  )
}