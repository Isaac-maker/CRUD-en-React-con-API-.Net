import React,{useState} from "react";
import contants from "./utilities/contants"

export default function App() {
  
  const [posts,setPosts]=useState([]);

  function getPosts(){
    const url= contants.API_GET_ALL_POSTS;

    fetch(url,{
      method: 'GET'
    }).then(response => response.json())
    .then(postsFromserver =>{
      setPosts(postsFromserver);
    }).catch((error)=>{
      console.log(error);
      alert(error);
    });
  }

  
  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div>
          <h1>Crud</h1>
          <div className="mt-5">
            <button onClick={getPosts} className="btn btn-primary btn-lg w-100">get</button>
            <button onClick={()=>{}} className="btn btn-success btn-lg w-100 mt-4">Crear nuevo post</button>
          </div>
          </div>
          
          {posts.length > 0 && renderPostTble()}
        </div>
      </div>
    </div>
  );

  function renderPostTble() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-success">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Titulo</th>
              <th scope="col">Contenido</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>

            {posts.map((posts)=>(
            <tr key={posts.id}>
              <th scope="row">{posts.id}</th>
              <th>{posts.title}</th>
              <th>{posts.content}</th>
              <td>
                <button className="btn btn-warning btn-lg mx-3 my-3">
                  Actualizar
                </button>
                <button className="btn btn-danger btn-lg mx-3 my-3">
                  Eliminar
                </button>
              </td>
            </tr> ))}
          
          </tbody>
        </table>
        <button onClick={()=>setPosts([])} className="btn btn-success btn-lg w-100  ">Posts React</button>
        
      </div>
   
    );
    
  }

  
}
