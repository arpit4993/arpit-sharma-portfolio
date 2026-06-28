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

export default function ContactPage() {

  const [contactId, setContactId] =
    useState(null);

  const [whatsapp, setWhatsapp] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // FETCH CONTACT
  // ==========================

  const fetchContact =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "contact"
            )
          );

        if (!snapshot.empty) {

          const contact =
            snapshot.docs[0];

          const data =
            contact.data();

          setContactId(
            contact.id
          );

          setWhatsapp(
            data.whatsapp || ""
          );

          setEmail(
            data.email || ""
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchContact();

  }, []);

  // ==========================
  // SAVE / UPDATE
  // ==========================

  const handleSave =
    async () => {

      if (
        !whatsapp ||
        !email
      ) {

        alert(
          "Please fill all fields."
        );

        return;

      }

      try {

        setLoading(true);

        const contactData = {

          whatsapp,

          email,

        };

        if (contactId) {

          await updateDoc(

            doc(
              db,
              "contact",
              contactId
            ),

            contactData

          );

          alert(
            "Contact updated successfully."
          );

        } else {

          await addDoc(

            collection(
              db,
              "contact"
            ),

            contactData

          );

          alert(
            "Contact created successfully."
          );

        }

        fetchContact();

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
          Contact
        </h1>

        <p className="text-white/50 mt-3">
          Manage your contact information.
        </p>

      </div>

      {/* FORM */}

      <div className="border border-white/10 bg-white/[0.03] rounded-3xl p-8">

        {/* WHATSAPP */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            WhatsApp Link
          </label>

          <input
            type="text"
            value={whatsapp}
            onChange={(e) =>
              setWhatsapp(
                e.target.value
              )
            }
            placeholder="https://wa.me/911234567890"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* EMAIL */}

        <div className="mb-10">

          <label className="block mb-3 text-white/60">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="example@gmail.com"
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
            : contactId
            ? "Update Contact"
            : "Save Contact"}

        </button>

      </div>

    </main>

  );

}