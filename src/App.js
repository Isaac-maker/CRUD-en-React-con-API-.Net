import React, { useState } from "react";
import contants from "./utilities/contants";
import CreateForm from "./Components/createForm";
import UpdateForm from "./Components/updateForm";
import { ButtonGroup } from "react-bootstrap";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setshowCreatePost] = useState(false);
  const [showUpdatePost, setshowUpdatePost] = useState(null);

  function getPosts() {
    const url = contants.API_GET_ALL_POSTS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsFromserver) => {
        setPosts(postsFromserver);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deletePost(id) {
    const url = `${contants.API_DELETE_POSTS}/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromserver) => {
        console.log(responseFromserver);
        onPostDelete(id);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="area">
      <div className="container">
        <div className="row min-vh-100">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            {showCreatePost === false && showUpdatePost === null && (
              <div>
                <h1>Crud Basisco</h1>
                <div className="mt-5">
                  <button
                    onClick={getPosts}
                    className="btn btn-primary btn-lg w-100"
                  >
                    Obtener Datos
                  </button>
                  <button
                    onClick={() => setshowCreatePost(true)}
                    className="btn btn-success btn-lg w-100 mt-4"
                  >
                    Crear nuevo post
                  </button>
                </div>
              </div>
            )}

            {posts.length > 0 &&
              showCreatePost === false &&
              showUpdatePost === null &&
              renderPostTble()}

            {showCreatePost && <CreateForm onPostCreated={onPostCreated} />}

            {showUpdatePost !== null && (
              <UpdateForm post={showUpdatePost} onPostUpdate={onPostUpdate} />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function renderPostTble() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Titulo</th>
              <th scope="col">Contenido</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((posts) => (
              <tr key={posts.id}>
                <th scope="row">{posts.id}</th>
                <th>{posts.title}</th>
                <th>{posts.content}</th>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <button
                      onClick={() => setshowUpdatePost(posts)}
                      className="btn btn-warning btn-lg  my-3"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Seguro quiere eliminar el post  "${posts.title}"?`
                          )
                        )
                          deletePost(posts.id);
                      }}
                      className="btn btn-danger btn-lg  my-3"
                    >
                      Eliminar
                    </button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="area">
          <div className="container">
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <button
                onClick={() => setPosts([])}
                className=" btn btn-secondary btn-lg w-100 "
              >
                Cerrar tabla
              </button>
            </div>
          </div>
        </div>
        
          <br></br>
        
      </div>
    );
  }

  function onPostCreated(createdPost) {
    setshowCreatePost(false);

    if (createdPost === null) {
      return;
    }
    alert(`Post creado correctamente "${createdPost.title}" todo bien`);
    getPosts();
  }

  function onPostUpdate(updatePost) {
    setshowUpdatePost(null);

    if (updatePost === null) {
      return;
    }

    let postCopy = [...posts];

    const index = postCopy.findIndex((postCopyPost, currentIndex) => {
      if (postCopyPost.id === updatePost.id) {
        return true;
      }
    });

    if (index !== -1) {
      postCopy[index] = updatePost;
    }
    setPosts(postCopy);
    alert(`Post actualizado correctamente "${updatePost.title}" todo bien`);
  }

  function onPostDelete(deletePost) {
    let postCopy = [...posts];

    const index = postCopy.findIndex((postCopyPost, currentIndex) => {
      if (postCopyPost.id === deletePost) {
        return true;
      }
    });

    if (index !== -1) {
      postCopy.splice(index, 1);
    }
    setPosts(postCopy);

    alert(`El post  fue eliminado correctamente`);
  }
}
