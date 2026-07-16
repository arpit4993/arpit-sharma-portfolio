"use client"

import {
  FileText,
  Search,
  Lightbulb,
  Image,
  User,
  Send
} from "lucide-react";


export default function Section03() {

  return (
    <main>
      <style>{`

  /* =====================================================
        SECTION 03 - PART 6.1
===================================================== */

.timeline-wrapper{

    position:relative;

}

.timeline-line{

    position:absolute;

    left:clamp(18px,4%,60px);

    right:clamp(18px,4%,60px);

    top:22px;

    height:1px;

    background:rgba(255,255,255,.14);

}

.timeline-grid{

    display:grid;

    grid-template-columns:repeat(7,minmax(0,1fr));

    gap:clamp(16px,2vw,24px);

    position:relative;

    z-index:2;

    width:100%;

}

.timeline-step{

    display:flex;

    justify-content:flex-start;

}

.timeline-circle{

    width:clamp(42px,5vw,46px);

    height:clamp(42px,5vw,46px);

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

    font-size:clamp(14px,1vw,15px);

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

    width:clamp(38px,5vw,42px);

    height:clamp(38px,5vw,42px);

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

    width:100%;

    max-width:100%;

    color:#8e8e8e;

    font-size:clamp(13px,1vw,14px);

    line-height:1.75;

    overflow-wrap:anywhere;

}

  /* =====================================================
        SECTION 03 - PART 6.4
===================================================== */

.timeline-icon-group{

    display:flex;

    align-items:center;

    flex-wrap:wrap;

    gap:10px;

    margin-top:18px;

}

.timeline-mini-icon{

    width:clamp(30px,4vw,34px);

    height:clamp(30px,4vw,34px);

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

    width:clamp(30px,4vw,34px);

    height:clamp(30px,4vw,34px);

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

@media (hover:none){

    .timeline-step:hover{

        transform:none;

    }

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

    padding-right:clamp(0px,1vw,18px);

    min-width:0;

}

/* -------------------------- */

.timeline-step:last-child{

    padding-right:0;

}

/* -------------------------- */

.timeline-wrapper{

    overflow:hidden;

}

@media (max-width:640px){

  .timeline-line{
      display:none;
  }

  .timeline-wrapper{
      overflow:visible;
  }

  .timeline-grid{
      display:flex;
      flex-direction:column;
      gap:42px;
      width:100%;
  }

  .timeline-step{
      width:100%;
      padding-right:0;
      align-items:flex-start;
      text-align:left;
  }

  .timeline-arrow{
      display:none;
  }

}

@media (max-width:640px){

  /* ---------- Circle ---------- */

  .timeline-circle{

      width:42px;
      height:42px;

      font-size:13px;

  }

  /* ---------- Title ---------- */

  .timeline-title{

      margin-top:14px;

      min-height:auto;

      font-size:15px;

      line-height:1.45;

      text-align:left;

  }

  /* ---------- Icons ---------- */

  .timeline-icon{

      width:40px;
      height:40px;

      margin-top:14px;

  }

  .timeline-icon-group{

      margin-top:14px;

      gap:8px;

  }

  .timeline-mini-icon,
  .timeline-mini-badge{

      width:32px;
      height:32px;

  }

  /* ---------- Description ---------- */

  .timeline-description{

      margin-top:14px;

      width:100%;
      max-width:100%;

      min-height:auto;

      font-size:14px;

      line-height:1.7;

      text-align:left;

  }

}

/* =====================================================
      SECTION 03 - RESPONSIVE (TABLET)
===================================================== */

@media (min-width:641px) and (max-width:1023px){

  .timeline-line{
      display:none;
  }

  .timeline-wrapper{
      overflow:visible;
  }

  .timeline-grid{

      display:grid;

      grid-template-columns:repeat(2,minmax(0,1fr));

      gap:40px 28px;

  }

  .timeline-step{

      padding-right:0;

  }

  .timeline-arrow{

      display:none;

  }

  .timeline-title{

      min-height:auto;

  }

  .timeline-description{

      max-width:100%;

      min-height:auto;

  }

}



      `}</style>

{/* =====================================================
        SECTION 03 - PART 6.1
===================================================== */}

<section className="relative border-b border-white/10 bg-black">

    <div
  className="
    max-w-[1600px]
    mx-auto

    px-4
    sm:px-6
    lg:px-10
    xl:px-14

    py-[clamp(60px,8vw,96px)]
  "
>

       {/* -------Heading---- */}

        <div
  className="
    flex
    items-center

    gap-4
    sm:gap-6

    mb-10
    lg:mb-16
  "
>
            <span className="text-white text-lg font-light">
                03
            </span>

            <p
className="
uppercase

tracking-[0.18em]
sm:tracking-[0.35em]

text-[11px]
sm:text-[13px]

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
        CLIENT BRIEF
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
        RESEARCH & STRATEGY
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
        CONCEPT DEVELOPMENT
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
        VISUAL PRODUCTION
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
        VIDEO PRODUCTION
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
        HUMAN REFINEMENT
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
        FINAL DELIVERY
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