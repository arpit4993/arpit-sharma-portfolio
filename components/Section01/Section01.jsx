"use client"

import { useEffect, useRef } from "react";

import {
  Search,
  Target,
  Lightbulb,
  Image,
  Play,
  Send
} from "lucide-react";

export default function Section01() {

  const cubeSceneRef = useRef(null);

  const scrollToSection = (id) => {

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

};

useEffect(() => {

  const cube = cubeSceneRef.current;

  if (!cube) return;

  let currentX = 60;
  let currentY = 0;

  let targetX = 60;
  let targetY = 0;

  let frameId;

  const update = () => {

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    cube.style.setProperty("--cube-x", `${currentX}deg`);
    cube.style.setProperty("--cube-y", `${currentY}deg`);

    frameId = requestAnimationFrame(update);

  };

  update();

  const handleMove = (e) => {

    const rect = cube.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    targetX = 60 - (y - 0.5) * 12;
    targetY = (x - 0.5) * 18;

  };

  const handleLeave = () => {

    targetX = 60;
    targetY = 0;

  };

  cube.addEventListener("mousemove", handleMove);
  cube.addEventListener("mouseleave", handleLeave);

  return () => {

    cancelAnimationFrame(frameId);

    cube.removeEventListener("mousemove", handleMove);
    cube.removeEventListener("mouseleave", handleLeave);

  };

}, []);

  return (
    <main>
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

  width:100%;

  max-width:clamp(260px,70vw,520px);

  padding:clamp(8px,3vw,20px);

  aspect-ratio:1;

  height:auto;

  display:flex;
  align-items:center;
  justify-content:center;

  perspective:1800px;

}

.cube-stage{

  width:100%;

  max-width:clamp(180px,55vw,320px);

max-width:320px;

aspect-ratio:1;

height:auto;

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

    width:clamp(120px,34vw,180px);
    height:clamp(120px,34vw,180px);

    transform-style:preserve-3d;

}

/* ---------------- FRONT / BACK ---------------- */

.cube-face{

    position:absolute;

    width:100%;
    height:100%;

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

    width:100%;

    height:50%;

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

    width:50%;
height:100%;

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

    width:50%;
height:100%;

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

    width:clamp(60px,18vw,92px);
height:clamp(60px,18vw,92px);

margin-left:calc(clamp(60px,18vw,92px) / -2);
margin-top:calc(clamp(60px,18vw,92px) / -2);

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

    width:clamp(18px,5vw,28px);
height:clamp(18px,5vw,28px);

margin-left:calc(clamp(18px,5vw,28px) / -2);
margin-top:calc(clamp(18px,5vw,28px) / -2);

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

    width:clamp(110px,34vw,170px);
height:clamp(110px,34vw,170px);

margin-left:calc(clamp(110px,34vw,170px) / -2);
margin-top:calc(clamp(110px,34vw,170px) / -2);

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
    height:clamp(90px,28vw,140px);

    margin-left:-1px;
    margin-top:calc(clamp(90px,28vw,140px) / -2);

}

/* Horizontal */

.energy-beam.horizontal{

    width:clamp(90px,28vw,140px);
    height:2px;

    margin-left:calc(clamp(90px,28vw,140px) / -2);
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

    width:clamp(160px,44vw,230px);
    height:clamp(160px,44vw,230px);

    margin-left:calc(clamp(160px,44vw,230px) / -2);
    margin-top:calc(clamp(160px,44vw,230px) / -2);

    transform:translateZ(clamp(45px,10vw,72px));

}

/* ----------------------------- */

.frame-two{

    width:clamp(145px,40vw,205px);
    height:clamp(145px,40vw,205px);

    margin-left:calc(clamp(145px,40vw,205px) / -2);
    margin-top:calc(clamp(145px,40vw,205px) / -2);

    transform:translateZ(0);

}

/* ----------------------------- */

.frame-three{

    width:clamp(130px,34vw,180px);
    height:clamp(130px,34vw,180px);

    margin-left:calc(clamp(130px,34vw,180px) / -2);
    margin-top:calc(clamp(130px,34vw,180px) / -2);

    transform:translateZ(clamp(-72px,-10vw,-45px));

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

    padding:clamp(10px,3vw,18px);

    gap:clamp(8px,2vw,10px);

}

/* --------------------------- */

.workflow-item{

    display:grid;

    grid-template-columns:
    clamp(30px,8vw,42px)
    clamp(34px,9vw,46px)
    1fr;

    align-items:center;

    min-height:58px;

    border-radius:14px;

    border:1px solid rgba(255,255,255,.05);

    background:rgba(255,255,255,.02);

    transition:.35s;

}

/* --------------------------- */

.workflow-number{

    text-align:center;

    font-size:clamp(10px,2.8vw,12px);

    color:rgba(255,255,255,.45);

    font-family:monospace;

}

/* --------------------------- */

.workflow-icon{

    width:clamp(24px,6vw,30px);
height:clamp(24px,6vw,30px);

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

    font-size:clamp(10px,2.8vw,12px);

    letter-spacing:clamp(.08em,.3vw,.18em);

    font-weight:600;

    color:#ececec;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
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

    transform:translateX(clamp(3px,1vw,8px));

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

    padding:clamp(12px,3vw,16px);

    border-radius:clamp(16px,3vw,22px);

    border:1px solid rgba(255,255,255,.08);

    background:rgba(255,255,255,.03);

    backdrop-filter:blur(16px);

    box-shadow:
        inset 0 1px rgba(255,255,255,.05),
        0 0 35px rgba(130,90,255,.08);

}

      `}</style>

<section
id="section01"
className="relative w-full border-t border-white/10 border-b border-white/10 bg-black overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[70vw]
w-[70vw]
max-h-[700px]
max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-[180px]" />

    <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[180px]" />

    <div className="absolute -right-40 bottom-20 h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-[180px]" />
  </div>

  <div
  className="
    relative
    w-full
    max-w-[1600px]
    mx-auto
    px-4
    sm:px-6
    lg:px-10
    xl:px-14
  "
>

    {/* Top Label */}
    <div
  className="
    flex
    items-center
    gap-4
    sm:gap-6
    lg:gap-8

    pt-8
    sm:pt-10

    pb-6
    sm:pb-8
  "
>

      <span className="text-white text-lg font-light">
        01
      </span>

      <div className="h-px flex-1 bg-white/10" />

      <span
className="
text-[10px]
sm:text-[11px]

tracking-[1.5px]
sm:tracking-[3px]

truncate
"
>
        AI-Augmented Creative Workflow
      </span>

    </div>

    {/* Main Layout */}
    
    <div
className="
grid

grid-cols-1

lg:grid-cols-12

items-center

gap-8
lg:gap-10

py-10
sm:py-14
lg:py-20
"
>

      {/* LEFT */}
      
      <div className="
col-span-12
lg:col-span-4
min-w-0
order-1

flex
flex-col
justify-center
items-start
text-left

px-0
">

  {/* Small Label */}
 <div
  className="
    flex
    items-center
    gap-4
    sm:gap-6

    pt-6
    sm:pt-8

    pb-5
    sm:pb-6
  "
>

  <span className="text-[15px] font-medium text-white/90">
    01
  </span>

  <span
className="
uppercase
text-zinc-500

text-[10px]
sm:text-[11px]

tracking-[2px]
sm:tracking-[4px]
"
>
    AI-Augmented Creative Workflow
  </span>

</div>

  {/* Heading */}
  
  <h1
className="
w-full

font-black
uppercase

text-left

leading-[0.9]

tracking-[-0.04em]

text-[40px]
sm:text-[48px]
lg:text-[58px]
"
>
    AI-AUGMENTED CREATIVE WORKFLOW.
  </h1>

  {/* Description */}
  <p
    className="
      mt-8
      w-full

max-w-[330px]

mx-0

px-0

text-[15px]
sm:text-[16px]

leading-7
sm:leading-8
      text-zinc-400
    "
  >
    I integrate artificial intelligence into every stage of my creative
    process to accelerate ideation, expand possibilities, and deliver
    production-grade results without compromising creative direction.
  </p>

  {/* Button */}
  <button
  onClick={() => scrollToSection("workflow-panel")}
  className="
    group
    mt-10
    inline-flex
self-start
    w-full

max-w-[280px]

justify-between
    items-center
    gap-4
    sm:gap-5
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
      text-[10px]
sm:text-[11px]

uppercase

tracking-[2px]
sm:tracking-[2.5px]
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

<div className="
col-span-12
lg:col-span-5
order-2
flex
justify-center
items-center
">

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
       <div className="
col-span-12
lg:col-span-3
order-3
flex
justify-center
lg:justify-end
items-center
">

    <div
  id="workflow-panel"
  className="workflow-panel"
>

    <div className="workflow-list">

    <div
  className="workflow-item active"
  onClick={() => scrollToSection("section01")}
>

        <div className="workflow-number">01</div>

        <div className="workflow-icon">

            <Search size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            RESEARCH

        </div>

    </div>

    <div
  className="workflow-item"
  onClick={() => scrollToSection("section02")}
>

        <div className="workflow-number">02</div>

        <div className="workflow-icon">

            <Target size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            STRATEGY

        </div>

    </div>

    <div
  className="workflow-item"
  onClick={() => scrollToSection("section03")}
>

        <div className="workflow-number">03</div>

        <div className="workflow-icon">

            <Lightbulb size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            CONCEPT

        </div>

    </div>

    <div
  className="workflow-item"
  onClick={() => scrollToSection("section04")}
>

        <div className="workflow-number">04</div>

        <div className="workflow-icon">

            <Image size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            VISUAL

        </div>

    </div>

    <div
  className="workflow-item"
  onClick={() => scrollToSection("section05")}
>

        <div className="workflow-number">05</div>

        <div className="workflow-icon">

            <Play size={16} strokeWidth={2}/>

        </div>

        <div className="workflow-title">

            MOTION

        </div>

    </div>

    <div
  className="workflow-item"
  onClick={() => scrollToSection("section06")}
>

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

    </main>
  )
}