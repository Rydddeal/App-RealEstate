import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';




const PlacesPage =() => {
    const {action} = useParams();
    // const [error, setError] = useState(null);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(2);
    const [redirect, setRedirect] = useState('');

    function inputHeader(text) {
        return (
          <h2 className="text-4xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
      return (
      <h2 className="text-gray-500 text-lg">{text}</h2>
      );
    }
    function preInput(header,description) {
      return (
        <>
          {inputHeader(header)}
          {inputDescription(description)}
        </>
      );
    }
   
    async function addNewPlace(ev) {
      ev.preventdefault();
      await axios.post('/places', {
        title, address, addedPhotos,
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests
      });
      setRedirect('/account/places');
    };
    

    return (
      <div>
        {action !== "new" && (
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new place
            </Link>
          </div>
        )}
        {action === "new" && (
          <div>
            <form onSubmit={addNewPlace}>
              {preInput(
                "Title",
                "Title for your place, should be very short and catchy"
              )}
              <input
                type="text"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="Title, for example: My lovely apt"
              />
              {preInput("Address", "Address to this place")}
              <input
                type="text"
                value={address}
                onChange={(ev) => setAddress(ev.target.value)}
                placeholder="Address"
              />
              {preInput("Photos", "More = Better")}
              <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
              
              {preInput("Description", "Description of the place")}
              <textarea
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              {preInput("Perks", "select all the perks of your place")}
              <div className="grid mt-2 gap-2 grid-col-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected={perks} onChange={setPerks} />
              </div>
              <h2 className="text-3xl mt-4">Extra Info</h2>
              <p className="text-gray-500 text-lg">House rules, etc</p>
              <textarea
                value={extraInfo}
                onChange={(ev) => setExtraInfo(ev.target.value)}
              />
              <h2 className="text-3xl mt-4">Check in&out times</h2>
              <p className="text-gray-500 text-lg">
                Add check in and out times and also, make space for cleaning
              </p>
              <div className="grid sm:grid-cols-3">
                <div>
                  <h3 className="mt-2 -mb-1">Check in time</h3>
                  <input
                    type="text"
                    value={checkIn}
                    onChange={(ev) => setCheckIn(ev.target.value)}
                    placeholder="12:00"
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Check out time</h3>
                  <input
                    type="text"
                    value={checkOut}
                    onChange={(ev) => setCheckOut(ev.target.value)}
                    placeholder="11"
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Max number of guests</h3>
                  <input
                    type="number"
                    value={maxGuests}
                    onChange={(ev) => setMaxGuests(ev.target.value)}
                  />
                </div>
              </div>
              <div>
                <button className="primary my-4">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
}

export default PlacesPage
