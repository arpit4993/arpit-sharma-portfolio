"use client"

import { useEffect } from "react"

export default function Section07() {

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

    </main>
  )
}