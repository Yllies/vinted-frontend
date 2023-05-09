import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [imgFromCloudinary, setImgFromCloudinary] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("state", state);
      formData.append("location", location);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setImgFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div>
      <h1>Vends ton article</h1>
      <form onSubmit={handleSubmit}>
        <div className="file-select">
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <p>Titre</p>
            <input
              type="text"
              placeholder="ex: Chemise Sézane verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
            />
          </div>
          <div>
            <p>Décris ton article</p>
            <input
              type="text"
              placeholder="ex: porté une fois, taille correctement"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              value={description}
            />
          </div>
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <p>Marque</p>
            <input
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              value={brand}
            />
          </div>
          <div>
            <p>Taille</p>
            <input
              type="text"
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
              value={size}
            />
          </div>
          <div>
            <p>Couleur</p>
            <input
              type="text"
              placeholder="ex: Fushia"
              onChange={(event) => {
                setColor(event.target.value);
              }}
              value={color}
            />
          </div>
          <div>
            <p>Etat</p>
            <input
              type="text"
              placeholder="ex: Neuf avec étiquette"
              onChange={(event) => {
                setState(event.target.value);
              }}
              value={state}
            />
          </div>
          <div>
            <p>Lieu</p>
            <input
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setLocation(event.target.value);
              }}
              value={location}
            />
          </div>
        </div>
        <div className="text-input-section">
          <div className="text-input">
            <p>Prix</p>
            <input
              type="text"
              placeholder="0,00"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              value={price}
            />
          </div>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
