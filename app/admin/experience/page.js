"use client";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function ExperiencePage() {

  const [experiences, setExperiences] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [year, setYear] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // FETCH EXPERIENCE
  // ==========================

  const fetchExperiences =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "experience"
            )
          );

        const data =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        data.sort(
          (a, b) =>
            Number(a.year) -
            Number(b.year)
        );

        setExperiences(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchExperiences();

  }, []);

  // ==========================
  // DELETE
  // ==========================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete this experience?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(
          doc(
            db,
            "experience",
            id
          )
        );

        fetchExperiences();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed."
        );

      }

    };

  // ==========================
  // EDIT
  // ==========================

  const handleEdit =
    (item) => {

      setEditingId(
        item.id
      );

      setYear(
        item.year
      );

      setCompany(
        item.company
      );

      setRole(
        item.role
      );

      setDuration(
        item.duration
      );

    };
      // ==========================
  // RESET FORM
  // ==========================

  const resetForm = () => {

    setEditingId(null);

    setYear("");

    setCompany("");

    setRole("");

    setDuration("");

  };

  // ==========================
  // SAVE
  // ==========================

  const handleSave = async () => {

    if (
      !year ||
      !company ||
      !role ||
      !duration
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      await addDoc(

        collection(
          db,
          "experience"
        ),

        {

          year,

          company,

          role,

          duration,

        }

      );

      alert(
        "Experience added successfully."
      );

      resetForm();

      fetchExperiences();

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong."
      );

    }

    setLoading(false);

  };

  // ==========================
  // UPDATE
  // ==========================

  const handleUpdate = async () => {

    if (!editingId) return;

    if (
      !year ||
      !company ||
      !role ||
      !duration
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      await updateDoc(

        doc(
          db,
          "experience",
          editingId
        ),

        {

          year,

          company,

          role,

          duration,

        }

      );

      alert(
        "Experience updated successfully."
      );

      resetForm();

      fetchExperiences();

    } catch (error) {

      console.log(error);

      alert(
        "Update failed."
      );

    }

    setLoading(false);

  };
    return (

    <main className="max-w-6xl">

      {/* Heading */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">
          Experience
        </h1>

        <p className="text-white/50 mt-3">
          Manage your experience timeline.
        </p>

      </div>

      {/* FORM */}

      <div className="border border-white/10 rounded-3xl bg-white/[0.03] p-8 mb-14">

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-3 text-white/60">
              Year
            </label>

            <input
              type="text"
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
              placeholder="2023"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <div>

            <label className="block mb-3 text-white/60">
              Duration
            </label>

            <input
              type="text"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              placeholder="2023 - Present"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

        </div>

        <div className="mt-6">

          <label className="block mb-3 text-white/60">
            Company
          </label>

          <input
            type="text"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            placeholder="TVS Automobile Solutions Pvt. Ltd."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <div className="mt-6">

          <label className="block mb-3 text-white/60">
            Designation
          </label>

          <input
            type="text"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            placeholder="Graphic Designer"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <button
          onClick={
            editingId
              ? handleUpdate
              : handleSave
          }
          disabled={loading}
          className="mt-8 bg-white text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-60"
        >

          {loading
            ? "Please wait..."
            : editingId
            ? "Update Experience"
            : "Add Experience"}

        </button>

      </div>

      {/* EXPERIENCE LIST */}

      <div>

        <h2 className="text-3xl font-black mb-8">
          Experience List
        </h2>

        <div className="space-y-6">

          {experiences.map((item) => (

            <div
              key={item.id}
              className="border border-white/10 bg-white/[0.03] rounded-3xl p-7"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                <div>

                  <span className="text-sm uppercase tracking-[0.2em] text-white/40">
                    {item.duration}
                  </span>

                  <h3 className="text-3xl font-black mt-3">
                    {item.company}
                  </h3>

                  <p className="text-white/60 mt-2">
                    {item.role}
                  </p>

                  <div className="mt-5 inline-flex bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
                    {item.year}
                  </div>

                </div>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                    className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-2xl font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="bg-red-600 hover:bg-red-700 transition-all px-6 py-3 rounded-2xl font-bold"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

          {experiences.length === 0 && (

            <div className="border border-dashed border-white/10 rounded-3xl p-12 text-center text-white/40">

              No experience added yet.

            </div>

          )}

        </div>

      </div>

    </main>

  );

}