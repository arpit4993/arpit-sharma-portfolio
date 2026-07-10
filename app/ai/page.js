"use client"

import { useEffect, useState } from "react"

import {
  FileText,
  Search,
  Target,
  Lightbulb,
  Image,
  Clapperboard,
  User,
  Play,
  Send
} from "lucide-react";

import { useRef } from "react";

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

  const cubeSceneRef = useRef(null);

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

    /* ===========================================
   Cube Mouse Interaction
=========================================== */

const cube = cubeSceneRef.current;

if (cube) {

  let currentX = 60;
  let currentY = 0;

  let targetX = 60;
  let targetY = 0;

  const update = () => {

    currentX += (targetX - currentX) * 0.08;

    currentY += (targetY - currentY) * 0.08;

    cube.style.setProperty(
      "--cube-x",
      `${currentX}deg`
    );

    cube.style.setProperty(
      "--cube-y",
      `${currentY}deg`
    );

    requestAnimationFrame(update);

  };

  update();

  cube.addEventListener("mousemove", (e) => {

    const rect = cube.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const y =
      (e.clientY - rect.top) / rect.height;

    targetX = 60 - (y - 0.5) * 12;

    targetY = (x - 0.5) * 18;

  });

  cube.addEventListener("mouseleave", () => {

    targetX = 60;

    targetY = 0;

  });

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
          background: #050505;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .service-front,
          .service-back {
            padding: 28px;
          }
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

  /* =====================================================
      CENTER V2 - PART 2.1
===================================================== */

.cube-scene{

  width:520px;
  height:520px;

  display:flex;
  align-items:center;
  justify-content:center;

  perspective:1800px;

}

.cube-stage{

  position:relative;

  width:320px;
  height:320px;

  display:flex;
  align-items:center;
  justify-content:center;

  transform-style:preserve-3d;

  transform:

    rotateX(var(--cube-x,60deg))

    rotateY(var(--cube-y,0deg))

    rotateZ(45deg);

}

.frame-cube{

  position:relative;

  width:180px;
  height:180px;

  transform-style:preserve-3d;

}

  /* =====================================================
      CENTER V2 - PART 2.2
      OUTER WIREFRAME CUBE
===================================================== */

.frame-cube{

    position:relative;

    width:180px;
    height:180px;

    transform-style:preserve-3d;

}

/* ---------------- FRONT / BACK ---------------- */

.cube-face{

    position:absolute;

    width:180px;
    height:180px;

    border:1px solid rgba(255,255,255,.10);

    background:rgba(255,255,255,.015);

    backdrop-filter:blur(4px);

}

.front{

    transform:translateZ(45px);

}

.back{

    transform:translateZ(-45px);

}

/* ---------------- EDGES ---------------- */

.cube-edge{

    position:absolute;

    left:0;

    width:180px;

    height:90px;

    border-left:1px solid rgba(255,255,255,.08);

    border-right:1px solid rgba(255,255,255,.08);

}

/* top connector */

.edge-top{

    top:0;

    transform:
        rotateX(90deg)
        translateZ(45px);

}

/* bottom connector */

.edge-bottom{

    bottom:0;

    transform:
        rotateX(90deg)
        translateZ(-45px);

}

/* left connector */

.edge-left{

    width:90px;
    height:180px;

    top:0;
    left:0;

    border-top:1px solid rgba(255,255,255,.08);

    border-bottom:1px solid rgba(255,255,255,.08);

    transform:
        rotateY(90deg)
        translateZ(-45px);

}

/* right connector */

.edge-right{

    width:90px;
    height:180px;

    top:0;
    right:0;

    border-top:1px solid rgba(255,255,255,.08);

    border-bottom:1px solid rgba(255,255,255,.08);

    transform:
        rotateY(90deg)
        translateZ(45px);

}

  /* =====================================================
      CENTER V2 - PART 2.3
      INNER GLASS CUBE
===================================================== */

.inner-glass-cube{

    position:absolute;

    left:50%;
    top:50%;

    width:92px;
    height:92px;

    margin-left:-46px;
    margin-top:-46px;

    transform-style:preserve-3d;

}

.inner-face{

    position:absolute;

    inset:0;

    border:1px solid rgba(255,255,255,.16);

    background:

      linear-gradient(
        135deg,
        rgba(255,255,255,.08),
        rgba(255,255,255,.02)
      );

    backdrop-filter:blur(8px);

}

/* Front */

.inner-face.front{

    transform:translateZ(22px);

}

/* Back */

.inner-face.back{

    transform:translateZ(-22px);

}

/* Soft Glass Shadow */

.inner-glass-cube::after{

    content:"";

    position:absolute;

    inset:-12px;

    background:

      radial-gradient(

        circle,

        rgba(255,255,255,.04),

        transparent 70%

      );

    filter:blur(12px);

    z-index:-1;

}

  /* =====================================================
      CENTER V2 - PART 2.4
===================================================== */

.energy-core{

    position:absolute;

    left:50%;
    top:50%;

    width:28px;
    height:28px;

    margin-left:-14px;
    margin-top:-14px;

    border-radius:8px;

    background:

        radial-gradient(

            circle,

            #ffffff 0%,

            #d8c3ff 20%,

            #b180ff 45%,

            #8a58ff 70%,

            transparent 100%

        );

    filter:

        blur(.5px)

        drop-shadow(0 0 10px #b180ff)

        drop-shadow(0 0 30px #8a58ff)

        drop-shadow(0 0 60px #7b47ff);

}

/* --------------------------- */

.energy-glow{

    position:absolute;

    left:50%;
    top:50%;

    width:170px;
    height:170px;

    margin-left:-85px;
    margin-top:-85px;

    border-radius:50%;

    background:

        radial-gradient(

            circle,

            rgba(138,88,255,.32),

            rgba(138,88,255,.12),

            transparent 72%

        );

    filter:blur(40px);

    pointer-events:none;

}

/* --------------------------- */

.energy-beam{

    position:absolute;

    left:50%;
    top:50%;

    background:

        linear-gradient(

            transparent,

            rgba(180,140,255,.85),

            transparent

        );

}

/* Vertical */

.energy-beam.vertical{

    width:2px;
    height:140px;

    margin-left:-1px;
    margin-top:-70px;

}

/* Horizontal */

.energy-beam.horizontal{

    width:140px;
    height:2px;

    margin-left:-70px;
    margin-top:-1px;

}

  /* =====================================================
      CENTER V2 - PART 2.5
===================================================== */

.glass-frame{

    position:absolute;

    left:50%;
    top:50%;

    border:1px solid rgba(255,255,255,.07);

    background:

        rgba(255,255,255,.01);

    backdrop-filter:blur(4px);

    transform-style:preserve-3d;

}

/* ----------------------------- */

.frame-one{

    width:230px;
    height:230px;

    margin-left:-115px;
    margin-top:-115px;

    transform:

        translateZ(72px);

}

/* ----------------------------- */

.frame-two{

    width:205px;
    height:205px;

    margin-left:-102.5px;
    margin-top:-102.5px;

    transform:

        translateZ(0px);

}

/* ----------------------------- */

.frame-three{

    width:180px;
    height:180px;

    margin-left:-90px;
    margin-top:-90px;

    transform:

        translateZ(-72px);

}

/* ----------------------------- */

.glass-frame::before{

    content:"";

    position:absolute;

    inset:0;

    background:

        linear-gradient(

            135deg,

            rgba(255,255,255,.03),

            transparent

        );

}

  /* =====================================================
      CENTER V2 - PART 2.6
      PREMIUM ANIMATIONS
===================================================== */

/* --------------------------
   MAIN FLOAT
--------------------------- */

@keyframes cubeFloat{

    0%{

        transform:
            rotateX(60deg)
            rotateZ(45deg)
            translateY(0px);

    }

    25%{

        transform:
            rotateX(61deg)
            rotateZ(46deg)
            translateY(-6px);

    }

    50%{

        transform:
            rotateX(60deg)
            rotateZ(47deg)
            translateY(-12px);

    }

    75%{

        transform:
            rotateX(59deg)
            rotateZ(46deg)
            translateY(-6px);

    }

    100%{

        transform:
            rotateX(60deg)
            rotateZ(45deg)
            translateY(0px);

    }

}

.cube-stage{

    animation:

        cubeFloat

        7s

        ease-in-out

        infinite;

}

/* --------------------------
   INNER PULSE
--------------------------- */

@keyframes corePulse{

    0%{

        transform:

            scale(.85);

        opacity:.75;

    }

    50%{

        transform:

            scale(1.15);

        opacity:1;

    }

    100%{

        transform:

            scale(.85);

        opacity:.75;

    }

}

.energy-core{

    animation:

        corePulse

        2.8s

        ease-in-out

        infinite;

}

/* --------------------------
   GLOW BREATHING
--------------------------- */

@keyframes glowPulse{

    0%{

        opacity:.35;

        transform:scale(.9);

    }

    50%{

        opacity:1;

        transform:scale(1.18);

    }

    100%{

        opacity:.35;

        transform:scale(.9);

    }

}

.energy-glow{

    animation:

        glowPulse

        4s

        ease-in-out

        infinite;

}

/* --------------------------
   LIGHT BEAMS
--------------------------- */

@keyframes beamPulse{

    0%{

        opacity:.2;

    }

    50%{

        opacity:1;

    }

    100%{

        opacity:.2;

    }

}

.energy-beam{

    animation:

        beamPulse

        2.5s

        ease-in-out

        infinite;

}

/* --------------------------
   GLASS FRAMES
--------------------------- */

@keyframes frameFloat{

    0%{

        opacity:.25;

    }

    50%{

        opacity:.9;

    }

    100%{

        opacity:.25;

    }

}

.frame-one{

    animation:

        frameFloat

        4s

        ease-in-out

        infinite;

}

.frame-two{

    animation:

        frameFloat

        5s

        ease-in-out

        infinite;

}

.frame-three{

    animation:

        frameFloat

        6s

        ease-in-out

        infinite;

}

  /* =====================================================
      CENTER V2 - PART 2.8R
      INNER GLASS SHINE
===================================================== */

.glass-shine{

    position:absolute;

    inset:0;

    overflow:hidden;

    border-radius:2px;

    pointer-events:none;

}

.glass-shine::before{

    content:"";

    position:absolute;

    top:-40px;

    left:-80px;

    width:30px;

    height:180px;

    background:linear-gradient(

        transparent,

        rgba(255,255,255,.18),

        rgba(255,255,255,.45),

        rgba(255,255,255,.18),

        transparent

    );

    transform:rotate(35deg);

    filter:blur(3px);

    animation:glassSweep 5s linear infinite;

}

@keyframes glassSweep{

    0%{

        transform:
            translateX(-80px)
            rotate(35deg);

        opacity:0;

    }

    20%{

        opacity:.8;

    }

    100%{

        transform:
            translateX(180px)
            rotate(35deg);

        opacity:0;

    }

}

  /* =====================================================
      RIGHT PANEL - PART 3.2
===================================================== */

.workflow-list{

    position:relative;

    display:flex;

    flex-direction:column;

    padding:18px;

    gap:10px;

}

/* --------------------------- */

.workflow-item{

    display:grid;

    grid-template-columns:

42px
46px
1fr;

    align-items:center;

    height:58px;

    border-radius:14px;

    border:1px solid rgba(255,255,255,.05);

    background:rgba(255,255,255,.02);

    transition:.35s;

}

/* --------------------------- */

.workflow-number{

    text-align:center;

    font-size:12px;

    color:rgba(255,255,255,.45);

    font-family:monospace;

}

/* --------------------------- */

.workflow-icon{

    width:30px;

    height:30px;

    display:flex;

    align-items:center;

    justify-content:center;

    border-radius:50%;

    border:1px solid rgba(255,255,255,.08);

    color:#cfcfcf;

    background:rgba(255,255,255,.03);

}

/* --------------------------- */

.workflow-title{

    font-size:12px;

    letter-spacing:.18em;

    font-weight:600;

    color:#ececec;
    
    white-space:nowrap;

    overflow:visible;
}

  /* =====================================================
      RIGHT PANEL - PART 3.3
===================================================== */

.workflow-item{

    cursor:pointer;

    position:relative;

    overflow:hidden;

    transition:

        transform .35s ease,

        border-color .35s ease,

        background .35s ease,

        box-shadow .35s ease;

}

/* ----------------------------- */

.workflow-item:hover{

    transform:translateX(8px);

    border-color:rgba(160,110,255,.35);

    background:rgba(255,255,255,.045);

    box-shadow:

        0 0 25px rgba(130,90,255,.12);

}

/* ----------------------------- */

.workflow-item.active{

    background:

        linear-gradient(

            90deg,

            rgba(120,80,255,.18),

            rgba(255,255,255,.03)

        );

    border-color:

        rgba(170,120,255,.45);

}

/* ----------------------------- */

.workflow-item.active::before{

    content:"";

    position:absolute;

    left:0;

    top:10px;

    bottom:10px;

    width:3px;

    border-radius:20px;

    background:#9c73ff;

    box-shadow:

        0 0 18px #9c73ff;

}

/* ----------------------------- */

.workflow-item:hover .workflow-icon{

    transform:rotate(12deg) scale(1.08);

    color:#ffffff;

    border-color:

        rgba(170,120,255,.35);

}

/* ----------------------------- */

.workflow-icon{

    transition:

        .35s;

}

/* ----------------------------- */

.workflow-title{

    transition:

        color .35s;

}

/* ----------------------------- */

.workflow-item:hover .workflow-title{

    color:#ffffff;

}

/* ----------------------------- */

.workflow-number{

    transition:

        color .35s;

}

.workflow-item:hover .workflow-number{

    color:#9c73ff;

}

  /* =====================================================
      RIGHT PANEL CONTAINER
===================================================== */

.workflow-panel{

    width:340px;

    padding:16px;

    border-radius:22px;

    border:1px solid rgba(255,255,255,.08);

    background:rgba(255,255,255,.03);

    backdrop-filter:blur(16px);

    box-shadow:
        inset 0 1px rgba(255,255,255,.05),
        0 0 35px rgba(130,90,255,.08);

}

  /* =====================================================
        SECTION 02 - PART 5.1
===================================================== */

.ai-stat-card{

    position:relative;

    height:420px;

    border-radius:24px;

    border:1px solid rgba(255,255,255,.08);

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.05),

            rgba(255,255,255,.015)

        );

    overflow:hidden;

}

  /* =====================================================
        SECTION 02 - PART 5.2
===================================================== */

.ai-stat-card{

    padding:34px;

    display:flex;

    flex-direction:column;

}

.stat-icon{

    display:flex;

    align-items:center;

    margin-bottom:28px;

}

.stat-number{

    margin-top:0px;

    font-size:78px;

    line-height:1;

    font-weight:300;

    letter-spacing:-4px;

    color:white;

}

.stat-number span{

    font-size:42px;

    font-weight:200;

    color:#d8d8d8;

}

.stat-heading{

    margin-top:16px;

    font-size:15px;

    letter-spacing:.12em;

    font-weight:700;

    color:white;

    text-transform:uppercase;

}

.stat-description{

    margin-top:14px;

    font-size:15px;

    line-height:1.9;

    color:#9ca3af;

    max-width:220px;

}

  /* =====================================================
        SECTION 02 - PART 5.3
===================================================== */

.ai-stat-card{

    position:relative;

    overflow:hidden;

}

/* ---------------------------- */

.card-bottom-glow{

    position:absolute;

    left:-12%;

    bottom:-55px;

    width:125%;

    height:130px;

    border-radius:50%;

    background:

        radial-gradient(

            ellipse at center,

            rgba(132,96,255,.55) 0%,

            rgba(132,96,255,.22) 28%,

            rgba(132,96,255,.06) 58%,

            transparent 75%

        );

    filter:blur(20px);

    opacity:.75;

}

/* ---------------------------- */

.card-light-line{

    position:absolute;

    left:-8%;

    bottom:28px;

    width:116%;

    height:58px;

    border-top:

        2px solid rgba(255,255,255,.32);

    border-radius:50%;

    opacity:.7;

    filter:blur(.4px);

}

/* ---------------------------- */

.ai-stat-card::before{

    content:"";

    position:absolute;

    inset:0;

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.05),

            transparent 26%

        );

    pointer-events:none;

}

/* ---------------------------- */

.ai-stat-card::after{

    content:"";

    position:absolute;

    inset:1px;

    border-radius:23px;

    border:1px solid rgba(255,255,255,.03);

    pointer-events:none;

}

  .ai-stat-card:nth-child(1) .card-bottom-glow{

    background:

    radial-gradient(

        ellipse,

        rgba(190,190,255,.40),

        rgba(120,170,255,.18),

        transparent 72%

    );

}

  .ai-stat-card:nth-child(2) .card-bottom-glow{

    background:

    radial-gradient(

        ellipse,

        rgba(175,110,255,.48),

        rgba(120,70,255,.20),

        transparent 72%

    );

}

  .ai-stat-card:nth-child(3) .card-bottom-glow{

    background:

    radial-gradient(

        ellipse,

        rgba(70,180,255,.40),

        rgba(70,120,255,.18),

        transparent 72%

    );

}

  /* =====================================================
        SECTION 02 - PART 5.4
===================================================== */

.stat-icon-circle{

    width:48px;

    height:48px;

    border-radius:14px;

    display:flex;

    align-items:center;

    justify-content:center;

    color:#ffffff;

    border:1px solid rgba(255,255,255,.08);

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.06),

            rgba(255,255,255,.02)

        );

    backdrop-filter:blur(12px);

    box-shadow:

        inset 0 1px rgba(255,255,255,.05),

        0 0 18px rgba(140,90,255,.08);

}

  /* =====================================================
        SECTION 02 - PART 5.5
===================================================== */

.stat-icon,
.stat-number,
.stat-heading,
.stat-description{

    position:relative;

    z-index:5;

}

.card-bottom-glow{

    z-index:0;

}

.card-light-line{

    z-index:1;

}

.ai-stat-card::before{

    z-index:2;

}

.ai-stat-card::after{

    z-index:3;

}

  /* =====================================================
      SECTION 02 - PART 5.6
===================================================== */

.ai-stat-card{

    transition:
        transform .45s ease,
        border-color .45s ease,
        box-shadow .45s ease;

}

.ai-stat-card:hover{

    transform:translateY(-8px);

    border-color:rgba(160,120,255,.22);

    box-shadow:
        0 20px 50px rgba(0,0,0,.35),
        0 0 40px rgba(130,90,255,.08);

}

.stat-icon-circle{

    transition:
        transform .35s ease,
        border-color .35s ease,
        box-shadow .35s ease;

}

.ai-stat-card:hover .stat-icon-circle{

    transform:scale(1.08);

    border-color:rgba(170,120,255,.30);

    box-shadow:
        0 0 24px rgba(140,90,255,.18);

}

.stat-number{

    transition:color .35s ease;

}

.ai-stat-card:hover .stat-number{

    color:#ffffff;

}

  /* =====================================================
      SECTION 02 - PART 5.7
===================================================== */

.card-reflection{

    position:absolute;

    inset:0;

    overflow:hidden;

    pointer-events:none;

    z-index:4;

    border-radius:24px;

}

.card-reflection::before{

    content:"";

    position:absolute;

    top:-60px;

    left:-140px;

    width:60px;

    height:520px;

    background:

        linear-gradient(

            transparent,

            rgba(255,255,255,.04),

            rgba(255,255,255,.18),

            rgba(255,255,255,.04),

            transparent

        );

    transform:rotate(28deg);

    filter:blur(2px);

    animation:cardReflection 7s linear infinite;

}

@keyframes cardReflection{

    0%{

        transform:
            translateX(-120px)
            rotate(28deg);

        opacity:0;

    }

    15%{

        opacity:.6;

    }

    100%{

        transform:
            translateX(420px)
            rotate(28deg);

        opacity:0;

    }

}

  .ai-stat-card:hover .card-bottom-glow{

    opacity:1;

    filter:blur(26px);

}

  /* =====================================================
      SECTION 02 - PART 5.8
===================================================== */

/* Card Border Glow */

.ai-stat-card{

    isolation:isolate;

}

.ai-stat-card::before{

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,.08),
            transparent 18%
        );

}

/* ----------------------- */
/* Number */

.stat-number{

    text-shadow:

        0 0 18px rgba(255,255,255,.05);

}

/* ----------------------- */
/* Heading */

.stat-heading{

    color:#f3f3f3;

    letter-spacing:.15em;

}

/* ----------------------- */
/* Description */

.stat-description{

    color:#8b8b8b;

}

/* ----------------------- */
/* Icon */

.stat-icon-circle svg{

    width:18px;

    height:18px;

}

/* ----------------------- */

.ai-stat-card:hover .stat-icon-circle svg{

    transform:scale(1.08);

    transition:.35s;

}

/* ----------------------- */

.ai-stat-card:hover .card-light-line{

    opacity:1;

}

/* ----------------------- */

.ai-stat-card:hover{

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.07),

            rgba(255,255,255,.02)

        );

}

  /* =====================================================
        SECTION 03 - PART 6.1
===================================================== */

.timeline-wrapper{

    position:relative;

}

.timeline-line{

    position:absolute;

    left:4%;

    right:4%;

    top:22px;

    height:1px;

    background:rgba(255,255,255,.14);

}

.timeline-grid{

    display:grid;

    grid-template-columns:repeat(7,1fr);

    gap:24px;

    position:relative;

    z-index:2;

}

.timeline-step{

    display:flex;

    justify-content:flex-start;

}

.timeline-circle{

    width:46px;

    height:46px;

    border-radius:50%;

    border:1px solid rgba(255,255,255,.22);

    background:#090909;

    color:#ffffff;

    font-size:14px;

    display:flex;

    align-items:center;

    justify-content:center;

    font-weight:600;

    box-shadow:

        inset 0 0 0 1px rgba(255,255,255,.03);

}

  /* =====================================================
        SECTION 03 - PART 6.2
===================================================== */

.timeline-step{

    display:flex;

    flex-direction:column;

    align-items:flex-start;

    position:relative;

}

.timeline-arrow{

    position:absolute;

    top:14px;

    right:-18px;

    color:rgba(255,255,255,.55);

    font-size:22px;

    font-weight:200;

}

.timeline-title{

    margin-top:18px;

    color:#ffffff;

    font-size:15px;

    line-height:1.45;

    text-transform:uppercase;

    letter-spacing:.05em;

    font-weight:600;

}

  /* =====================================================
        SECTION 03 - PART 6.3
===================================================== */

.timeline-icon{

    margin-top:18px;

    width:42px;

    height:42px;

    display:flex;

    align-items:center;

    justify-content:center;

    border-radius:12px;

    border:1px solid rgba(255,255,255,.08);

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.04),

            rgba(255,255,255,.015)

        );

    color:#ffffff;

}

.timeline-description{

    margin-top:18px;

    max-width:170px;

    color:#8e8e8e;

    font-size:14px;

    line-height:1.8;

}

  /* =====================================================
        SECTION 03 - PART 6.4
===================================================== */

.timeline-icon-group{

    display:flex;

    align-items:center;

    gap:10px;

    margin-top:18px;

}

.timeline-mini-icon{

    width:34px;

    height:34px;

    border-radius:10px;

    display:flex;

    align-items:center;

    justify-content:center;

    border:1px solid rgba(255,255,255,.08);

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,.04),
            rgba(255,255,255,.015)
        );

    color:#ffffff;

}

.timeline-mini-badge{

    width:34px;

    height:34px;

    border-radius:50%;

    display:flex;

    align-items:center;

    justify-content:center;

    border:1px solid rgba(255,255,255,.12);

    background:rgba(255,255,255,.03);

    color:#ffffff;

    font-size:12px;

    font-weight:700;

    letter-spacing:.08em;

}

  /* =====================================================
        SECTION 03 - PART 6.5
===================================================== */

.timeline-step{

    transition:
        transform .35s ease;

}

.timeline-step:hover{

    transform:translateY(-8px);

}

/* ------------------------------ */

.timeline-circle{

    transition:
        all .35s ease;

}

/* ------------------------------ */

.timeline-step:hover .timeline-circle{

    border-color:rgba(170,120,255,.45);

    box-shadow:

        0 0 18px rgba(130,90,255,.20),

        inset 0 0 12px rgba(130,90,255,.12);

}

/* ------------------------------ */

.timeline-title{

    transition:
        color .35s ease;

}

.timeline-step:hover .timeline-title{

    color:#ffffff;

}

/* ------------------------------ */

.timeline-description{

    transition:
        color .35s ease;

}

.timeline-step:hover .timeline-description{

    color:#c9c9c9;

}

/* ------------------------------ */

.timeline-mini-icon,
.timeline-mini-badge,
.timeline-icon{

    transition:
        transform .35s ease,
        border-color .35s ease,
        box-shadow .35s ease;

}

.timeline-step:hover .timeline-mini-icon,
.timeline-step:hover .timeline-mini-badge,
.timeline-step:hover .timeline-icon{

    transform:translateY(-2px);

    border-color:rgba(170,120,255,.30);

    box-shadow:

        0 0 18px rgba(130,90,255,.12);

}

/* ------------------------------ */

.timeline-step:hover .timeline-arrow{

    color:#9c73ff;

}

  /* =====================================================
        SECTION 03 - PART 6.6
===================================================== */

/* Timeline Line */

.timeline-line{

    background:
        linear-gradient(

            90deg,

            rgba(255,255,255,.08),

            rgba(140,90,255,.22),

            rgba(255,255,255,.08)

        );

    height:2px;

    box-shadow:

        0 0 18px rgba(140,90,255,.08);

}

/* -------------------------- */

.timeline-circle{

    background:

        linear-gradient(

            180deg,

            rgba(18,18,18,1),

            rgba(8,8,8,1)

        );

}

/* -------------------------- */

.timeline-title{

    min-height:48px;

}

/* -------------------------- */

.timeline-description{

    min-height:92px;

}

/* -------------------------- */

.timeline-mini-icon,

.timeline-mini-badge,

.timeline-icon{

    backdrop-filter:blur(10px);

}

/* -------------------------- */

.timeline-grid{

    align-items:flex-start;

}

/* -------------------------- */

.timeline-step{

    padding-right:18px;

}

/* -------------------------- */

.timeline-step:last-child{

    padding-right:0;

}

/* -------------------------- */

.timeline-wrapper{

    overflow:hidden;

}

      `}</style>

      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="text-2xl font-bold">
            {hero?.name || "Gokul Grover"}
          </a>

          <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wide text-white/80">  

  <a href="/#about">About</a>

  <a href="/#experience">Experience</a>

  <a href="/#services">Services</a>

  <a href="/#portfolio">Portfolio</a>

  <a href="/#contact">Contact</a>

  <a
    href="/ai"
    className="bg-[#F2D14B] text-black px-5 py-2 rounded-md font-black text-xs tracking-[0.18em] uppercase hover:bg-[#ffe45a] transition-all duration-300"
  >
    AI SECTION
  </a>

</nav>

        <div className="flex items-center gap-6">
          <a
  href="/#contact"
  className="bg-white text-black px-5 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base"
>
            Let’s Talk
          </a>
          </div>
        </div>
      </header>
  
{/* ===========================
      HERO SECTION (PART 1.0)
=========================== */}

<section className="relative w-full border-t border-white/10 border-b border-white/10 bg-black overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[180px]" />

    <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[180px]" />

    <div className="absolute -right-40 bottom-20 h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-[180px]" />
  </div>

  <div className="relative max-w-[1600px] mx-auto px-8 xl:px-14">

    {/* Top Label */}
    <div className="flex items-center gap-8 pt-10 pb-8">

      <span className="text-white text-lg font-light">
        01
      </span>

      <div className="h-px flex-1 bg-white/10" />

      <span className="text-[11px] tracking-[5px] uppercase text-zinc-500">
        AI-Augmented Creative Workflow
      </span>

    </div>

    {/* Main Layout */}
    <div className="grid grid-cols-12 gap-10 items-center h-[700px]">

      {/* LEFT */}
      <div className="col-span-4 flex flex-col justify-center">

  {/* Small Label */}
 <div className="flex items-center gap-6 pt-8 pb-6">

  <span className="text-[15px] font-medium text-white/90">
    01
  </span>

  <span className="text-[11px] uppercase tracking-[4px] text-zinc-500">
    AI-Augmented Creative Workflow
  </span>

</div>

  {/* Heading */}
  <h1
    className="
      text-white
      font-black
      uppercase
      leading-[0.9]
      tracking-[-3px]
      xl:text-[58px]
    "
  >
    AI-AUGMENTED
    <br />
    CREATIVE
    <br />
    WORKFLOW.
  </h1>

  {/* Description */}
  <p
    className="
      mt-8
      max-w-[430px]
      text-[15px]
      leading-8
      text-zinc-400
    "
  >
    I integrate artificial intelligence into every stage of my creative
    process to accelerate ideation, expand possibilities, and deliver
    production-grade results without compromising creative direction.
  </p>

  {/* Button */}
  <button
  className="
    group
    mt-10
    inline-flex
    w-fit
    items-center
    gap-5
    rounded-full
    border
    border-white/15
    px-5
    py-2.5
    transition-all
    duration-300
    hover:border-white/30
  "
>
  <span
    className="
      text-[11px]
      uppercase
      tracking-[2.5px]
      font-medium
      text-white
      whitespace-nowrap
    "
  >
    Explore The Process
  </span>

  <div
    className="
      flex
      h-8
      w-8
      items-center
      justify-center
      rounded-full
      border
      border-white/15
      transition-all
      duration-300
      group-hover:translate-x-1
      group-hover:border-white/40
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3.5 h-3.5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 5l7 7-7 7"
      />
    </svg>
  </div>
</button>

</div>

      {/* ===========================
      CENTER V2 - PART 2.1
=========================== */}

<div className="col-span-5 flex items-center justify-center">

  <div
  ref={cubeSceneRef}
  className="cube-scene"
>

    <div className="cube-stage">

      {/* OUTER FRAME */}
      <div className="frame-cube">

  <div className="cube-face front"></div>
  <div className="cube-face back"></div>

  <div className="cube-edge edge-top"></div>
  <div className="cube-edge edge-bottom"></div>
  <div className="cube-edge edge-left"></div>
  <div className="cube-edge edge-right"></div>

   <div className="inner-glass-cube">

    <div className="inner-face front"></div>
    <div className="inner-face back"></div>
    <div className="energy-core"></div>
    <div className="energy-glow"></div>
    <div className="energy-beam vertical"></div>
    <div className="energy-beam horizontal"></div>
    <div className="glass-shine"></div>

  </div>

  <div className="glass-frame frame-one"></div>

<div className="glass-frame frame-two"></div>

<div className="glass-frame frame-three"></div>


</div>

    </div>

  </div>

</div>

      {/* RIGHT */}
       <div className="col-span-3 flex justify-end items-center">

    <div className="workflow-panel">

    <div className="workflow-list">

    <div className="workflow-item active">

        <div className="workflow-number">01</div>

        <div className="workflow-icon">

            <Search size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            RESEARCH

        </div>

    </div>

    <div className="workflow-item">

        <div className="workflow-number">02</div>

        <div className="workflow-icon">

            <Target size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            STRATEGY

        </div>

    </div>

    <div className="workflow-item">

        <div className="workflow-number">03</div>

        <div className="workflow-icon">

            <Lightbulb size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            CONCEPT

        </div>

    </div>

    <div className="workflow-item">

        <div className="workflow-number">04</div>

        <div className="workflow-icon">

            <Image size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            VISUAL

        </div>

    </div>

    <div className="workflow-item">

        <div className="workflow-number">05</div>

        <div className="workflow-icon">

            <Play size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            MOTION

        </div>

    </div>

    <div className="workflow-item">

        <div className="workflow-number">06</div>

        <div className="workflow-icon">

            <Send size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            DELIVERY

        </div>

    </div>

  </div>

</div>

</div>

    </div>

  </div>

</section>

{/* =====================================================
        SECTION 02 - PART 5.1
===================================================== */}

<section className="relative border-b border-white/10 bg-black">

  <div className="max-w-[1600px] mx-auto px-8 xl:px-14 py-24">

    <div className="grid grid-cols-12 gap-12 items-start">

      {/* ================= LEFT ================= */}

      <div className="col-span-3">

        <div className="flex items-center gap-6 mb-10">

          <span className="text-white text-lg font-light">
            02
          </span>

          <div className="h-px flex-1 bg-white/10"></div>

        </div>

        <h2
          className="
            text-white
            uppercase
            font-black
            leading-[0.9]
            tracking-[-2px]
            text-[50px]
          "
        >
          I DON'T
          <br />

          USE AI
          <br />

          TO CREATE.
          <br />
          <br />

          I USE AI
          <br />

          TO EXPLORE
          <br />

          MORE.
        </h2>

      </div>

      {/* ================= RIGHT ================= */}

      <div className="col-span-9">

        <div className="grid grid-cols-3 gap-8">

  {/* CARD 01 */}

  <div className="ai-stat-card">

    <div className="stat-icon">

    <div className="stat-icon-circle">

        <Search size={18} strokeWidth={2}/>

    </div>

</div>

    <div className="stat-number">
      10<span>×</span>
    </div>

    <h3 className="stat-heading">
      MORE CONCEPTS
    </h3>

    <p className="stat-description">
      Generate a wider range of ideas and creative directions in a fraction of the time.
    </p>
    
    <div className="card-bottom-glow"></div>

    <div className="card-light-line"></div>

    <div className="card-reflection"></div>    

  </div>

  {/* CARD 02 */}

  <div className="ai-stat-card">

    <div className="stat-icon">

    <div className="stat-icon-circle">

        <Target size={18} strokeWidth={2}/>

    </div>

</div>

    <div className="stat-number">
      7<span>×</span>
    </div>

    <h3 className="stat-heading">
      FASTER ITERATIONS
    </h3>

    <p className="stat-description">
      Rapid experimentation helps refine ideas faster and reach better creative outcomes.
    </p>

    <div className="card-bottom-glow"></div>

    <div className="card-light-line"></div>

    <div className="card-reflection"></div>

  </div>

  {/* CARD 03 */}

  <div className="ai-stat-card">

    <div className="stat-icon">

    <div className="stat-icon-circle">

        <Lightbulb size={18} strokeWidth={2}/>

    </div>

</div>

    <div className="stat-number">
      70<span>%</span>
    </div>

    <h3 className="stat-heading">
      TIME REDUCTION
    </h3>

    <p className="stat-description">
      Automating repetitive tasks gives more time for creative thinking and decisions.
    </p>

    <div className="card-bottom-glow"></div>

    <div className="card-light-line"></div>

    <div className="card-reflection"></div>

  </div>

</div>

      </div>

    </div>

  </div>

</section>

{/* =====================================================
        SECTION 03 - PART 6.1
===================================================== */}

<section className="relative border-b border-white/10 bg-black">

    <div className="max-w-[1600px] mx-auto px-8 xl:px-14 py-20">

        {/* Heading */}

        <div className="flex items-center gap-6 mb-16">

            <span className="text-white text-lg font-light">
                03
            </span>

            <p
                className="
                    uppercase
                    tracking-[0.35em]
                    text-[13px]
                    text-[#9CA3AF]
                "
            >
                MY AI OPERATING SYSTEM.
            </p>

        </div>

        {/* Timeline */}

        <div className="timeline-wrapper">

            <div className="timeline-line"></div>

            <div className="timeline-grid">

                <div className="timeline-step">

    <div className="timeline-circle">
        01
    </div>

    <div className="timeline-arrow">
        →
    </div>

    <h4 className="timeline-title">
        CLIENT
        <br />
        BRIEF
    </h4>

    <div className="timeline-icon">
    <FileText size={20} strokeWidth={1.8}/>
</div>

<p className="timeline-description">
    Understanding goals, target audience and project requirements.
</p>

</div>

                <div className="timeline-step">

    <div className="timeline-circle">
        02
    </div>

    <div className="timeline-arrow">
        →
    </div>

    <h4 className="timeline-title">
        RESEARCH
        <br />
        & STRATEGY
    </h4>

    <div className="timeline-icon-group">

    <div className="timeline-mini-icon">
        <Search size={16}/>
    </div>

    <div className="timeline-mini-badge">
        AI
    </div>

</div>

<p className="timeline-description">
    Market research, competitor analysis and strategy planning.
</p>

</div>
                <div className="timeline-step">

    <div className="timeline-circle">
        03
    </div>

    <div className="timeline-arrow">
        →
    </div>

    <h4 className="timeline-title">
        CONCEPT
        <br />
        DEVELOPMENT
    </h4>

    <div className="timeline-icon-group">

    <div className="timeline-mini-icon">
        <Lightbulb size={16}/>
    </div>

    <div className="timeline-mini-badge">
        ✦
    </div>

</div>

<p className="timeline-description">
    Prompt engineering and multiple concept exploration.
</p>

</div>

                <div className="timeline-step">

    <div className="timeline-circle">
        04
    </div>

    <div className="timeline-arrow">
        →
    </div>

    <h4 className="timeline-title">
        VISUAL
        <br />
        PRODUCTION
    </h4>

    <div className="timeline-icon-group">

    <div className="timeline-mini-icon">
        <Image size={16}/>
    </div>

    <div className="timeline-mini-badge">
        PS
    </div>

</div>

<p className="timeline-description">
    AI image generation, editing and visual refinement.
</p>

</div>

                <div className="timeline-step">

    <div className="timeline-circle">
        05
    </div>

    <div className="timeline-arrow">
        →
    </div>

    <h4 className="timeline-title">
        VIDEO
        <br />
        PRODUCTION
    </h4>

    <div className="timeline-icon-group">

    <div className="timeline-mini-badge">
        K
    </div>

    <div className="timeline-mini-badge">
        V
    </div>

    <div className="timeline-mini-badge">
        R
    </div>

</div>

<p className="timeline-description">
    Motion graphics and cinematic video production.
</p>

</div>

                <div className="timeline-step">

    <div className="timeline-circle">
        06
    </div>

    <div className="timeline-arrow">
        →
    </div>

    <h4 className="timeline-title">
        HUMAN
        <br />
        REFINEMENT
    </h4>

    <div className="timeline-icon">
    <User size={20} strokeWidth={1.8}/>
</div>

<p className="timeline-description">
    Manual review, quality control and creative refinement.
</p>

</div>

                <div className="timeline-step">

    <div className="timeline-circle">
        07
    </div>

    <h4 className="timeline-title">
        FINAL
        <br />
        DELIVERY
    </h4>

    <div className="timeline-icon">
    <Send size={20} strokeWidth={1.8}/>
</div>

<p className="timeline-description">
    Final export, optimization and delivery.
</p>

</div>

            </div>

        </div>

    </div>

</section>

    </main>
  )
}