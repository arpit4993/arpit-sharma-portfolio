"use client"

import { useState, useEffect } from "react"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"

import { db, auth } from "@/lib/firebase"

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

export default function AdminPage() {

  const [title, setTitle] = useState("")
  const [description, setDescription] =
    useState("")
  
  const [category, setCategory] =
    useState("")

  const [coverImage, setCoverImage] =
    useState("")

  const [images, setImages] = useState([])

  const [videos, setVideos] = useState([])

  const [loading, setLoading] =
    useState(false)

  const [projects, setProjects] =
  useState([])

  const [editingProject, setEditingProject] =
  useState(null)

  const [user, setUser] =
  useState(null)

  const [email, setEmail] =
  useState("")

  const [password, setPassword] =
  useState("")

  // ================= IMAGE UPLOAD =================

  const uploadImage = async (file) => {

    const formData = new FormData()

    formData.append("file", file)

    formData.append(
      "upload_preset",
      "portfolio_upload"
    )

    formData.append(
      "cloud_name",
      "duffljaex"
    )

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/duffljaex/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await response.json()

    console.log(data)

    return data.secure_url
  }

  const uploadVideo = async (file) => {

  const formData = new FormData()

  formData.append("file", file)

  formData.append(
    "upload_preset",
    "portfolio_upload"
  )

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/duffljaex/video/upload",
    {
      method: "POST",
      body: formData,
    }
  )

  const data = await response.json()

  return data.secure_url
}

  // ================= HANDLE COVER =================

  const handleCoverUpload = async (e) => {

    const file = e.target.files[0]

    if (!file) return

    setLoading(true)

    const imageUrl =
      await uploadImage(file)

    setCoverImage(imageUrl)

    setLoading(false)
  }

  // ================= HANDLE GALLERY =================

  const handleGalleryUpload = async (e) => {

    const files = Array.from(e.target.files)

    if (!files.length) return

    setLoading(true)

    const uploadedImages = []

    for (const file of files) {

      const imageUrl =
        await uploadImage(file)

      uploadedImages.push(imageUrl)
    }

    setImages(uploadedImages)

    setLoading(false)
  }

  const handleVideoUpload = async (e) => {

  const files = Array.from(e.target.files)

  if (!files.length) return

  setLoading(true)

  const uploadedVideos = []

  for (const file of files) {

    const videoUrl =
      await uploadVideo(file)

    uploadedVideos.push(videoUrl)
  }

  setVideos(uploadedVideos)

  setLoading(false)
}

  // ================= SAVE =================

    const handleSave = async () => {

      if (!category) {

        alert("Select category")
        return
      }

      try {

        setLoading(true)

        // CATEGORY CHECK

        const q = query(
          collection(db, "portfolio"),
          where("category", "==", category)
        )

        const querySnapshot =
          await getDocs(q)

        // =========================
        // CATEGORY ALREADY EXISTS
        // =========================

        if (!querySnapshot.empty) {

          const existingDoc =
            querySnapshot.docs[0]


          await updateDoc(

            doc(
              db,
              "portfolio",
              existingDoc.id
            ),

            {
              images: arrayUnion(...images),
              videos: arrayUnion(...videos),
            }
          )

          alert(
            "Gallery images added"
          )
        }

        // =========================
        // CREATE NEW CATEGORY
        // =========================

        else {

  if (category === "video-editing") {

    if (
      !title ||
      !description ||
      !coverImage ||
      videos.length === 0
    ) {

      alert("Fill all fields")

      setLoading(false)

      return
    }

  } else {

    if (
      !title ||
      !description ||
      !coverImage ||
      images.length === 0
    ) {

      alert("Fill all fields")

      setLoading(false)

      return
    }
  }

  await addDoc(
            collection(db, "portfolio"),
            {
              title,
              description,
              category,
              coverImage,
              images,
              videos,
            }
          )

          alert(
            "New category created"
          )
        }

        fetchProjects()

        setTitle("")
        setDescription("")
        setCategory("")
        setCoverImage("")
        setImages([])

        setLoading(false)

      } catch (error) {

        console.log(error)

        alert("Upload failed")

        setLoading(false)
      }
    }

  const fetchProjects = async () => {

  const querySnapshot =
    await getDocs(
      collection(db, "portfolio")
    )

  const allProjects =
    querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

  setProjects(allProjects)
}

useEffect(() => {

  fetchProjects()

}, [])

const deleteProject = async (id) => {

  const confirmDelete =
    confirm(
      "Delete this project?"
    )

  if (!confirmDelete) return

  await deleteDoc(
    doc(db, "portfolio", id)
  )

  fetchProjects()
}

  const deleteGalleryImage = async (
    projectId,
    imageUrl
  ) => {

    const confirmDelete =
      confirm(
        "Delete this image?"
      )

    if (!confirmDelete) return

    try {

      await updateDoc(
        doc(
          db,
          "portfolio",
          projectId
        ),
        {
          images: arrayRemove(
            imageUrl
          ),
        }
      )

      fetchProjects()

    } catch (error) {

      console.log(error)

      alert(
        "Image delete failed"
      )
    }
  }

  const deleteVideo = async (
  projectId,
  videoUrl
) => {

  const confirmDelete =
    confirm(
      "Delete this video?"
    )

  if (!confirmDelete) return

  try {

    await updateDoc(
      doc(
        db,
        "portfolio",
        projectId
      ),
      {
        videos: arrayRemove(
          videoUrl
        ),
      }
    )

    fetchProjects()

  } catch (error) {

    console.log(error)

    alert(
      "Video delete failed"
    )
  }
}

  const handleEdit = (project) => {

  setEditingProject(project)

  setTitle(project.title)
  setDescription(project.description)
  setCategory(project.category)
  setCoverImage(project.coverImage)
  setImages(project.images)
}

  const handleUpdate = async () => {

    if (!editingProject) return

    try {

      setLoading(true)

      await updateDoc(
        doc(
          db,
          "portfolio",
          editingProject.id
        ),
        {
          title,
          description,
          category,
          coverImage,
          images,
          videos,
        }
      )

      alert("Project updated")

      setEditingProject(null)

      setTitle("")
      setDescription("")
      setCategory("")
      setCoverImage("")
      setImages([])

      fetchProjects()

      setLoading(false)

    } catch (error) {

      console.log(error)

      alert("Update failed")

      setLoading(false)
    }
  }

const handleLogin = async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

  } catch (error) {

    console.log(error)

    alert("Invalid credentials")
  }
}

const handleLogout = async () => {

  await signOut(auth)

  setEmail("")
  setPassword("")
}

useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser)
      }
    )

  return () => unsubscribe()

}, [])

 if (!user) {

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

    <form
      onSubmit={(e) => {

        e.preventDefault()

        handleLogin()
      }}
      className="w-full max-w-md border border-white/10 bg-white/[0.03] rounded-3xl p-10"
    >

        <h1 className="text-5xl font-black mb-10 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none mb-5"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none mb-8"
        />

        <button
          type="submit"
          className="w-full bg-white text-black py-4 rounded-2xl font-black"
        >
          Login
        </button>

      </form>

    </main>
  )
}

  return (

    <main className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

<div className="flex items-center justify-between mb-14">

  <h1 className="text-5xl font-black">
    Admin Upload Panel
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-500 px-6 py-3 rounded-2xl font-bold"
  >
    Logout
  </button>

</div>

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
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            placeholder="Retail Branding"
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
              setDescription(e.target.value)
            }
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none h-32"
            placeholder="Premium showroom branding visuals"
          />

        </div>

        {/* CATEGORY */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Select Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full bg-black text-white border border-white/10 rounded-2xl px-5 py-4 outline-none"
          >

            <option value="">
              Choose Category
            </option>

            <option value="retail-branding" className="bg-black text-white">
              Retail Branding
            </option>

            <option value="packaging-design" className="bg-black text-white">
              Packaging Design
            </option>

            <option value="social-media-creative" className="bg-black text-white">
              Social Media Creative
            </option>

            <option value="poster-design" className="bg-black text-white">
              Poster Design
            </option>

            <option value="brochure-design" className="bg-black text-white">
              Brochure Design
            </option>

            <option value="logo-design" className="bg-black text-white">
              Logo Design
            </option>

            <option value="ecommerce-creative" className="bg-black text-white">
              E-Commerce Creative
            </option>

            <option value="video-editing" className="bg-black text-white">
              Video Editing
            </option>

          </select>

        </div>

        {/* COVER IMAGE */}

        <div className="mb-8">

          <label className="block mb-3 text-white/60">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
          />

          {coverImage && (

            <img
              src={coverImage}
              alt=""
              className="mt-5 rounded-2xl h-60 object-cover"
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

            <div className="grid grid-cols-2 gap-4 mt-6">

              {images.map((image, index) => (

                <img
                  key={index}
                  src={image}
                  alt=""
                  className="rounded-2xl object-cover h-48 w-full"
                />

              ))}

            </div>

          </div>

        )}

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
              className="w-full"
            />

          </div>

        )}

        {/* BUTTON */}

        <button
          onClick={
            editingProject
              ? handleUpdate
              : handleSave
          }
          disabled={loading}
          className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
        >
          {
            loading
              ? "Please wait..."
              : editingProject
              ? "Update Project"
              : "Upload Project"
          }
        </button>

        {/* ALL PROJECTS */}

        <div className="mt-24">

          <h2 className="text-4xl font-black mb-10">
            Uploaded Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {projects.map((project) => (

              <div
                key={project.id}
                className="border border-white/10 rounded-3xl overflow-hidden bg-white/[0.03]"
              >

                <img
                  src={project.coverImage}
                  alt=""
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-3">
                    {project.title}
                  </h3>

                  <p className="text-white/60 mb-4">
                    {project.description}
                  </p>

                  <p className="text-sm text-white/40 mb-6 uppercase tracking-[0.2em]">
                    {project.category}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6">

                  {[...(project.images || [])]
                    .reverse()
                    .map(
                    (image, index) => (

                      <div
                        key={index}
                        className="relative"
                      >

                        <img
                          src={image}
                          alt=""
                          className="w-full h-20 object-cover rounded-xl"
                        />

                        <button
                          onClick={() =>
                            deleteGalleryImage(
                              project.id,
                              image
                            )
                          }
                          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-full text-xs"
                        >
                          ×
                        </button>

                      </div>

                    )
                  )}

                </div>
                {project.category ===
                  "video-editing" && (

                  <div className="grid gap-3 mb-6">

                    {[...(project.videos || [])]
                      .reverse()
                      .map((video, index) => (

                      <div
                        key={index}
                        className="relative"
                      >

                        <video
                          src={video}
                          controls
                          className="w-full rounded-xl"
                        />

                        <button
                          onClick={() =>
                            deleteVideo(
                              project.id,
                              video
                            )
                          }
                          className="absolute top-2 right-2 bg-red-500 w-6 h-6 rounded-full text-xs"
                        >
                          ×
                        </button>

                      </div>

                      ))}

                  </div>

                )}

                  <button
                    onClick={() =>
                      handleEdit(project)
                    }
                    className="bg-blue-500 text-white px-5 py-3 rounded-2xl font-bold mr-4"
                  >
                    Edit
                  </button>                  

                  <button
                    onClick={() =>
                      deleteProject(project.id)
                    }
                    className="bg-red-500 text-white px-5 py-3 rounded-2xl font-bold"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  )
}