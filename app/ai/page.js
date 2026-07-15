"use client"

import Section01 from "@/components/Section01/Section01";
import Section02 from "@/components/Section02/Section02";
import Section03 from "@/components/Section03/Section03";
import Section04 from "@/components/Section04/Section04";
import Section06 from "@/components/Section06/Section06";
import Section07 from "@/components/Section07/Section07";

import { useEffect, useState } from "react"

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