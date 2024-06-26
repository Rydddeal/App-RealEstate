import React, { useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";


const PhotosUploader = ({addedPhotos, onChange}) => {
     const [photoLink, setPhotoLink] = useState("");
     const [error, setError] = useState(null);
     async function addPhotoByLink(ev) {
        ev.preventDefault();
        const {data:filename} = await axios.post('upload-by-link', {link: photoLink});
        onChange(prev => {
          return [...prev, filename];
        });
        setPhotoLink('');
    }
    async function uploadPhoto(ev) {
      const files = ev.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("photos", files[i]);
      }
      try {
        const response = await axios.post(
          "http://localhost:4000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const filenames = response.data; 
        onChange((prev) => {
          return [...prev, ...filenames]; 
        });
        setError(null); 
      } catch (error) {
        setError("Error uploading photo: " + error.message);
      }
    }


  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder="Add using a link .......jpg"
        />
        <button
          onClick={addPhotoByLink}
          className=" bg-gray-200 px-2 w-[200px] h-[55px] rounded-2xl "
        >
          Add&nbsp; photo
        </button>
      </div>
      {error && <p>Error: {error}</p>}
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex" key={Link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:4000/uploads/" + link}
                alt=""
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotosUploader
