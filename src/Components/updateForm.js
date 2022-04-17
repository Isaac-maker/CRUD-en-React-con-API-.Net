import React, { useState } from "react";
import constants from "../utilities/contants";

export default function UpdateForm(props) {

  const initialFormData = Object.freeze({
    title: (props.post.title),
    content: props.post.content,
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

    const postToUpdate = {
      id: props.post.id,
      title: formData.title,
      content: formData.content,
    };

    const url = constants.API_UPDATE_POSTS;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToUpdate),
    })
      .then((response) => response.json())
      .then((responseFromserver) => {
        console.log(responseFromserver);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onPostUpdate(postToUpdate);
  };

  return (
    <div>
      <form className="w-100 px-5">
        <h1 className="mt-5">Actualizar el  post "{props.post.title}".</h1>

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
          <textarea
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
          onClick={() => props.onPostUpdate(null)}
          className="btn btn-danger btn-lg w-100 mt-3"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
