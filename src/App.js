import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get("repositories").then(response => {
        setRepositories(response.data)
      }
    )}, []);

  async function handleAddRepository() {
    // TODO
    const newRepository = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const response = await api.post(
      "/repositories", 
      newRepository
    );
    
    if (response.status===200) {
      // console.log(`Added repository ${JSON.stringify(newRepository)}`)
      setRepositories([...repositories, response.data]);
    } 
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);

    if (response.status===204) {
      // console.log(`Removed repository with ID ${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
