"use client"

import {
  Search,
  Target,
  Lightbulb,
} from "lucide-react";


export default function Section02() {

  return (
    <main>

      <style>{`


  /* =====================================================
        SECTION 02 - PART 5.1
===================================================== */

.ai-stat-card{

    position:relative;

    min-width:0;

    min-height:clamp(300px,60vw,340px);

    height:auto;

    border-radius:clamp(18px,2vw,24px);

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

    padding:clamp(18px,4vw,28px);

    display:flex;

    flex-direction:column;

}

.stat-icon{

    display:flex;

    align-items:center;

    margin-bottom:clamp(18px,4vw,28px);

}

.stat-number{

    margin-top:0px;

    font-size:clamp(42px,12vw,78px);

    line-height:1;

    font-weight:300;

    letter-spacing:clamp(-2px,-0.4vw,-4px);

    color:white;

}

.stat-number span{

    font-size:clamp(28px,5vw,42px);

    font-weight:200;

    color:#d8d8d8;

}

.stat-heading{

    margin-top:clamp(12px,2vw,16px);

    font-size:clamp(13px,2vw,15px);

    letter-spacing:.12em;

    font-weight:700;

    color:white;

    text-transform:uppercase;

}

.stat-description{

    margin-top:clamp(10px,2vw,14px);

    font-size:clamp(14px,2vw,15px);

    line-height:1.65;

    color:#8b8b8b;

    width:100%;
    max-width:100%;
    min-width:0;

    overflow-wrap:anywhere;

    flex:1;

    padding-bottom:72px;

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

    left:-10%;

    bottom:-55px;

    width:120%;

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

    bottom:20px;

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

    width:clamp(40px,8vw,48px);

    height:clamp(40px,8vw,48px);

    border-radius:clamp(10px,2vw,14px);

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

    transform:translateY(clamp(-4px,-1vw,-8px));

    border-color:rgba(160,120,255,.22);

    box-shadow:
        0 16px 42px rgba(0,0,0,.32),
        0 0 34px rgba(130,90,255,.08);

}

.stat-icon-circle{

    transition:
        transform .35s ease,
        border-color .35s ease,
        box-shadow .35s ease;

}

.ai-stat-card:hover .stat-icon-circle{

    transform:scale(1.05);

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

    border-radius:clamp(18px,3vw,24px);

}

.card-reflection::before{

    content:"";

    position:absolute;

    top:-40px;

    left:-120px;

    width:clamp(40px,8vw,60px);

    height:120%;

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

    width:clamp(16px,3vw,18px);

    height:clamp(16px,3vw,18px);

}

/* ----------------------- */

.ai-stat-card:hover .stat-icon-circle svg{

    transform:scale(1.05);

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

@media (max-width:640px){

.ai-stat-card{

    width:100%;
    max-width:310px;
    margin:0 auto;
    padding:18px;

}

}

@media (max-width:640px){

.card-bottom-glow{

    bottom:-42px;

    height:92px;

}

}

@media (max-width:640px){

.card-light-line{

    bottom:16px;

    height:42px;

}

}

@media (max-width:640px){

    .stat-description{

        padding-bottom:52px;

    }

}

@media (max-width:640px){

  .ai-stat-card{
      width:100%;
      align-items:center;
      text-align:center;
  }

  .stat-icon{
      width:100%;
      justify-content:center;
  }

  .stat-number,
  .stat-heading,
  .stat-description{
      text-align:center;
      width:100%;
  }

}

      `}</style>

{/* =====================================================
        SECTION 02 - PART 5.1
===================================================== */}

<section className="relative border-b border-white/10 bg-black">

  <div className="
max-w-[1600px]
mx-auto

px-3
sm:px-6
lg:px-10
xl:px-14
py-[clamp(60px,8vw,96px)]
">

    <div className="
grid
grid-cols-1
lg:grid-cols-12
gap-10
lg:gap-12
items-start
">

      {/* ================= LEFT ================= */}

      <div className="
col-span-12
lg:col-span-3

flex
flex-col
justify-center
">

        <div className="
flex
items-center

gap-4
sm:gap-6

mb-8
lg:mb-10
">

          <span className="text-white text-lg font-light">
            02
          </span>

          <div className="h-px flex-1 bg-white/10"></div>

        </div>

        <h3
  className="
    text-white
    uppercase
    font-black

    w-full

    text-[clamp(22px,8vw,50px)]

    leading-[0.95]

    tracking-[-0.03em]

    break-words

    max-w-full
  "
>
  I DON'T USE AI TO CREATE.
  <br className="hidden lg:block" />
  {" "}
  I USE AI TO EXPLORE MORE.
</h3>

      </div>

      {/* ================= RIGHT ================= */}

      <div
  className="
    col-span-12
    lg:col-span-9

    min-w-0
    w-full

    overflow-hidden
  "
>

        <div
  className="
grid

w-full

grid-cols-1
sm:grid-cols-2
xl:grid-cols-3

gap-[clamp(16px,3vw,32px)]

place-items-center

mx-auto

max-w-full
"
>

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

    </main>
  )
}