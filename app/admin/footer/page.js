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

export default function FooterPage() {

  const [footerId, setFooterId] =
    useState(null);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [behance, setBehance] =
    useState("");

  const [linkedin, setLinkedin] =
    useState("");

  const [youtube, setYoutube] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // FETCH FOOTER
  // ==========================

  const fetchFooter =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "footer"
            )
          );

        if (!snapshot.empty) {

          const footer =
            snapshot.docs[0];

          const data =
            footer.data();

          setFooterId(
            footer.id
          );

          setName(
            data.name || ""
          );

          setDescription(
            data.description || ""
          );

          setBehance(
            data.behance || ""
          );

          setLinkedin(
            data.linkedin || ""
          );

          setYoutube(
            data.youtube || ""
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchFooter();

  }, []);

  // ==========================
  // SAVE / UPDATE
  // ==========================

  const handleSave =
    async () => {

      if (
        !name ||
        !description
      ) {

        alert(
          "Please fill all required fields."
        );

        return;

      }

      try {

        setLoading(true);

        const footerData = {

          name,

          description,

          instagram,

          behance,

          linkedin,

          youtube,

        };

        if (footerId) {

          await updateDoc(

            doc(
              db,
              "footer",
              footerId
            ),

            footerData

          );

          alert(
            "Footer updated successfully."
          );

        } else {

          await addDoc(

            collection(
              db,
              "footer"
            ),

            footerData

          );

          alert(
            "Footer created successfully."
          );

        }

        fetchFooter();

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

      {/* HEADING */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">
          Footer
        </h1>

        <p className="text-white/50 mt-3">
          Manage your website footer.
        </p>

      </div>

      {/* FORM */}

      <div className="border border-white/10 bg-white/[0.03] rounded-3xl p-8">

        {/* NAME */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Gokul Grover"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* DESCRIPTION */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Graphic Designer focused on branding..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
          />

        </div>

        {/* BEHANCE */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Behance URL
          </label>

          <input
            type="text"
            value={behance}
            onChange={(e) =>
              setBehance(e.target.value)
            }
            placeholder="https://behance.net/username"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* LINKEDIN */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            LinkedIn URL
          </label>

          <input
            type="text"
            value={linkedin}
            onChange={(e) =>
              setLinkedin(e.target.value)
            }
            placeholder="https://linkedin.com/in/username"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-60"
        >

          {loading
            ? "Please wait..."
            : footerId
            ? "Update Footer"
            : "Save Footer"}

        </button>

      </div>

    </main>

  );

}