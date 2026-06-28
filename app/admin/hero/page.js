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

export default function HeroPage() {

  const [heroId, setHeroId] = useState(null);

  const [name, setName] = useState("");

  const [designation, setDesignation] =
    useState("");

  const [heading, setHeading] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [projects, setProjects] =
    useState("");

  const [clients, setClients] =
    useState("");

  const [years, setYears] =
    useState("");

  const [profileImage, setProfileImage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ===========================
  // CLOUDINARY IMAGE UPLOAD
  // ===========================

  const uploadImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      process.env
        .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log("Upload Preset:", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    console.log("Status:", response.status);
    console.log("Response:", data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
  };

  // ===========================
  // HANDLE IMAGE
  // ===========================

  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setLoading(true);

    try {

      const imageUrl =
        await uploadImage(file);

      setProfileImage(imageUrl);

    } catch (error) {

      console.log(error);

      alert("Image upload failed.");

    }

    setLoading(false);

  };

  // ===========================
  // FETCH HERO DATA
  // ===========================

  const fetchHero = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "hero")
        );

      if (!snapshot.empty) {

        const hero =
          snapshot.docs[0];

        const data =
          hero.data();

        setHeroId(hero.id);

        setName(
          data.name || ""
        );

        setDesignation(
          data.designation || ""
        );

        setHeading(
          data.heading || ""
        );

        setDescription(
          data.description || ""
        );

        setProjects(
          data.projects || ""
        );

        setClients(
          data.clients || ""
        );

        setYears(
          data.years || ""
        );

        setProfileImage(
          data.profileImage || ""
        );

      } else {

  console.log("No hero document found");

  setHeroId(null);

}

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchHero();

  }, []);

  // ===========================
  // SAVE / UPDATE
  // ===========================

  const handleSave = async () => {

    console.log({
    name,
    designation,
    heading,
    description,
    projects,
    clients,
    years,
    profileImage,
  });

  console.log("heroId =", heroId);

    if (

      !name ||
      !designation ||
      !heading ||
      !description ||
      !projects ||
      !clients ||
      !years ||
      !profileImage

    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

  console.log("Step 1");

  setLoading(true);

  console.log("Step 2");

  const heroData = {
    name,
    designation,
    heading,
    description,
    projects: Number(projects),
    clients: Number(clients),
    years: Number(years),
    profileImage,
  };

  console.log("Step 3", heroData);

  if (heroId) {

    console.log("Updating document...");

    await updateDoc(
      doc(db, "hero", heroId),
      heroData
    );

    console.log("Update completed");

    alert("Hero updated successfully.");

  } else {

    console.log("Creating document...");

    await addDoc(
      collection(db, "hero"),
      heroData
    );

    console.log("Create completed");

    alert("Hero created successfully.");

  }

  console.log("Fetching latest data...");

  await fetchHero();

  console.log("Finished");

} catch (error) {

  console.error("Firestore Error:", error);

  alert(error.message);

} finally {

  setLoading(false);

}

  };

  return (

    <main className="max-w-5xl">

      <div className="mb-12">

        <h1 className="text-5xl font-black">
          Hero Section
        </h1>

        <p className="text-white/50 mt-3">
          Manage your homepage hero section.
        </p>

      </div>

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

      {/* DESIGNATION */}

      <div className="mb-8">

        <label className="block mb-3 text-white/60">
          Designation
        </label>

        <input
          type="text"
          value={designation}
          onChange={(e) =>
            setDesignation(
              e.target.value
            )
          }
          placeholder="Graphic Designer"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* HEADING */}

      <div className="mb-8">

        <label className="block mb-3 text-white/60">
          Hero Heading
        </label>

        
        <input
          type="text"
          value={heading}
          onChange={(e) =>
            setHeading(
              e.target.value
            )
          }
          placeholder="Building Visual Brands."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* DESCRIPTION */}

      <div className="mb-8">

        <label className="block mb-3 text-white/60">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
        />

      </div>

      {/* COUNTERS */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div>

          <label className="block mb-3 text-white/60">
            Projects
          </label>

          <input
            type="number"
            value={projects}
            onChange={(e) =>
              setProjects(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label className="block mb-3 text-white/60">
            Clients
          </label>

          <input
            type="number"
            value={clients}
            onChange={(e) =>
              setClients(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <div>

          <label className="block mb-3 text-white/60">
            Experience (Years)
          </label>

          <input
            type="number"
            value={years}
            onChange={(e) =>
              setYears(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

      </div>

      {/* PROFILE IMAGE */}

      <div className="mb-10">

        <label className="block mb-3 text-white/60">
          Profile Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {profileImage && (

          <img
            src={profileImage}
            alt="Profile"
            className="mt-6 w-72 rounded-3xl border border-white/10"
          />

        )}

      </div>

      {/* SAVE */}

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
      >

        {loading
          ? "Please wait..."
          : heroId
          ? "Update Hero"
          : "Save Hero"}

      </button>

    </main>

  );

}