"use client"

import Section01 from "@/components/Section01/Section01";
import Section02 from "@/components/Section02/Section02";
import Section03 from "@/components/Section03/Section03";
import Section04 from "@/components/Section04/Section04";
import Section06 from "@/components/Section06/Section06";
import Section07 from "@/components/Section07/Section07";

import { useEffect, useState } from "react"

import { Menu, X } from "lucide-react";

import Link from "next/link";

import {
  collection,
  getDocs,
  limit,
  query,

} from "firebase/firestore"

import { db } from "@/lib/firebase"


export default function HomePage() {
  const [hero, setHero] = useState(null)
  const [footer, setFooter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {

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

const loadData = async () => {
  try {
    await Promise.all([
      fetchHero(),
      fetchFooter(),
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

loadData();

return () => {};

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

      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center">
          
          <div className="flex items-center justify-between w-full md:w-auto">
          
          <Link href="/#top" className="text-2xl font-bold">
            {hero?.name || "Gokul Grover"}
          </Link>

          <button
  onClick={() => setMobileMenu(true)}
  className="md:hidden text-white"
>
  <Menu size={30} />
</button>

</div>

          <nav className="hidden md:flex items-center gap-10 ml-auto text-sm uppercase tracking-wide text-white/80">

  <Link href="/#about">About</Link>

  <Link href="/#experience">Experience</Link>

  <Link href="/#services">Core Expertise</Link>

  <Link href="/#portfolio">Portfolio</Link>

  <Link href="/#contact">Contact</Link>

  <a
    href="/ai"
    className="bg-[#F2D14B] text-black px-5 py-2 rounded-md font-black text-xs tracking-[0.18em] uppercase hover:bg-[#ffe45a] transition-all duration-300"
  >
    AI INTEGRATION
  </a>

</nav>

        <div className="hidden md:flex items-center gap-4 ml-10">
          <Link
  href="/#contact"
  className="hidden sm:flex bg-white text-black px-5 sm:px-8 py-3 rounded-full font-semibold text-sm sm:text-base"
>
            Let’s Talk
          </Link>
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

<Link
href="/#about"
onClick={()=>setMobileMenu(false)}
>
About
</Link>

<Link
href="/#experience"
onClick={()=>setMobileMenu(false)}
>
Experience
</Link>
<Link
href="/#services"
onClick={()=>setMobileMenu(false)}
>
Core Expertise
</Link>

<Link
href="/#portfolio"
onClick={()=>setMobileMenu(false)}
>
Portfolio
</Link>

<Link
href="/#contact"
onClick={()=>setMobileMenu(false)}
>
Contact
</Link>

<Link
href="/ai"
onClick={()=>setMobileMenu(false)}
className="text-yellow-400"
>
AI Integration
</Link>

<div className="w-full px-8 pt-6">

  <Link
    href="#contact"
    onClick={() => setMobileMenu(false)}
    className="w-full flex justify-center items-center bg-white text-black rounded-full py-4 font-bold text-lg"
  >
    Let’s Talk
  </Link>

</div>

</nav>

</div>

)}

      <Section01 />

      <Section02 />

      <Section03 />

      <Section04 />

      <Section06 />

      <Section07 />


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