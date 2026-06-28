"use client";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function AboutPage() {

  const [aboutId, setAboutId] =
    useState(null);

  const [heading, setHeading] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ===========================
  // FETCH ABOUT
  // ===========================

  const fetchAbout = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "about")
        );

      if (!snapshot.empty) {

        const about =
          snapshot.docs[0];

        const data =
          about.data();

        setAboutId(
          about.id
        );

        setHeading(
          data.heading || ""
        );

        setDescription(
          data.description || ""
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchAbout();

  }, []);

  // ===========================
  // SAVE / UPDATE
  // ===========================

  const handleSave = async () => {

    if (
      !heading ||
      !description
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      const aboutData = {

        heading,

        description,

      };

      if (aboutId) {

        await updateDoc(

          doc(
            db,
            "about",
            aboutId
          ),

          aboutData

        );

        alert(
          "About updated successfully."
        );

      } else {

        await addDoc(

          collection(
            db,
            "about"
          ),

          aboutData

        );

        alert(
          "About created successfully."
        );

      }

      fetchAbout();

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong."
      );

    }

    setLoading(false);

  };
    return (

    <main className="max-w-5xl">

      {/* Heading */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">
          About Section
        </h1>

        <p className="text-white/50 mt-3">
          Manage your website about section.
        </p>

      </div>

      {/* ABOUT HEADING */}

      <div className="mb-8">

        <label className="block mb-3 text-white/60">
          About Heading
        </label>

        <input
          type="text"
          value={heading}
          onChange={(e) =>
            setHeading(e.target.value)
          }
          placeholder="I design modern visuals that make brands look premium and memorable."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* DESCRIPTION */}

      <div className="mb-10">

        <label className="block mb-3 text-white/60">
          Description
        </label>

        <textarea
          rows={8}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Write about yourself..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
        />

      </div>

      {/* SAVE BUTTON */}

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-60"
      >

        {loading
          ? "Please wait..."
          : aboutId
          ? "Update About"
          : "Save About"}

      </button>

    </main>

  );

}