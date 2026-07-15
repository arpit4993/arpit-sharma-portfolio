"use client"

import { Package, ArrowRight } from "lucide-react";

import { Car } from "lucide-react";

import { PlayCircle } from "lucide-react";

import { Crosshair } from "lucide-react";

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

    width:100%;

    max-width:340px;

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

    padding:28px;

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

  /* =====================================================
      SECTION 04+05 V2 - PART 1.1
===================================================== */

.section45-heading{

    margin-top:18px;

    font-size:60px;

    font-weight:900;

    line-height:.9;

    letter-spacing:-2px;

    text-transform:uppercase;

    color:#fff;

}

.section45-description{

    margin-top:28px;

    max-width:360px;

    color:#8f8f8f;

    font-size:15px;

    line-height:1.9;

}

.comparison-wrapper{

    margin-top:48px;

    height:420px;

    border-radius:28px;

    border:1px dashed rgba(255,255,255,.08);

}

.stack-card{

    margin-top:70px;

    height:420px;

    border-radius:28px;

    border:1px dashed rgba(255,255,255,.08);

    display:flex;

    align-items:center;

    justify-content:center;

}

  /* =====================================================
      SECTION 04+05 V2 - PART 1.2 UPDATED
===================================================== */

.comparison-wrapper{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:28px;

    align-items:center;

    margin-top:70px;

}

.compare-column{

    display:flex;

    flex-direction:column;

}

.compare-title{

    padding-bottom:18px;

    margin-bottom:10px;

    border-bottom:1px solid rgba(255,255,255,.08);

    font-size:13px;

    letter-spacing:.18em;

    color:#8c8c8c;

}

.ai-title{

    color:#b79dff;

}

.compare-row{

    display:flex;

    align-items:center;

    gap:18px;

    padding:22px 0;

    border-bottom:1px solid rgba(255,255,255,.05);

}

.compare-row span{

    width:80px;

    font-size:46px;

    line-height:1;

    font-weight:300;

    color:#ffffff;

}

.compare-row p{

    font-size:16px;

    color:#d8d8d8;

}

  /* =====================================================
      SECTION 04+05 V2 - PART 1.4
===================================================== */

.comparison-wrapper{

    position:relative;

    grid-template-columns:

        1fr

        72px

        1fr;

    align-items:start;

}

/* ---------------------------- */

.compare-column{

    position:relative;

    padding:34px;

    border-radius:26px;

    border:1px solid rgba(255,255,255,.08);

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.045),

            rgba(255,255,255,.015)

        );

    backdrop-filter:blur(18px);

    overflow:hidden;

}

/* ---------------------------- */

.compare-column::before{

    content:"";

    position:absolute;

    inset:0;

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.05),

            transparent 22%

        );

    pointer-events:none;

}

/* ---------------------------- */

.ai-column{

    border-color:

        rgba(150,110,255,.18);

}

/* ---------------------------- */

.compare-center-divider{

    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;

    height:100%;

}

/* ---------------------------- */

.compare-divider-line{

    flex:1;

    width:1px;

    background:

        linear-gradient(

            transparent,

            rgba(255,255,255,.10),

            transparent

        );

}

/* ---------------------------- */

.compare-divider-circle{

    width:68px;

    height:68px;

    border-radius:50%;

    display:flex;

    align-items:center;

    justify-content:center;

    margin:18px 0;

    font-size:12px;

    letter-spacing:.22em;

    color:#ffffff;

    border:1px solid rgba(255,255,255,.10);

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.05),

            rgba(255,255,255,.015)

        );

    backdrop-filter:blur(14px);

}

  /* =====================================================
      SECTION 04+05 V2 - PART 1.5
===================================================== */

.compare-column{

    transition:
        transform .45s ease,
        border-color .45s ease,
        box-shadow .45s ease;

}

/* -------------------------------- */

.compare-column:hover{

    transform:translateY(-8px);

    box-shadow:
        0 20px 45px rgba(0,0,0,.35);

}

/* -------------------------------- */

.compare-bottom-glow{

    position:absolute;

    left:-8%;

    bottom:-55px;

    width:116%;

    height:120px;

    border-radius:50%;

    filter:blur(24px);

    opacity:.85;

    pointer-events:none;

}

/* ---------- Left Card ---------- */

.compare-old-glow{

    background:

        radial-gradient(

            ellipse,

            rgba(255,255,255,.22),

            rgba(160,160,255,.10),

            transparent 72%

        );

}

/* ---------- Right Card ---------- */

.compare-ai-glow{

    background:

        radial-gradient(

            ellipse,

            rgba(145,100,255,.48),

            rgba(120,70,255,.18),

            transparent 72%

        );

}

/* -------------------------------- */

.compare-reflection{

    position:absolute;

    inset:0;

    overflow:hidden;

    pointer-events:none;

    border-radius:26px;

}

.compare-reflection::before{

    content:"";

    position:absolute;

    top:-70px;

    left:-150px;

    width:58px;

    height:420px;

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

    animation:compareReflection 7s linear infinite;

}

@keyframes compareReflection{

    0%{

        transform:
            translateX(-140px)
            rotate(28deg);

        opacity:0;

    }

    18%{

        opacity:.65;

    }

    100%{

        transform:
            translateX(420px)
            rotate(28deg);

        opacity:0;

    }

}

/* -------------------------------- */

.compare-column:hover .compare-title{

    color:#ffffff;

}

.ai-column:hover .ai-title{

    color:#e0d3ff;

}

/* -------------------------------- */

.compare-column:hover .compare-row span{

    color:#ffffff;

}

.ai-column:hover{

    border-color:

        rgba(160,120,255,.30);

}

  /* =====================================================
      SECTION 04+05 V2 - PART 1.6
===================================================== */

/* ---------- Better Row Spacing ---------- */

.compare-row{

    min-height:72px;

    transition:

        background .35s ease,

        padding-left .35s ease,

        border-color .35s ease;

}

/* ---------- Hover ---------- */

.compare-column:hover .compare-row{

    border-color:

        rgba(255,255,255,.08);

}

.compare-row:hover{

    padding-left:10px;

    background:

        rgba(255,255,255,.025);

}

/* ---------- Numbers ---------- */

.compare-row span{

    font-size:34px;

    font-weight:200;

    letter-spacing:-2px;

    transition:

        transform .35s ease,

        color .35s ease,

        text-shadow .35s ease;

}

.compare-row:hover span{

    transform:scale(1.05);

}

/* ---------- AI Numbers ---------- */

.ai-column .compare-row span{

    color:#ffffff;

    text-shadow:

        0 0 14px rgba(140,90,255,.08);

}

.ai-column .compare-row:hover span{

    color:#d7c5ff;

    text-shadow:

        0 0 24px rgba(140,90,255,.25);

}

/* ---------- Text ---------- */

.compare-row p{

    transition:

        color .35s ease,

        transform .35s ease;

}

.compare-row:hover p{

    color:#ffffff;

    transform:translateX(3px);

}

/* ---------- Heading ---------- */

.compare-title{

    font-weight:600;

}

.ai-title{

    letter-spacing:.20em;

}

/* ---------- Card Polish ---------- */

.compare-column{

    isolation:isolate;

}

.compare-column::after{

    content:"";

    position:absolute;

    inset:1px;

    border-radius:25px;

    border:1px solid rgba(255,255,255,.025);

    pointer-events:none;

}

/* ---------- Divider ---------- */

.compare-divider-circle{

    transition:

        transform .35s ease,

        border-color .35s ease,

        box-shadow .35s ease;

}

.compare-divider-circle:hover{

    transform:scale(1.08);

    border-color:

        rgba(160,120,255,.28);

    box-shadow:

        0 0 20px rgba(140,90,255,.16);

}

  /* =====================================================
      SECTION 04+05 V2 - PART 1.7
===================================================== */

/* ---------- PREMIUM GLASS SHINE ---------- */

.compare-column{

    overflow:hidden;

}

.compare-column::before{

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.06),

            rgba(255,255,255,.015) 18%,

            transparent 45%

        );

}

/* ---------- ENERGY WAVE ---------- */

.compare-bottom-glow{

    transition:

        opacity .45s ease,

        filter .45s ease,

        transform .45s ease;

}

.compare-column:hover .compare-bottom-glow{

    opacity:1;

    filter:blur(30px);

    transform:scale(1.05);

}

/* ---------- BORDER GLOW ---------- */

.compare-column:hover{

    border-color:rgba(170,120,255,.18);

    box-shadow:

        0 24px 55px rgba(0,0,0,.38),

        0 0 35px rgba(140,90,255,.08);

}

/* ---------- TITLE ---------- */

.compare-title{

    transition:

        color .35s ease,

        letter-spacing .35s ease;

}

.compare-column:hover .compare-title{

    letter-spacing:.22em;

}

/* ---------- ROW DIVIDER ---------- */

.compare-row{

    position:relative;

}

.compare-row::after{

    content:"";

    position:absolute;

    left:0;

    bottom:-1px;

    width:0;

    height:1px;

    background:

        linear-gradient(

            90deg,

            rgba(145,100,255,.65),

            transparent

        );

    transition:width .35s ease;

}

.compare-row:hover::after{

    width:100%;

}

/* ---------- VS ---------- */

.compare-divider-circle{

    background:

        radial-gradient(

            circle,

            rgba(255,255,255,.08),

            rgba(255,255,255,.02)

        );

}

.compare-divider-circle::before{

    content:"";

    position:absolute;

    inset:-10px;

    border-radius:50%;

    border:1px solid rgba(145,100,255,.08);

    opacity:0;

    transition:.35s;

}

.compare-divider-circle:hover::before{

    inset:-4px;

    opacity:1;

}

/* ---------- REFLECTION ---------- */

.compare-reflection{

    opacity:.75;

}

.compare-column:hover .compare-reflection{

    opacity:1;

}

/* ---------- PERFORMANCE ---------- */

.compare-column,
.compare-reflection,
.compare-bottom-glow{

    will-change:

        transform,

        opacity;

}

/* =====================================================
      SECTION 04+05 V2 - PART 1.8
===================================================== */

/* ---------- COLUMN SIZE ---------- */

.compare-column{

    min-height:390px;

    padding:24px;

}

/* ---------- TITLE ---------- */

.compare-title{

    display:flex;

    align-items:center;

    justify-content:space-between;

    margin-bottom:14px;

    padding-bottom:14px;

    font-size:12px;

    letter-spacing:.20em;

}

/* ---------- ROW ---------- */

.compare-row{

    align-items:left;

    padding:14px 0;

    min-height:60px;

    gap:14px;

}

.compare-row:last-child{

    border-bottom:none;

}

/* ---------- NUMBER ---------- */

.compare-row span{

    flex-shrink:0;

    width:64px;

    font-size:30px;

    text-align:left;

    font-weight:300;

}

/* ---------- TEXT ---------- */

.compare-row p{

    flex:1;

    margin:0;

    line-height:1.35;

    font-size:15px;

}

/* ---------- AI CARD ---------- */

.ai-column{

    background:

        linear-gradient(

            180deg,

            rgba(118,78,255,.07),

            rgba(255,255,255,.015)

        );

}

/* ---------- OLD CARD ---------- */

.compare-column:not(.ai-column){

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.045),

            rgba(255,255,255,.015)

        );

}

/* ---------- VS ---------- */

.compare-center-divider{

    padding-top:20px;

    justify-content:center;

    align-items:center;

    width:68px;

}

.compare-divider-circle{

    position:relative;

    font-weight:700;

    letter-spacing:.24em;

    width:56px;

    height:56px;

    margin:14px 0;

    font-size:10px;

}

/* ---------- RESPONSIVE ---------- */

@media (max-width:1200px){

    .comparison-wrapper{

        grid-template-columns:
        1fr
        68px
        1fr;

        gap:18px;

        position:relative;

        display:grid;

        align-items:end;

        width:100%;

    }

    .compare-center-divider{

        display:none;

    }

    .compare-column{

        min-height:430px;

        width:100%;

        box-sizing:border-box;

    }

}

@media (max-width:768px){

    .section45-heading{

        font-size:42px;

        line-height:1;

    }

    .compare-row{

        padding:20px 0;

    }

    .compare-row span{

        width:70px;

        font-size:38px;

    }

    .compare-row p{

        font-size:16px;

    }

}

  /* =====================================================
      SECTION 05 - PART 2.1
===================================================== */

.orbit-layout{

    display:grid;

    grid-template-columns:50% 50%;

    gap:0px;

    width:100%;

    height:100%;

    align-items:center;

      }


  /* =====================================================
      SECTION 05 - PART 2.2
===================================================== */

.orbit-ring{

    position:absolute;

    border-radius:50%;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    pointer-events:none;

}

/* ---------------------------- */

.orbit-ring-outer{

    width:320px;

    height:320px;

    border:1px solid rgba(255,255,255,.14);

    box-shadow:

        inset 0 0 25px rgba(255,255,255,.015);

}

/* ---------------------------- */

.orbit-ring-inner{

    width:215px;

    height:215px;

    border:1px solid rgba(255,255,255,.10);

}

/* ---------------------------- */

.orbit-ring-outer::after{

    content:"";

    position:absolute;

    inset:0;

    border-radius:50%;

    border:1px dashed rgba(180,160,255,.08);

    transform:scale(1.035);

}

/* ---------------------------- */

.orbit-ring-inner::after{

    content:"";

    position:absolute;

    inset:0;

    border-radius:50%;

    border:1px solid rgba(145,110,255,.05);

    transform:scale(.94);

}

  /* =====================================================
      SECTION 05 - PART 2.3
===================================================== */

.orbit-core{

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:122px;

    height:122px;

    border-radius:50%;

    border:1px solid rgba(255,255,255,.18);

    background:
        radial-gradient(
            circle at center,
            rgba(255,255,255,.05),
            rgba(18,18,22,.98)
        );

    display:flex;

    align-items:center;

    justify-content:center;

    overflow:hidden;

    z-index:10;

}

/* ---------------------------- */

.orbit-core::before{

    content:"";

    position:absolute;

    inset:8px;

    border-radius:50%;

    border:1px solid rgba(145,110,255,.12);

}

/* ---------------------------- */

.orbit-core-glow{

    position:absolute;

    width:90px;

    height:90px;

    border-radius:50%;

    background:

        radial-gradient(

            circle,

            rgba(145,110,255,.22),

            transparent 72%

        );

    filter:blur(10px);

}

/* ---------------------------- */

.orbit-core-text{

    position:relative;

    z-index:2;

    text-align:center;

    color:#ffffff;

    font-size:15px;

    line-height:1.25;

    font-weight:600;

    letter-spacing:.05em;

}

/* =====================================================
      SECTION 05 - PART 2.4
===================================================== */

.orbit-node{

    position:absolute;

    width:18px;

    height:18px;

    border-radius:50%;

    background:#ffffff;

    border:2px solid rgba(255,255,255,.22);

    box-shadow:

        0 0 12px rgba(255,255,255,.18);

    z-index:20;

}

/* ---------- OUTER RING ---------- */

.node-top{

    top:26px;
    left:50%;
    transform:translateX(-50%);

}

.node-top-right{

    top:95px;
    right:72px;

}

.node-right{

    top:50%;
    right:26px;
    transform:translateY(-50%);

}

.node-bottom-right{

    bottom:95px;
    right:72px;

}

.node-bottom{

    bottom:26px;
    left:50%;
    transform:translateX(-50%);

}

.node-bottom-left{

    bottom:95px;
    left:72px;

}

.node-left{

    top:50%;
    left:26px;
    transform:translateY(-50%);

}

.node-top-left{

    top:95px;
    left:72px;

}

/* ---------- HOVER PREP ---------- */

.orbit-node{

    transition:

        transform .35s ease,

        box-shadow .35s ease,

        background .35s ease;
    
    overflow:hidden;

box-shadow:

0 0 0 3px rgba(255,255,255,.02),

0 0 10px rgba(255,255,255,.12);

}

.orbit-node:hover{

    transform:scale(1.15);

    box-shadow:

        0 0 22px rgba(150,110,255,.35);

}

/* =====================================================
      SECTION 05 - PART 2.5
===================================================== */

.orbit-label{

    position:absolute;

    color:#cfcfcf;

    font-size:13px;

    font-weight:500;

    letter-spacing:.03em;

    white-space:nowrap;

    z-index:25;

    transition:
        color .35s ease,
        transform .35s ease;
        opacity:.92;

}

/* ---------- TOP ---------- */

.label-top{

    top:0px;

    left:50%;

    transform:translateX(-50%);

}

/* ---------- TOP RIGHT ---------- */

.label-top-right{

    top:48px;

    right:0px;

}

/* ---------- RIGHT ---------- */

.label-right{

    top:50%;

    right:-30px;

    transform:translateY(-50%);

}

/* ---------- BOTTOM RIGHT ---------- */

.label-bottom-right{

    bottom:48px;

    right:0px;

}

/* ---------- BOTTOM ---------- */

.label-bottom{

    bottom:0px;

    left:50%;

    transform:translateX(-50%);

}

/* ---------- BOTTOM LEFT ---------- */

.label-bottom-left{

    bottom:48px;

    left:0px;

}

/* ---------- LEFT ---------- */

.label-left{

    top:50%;

    left:-35px;

    transform:translateY(-50%);

}

/* ---------- TOP LEFT ---------- */

.label-top-left{

    top:48px;

    left:-35px;

}

/* ---------- HOVER ---------- */

.orbit-label:hover{

    color:#ffffff;

    transform:scale(1.05);

}

/* =====================================================
      SECTION 05 - PART 2.6
===================================================== */


/* =========================================
   CENTER GLOW
========================================= */

.orbit-glow{

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:250px;

    height:250px;

    border-radius:50%;

    background:

        radial-gradient(

            circle,

            rgba(133,92,255,.20),

            rgba(133,92,255,.08),

            transparent 72%

        );

    filter:blur(38px);

    z-index:0;

}

/* =========================================
   RING HIGHLIGHT
========================================= */

.orbit-ring-highlight{

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:340px;

    height:340px;

    border-radius:50%;

    border:1px solid rgba(150,110,255,.08);

    box-shadow:

        inset 0 0 40px rgba(255,255,255,.02),

        0 0 25px rgba(140,90,255,.05);

    pointer-events:none;

}

/* =========================================
   CONNECTOR LINES
========================================= */

.orbit-node::before{

    content:"";

    position:absolute;

    left:50%;

    top:50%;

    width:1px;

    height:105px;

    background:

        linear-gradient(

            rgba(255,255,255,.12),

            transparent

        );

    transform-origin:top center;

    z-index:-1;

}

/* ---------- ROTATIONS ---------- */

.node-top::before{

    transform:

        translateX(-50%)

        rotate(180deg);

}

.node-top-right::before{

    transform:

        translateX(-50%)

        rotate(225deg);

}

.node-right::before{

    transform:

        translateX(-50%)

        rotate(270deg);

}

.node-bottom-right::before{

    transform:

        translateX(-50%)

        rotate(315deg);

}

.node-bottom::before{

    transform:

        translateX(-50%)

        rotate(0deg);

}

.node-bottom-left::before{

    transform:

        translateX(-50%)

        rotate(45deg);

}

.node-left::before{

    transform:

        translateX(-50%)

        rotate(90deg);

}

.node-top-left::before{

    transform:

        translateX(-50%)

        rotate(135deg);

}

/* =========================================
   FLOATING PULSE
========================================= */

@keyframes orbitPulse{

    0%{

        transform:

            translate(-50%,-50%)

            scale(1);

    }

    50%{

        transform:

            translate(-50%,-50%)

            scale(1.03);

    }

    100%{

        transform:

            translate(-50%,-50%)

            scale(1);

    }

}

.orbit-glow{

    animation:

        orbitPulse

        5s ease-in-out infinite;

}

/* =========================================
   NODE POLISH
========================================= */

.orbit-node{

    box-shadow:

        0 0 0 4px rgba(255,255,255,.02),

        0 0 12px rgba(255,255,255,.15);

}

.node-top,
.node-right,
.node-bottom,
.node-left{

    background:#9d73ff;

    box-shadow:

        0 0 18px rgba(145,110,255,.40);

}

/* =====================================================
      SECTION 05 - PART 2.7
===================================================== */

/* ---------- RING ---------- */

.orbit-ring{

    transition:

        border-color .45s ease,

        box-shadow .45s ease,

        transform .45s ease;

}

.orbit-container:hover .orbit-ring-outer{

    border-color:

        rgba(145,110,255,.28);

    box-shadow:

        0 0 28px rgba(145,110,255,.08);

}

.orbit-container:hover .orbit-ring-inner{

    border-color:

        rgba(255,255,255,.18);

}

/* ---------- CORE ---------- */

.orbit-core{

    transition:

        transform .4s ease,

        border-color .4s ease,

        box-shadow .4s ease;

}

.orbit-container:hover .orbit-core{

    transform:

        translate(-50%,-50%)

        scale(1.04);

    border-color:

        rgba(145,110,255,.30);

    box-shadow:

        0 0 28px rgba(145,110,255,.15);

}

/* ---------- LABELS ---------- */

.orbit-container:hover .orbit-label{

    color:#ffffff;

}

.orbit-label:hover{

    transform:scale(1.08);

}

/* ---------- NODES ---------- */

.orbit-node:hover{

    transform:scale(1.25);

    box-shadow:

        0 0 22px rgba(145,110,255,.45);

}

/* ---------- GLOW ---------- */

.orbit-glow{

    transition:

        opacity .5s ease,

        filter .5s ease;

}

.orbit-container:hover .orbit-glow{

    opacity:1;

    filter:blur(46px);

}

/* ---------- RING SHINE ---------- */

@keyframes orbitShine{

    0%{

        opacity:.15;

    }

    50%{

        opacity:.45;

    }

    100%{

        opacity:.15;

    }

}

.orbit-ring-highlight{

    animation:

        orbitShine

        6s ease-in-out infinite;

}

/* =====================================================
      SECTION 05 - PART 2.8
===================================================== */

/* ---------- FINAL ORBIT SIZE ---------- */

.orbit-container{

    position:relative;

    width:260px;

    height:260px;

    margin:0 auto;

    display:flex;

    align-items:center;

    justify-content:center;

    flex-shrink:0;

    isolation:isolate;

    transition:

        transform .6s ease;

}

.orbit-left{

    width:100%;

    height:100%;

    display:flex;

    align-items:center;

    justify-content:center;

    padding-left:0;

    min-width:0;

}

.orbit-right{

    width:100%;

    height:100%;

    display:flex;

    align-items:center;

    justify-content:center;

    min-width:0;

}
/* ---------- OUTER RING ---------- */

.orbit-ring-outer{

    width:200px;

    height:200px;

}

/* ---------- INNER RING ---------- */

.orbit-ring-inner{

    width:130px;

    height:130px;

}

/* ---------- CENTER ---------- */

.orbit-core{

    width:70px;

    height:70px;

}

.orbit-core-text{

    font-size:12px;

    line-height:1.25;

    letter-spacing:.08em;

}

/* ---------- LABEL POLISH ---------- */

.orbit-label{

    color:#d9d9d9;

    font-size:13px;

    font-weight:500;

}

.orbit-container:hover .orbit-label{

    color:#ffffff;

}

/* ---------- NODE SIZE ---------- */

.orbit-node{

    width:10px;

    height:10px;

    border-width:1px;

}

/* ---------- GLOW ---------- */

.orbit-glow{

    width:210px;

    height:210px;

    opacity:.65;

}

/* ---------- RESPONSIVE ---------- */

@media (max-width:1200px){

    .orbit-container{

    width:320px;

    height:320px;

    transform:translateX(-25px);

}

    .orbit-ring-outer{

    width:245px;

    height:245px;

}

    .orbit-ring-inner{

    width:160px;

    height:160px;

}

}

@media (max-width:768px){

    .orbit-container{

        width:300px;

        height:300px;

    }

    .orbit-ring-outer{

        width:220px;

        height:220px;

    }

    .orbit-ring-inner{

        width:145px;

        height:145px;

    }

    .orbit-core{

        width:95px;

        height:95px;

    }

    .orbit-core-text{

        font-size:13px;

    }

    .orbit-label{

        font-size:12px;

    }

}

/* =====================================================
      SECTION 05 - PART 3.0
===================================================== */

/* ---------- OUTER RING SHINE ---------- */

.orbit-ring-outer::before{

    content:"";

    position:absolute;

    inset:-1px;

    border-radius:50%;

    background:

        conic-gradient(

            from 0deg,

            transparent 0deg,

            rgba(255,255,255,.12) 22deg,

            transparent 55deg,

            transparent 360deg

        );

    -webkit-mask:

        radial-gradient(circle, transparent 97%, #000 98%);

    mask:

        radial-gradient(circle, transparent 97%, #000 98%);

    opacity:.55;

    pointer-events:none;

}

/* ---------- INNER RING SHINE ---------- */

.orbit-ring-inner::before{

    content:"";

    position:absolute;

    inset:-1px;

    border-radius:50%;

    background:

        conic-gradient(

            from 180deg,

            transparent,

            rgba(145,110,255,.18),

            transparent

        );

    -webkit-mask:

        radial-gradient(circle, transparent 97%, #000 98%);

    mask:

        radial-gradient(circle, transparent 97%, #000 98%);

    opacity:.45;

}

/* ---------- CORE GLASS ---------- */

.orbit-core::after{

    content:"";

    position:absolute;

    inset:8px;

    border-radius:50%;

    background:

        linear-gradient(

            135deg,

            rgba(255,255,255,.10),

            transparent 55%

        );

    pointer-events:none;

}

/* ---------- LABEL SMOOTH ---------- */

.orbit-label{

    text-rendering:optimizeLegibility;

    -webkit-font-smoothing:antialiased;

}

/* ---------- NODE POLISH ---------- */

.orbit-node{

    overflow:hidden;

}

.orbit-node::after{

    content:"";

    position:absolute;

    inset:2px;

    border-radius:50%;

    background:

        radial-gradient(

            circle,

            rgba(255,255,255,.65),

            transparent 70%

        );

}

/* =====================================================
      SECTION 05 - PART 3.1
===================================================== */

/* ---------- OUTER RING ROTATION ---------- */

@keyframes orbitOuterRotate{

    from{

        transform:
            translate(-50%,-50%)
            rotate(0deg);

    }

    to{

        transform:
            translate(-50%,-50%)
            rotate(360deg);

    }

}

/* ---------- INNER RING ROTATION ---------- */

@keyframes orbitInnerRotate{

    from{

        transform:
            translate(-50%,-50%)
            rotate(360deg);

    }

    to{

        transform:
            translate(-50%,-50%)
            rotate(0deg);

    }

}

/* ---------- APPLY ---------- */

.orbit-ring-outer{

    animation:

        orbitOuterRotate

        28s

        linear

        infinite;

}

.orbit-ring-inner{

    animation:

        orbitInnerRotate

        18s

        linear

        infinite;

}

/* ---------- KEEP CENTER FIXED ---------- */

.orbit-core{

    z-index:50;

}

/* ---------- KEEP LABELS FIXED ---------- */

.orbit-label{

    z-index:80;

}

/* ---------- KEEP NODES ABOVE RING ---------- */

.orbit-node{

    z-index:60;

}

/* =====================================================
      SECTION 05 - PART 3.2
===================================================== */

/* ---------- DEPTH LAYER ---------- */

.orbit-container::before{

    content:"";

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:360px;

    height:360px;

    border-radius:50%;

    background:

        radial-gradient(

            circle,

            rgba(120,80,255,.05) 0%,

            rgba(120,80,255,.03) 35%,

            rgba(255,255,255,.015) 58%,

            transparent 82%

        );

    filter:blur(22px);

    z-index:-2;

    pointer-events:none;

}

/* ---------- SECOND HALO ---------- */

.orbit-container::after{

    content:"";

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:410px;

    height:410px;

    border-radius:50%;

    border:1px solid rgba(255,255,255,.025);

    opacity:.45;

    z-index:-3;

    pointer-events:none;

}

/* =====================================================
      SECTION 05 - PART 3.1
      GPT CARD WRAPPER
===================================================== */

.gpt-card{

    position:relative;

    max-width:200px;

    height:390px;

    min-height:unset;

    margin:0;

    border-radius:22px;

    padding:30px;

    border:1px solid rgba(255,255,255,.08);

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.045),

            rgba(255,255,255,.015)

        );

    backdrop-filter:blur(18px);

    display:flex;

    flex-direction:column;

}

.gpt-card::before{

    content:"";

    position:absolute;

    inset:1px;

    border-radius:21px;

    border:1px solid rgba(255,255,255,.03);

    pointer-events:none;

}

.gpt-card::after{

    content:"";

    position:absolute;

    left:-20%;

    right:-20%;

    bottom:-55px;

    height:120px;

    border-radius:50%;

    background:

        radial-gradient(

            ellipse,

            rgba(145,110,255,.25),

            rgba(145,110,255,.08),

            transparent 72%

        );

    filter:blur(28px);

    opacity:.75;

    pointer-events:none;

}

/* =====================================================
      SECTION 05 - PART 3.2
      GPT HEADER
===================================================== */

.gpt-header{

    display:flex;

    align-items:center;

    gap:10px;

    padding-bottom:6px;

}

.gpt-logo{

    width:34px;

    height:34px;

    border-radius:10px;

    display:flex;

    align-items:center;

    justify-content:center;

    background:rgba(255,255,255,.04);

    border:1px solid rgba(255,255,255,.08);

    backdrop-filter:blur(10px);

}

.gpt-logo img{

    width:22px;

    height:22px;

    object-fit:contain;

}

.gpt-logo-placeholder{

    width:22px;

    height:22px;

    border-radius:50%;

    border:1px solid rgba(255,255,255,.15);

}

.gpt-title{

    margin:0;

    font-size:16px;

    font-weight:700;

    color:#fff;

    letter-spacing:.08em;

    line-height:1;

}

/* =====================================================
      SECTION 05 - PART 3.3
      PURPOSE
===================================================== */

.gpt-purpose{

    margin-top:10px;

}

.gpt-section-title{

    display:block;

    margin-bottom:6px;

    font-size:10px;

    font-weight:700;

    letter-spacing:.18em;

    color:#8d8d8d;

    text-transform:uppercase;

}

.gpt-purpose-list{

    display:flex;

    flex-direction:column;

    gap:4px;

    margin-top:6px;

    padding:0;

    list-style:none;

}

.gpt-purpose-list li{

    position:relative;

    display:flex;

    align-items:center;

    padding-left:18px;

    min-height:16px;

    font-size:12px;

    line-height:1;

    margin-bottom:2px;

}

.gpt-purpose-list li::before{

    content:"";

    position:absolute;

    left:0;

    top:50%;

    transform:translateY(-50%);

    width:6px;

    height:6px;

    border-radius:50%;

    background:#9d73ff;

}

/* =====================================================
      SECTION 05 - PART 3.4
      USE CASES
===================================================== */

.gpt-divider{

    width:100%;

    height:1px;

    margin:8px 0;

    background:linear-gradient(

        90deg,

        transparent,

        rgba(255,255,255,.08),

        transparent

    );

}

.gpt-usecases-list{

    display:flex;

    flex-direction:column;

    gap:4px;

    margin-top:6px;

    padding:0;

    list-style:none;

}

.gpt-usecases-list li{

    position:relative;

    display:flex;

    align-items:center;

    padding-left:18px;

    min-height:16px;

    font-size:12px;

    line-height:1;

    margin-bottom:2px;

}

.gpt-usecases-list li::before{

    content:"";

    position:absolute;

    left:0;

    top:50%;

    transform:translateY(-50%);

    width:6px;

    height:6px;

    border-radius:50%;

    background:#9d73ff;

}

/* =====================================================
      SECTION 05 - PART 3.5
      DAILY USAGE
===================================================== */

.gpt-usage{

    margin-top:-10;

}

.gpt-usage-value{

    margin-top:6px;

    font-size:13px;

    letter-spacing:1px;

    color:#fff;

}

.gpt-usage-caption{

    margin-top:12px;

    font-size:13px;

    line-height:1.7;

    color:#8d8d8d;

    max-width:220px;

}

/* =====================================================
      SECTION 06 - PART 1.1
===================================================== */

/* ---------- SECTION ---------- */

.section06{

    position:relative;

    width:100%;

    padding:110px 0 0;

}

/* ---------- CONTAINER ---------- */

.section06 .container{

    max-width:1680px;

    margin:0 auto;

    padding:0 48px;

}

/* ---------- TOP ---------- */

.section06-top{

    display:flex;

    align-items:center;

    gap:18px;

    margin-bottom:22px;

}

/* ---------- NUMBER ---------- */

.section06-number{

    font-size:24px;

    font-weight:600;

    color:#ffffff;

    line-height:1;

}

/* ---------- LINE ---------- */

.section06-divider{

    flex:1;

    height:1px;

    background:rgba(255,255,255,.08);

}

/* ---------- HEADING ---------- */

.section06-heading{

    margin:0 0 44px;

    font-size:34px;

    font-weight:700;

    line-height:1;

    letter-spacing:-.03em;

    color:#ffffff;

}

/* ---------- GRID ---------- */

.section06-grid{

    display:grid;

    grid-template-columns:repeat(4,minmax(0,1fr));

    gap:22px;

}

/* =====================================================
      SECTION 06 - PART 1.2
===================================================== */

/* ---------- CARD ---------- */

.section06-card{

    position:relative;

    min-height:205px;

    border-radius:18px;

    overflow:hidden;

    border:1px solid rgba(255,255,255,.08);

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,.045),
            rgba(255,255,255,.015)
        );

    backdrop-filter:blur(16px);

    transition:
        transform .35s ease,
        border-color .35s ease,
        box-shadow .35s ease;

}

/* ---------- INNER BORDER ---------- */

.section06-card::before{

    content:"";

    position:absolute;

    inset:1px;

    border-radius:17px;

    border:1px solid rgba(255,255,255,.03);

    pointer-events:none;

}

/* ---------- TOP HIGHLIGHT ---------- */

.section06-card::after{

    content:"";

    position:absolute;

    top:0;

    left:0;

    right:0;

    height:1px;

    background:linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.35),
        transparent
    );

    opacity:.55;

}

/* ---------- HOVER ---------- */

.section06-card:hover{

    transform:translateY(-6px);

    border-color:rgba(162,120,255,.22);

    box-shadow:

        0 14px 40px rgba(0,0,0,.35),

        0 0 26px rgba(130,90,255,.08);

}

/* =====================================================
      SECTION 06 - PART 1.4
===================================================== */

/* ---------- CARD CONTENT ---------- */

.section06-card-content{

    height:100%;

    display:flex;

    justify-content:space-between;

    gap:18px;

    padding:22px;

}

/* ---------- LEFT ---------- */

.section06-card-left{

    flex:0 0 55%;

    max-width:55%;

    display:flex;

    flex-direction:column;

}


/* ---------- HEADER ---------- */

.section06-card-header{

    display:flex;

    align-items:flex-start;

    gap:14px;

}

/* ---------- ICON ---------- */

.section06-card-icon{

    width:42px;

    height:42px;

    border-radius:12px;

    display:flex;

    align-items:center;

    justify-content:center;

    flex-shrink:0;

    color:#ffffff;

    border:1px solid rgba(255,255,255,.08);

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,.06),
            rgba(255,255,255,.02)
        );

}

/* ---------- TITLE ---------- */

.section06-card-title{

    margin:0;

    font-size:18px;

    line-height:1.15;

    font-weight:700;

    color:#ffffff;

    letter-spacing:-.02em;

}

/* ---------- LIST ---------- */

.section06-card-list{

    margin:20px 0 0;

    padding:0;

    list-style:none;

}

.section06-card-list li{

    position:relative;

    padding-left:16px;

    margin-bottom:10px;

    font-size:13px;

    color:#a9a9a9;

    line-height:1.5;

}

.section06-card-list li::before{

    content:"";

    position:absolute;

    left:0;

    top:8px;

    width:5px;

    height:5px;

    border-radius:50%;

    background:#8b5cf6;

}

/* ---------- IMAGE ---------- */

.section06-card-image{

    flex:0 0 45%;

    max-width:45%;

    height:100%;

    display:flex;

    align-items:flex-end;

    justify-content:flex-end;

    overflow:hidden;

}

.section06-card-image img{

    width:100%;

    height:100%;

    object-fit:cover;

    display:block;

}

/* ---------- ARROW ---------- */

.section06-arrow{

    position:absolute;

    right:18px;

    bottom:18px;

    width:38px;

    height:38px;

    border:none;

    border-radius:50%;

    cursor:pointer;

    color:#ffffff;

    display:flex;

    align-items:center;

    justify-content:center;

    background:rgba(255,255,255,.06);

    border:1px solid rgba(255,255,255,.08);

    transition:.3s;

}

.section06-arrow:hover{

    transform:translateX(4px);

    background:#8b5cf6;

}

/* =====================================================
      SECTION 06 - PART 1.8
===================================================== */

/* ---------- GRID ---------- */

.section06-grid{

    align-items:stretch;

}

/* ---------- CARD ---------- */

.section06-card{

    height:250px;

}

/* ---------- CONTENT ---------- */

.section06-card-content{

    height:100%;

    padding:22px;

    gap:16px;

}

/* ---------- TITLE ---------- */

.section06-card-title{

    font-size:20px;

    line-height:1.1;

}

/* ---------- LIST ---------- */

.section06-card-list{

    margin-top:14px;

}

.section06-card-list li{

    font-size:12px;

    margin-bottom:6px;

}

/* ---------- IMAGE ---------- */

.section06-card-image{

    align-self:flex-end;

}

.section06-card-image img{

    transition:transform .35s ease;

}

.section06-card:hover .section06-card-image img{

    transform:scale(1.05);

}

/* ---------- ARROW ---------- */

.section06-arrow{

    opacity:.85;

    transition:
        transform .3s ease,
        background .3s ease,
        opacity .3s ease;

}

.section06-card:hover .section06-arrow{

    opacity:1;

    transform:translateX(4px);

}

/* =====================================================
      SECTION 06 - PART 2.0
===================================================== */

/* ---------- IMAGE AREA ---------- */

.section06-card-image{

    position:absolute;

    right:0;

    top:0;

    width:48%;

    height:100%;

    overflow:hidden;

    z-index:1;

}

/* ---------- IMAGE ---------- */

.section06-card-image img{

    width:100%;

    height:100%;

    object-fit:cover;

    object-position:center;

    opacity:.9;

}

/* ---------- DARK OVERLAY ---------- */

.section06-card-image::after{

    content:"";

    position:absolute;

    inset:0;

    background:linear-gradient(
        90deg,
        rgba(10,10,10,.96) 0%,
        rgba(10,10,10,.70) 38%,
        rgba(10,10,10,.18) 100%
    );

}

/* ---------- CONTENT ---------- */

.section06-card-content{

    position:relative;

    z-index:3;

    height:100%;

}

/* =====================================================
      SECTION 06 - PART 2.1
===================================================== */

/* ---------- PREMIUM BORDER ---------- */

.section06-card{

    border:1px solid rgba(255,255,255,.06);

    box-shadow:
        inset 0 1px 0 rgba(255,255,255,.04),
        0 10px 30px rgba(0,0,0,.35);

}

/* ---------- TOP LIGHT ---------- */

.section06-card::before{

    content:"";

    position:absolute;

    top:0;

    left:0;

    width:100%;

    height:1px;

    background:linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.35),
        transparent
    );

    opacity:.6;

}

/* ---------- PURPLE GLOW ---------- */

.section06-card::after{

    content:"";

    position:absolute;

    bottom:-60px;

    right:-60px;

    width:180px;

    height:180px;

    border-radius:50%;

    background:rgba(139,92,246,.18);

    filter:blur(70px);

    opacity:0;

    transition:opacity .35s ease;

}

/* ---------- HOVER ---------- */

.section06-card:hover{

    transform:translateY(-6px);

    border-color:rgba(139,92,246,.18);

}

.section06-card:hover::after{

    opacity:1;

}

/* ---------- IMAGE ---------- */

.section06-card:hover .section06-card-image img{

    transform:scale(1.06);

}

/* ---------- ARROW ---------- */

.section06-card:hover .section06-arrow{

    background:#8b5cf6;

    border-color:#8b5cf6;

}

/* =====================================================
      SECTION 06 - PART 2.2
===================================================== */

/* ---------- HEADER ---------- */

.section06-card-header{

    margin-bottom:18px;

    align-items:center;

}

/* ---------- ICON ---------- */

.section06-card-icon{

    width:46px;

    height:46px;

    border-radius:14px;

}

/* ---------- TITLE ---------- */

.section06-card-title{

    font-size:16px;

    font-weight:700;

    line-height:1.05;

    letter-spacing:-0.03em;

}

/* ---------- LIST ---------- */

.section06-card-list{

    display:flex;

    flex-direction:column;

    gap:10px;

    margin:0;

    padding:0;

}

.section06-card-list li{

    font-size:13px;

    font-weight:500;

    color:rgba(255,255,255,.72);

    line-height:1.45;

}

/* ---------- BULLET ---------- */

.section06-card-list li::before{

    width:6px;

    height:6px;

    top:7px;

    background:#8B5CF6;

}

/* ---------- IMAGE ---------- */

.section06-card-image{

    padding-right:14px;

    padding-bottom:10px;

}

/* ---------- ARROW ---------- */

.section06-arrow{

    width:42px;

    height:42px;

    right:16px;

    bottom:16px;

    border-radius:50%;

}

/* =====================================================
      SECTION 07 - PART 1.1
===================================================== */

/* ---------- SECTION ---------- */

.section07{

    position:relative;

    width:100%;

    padding:120px 0 140px;

}

/* ---------- CONTAINER ---------- */

.section07 .container{

    max-width:1680px;

    margin:0 auto;

    padding:0 48px;

}

/* ---------- TOP ---------- */

.section07-top{

    display:flex;

    align-items:center;

    gap:18px;

    margin-bottom:22px;

}

.section07-number{

    font-size:24px;

    font-weight:600;

    color:#ffffff;

}

.section07-divider{

    flex:1;

    height:1px;

    background:rgba(255,255,255,.08);

}

/* ---------- PANEL ---------- */

.section07-panel{

    display:grid;

    grid-template-columns:1fr 1fr 360px;

    align-items:center;

    min-height:270px;

    border:1px solid rgba(255,255,255,.08);

    border-radius:22px;

    overflow:hidden;

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,.035),
            rgba(255,255,255,.015)
        );

}

/* ---------- COLUMNS ---------- */

.section07-left,

.section07-center,

.section07-right{

    height:100%;

    display:flex;

    align-items:center;

    padding:42px;

}

/* ---------- DIVIDERS ---------- */

.section07-left,

.section07-center{

    border-right:1px solid rgba(255,255,255,.08);

}

/* ---------- TITLE ---------- */

.section07-title{

    margin:0;

    font-size:68px;

    font-weight:800;

    line-height:.92;

    letter-spacing:-.05em;

    color:#ffffff;

}

/* ---------- IMAGE ---------- */

.section07-right{

    justify-content:center;

}

.section07-right img{

    width:100%;

    max-width:300px;

    height:210px;

    object-fit:cover;

    border-radius:18px;

}

/* =====================================================
      SECTION 07 - PART 1.2
===================================================== */

/* ---------- PANEL ---------- */

.section07-panel{

    position:relative;

    isolation:isolate;

    overflow:hidden;

    box-shadow:

        inset 0 1px 0 rgba(255,255,255,.05),

        0 20px 50px rgba(0,0,0,.35);

}

/* ---------- PURPLE WAVE GLOW ---------- */

.section07-panel::before{

    content:"";

    position:absolute;

    left:-8%;

    right:-8%;

    bottom:-30%;

    height:220px;

    background:

        radial-gradient(

            ellipse at center,

            rgba(126,87,255,.20) 0%,

            rgba(126,87,255,.10) 35%,

            transparent 75%

        );

    filter:blur(55px);

    pointer-events:none;

    z-index:0;

}

/* ---------- TOP LIGHT ---------- */

.section07-panel::after{

    content:"";

    position:absolute;

    inset:0;

    background:

        linear-gradient(

            180deg,

            rgba(255,255,255,.05),

            transparent 24%

        );

    pointer-events:none;

    z-index:0;

}

/* ---------- CONTENT ---------- */

.section07-left,

.section07-center,

.section07-right{

    position:relative;

    z-index:2;

}

/* ---------- IMAGE ---------- */

.section07-right img{

    border:1px solid rgba(255,255,255,.08);

    box-shadow:

        0 18px 40px rgba(0,0,0,.35);

}

/* ---------- HOVER ---------- */

.section07-panel:hover{

    border-color:rgba(138,92,255,.18);

    transition:.35s;

}

/* =====================================================
      SECTION 07 - PART 1.3
===================================================== */

/* ---------- LEFT / CENTER ---------- */

.section07-left,

.section07-center{

    justify-content:center;

}

/* ---------- TITLE ---------- */

.section07-title{

    font-size:64px;

    font-weight:800;

    line-height:.88;

    letter-spacing:-0.05em;

    text-transform:uppercase;

    color:#ffffff;

    margin:0;

}

/* ---------- IMAGE COLUMN ---------- */

.section07-right{

    justify-content:center;

    align-items:center;

    padding:24px;

}

/* ---------- IMAGE ---------- */

.section07-right img{

    width:100%;

    max-width:320px;

    height:220px;

    object-fit:cover;

    object-position:center top;

    border-radius:16px;

    display:block;

}

/* ---------- RESPONSIVE TEXT ---------- */

@media (max-width:1600px){

    .section07-title{

        font-size:56px;

    }

}

/* =====================================================
      SECTION 07 - PART 1.4
===================================================== */

/* ---------- PANEL HOVER ---------- */

.section07-panel{

    transition:
        transform .4s ease,
        border-color .4s ease,
        box-shadow .4s ease;

}

.section07-panel:hover{

    transform:translateY(-6px);

    border-color:rgba(139,92,246,.22);

    box-shadow:
        0 22px 55px rgba(0,0,0,.40),
        0 0 40px rgba(139,92,246,.10);

}

/* ---------- TITLE ANIMATION ---------- */

.section07-title{

    transition:
        color .35s ease,
        transform .35s ease;

}

.section07-panel:hover .section07-title{

    transform:translateY(-2px);

    color:#ffffff;

}

/* ---------- IMAGE ---------- */

.section07-right img{

    transition:
        transform .45s ease,
        filter .45s ease;

    filter:grayscale(100%);

}

.section07-panel:hover .section07-right img{

    transform:scale(1.03);

    filter:grayscale(0%);

}

/* ---------- DIVIDERS ---------- */

.section07-left,
.section07-center{

    position:relative;

}

.section07-left::after,
.section07-center::after{

    content:"";

    position:absolute;

    top:12%;

    right:0;

    width:1px;

    height:76%;

    background:linear-gradient(
        transparent,
        rgba(255,255,255,.12),
        transparent
    );

}

/* ---------- PANEL BORDER ---------- */

.section07-panel::before{

    border-radius:22px;

}

/* =====================================================
      SECTION 07 - PART 2.0
===================================================== */

/* ---------- PANEL ---------- */

.section07-panel{

    opacity:0;

    transform:translateY(70px);

    animation:section07Fade .9s ease forwards;

}

/* ---------- LEFT ---------- */

.section07-left{

    opacity:0;

    transform:translateX(-60px);

    animation:section07Left .8s ease forwards;

    animation-delay:.15s;

}

/* ---------- CENTER ---------- */

.section07-center{

    opacity:0;

    transform:translateY(40px);

    animation:section07Center .8s ease forwards;

    animation-delay:.3s;

}

/* ---------- RIGHT ---------- */

.section07-right{

    opacity:0;

    transform:translateX(60px);

    animation:section07Right .8s ease forwards;

    animation-delay:.45s;

}

/* ---------- IMAGE ---------- */

.section07-right img{

    transition:

        transform .5s ease,

        filter .5s ease;

}

.section07-panel:hover .section07-right img{

    transform:scale(1.05);

}

/* ---------- TITLE ---------- */

.section07-title{

    transition:

        transform .35s ease,

        color .35s ease;

}

.section07-panel:hover .section07-title{

    transform:translateY(-3px);

}

/* ---------- KEYFRAMES ---------- */

@keyframes section07Fade{

    from{

        opacity:0;

        transform:translateY(70px);

    }

    to{

        opacity:1;

        transform:translateY(0);

    }

}

@keyframes section07Left{

    from{

        opacity:0;

        transform:translateX(-60px);

    }

    to{

        opacity:1;

        transform:translateX(0);

    }

}

@keyframes section07Center{

    from{

        opacity:0;

        transform:translateY(40px);

    }

    to{

        opacity:1;

        transform:translateY(0);

    }

}

@keyframes section07Right{

    from{

        opacity:0;

        transform:translateX(60px);

    }

    to{

        opacity:1;

        transform:translateX(0);

    }

}

/* =====================================================
      SECTION 07 - PART 2.1
===================================================== */

/* ---------- PANEL GLOW ---------- */

.section07-panel{

    overflow:hidden;

}

.section07-panel::after{

    content:"";

    position:absolute;

    inset:-40%;

    background:

        radial-gradient(

            circle,

            rgba(124,92,255,.16) 0%,

            rgba(124,92,255,.08) 22%,

            transparent 60%

        );

    opacity:0;

    transform:scale(.75);

    transition:

        opacity .45s ease,

        transform .45s ease;

    pointer-events:none;

}

/* ---------- HOVER ---------- */

.section07-panel:hover::after{

    opacity:1;

    transform:scale(1);

}

/* ---------- IMAGE ---------- */

.section07-panel:hover .section07-right img{

    transform:scale(1.06);

    filter:brightness(1.08);

}

/* ---------- TEXT ---------- */

.section07-panel:hover .section07-title{

    text-shadow:

        0 0 18px rgba(255,255,255,.08);

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
    AI INTEGRATION
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

       {/* -------Heading---- */}

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

{/* =====================================================
        SECTION 04+05 V2 - PART 1.1
===================================================== */}

<section className="relative border-b border-white/10 bg-black">

    <div className="max-w-[1700px] mx-auto px-10 py-28">

        <div className="grid grid-cols-20 gap-20">

            {/* =========================
                    LEFT
            ========================= */}

            <div className="col-span-9">

                <div className="flex items-center gap-6 mb-10">

                    <span className="text-white text-lg">
                        04
                    </span>

                    <div className="flex-1 h-px bg-white/10"></div>

                </div>

                <h2 className="section45-heading">

                    FROM ONE IDEA

                    <br/>

                    TO 100

                    <br/>

                    POSSIBILITIES.

                </h2>

                <div className="comparison-wrapper">

    <div className="compare-column">

        <div className="compare-title">
            TRADITIONAL WORKFLOW
        </div>

        <div className="compare-row">
            <span>1</span>
            <p>Concept</p>
        </div>

        <div className="compare-row">
            <span>3</span>
            <p>Variations</p>
        </div>

        <div className="compare-row">
            <span>8</span>
            <p>Hours</p>
        </div>

        <div className="compare-row">
            <span>×</span>
            <p>Limited Exploration</p>
        </div>

        <div className="compare-bottom-glow compare-old-glow"></div>

<div className="compare-reflection"></div>

    </div>

    <div className="compare-center-divider">

    <div className="compare-divider-line"></div>

    <div className="compare-divider-circle">
        VS
    </div>

    <div className="compare-divider-line"></div>

</div>

    <div className="compare-column ai-column">

        <div className="compare-title ai-title">
            AI-AUGMENTED WORKFLOW
        </div>

        <div className="compare-row">
            <span>100</span>
            <p>Concepts</p>
        </div>

        <div className="compare-row">
            <span>500</span>
            <p>Variations</p>
        </div>

        <div className="compare-row">
            <span>2</span>
            <p>Hours</p>
        </div>

        <div className="compare-row">
            <span>∞</span>
            <p>Unlimited Exploration</p>
        </div>

        <div className="compare-bottom-glow compare-ai-glow"></div>

<div className="compare-reflection"></div>

    </div>

</div>

            </div>

            {/* =========================
                    RIGHT
            ========================= */}

            <div className="col-span-11">

                <div className="flex items-center gap-6 mb-10">

                    <span className="text-white text-lg">
                        05
                    </span>

                    <div className="flex-1 h-px bg-white/10"></div>

                </div>

                <h2 className="section45-heading">

                    INSIDE

                    <br/>

                    MY AI

                    <br/>

                    STACK.

                </h2>

                <div className="stack-card">

                  <div className="orbit-layout">
                    <div className="orbit-left">

    <div className="orbit-container">

      <div className="orbit-ring orbit-ring-outer"></div>

<div className="orbit-ring orbit-ring-inner"></div>

<div className="orbit-core">

    <div className="orbit-core-glow"></div>

    <div className="orbit-core-text">

        ARPIT
        <br />
        SHARMA

    </div>

</div>

   <div className="orbit-node node-top"></div>

<div className="orbit-node node-top-right"></div>

<div className="orbit-node node-right"></div>

<div className="orbit-node node-bottom-right"></div>

<div className="orbit-node node-bottom"></div>

<div className="orbit-node node-bottom-left"></div>

<div className="orbit-node node-left"></div>

<div className="orbit-node node-top-left"></div>

<div className="orbit-label label-top">GPT-5</div>

<div className="orbit-label label-top-right">Claude</div>

<div className="orbit-label label-right">Gemini</div>

<div className="orbit-label label-bottom-right">Flux</div>

<div className="orbit-label label-bottom">Photoshop AI</div>

<div className="orbit-label label-bottom-left">Kling</div>

<div className="orbit-label label-left">Runway</div>

<div className="orbit-label label-top-left">Midjourney</div>

<div className="orbit-glow"></div>

<div className="orbit-ring-highlight"></div>

    </div>
    </div>

    <div className="orbit-right">

        <div className="gpt-card">

        <div className="gpt-header">

    <div className="gpt-logo">
 
        <img
            src="/icons/gpt.png"
            alt="OpenAI"
        />

    </div>

    <h4 className="gpt-title">

        GPT-5

    </h4>

</div>

<div className="gpt-purpose">

    <div className="gpt-section-title">
        PURPOSE
    </div>

    <ul className="gpt-purpose-list">

        <li>Creative Strategy</li>

        <li>Research</li>

        <li>Prompt Engineering</li>

        <li>Workflow Automation</li>

    </ul>

</div>

<div className="gpt-divider"></div>

<div className="gpt-usecases">

    <div className="gpt-section-title">
        USE CASES
    </div>

    <ul className="gpt-usecases-list">

        <li>Campaign Ideation</li>

        <li>Brand Positioning</li>

        <li>Market Research</li>

        <li>Content Strategy</li>

        <li>Workflow Planning</li>

    </ul>

</div>

<div className="gpt-divider"></div>

<div className="gpt-usage">

    <div className="gpt-section-title">

        DAILY USAGE

    </div>

    <div className="gpt-usage-value">

        4–6 Hours

    </div>

</div>

</div>

    </div>

</div>

                </div>

            </div>

        </div>

    </div>

</section>

{/* =====================================================
      SECTION 06 - PART 1.0
===================================================== */}

<section id="section06" className="section06">

  <div className="container">

    {/* ---------- HEADER ---------- */}

    <div className="section06-top">

      <span className="section06-number">
        06
      </span>

      <div className="section06-divider"></div>

    </div>

    <h2 className="section06-heading">
      HOW I USE AI DAILY.
    </h2>

    {/* ---------- CARDS ---------- */}

    <div className="section06-grid">

      <div className="section06-card">

  <div className="section06-card-content">

    <div className="section06-card-left">

      <div className="section06-card-header">

        <div className="section06-card-icon">
          <Package size={18} strokeWidth={1.8}/>
        </div>

        <h3 className="section06-card-title">
          PRODUCT
          <br />
          VISUALIZATION
        </h3>

      </div>

      <ul className="section06-card-list">

        <li>Product Mockups</li>

        <li>Packaging Design</li>

        <li>Material Simulation</li>

        <li>Advertising Visuals</li>

      </ul>

    </div>

    <div className="section06-card-image">

      <img
        src="/images/section06/product1.png"
        alt="Product Visualization"
      />

    </div>

  </div>

  <button className="section06-arrow">

    <ArrowRight size={16}/>

  </button>

</div>

      <div className="section06-card">
        
        <div className="section06-card-content">

    <div className="section06-card-left">

      <div className="section06-card-header">

        <div className="section06-card-icon">
          <Car size={18} strokeWidth={1.8}/>
        </div>

        <h3 className="section06-card-title">
          AUTOMOTIVE
        </h3>

      </div>

      <ul className="section06-card-list">

        <li>PPF Visualization</li>

        <li>Sunfilm Campaigns</li>

        <li>Vehicle Marketing</li>

        <li>Product Demonstration</li>

      </ul>

    </div>

    <div className="section06-card-image">

      <img
        src="/images/section06/product2.png"
        alt="Automotive"
      />

    </div>

  </div>

  <button className="section06-arrow">
    <ArrowRight size={16}/>
  </button>

      </div>

      <div className="section06-card">

         <div className="section06-card-content">

    <div className="section06-card-left">

      <div className="section06-card-header">

        <div className="section06-card-icon">
          <PlayCircle size={18} strokeWidth={1.8}/>
        </div>

        <h3 className="section06-card-title">
          VIDEO
        </h3>

      </div>

      <ul className="section06-card-list">

        <li>Product Reveals</li>

        <li>Motion Graphics</li>

        <li>Cinematic Ads</li>

        <li>Social Content</li>

      </ul>

    </div>

    <div className="section06-card-image">

      <img
        src="/images/section06/product3.png"
        alt="Video"
      />

    </div>

  </div>

  <button className="section06-arrow">
    <ArrowRight size={16}/>
  </button>


      </div>

      <div className="section06-card">

        <div className="section06-card-content">

    <div className="section06-card-left">

      <div className="section06-card-header">

        <div className="section06-card-icon">
          <Crosshair size={18} strokeWidth={1.8}/>
        </div>

        <h3 className="section06-card-title">
          STRATEGY
        </h3>

      </div>

      <ul className="section06-card-list">

        <li>Research</li>

        <li>Competitor Analysis</li>

        <li>Trend Forecasting</li>

        <li>Creative Planning</li>

      </ul>

    </div>

    <div className="section06-card-image">

      <img
        src="/images/section06/product4.png"
        alt="Strategy"
      />

    </div>

  </div>

  <button className="section06-arrow">
    <ArrowRight size={16}/>
  </button>

      </div>

    </div>

  </div>

</section>

{/* =====================================================
      SECTION 07 - PART 1.0
===================================================== */}

<section id="section07" className="section07">

  <div className="container">

    {/* Header */}

    <div className="section07-top">

      <span className="section07-number">
        07
      </span>

      <div className="section07-divider"></div>

    </div>

    {/* Main Panel */}

    <div className="section07-panel">

      {/* Left */}

      <div className="section07-left">

        <h2 className="section07-title">
          AI DOESN'T
          <br />
          REPLACE
          <br />
          MY
          <br />
          CREATIVITY.
        </h2>

      </div>

      {/* Center */}

      <div className="section07-center">

        <h2 className="section07-title">
          IT ALLOWS
          <br />
          ME TO
          <br />
          SPEND MORE
          <br />
          TIME ON IT.
        </h2>

      </div>

      {/* Right */}

      <div className="section07-right">

        <img
          src="/images/section07/profile.jpg"
          alt="Arpit Sharma"
        />

      </div>

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