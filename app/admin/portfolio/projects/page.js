"use client";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  arrayRemove,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function PortfolioProjectsPage() {

  const [projects, setProjects] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [coverImage, setCoverImage] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [videos, setVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // IMAGE UPLOAD
  // ==========================

  const uploadImage = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      process.env
        .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    formData.append(
      "cloud_name",
      process.env
        .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    );

    const response =
      await fetch(

        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,

        {
          method: "POST",
          body: formData,
        }

      );

      const data = await response.json();

console.log("Cloudinary Response:", data);

if (!response.ok) {
  throw new Error(
    data.error?.message || "Cloudinary Upload Failed"
  );
}

if (!data.secure_url) {
  throw new Error(
    "secure_url not found. Cloudinary did not return an image URL."
  );
}

return data.secure_url;

  };

  // ==========================
  // VIDEO UPLOAD
  // ==========================

  const uploadVideo = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      process.env
        .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response =
      await fetch(

        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,

        {
          method: "POST",
          body: formData,
        }

      );

    const data =
      await response.json();

    return data.secure_url;

  };

  // ==========================
  // COVER IMAGE
  // ==========================

  const handleCoverUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setLoading(true);

      try {

        const url =
          await uploadImage(file);

          console.log("Gallery URL:", url);

        setCoverImage(url);

      } catch (error) {

        console.log(error);

        alert(
          "Image upload failed."
        );

      }

      setLoading(false);

    };

  // ==========================
  // GALLERY IMAGES
  // ==========================

  const handleGalleryUpload =
    async (e) => {

      const files =
        Array.from(e.target.files);

      if (!files.length) return;

      setLoading(true);

      try {

        const uploaded = [];

        for (const file of files) {

          const url =
            await uploadImage(file);

          if (!url) {
  throw new Error("Gallery image URL is undefined.");
}

          uploaded.push(url);

        }

        setImages(prev => [...prev, ...uploaded]);

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    };

  // ==========================
  // VIDEO GALLERY
  // ==========================

  const handleVideoUpload =
    async (e) => {

      const files =
        Array.from(e.target.files);

      if (!files.length) return;

      setLoading(true);

      try {

        const uploaded = [];

        for (const file of files) {

          const url =
            await uploadVideo(file);

          uploaded.push(url);

        }

        setVideos(prev => [...prev, ...uploaded]);

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    };

  // ==========================
  // FETCH CATEGORIES
  // ==========================

  const fetchCategories =
    async () => {

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

      setCategories(data);

    };

  // ==========================
  // FETCH PROJECTS
  // ==========================

  const fetchProjects =
    async () => {

      const snapshot =
        await getDocs(
          collection(
            db,
            "portfolioProjects"
          )
        );

      const data =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      setProjects(data);

    };

  useEffect(() => {

    fetchCategories();

    fetchProjects();

  }, []);
    // ==========================
  // RESET FORM
  // ==========================

  const resetForm = () => {

    setEditingId(null);

    setTitle("");

    setDescription("");

    setCategory("");

    setCoverImage("");

    setImages([]);

    setVideos([]);

  };

  // ==========================
  // SAVE PROJECT
  // ==========================

  const handleSave = async () => {

    const q = query(
  collection(db, "portfolioProjects"),
  where("category", "==", category)
);

const snapshot = await getDocs(q);

const isExisting = !snapshot.empty;

if (
  !isExisting &&
  (
    !title ||
    !description ||
    !category ||
    !coverImage
  )
) {
  alert("Please fill all fields.");
  return;
}

    if (
      category !== "video-editing" &&
      images.length === 0
    ) {

      alert(
        "Please upload gallery images."
      );

      return;

    }

    if (
      category === "video-editing" &&
      videos.length === 0
    ) {

      alert(
        "Please upload videos."
      );

      return;

    }

    try {

      setLoading(true);

      const q = query(
  collection(db, "portfolioProjects"),
  where("category", "==", category)
);

const snapshot = await getDocs(q);

      if (!snapshot.empty) {

  const projectRef = doc(
    db,
    "portfolioProjects",
    snapshot.docs[0].id
  );

  if (category === "video-editing") {

    await updateDoc(projectRef, {
      videos: arrayUnion(...videos),
    });

  } else {

    await updateDoc(projectRef, {
      images: arrayUnion(...images),
    });

  }

  alert("Project updated successfully.");

} else {

  await addDoc(
    collection(db, "portfolioProjects"),
    {
      title,
      description,
      category,
      coverImage,
      images,
      videos,
    }
  );

  alert("Project added successfully.");

}

      resetForm();

      fetchProjects();

    } catch (error) {
  console.error("Full Error:", error);

  alert(
    error?.message ||
    error?.toString() ||
    "Unknown Error"
  );
}

    setLoading(false);

  };

  // ==========================
  // UPDATE PROJECT
  // ==========================

  const handleUpdate = async () => {

    if (!editingId) return;

    if (
      !title ||
      !description ||
      !category ||
      !coverImage
    ) {

      alert("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      await updateDoc(

        doc(
          db,
          "portfolioProjects",
          editingId
        ),

        {

          title,

          description,

          category,

          coverImage,

          images,

          videos,

        }

      );

      alert(
        "Project updated successfully."
      );

      resetForm();

      fetchProjects();

    } catch (error) {

      console.log(error);

      alert(
        "Update failed."
      );

    }

    setLoading(false);

  };
    // ==========================
  // DELETE PROJECT
  // ==========================

  const handleDelete = async (id) => {

    const confirmDelete =
      confirm(
        "Delete this project?"
      );

    if (!confirmDelete)
      return;

    try {

      await deleteDoc(

        doc(
          db,
          "portfolioProjects",
          id
        )

      );

      fetchProjects();

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed."
      );

    }

  };

  // ==========================
  // DELETE GALLERY IMAGE
  // ==========================

  const deleteGalleryImage =
    async (
      projectId,
      imageUrl
    ) => {

      const confirmDelete =
        confirm(
          "Delete this image?"
        );

      if (!confirmDelete)
        return;

      try {

        await updateDoc(

          doc(
            db,
            "portfolioProjects",
            projectId
          ),

          {

            images:
              arrayRemove(
                imageUrl
              ),

          }

        );

        fetchProjects();

      } catch (error) {

        console.log(error);

        alert(
          "Image delete failed."
        );

      }

    };

  // ==========================
  // DELETE VIDEO
  // ==========================

  const deleteVideo =
    async (
      projectId,
      videoUrl
    ) => {

      const confirmDelete =
        confirm(
          "Delete this video?"
        );

      if (!confirmDelete)
        return;

      try {

        await updateDoc(

          doc(
            db,
            "portfolioProjects",
            projectId
          ),

          {

            videos:
              arrayRemove(
                videoUrl
              ),

          }

        );

        fetchProjects();

      } catch (error) {

        console.log(error);

        alert(
          "Video delete failed."
        );

      }

    };

  // ==========================
  // EDIT PROJECT
  // ==========================

  const handleEdit =
    (project) => {

      setEditingId(
        project.id
      );

      setTitle(
        project.title
      );

      setDescription(
        project.description
      );

      setCategory(
        project.category
      );

      setCoverImage(
        project.coverImage
      );

      setImages(
        project.images || []
      );

      setVideos(
        project.videos || []
      );

      window.scrollTo({

        top: 0,

        behavior: "smooth",

      });

    };
      return (

    <main className="max-w-7xl">

      {/* HEADING */}

      <div className="mb-12">

        <h1 className="text-5xl font-black">
          Portfolio Projects
        </h1>

        <p className="text-white/50 mt-3">
          Manage your portfolio projects.
        </p>

      </div>

      {/* FORM */}

      <div className="border border-white/10 bg-white/[0.03] rounded-3xl p-8 mb-14">

        {/* TITLE */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Project Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Retail Branding"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
          />

        </div>

        {/* DESCRIPTION */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
          />

        </div>

        {/* CATEGORY */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >

            <option value="">
              Select Category
            </option>

            {categories.map((item) => (

              <option
                key={item.id}
                value={item.slug}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>

        {/* COVER IMAGE */}

        <div className="mb-10">

          <label className="block mb-3 text-white/60">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleCoverUpload
            }
          />

          {coverImage && (

            <img
              src={coverImage}
              alt=""
              className="mt-6 h-72 rounded-3xl border border-white/10 object-cover"
            />

          )}

        </div>
                {/* GALLERY IMAGES */}

        {category !== "video-editing" && (

          <div className="mb-10">

            <label className="block mb-3 text-white/60">
              Gallery Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
            />

            {images.length > 0 && (

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                {images.map((image, index) => (

                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="w-full h-40 object-cover rounded-2xl border border-white/10"
                  />

                ))}

              </div>

            )}

          </div>

        )}

        {/* VIDEOS */}

        {category === "video-editing" && (

          <div className="mb-10">

            <label className="block mb-3 text-white/60">
              Videos
            </label>

            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              multiple
              onChange={handleVideoUpload}
            />

            {videos.length > 0 && (

              <div className="grid md:grid-cols-2 gap-6 mt-6">

                {videos.map((video, index) => (

                  <video
                    key={index}
                    src={video}
                    controls
                    className="w-full rounded-2xl border border-white/10"
                  />

                ))}

              </div>

            )}

          </div>

        )}

        {/* BUTTONS */}

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
              ? "Update Project"
              : "Add Project"}

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
            {/* ALL PROJECTS */}

      <div>

        <h2 className="text-4xl font-black mb-10">
          All Projects
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

          {projects.map((project) => (

            <div
              key={project.id}
              className="border border-white/10 rounded-3xl bg-white/[0.03] overflow-hidden"
            >

              {/* COVER */}

              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-72 object-cover"
              />

              <div className="p-8">

                <h3 className="text-3xl font-black mb-4">
                  {project.title}
                </h3>

                <p className="text-white/60 leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="inline-block bg-white text-black px-5 py-2 rounded-full text-sm font-bold mb-8">
                  {
                    categories.find(
                      (item) =>
                        item.slug ===
                        project.category
                    )?.name || project.category
                  }
                </div>

                {/* GALLERY */}

                {project.category !==
                  "video-editing" && (

                  <div className="grid grid-cols-3 gap-3 mb-8">

                    {(project.images || [])
                      .map(
                        (
                          image,
                          index
                        ) => (

                          <div
                            key={index}
                            className="relative"
                          >

                            <img
                              src={image}
                              alt=""
                              className="w-full h-24 rounded-xl object-cover"
                            />

                            <button
                              onClick={() =>
                                deleteGalleryImage(
                                  project.id,
                                  image
                                )
                              }
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-xs"
                            >
                              ×
                            </button>

                          </div>

                        )
                      )}

                  </div>

                )}

                {/* VIDEOS */}

                {project.category ===
                  "video-editing" && (

                  <div className="grid gap-4 mb-8">

                    {(project.videos || [])
                      .map(
                        (
                          video,
                          index
                        ) => (

                          <div
                            key={index}
                            className="relative"
                          >

                            <video
                              src={video}
                              controls
                              className="w-full rounded-2xl"
                            />

                            <button
                              onClick={() =>
                                deleteVideo(
                                  project.id,
                                  video
                                )
                              }
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-xs"
                            >
                              ×
                            </button>

                          </div>

                        )
                      )}

                  </div>

                )}
                                  <button
                    onClick={() =>
                      handleEdit(project)
                    }
                    className="bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(project.id)
                    }
                    className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold"
                  >
                    Delete
                  </button>

                </div>

              </div>

          ))}

          {projects.length === 0 && (

            <div className="lg:col-span-2 border border-dashed border-white/10 rounded-3xl p-16 text-center">

              <h3 className="text-3xl font-black mb-4">
                No Projects Found
              </h3>

              <p className="text-white/50">
                Add your first portfolio project.
              </p>

            </div>

          )}

        </div>

      </div>

    </main>

  );

}