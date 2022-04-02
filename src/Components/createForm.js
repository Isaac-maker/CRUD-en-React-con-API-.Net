import React, { useState } from "react";
import constants from "../utilities/contants";

export default function CreateForm(props) {

  const initialFormData = Object.freeze({
    title: "Post i",
    content: "Hola a todos!",
  });
  
  const [formData, setFormData] = useState(initialFormData);

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postToCreate = {
      id: 0,
      title: formData.title,
      content: formData.content,
    };

    const url = constants.API_CREATE_POSTS;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToCreate),
    })
      .then((response) => response.json())
      .then((responseFromserver) => {
        console.log(responseFromserver);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onPostCreated(postToCreate);
  };

  return (
    <div>
      <form className="w-100 px-5">
        <h1 className="mt-5">Crear nuevo post</h1>

        <div className="mt-5">
          <label className="h3 form-label">Titulo</label>
          <input
            value={formData.title}
            name="title"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <label className="h3 form-label">Contenido</label>
          <input
            value={formData.content}
            name="content"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-success btn-lg w-100 mt-5"
        >
          Enviar
        </button>
        <button
          onClick={() => props.onPostCreated(null)}
          className="btn btn-danger btn-lg w-100 mt-3"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
