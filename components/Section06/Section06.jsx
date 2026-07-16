"use client"

import { Package, ArrowRight } from "lucide-react";

import { Car } from "lucide-react";

import { PlayCircle } from "lucide-react";

import { Crosshair } from "lucide-react";

import { useEffect } from "react"


export default function Section06() {

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
      SECTION 06 - PART 1.1
===================================================== */

/* ---------- SECTION ---------- */

.section06{

    position:relative;

    width:100%;

    padding:clamp(70px,8vw,110px) 0 0;

}

/* ---------- CONTAINER ---------- */

.section06 .container{

    max-width:1680px;

    margin:0 auto;

    padding:0 clamp(16px,4vw,48px);

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

    margin:0 0 clamp(28px,5vw,44px);

    font-size:clamp(30px,6vw,34px);

    font-weight:700;

    line-height:1;

    letter-spacing:-.03em;

    color:#ffffff;

}

/* ---------- GRID ---------- */

.section06-grid{

    display:grid;

    grid-template-columns:repeat(4,minmax(0,1fr));

    gap:clamp(16px,2vw,22px);

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
      SECTION 06 RESPONSIVE PART 1
===================================================== */

@media (max-width:1023px){

.section06-grid{

    grid-template-columns:1fr;

}

.section06-top{

    gap:14px;

}

.section06-heading{

    text-align:left;

}

}

      `}</style>

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

    </main>
  )
}