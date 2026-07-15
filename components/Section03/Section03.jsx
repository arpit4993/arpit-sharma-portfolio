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

    </main>
  )
}