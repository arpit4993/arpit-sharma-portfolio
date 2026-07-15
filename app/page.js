"use client"

import { useEffect, useState } from "react"

import { Menu, X } from "lucide-react";

import {
  collection,
  getDocs,
  limit,
  query,

} from "firebase/firestore"

import { db } from "@/lib/firebase"

export default function HomePage() {
  const [projects, setProjects] = useState(0)
  const [clients, setClients] = useState(0)
  const [years, setYears] = useState(0)
  const [hero, setHero] = useState(null)
  const [about, setAbout] = useState(null)
  const [experience, setExperience] = useState([])
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [contact, setContact] = useState(null)
  const [footer, setFooter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false);

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
  document.querySelector("#experience");

if (!section) return;

const rect =
  section.getBoundingClientRect();

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

    const fetchHero = async () => {
  try {

    const snapshot = await getDocs(
      query(
        collection(db, "hero"),
        limit(1)
      )
    )

    if (!snapshot.empty) {

      setHero(snapshot.docs[0].data())

    }

  } catch (error) {

    console.log(error)

  }
}

const fetchAbout = async () => {

  try {

    const snapshot = await getDocs(
      query(
        collection(db, "about"),
        limit(1)
      )
    )

    if (!snapshot.empty) {

      setAbout(snapshot.docs[0].data())

    }

  } catch (error) {

    console.log(error)

  }

}

const fetchExperience = async () => {
  try {

    console.log("fetchExperience called");

    const snapshot = await getDocs(
      collection(db, "experience")
    );

    console.log(snapshot.docs);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Experience =>", data);

    data.sort((a, b) => Number(a.year) - Number(b.year));

    setExperience(data);

  } catch (error) {
    console.log(error);
  }
};

const fetchServices = async () => {
  try {

    console.log("fetchServices called");

    const snapshot = await getDocs(
      collection(db, "services")
    );

    console.log(snapshot.docs);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Services =>", data);

    setServices(data);

  } catch (error) {
    console.log(error);
  }
};

const fetchCategories = async () => {

  try {

    const snapshot = await getDocs(
      collection(db, "portfolioCategories")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setCategories(data);

  } catch (error) {

    console.log(error);

  }

};

const fetchContact = async () => {

  try {

    const snapshot = await getDocs(
      query(
        collection(db, "contact"),
        limit(1)
      )
    );

    if (!snapshot.empty) {

      setContact(snapshot.docs[0].data());

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchFooter = async () => {

  try {

    const snapshot = await getDocs(
      query(
        collection(db, "footer"),
        limit(1)
      )
    );

    if (!snapshot.empty) {

      setFooter(snapshot.docs[0].data());

    }

  } catch (error) {

    console.log(error);

  }

};

    const fetchProjects = async () => {
      try {
        const querySnapshot =
  await getDocs(
    collection(db, "portfolioProjects")
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

const loadData = async () => {
  try {
    await Promise.all([
      fetchHero(),
      fetchAbout(),
      fetchExperience(),
      fetchServices(),
      fetchCategories(),
      fetchProjects(),
      fetchContact(),
      fetchFooter(),
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const init = async () => {

  await loadData();

  const sections =
    document.querySelectorAll(".section-hidden");

  sections.forEach((section) => {
    observer.observe(section);
  });

};

init();

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

  if (loading) {

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="text-white text-xl font-semibold">
        Loading...
      </div>

    </div>
  )

}

  if (!hero) return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="text-white text-xl font-semibold">
        Loading...
      </div>

    </div>

  )

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
  min-height: 190px;
  height: 100%;
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
          padding: 20px;
          @media (min-width: 640px) {
  .service-front,
  .service-back {
    padding: 28px;
  }
}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="text-2xl font-bold">
            {hero?.name || "Gokul Grover"}
          </a>

          <button
  onClick={() => setMobileMenu(true)}
  className="md:hidden text-white"
>
  <Menu size={30} />
</button>

          <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wide text-white/80">  

  <a href="#about">About</a>

  <a href="#experience">Experience</a>

  <a href="#services">Services</a>

  <a href="#portfolio">Portfolio</a>

  <a href="#contact">Contact</a>

  <a
    href="/ai"
    className="bg-[#F2D14B] text-black px-5 py-2 rounded-md font-black text-xs tracking-[0.18em] uppercase hover:bg-[#ffe45a] transition-all duration-300"
  >
    AI INTEGRATION
  </a>

</nav>

        <div className="flex items-center gap-4">
          <a
  href="#contact"
  className="hidden md:flex bg-white text-black px-5 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base"
>
            Let’s Talk
          </a>
          </div>
        </div>
      </header>

      {mobileMenu && (

<div className="fixed inset-0 bg-black z-[999] flex flex-col">

<div className="flex justify-between items-center h-20 px-6 border-b border-white/10">

<h2 className="text-2xl font-bold">
{hero?.name}
</h2>

<button
onClick={() => setMobileMenu(false)}
>

<X size={34} />

</button>

</div>

<nav className="flex-1 flex flex-col justify-center items-center gap-7 text-[30px] font-black tracking-wide">

<a
href="#about"
onClick={()=>setMobileMenu(false)}
>
About
</a>

<a
href="#experience"
onClick={()=>setMobileMenu(false)}
>
Experience
</a>

<a
href="#services"
onClick={()=>setMobileMenu(false)}
>
Services
</a>

<a
href="#portfolio"
onClick={()=>setMobileMenu(false)}
>
Portfolio
</a>

<a
href="#contact"
onClick={()=>setMobileMenu(false)}
>
Contact
</a>

<a
href="/ai"
onClick={()=>setMobileMenu(false)}
className="text-yellow-400"
>
AI Integration
</a>

<div className="w-full px-8 pt-6">

  <a
    href="#contact"
    onClick={() => setMobileMenu(false)}
    className="w-full flex justify-center items-center bg-white text-black rounded-full py-4 font-bold text-lg"
  >
    Let’s Talk
  </a>

</div>

</nav>

</div>

)}

      <section className="min-h-screen flex items-center pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-6 fade-up">
              {hero?.designation || "Graphic Designer"}
            </p>

            <h1 className="text-4xl sm:text-6xl lg:text-[7rem] xl:text-[8rem] font-black leading-[0.95] lg:leading-[0.82] tracking-[-0.04em] mb-6 lg:mb-8">
 <span className="inline-block pb-4">
   {hero?.heading || "Building Visual Brands."}
</span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-8 lg:mb-10">
              {hero?.description ||
"I create premium branding, social media creatives, product visuals, advertising designs, and modern digital experiences that help businesses stand out."}
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
                className="sm:flex border border-white/20 px-10 py-5 rounded-full font-semibold"
              >
                Hire Me
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-lg">
              <div>
                <h3 className="text-4xl font-bold">{hero?.projects ?? projects}+</h3>
                <p className="text-white/50 mt-2">Projects</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">{hero?.clients ?? clients}+</h3>
                <p className="text-white/50 mt-2">Clients</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">{hero?.years ?? years}+</h3>
                <p className="text-white/50 mt-2">Years</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end fade-right lg:-mt-20">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 max-w-md">
              <img
                src={hero?.profileImage || "/profile.jpeg"}
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
        className="py-28 px-6 lg:px-10"
      >
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-6">
            About Me
          </p>

<h2 className="text-4xl lg:text-6xl font-black leading-tight max-w-4xl mb-8">
            {about?.heading || "Creative Graphic Designer"}
          </h2>

<p className="text-lg text-white/60 leading-relaxed max-w-3xl">
            {about?.description ||
    "Yahan tumhara current hardcoded description rahega."}
          </p>

        </div>
      </section>
      <section
  id="experience"
  className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10"
>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-4">
              My Experience
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black">
              My Creative Journey
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/10 -translate-x-1/2 hidden md:block overflow-hidden">
            <div className="timeline-progress absolute top-0 left-0 w-full bg-white h-0 transition-all duration-300"></div>
          </div>
            {experience.map((item, index) => (
                <div
                key={item.id}
                className="relative grid md:grid-cols-2 items-center mb-10 lg:mb-16"
              >
                <div
                  className={`${
                    index % 2 !== 0
                      ? "md:col-start-2 md:pl-12"
                      : "md:pr-12"
                  }`}
                >
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl lg:rounded-[24px] p-5 sm:p-6 lg:p-7 hover:border-white/20 transition-all duration-500">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-white/35 block mb-3">
                      {item.duration}
                    </span>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight mb-2">
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
  className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10"
>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-10 lg:mb-16">Services</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-inner">
                  <div className="service-front">
                    <h3 className="text-2xl font-bold text-center">
                      {service.title}
                    </h3>
                  </div>

                  <div className="service-back">
                    <p className="text-white/70 text-center leading-relaxed text-lg">
                      {service.description}
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
  className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10"
>
  <div className="max-w-7xl mx-auto">

    {/* TOP HEADING */}

    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-24">

      <div>
        <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-5">
          Selected Work
        </p>

        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight">
          Featured Portfolio
        </h2>
      </div>

      <p className="text-sm sm:text-base text-white/50 max-w-md leading-relaxed">
        Branding, advertising creatives, retail branding,
        packaging design, social media campaigns, and
        visual systems crafted for modern brands.
      </p>

    </div>

    {/* PORTFOLIO GRID */}

    <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-12 lg:gap-y-20">

      {categories.map((category) => {

  const project = portfolioProjects.find(
    (item) => item.category === category.slug
  );

  if (!project) return null;

  return (

    <div key={category.id}>

      <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-6 lg:mb-10">
        {category.name}
      </h3>

      <div
        onClick={() => setSelectedProject(project)}
        className="group relative overflow-hidden rounded-[36px]
        border border-white/10 bg-white/[0.02]
        cursor-pointer transition-all duration-500
        hover:border-white/20 hover:-translate-y-2"
      >

        <div className="overflow-hidden">

          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-[280px] sm:h-[380px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
          />

        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 p-8 lg:p-10">

          <span className="text-[10px] uppercase tracking-[0.3em] text-white/45 block mb-5">
            CATEGORY
          </span>

          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-black leading-tight mb-4 lg:mb-5">
            {project.title}
          </h3>

          <p className="text-white/65 leading-relaxed max-w-lg text-sm sm:text-base lg:text-lg">
            {project.description}
          </p>

        </div>

      </div>

    </div>

  );

})}
    </div>

  </div>
</section>

{/* FULLSCREEN GALLERY */}

{selectedProject && (

  <div className="fixed inset-0 z-[999] bg-black overflow-y-auto">

    <div className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-2">
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

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-16">

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
      className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 lg:w-14 lg:h-14 rounded-full
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
      className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2
      w-11 h-11 lg:w-14 lg:h-14 rounded-full border border-white/10
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
      className={`max-w-full max-h-[85vh] lg:max-h-full object-contain rounded-2xl lg:rounded-[20px]
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
      className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2
      w-11 h-11 lg:w-14 lg:h-14 rounded-full border border-white/10
      text-3xl hover:bg-white hover:text-black
      transition-all duration-300 z-50"
    >
      →
    </button>

  </div>

)}
      <section
  id="contact"
  className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10"
>
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-white/50 mb-6">
            Contact
          </p>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-6 lg:mb-8">
            Let’s Build Something Great.
          </h2>

          <p className="text-white/60 text-base sm:text-lg mb-8 lg:mb-12">
            Available for freelance projects, branding work, and creative
            collaborations.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">
            <a
              href={contact?.whatsapp || "https://wa.me/918107384993"}
              target="_blank"
              className="bg-white text-black px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base"
            >
              WhatsApp
            </a>

            <a
              href={`mailto:${contact?.email || "gokulgrover123@gmail.com"}`}
              className="border border-white/20 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base"
            >
              Let’s Talk
            </a>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 py-10 lg:py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        <div>
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            {footer?.name || "Gokul Grover"}
          </h3>

          <p className="text-white/50 max-w-md leading-relaxed">
            {footer?.description ||
    "Graphic Designer focused on branding, social media creatives, advertising visuals, and premium digital experiences."}
          </p>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <a
            href={footer?.instagram || "#"}
            target="_blank"
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            IG
          </a>

          <a
            href={footer?.behance || "#"}
            target="_blank"
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            BE
          </a>

          <a
            href={footer?.linkedin || "#"}
            target="_blank"
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
          >
            IN
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 lg:mt-10 pt-5 lg:pt-6 text-center text-white/40 text-xs sm:text-sm">
        © 2026 {footer?.name || "Gokul Grover"}. All Rights Reserved.
      </div>
    </footer>
    </main>
  )
}