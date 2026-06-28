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

export default function ServicesPage() {

  const [services, setServices] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // FETCH SERVICES
  // ==========================

  const fetchServices =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "services"
            )
          );

        const data =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setServices(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchServices();

  }, []);

  // ==========================
  // DELETE SERVICE
  // ==========================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete this service?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(

          doc(
            db,
            "services",
            id
          )

        );

        fetchServices();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed."
        );

      }

    };

  // ==========================
  // EDIT SERVICE
  // ==========================

  const handleEdit =
    (service) => {

      setEditingId(
        service.id
      );

      setTitle(
        service.title
      );

      setDescription(
        service.description
      );

    };
      // ==========================
  // RESET FORM
  // ==========================

  const resetForm = () => {

    setEditingId(null);

    setTitle("");

    setDescription("");

  };

  // ==========================
  // SAVE SERVICE
  // ==========================

  const handleSave = async () => {

    if (
      !title ||
      !description
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      await addDoc(

        collection(
          db,
          "services"
        ),

        {

          title,

          description,

        }

      );

      alert(
        "Service added successfully."
      );

      resetForm();

      fetchServices();

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong."
      );

    }

    setLoading(false);

  };

  // ==========================
  // UPDATE SERVICE
  // ==========================

  const handleUpdate = async () => {

    if (!editingId) return;

    if (
      !title ||
      !description
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      await updateDoc(

        doc(
          db,
          "services",
          editingId
        ),

        {

          title,

          description,

        }

      );

      alert(
        "Service updated successfully."
      );

      resetForm();

      fetchServices();

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

      {/* HEADING */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">
          Services
        </h1>

        <p className="text-white/50 mt-3">
          Manage your website services.
        </p>

      </div>

      {/* FORM */}

      <div className="border border-white/10 bg-white/[0.03] rounded-3xl p-8 mb-14">

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Service Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Brand Identity"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        <div className="mb-10">

          <label className="block mb-3 text-white/60">
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Premium branding systems that create a strong and memorable visual identity."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
          />

        </div>

        <div className="flex gap-5">

          <button
            onClick={
              editingId
                ? handleUpdate
                : handleSave
            }
            disabled={loading}
            className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
          >

            {loading
              ? "Please wait..."
              : editingId
              ? "Update Service"
              : "Add Service"}

          </button>

          {editingId && (

            <button
              onClick={resetForm}
              className="border border-white/20 px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              Cancel
            </button>

          )}

        </div>

      </div>

      {/* ALL SERVICES */}

      <div>

        <h2 className="text-4xl font-black mb-10">
          All Services
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

          {services.map((service) => (

            <div
              key={service.id}
              className="border border-white/10 rounded-3xl bg-white/[0.03] p-8"
            >

              <h3 className="text-2xl font-black mb-4">
                {service.title}
              </h3>

              <p className="text-white/60 leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    handleEdit(service)
                  }
                  className="bg-blue-500 px-6 py-3 rounded-2xl font-bold"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(service.id)
                  }
                  className="bg-red-500 px-6 py-3 rounded-2xl font-bold"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

          {services.length === 0 && (

            <div className="border border-dashed border-white/10 rounded-3xl p-14 text-center text-white/40 lg:col-span-2">
              No services added yet.
            </div>

          )}

        </div>

      </div>

    </main>

  );

}