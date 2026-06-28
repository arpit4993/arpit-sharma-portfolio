"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function PortfolioCategoriesPage() {

  const [categories, setCategories] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // CREATE SLUG
  // ==========================

  const createSlug = (text) => {

    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  };

  // ==========================
  // FETCH CATEGORIES
  // ==========================

  const fetchCategories =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "portfolioCategories"
            )
          );

        const data =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),

            })
          );

        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCategories(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchCategories();

  }, []);

  // ==========================
  // DELETE CATEGORY
  // ==========================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        confirm(
          "Delete this category?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(

          doc(
            db,
            "portfolioCategories",
            id
          )

        );

        fetchCategories();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed."
        );

      }

    };

  // ==========================
  // EDIT CATEGORY
  // ==========================

  const handleEdit =
    (category) => {

      setEditingId(
        category.id
      );

      setName(
        category.name
      );

      window.scrollTo({

        top: 0,

        behavior: "smooth",

      });

    };
      // ==========================
  // RESET FORM
  // ==========================

  const resetForm = () => {

    setEditingId(null);

    setName("");

  };

  // ==========================
  // SAVE CATEGORY
  // ==========================

  const handleSave = async () => {

    if (!name.trim()) {

      alert("Please enter category name.");

      return;

    }

    try {

      setLoading(true);

      await addDoc(

        collection(
          db,
          "portfolioCategories"
        ),

        {

          name: name.trim(),

          slug: createSlug(name),

        }

      );

      alert(
        "Category added successfully."
      );

      resetForm();

      fetchCategories();

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong."
      );

    }

    setLoading(false);

  };

  // ==========================
  // UPDATE CATEGORY
  // ==========================

  const handleUpdate = async () => {

    if (!editingId) return;

    if (!name.trim()) {

      alert("Please enter category name.");

      return;

    }

    try {

      setLoading(true);

      await updateDoc(

        doc(
          db,
          "portfolioCategories",
          editingId
        ),

        {

          name: name.trim(),

          slug: createSlug(name),

        }

      );

      alert(
        "Category updated successfully."
      );

      resetForm();

      fetchCategories();

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
          Portfolio Categories
        </h1>

        <p className="text-white/50 mt-3">
          Manage your portfolio categories.
        </p>

      </div>

      {/* FORM */}

      <div className="border border-white/10 bg-white/[0.03] rounded-3xl p-8 mb-14">

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Retail Branding"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {name && (

          <div className="mb-10">

            <p className="text-white/50 text-sm">
              Slug
            </p>

            <p className="mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
              {createSlug(name)}
            </p>

          </div>

        )}

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
              ? "Update Category"
              : "Add Category"}

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

      {/* CATEGORY LIST */}

      <div>

        <h2 className="text-4xl font-black mb-10">
          All Categories
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

          {categories.map((category) => (

            <div
              key={category.id}
              className="border border-white/10 bg-white/[0.03] rounded-3xl p-8"
            >

              <h3 className="text-2xl font-black mb-4">
                {category.name}
              </h3>

              <p className="text-white/50 mb-8">
                {category.slug}
              </p>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    handleEdit(category)
                  }
                  className="bg-blue-500 px-6 py-3 rounded-2xl font-bold"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(category.id)
                  }
                  className="bg-red-500 px-6 py-3 rounded-2xl font-bold"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

          {categories.length === 0 && (

            <div className="lg:col-span-2 border border-dashed border-white/10 rounded-3xl p-14 text-center text-white/40">
              No categories added yet.
            </div>

          )}

        </div>

      </div>

    </main>

  );

}