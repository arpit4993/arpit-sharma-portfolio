"use client"

import { useEffect } from "react"

export default function Section04() {

  useEffect(() => {

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

  }, [])

  return (
    <main>
      <style>{`

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

    padding:clamp(20px,2vw,24px);

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

    min-height:auto;

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

    right:-11px;

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
      SECTION 04 + 05 RESPONSIVE PART 1
===================================================== */

@media (max-width:1279px){

    .section45-heading{

        font-size:clamp(34px,9vw,60px);

        line-height:.95;

        letter-spacing:-1px;

    }

    .section45-description{

        max-width:100%;

    }

}

/* =====================================================
      SECTION 04 RESPONSIVE PART 2
===================================================== */

@media (max-width:1279px){

    .comparison-wrapper{

        display:flex;

        flex-direction:column;

        gap:24px;

        height:auto;

        margin-top:48px;

    }

    .compare-center-divider{

        display:none;

    }

    .compare-column{

        width:100%;

        min-height:auto;

        padding:22px;

    }

    .compare-title{

    justify-content:flex-start;

    text-align:left;

}

.compare-row{

    justify-content:flex-start;

    align-items:flex-start;

    gap:16px;

}

.compare-row span{

    width:56px;

    flex-shrink:0;

    text-align:left;

    font-size:28px;

}

.compare-row p{

    flex:1;

    text-align:left;

    line-height:1.5;

}

.compare-bottom-glow{

    bottom:-42px;

    height:90px;

}

.compare-reflection{

    display:none;

}

}

/* =====================================================
      SECTION 05 RESPONSIVE PART 3
===================================================== */

@media (max-width:1279px){

.orbit-layout{

    display:flex;

    flex-direction:column;

    gap:40px;

    width:100%;

}

.orbit-left{

    width:100%;

    display:flex;

    justify-content:center;

    align-items:center;

}

.orbit-right{

    width:100%;

    display:flex;

    justify-content:flex-start;

    align-items:flex-start;

}

.orbit-container{

    width:280px;

    height:280px;

    transform:none;

    margin-inline:auto;
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

    width:82px;

    height:82px;

}

.orbit-core-text{

    font-size:12px;

}

.gpt-card{

    width:100%;

    max-width:100%;

    height:auto;

    min-height:auto;

    margin:0;

    padding:24px;

}

.gpt-title{

    font-size:15px;

}

.gpt-purpose-list li,
.gpt-usecases-list li{

    font-size:13px;

    line-height:1.5;

}

.gpt-usage-caption{

    max-width:100%;

}

.orbit-label{

    font-size:12px;

}

.label-right{

    right:-23.5px;

}

.label-left{

    left:-28px;

}

.label-top-right{

    right:-5px;

}
.label-bottom-right{

    right:8px;

}

.label-top-left{

    top:43px;
    left:-25px;

}
.label-bottom-left{

    left:6px;

}

.orbit-node{

    width:8px;
    height:8px;

}

.orbit-node::before{

    height:74px;

}

.orbit-glow{

    width:180px;

    height:180px;

    filter:blur(30px);

}

.orbit-container::before{

    width:280px;

    height:280px;

}

.orbit-container::after{

    width:320px;

    height:320px;

}

@media (hover:none){

    .orbit-container:hover{

        transform:none;

    }

    .orbit-node:hover{

        transform:none;

    }

    .compare-column:hover{

        transform:none;

    }

    .compare-row:hover{

        padding-left:0;

        background:transparent;

    }

}

@media (max-width:480px){

    .section45-heading{

        font-size:34px;

        line-height:1;

    }

    .compare-row span{

        width:46px;

        font-size:24px;

    }

    .compare-row p{

        font-size:14px;

    }

    .orbit-container{

        width:250px;

        height:250px;

    }

    .orbit-ring-outer{

        width:190px;

        height:190px;

    }

    .orbit-ring-inner{

        width:125px;

        height:125px;

    }

    .orbit-core{

        width:68px;

        height:68px;

    }

    .gpt-card{

        padding:20px;

    }

}

}



      `}</style>

{/* =====================================================
        SECTION 04+05 V2 - PART 1.1
===================================================== */}

<section className="relative border-b border-white/10 bg-black">

    <div
className="
max-w-[1700px]
mx-auto

px-4
sm:px-6
lg:px-10
xl:px-14

py-[clamp(70px,8vw,110px)]
"
>

        <div
className="
grid

grid-cols-1
xl:grid-cols-20

gap-16
xl:gap-20
"
>

            {/* =========================
                    LEFT
            ========================= */}

            <div
className="
col-span-1
xl:col-span-9
"
>

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

            <div
className="
col-span-1
xl:col-span-11
"
>

                <div className="
flex
items-center

gap-4
sm:gap-6

mb-8
lg:mb-10
">

                    <span className="text-white text-lg">
                        05
                    </span>

                    <div className="flex-1 h-px bg-white/10"></div>

                </div>

                <h2 className="section45-heading">

                    INSIDE MY AI STACK.

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

    </main>
  )
}