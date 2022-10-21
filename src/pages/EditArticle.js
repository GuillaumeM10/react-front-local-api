import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'

const EditArticle = () => {
  // variables d'état pour le corps ('body') de la requete
  const [ categories, setCategories ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ autor, setAutor ] = useState('');
  const [ date, setDate ] = useState('');
  const [ categoryId, setCategoryId ] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => { // je récupère la liste des catégories
      const response = await fetch('http://localhost:3001/categories');
      const data =  await response.json();
      setCategories(data);
    })();

    (async () => { // je récupère le contenu de l'article
      const response = await fetch('http://localhost:3001/articles/' + window.location.search.split('=')[1]);
      const data =  await response.json();
      //j'attribut les valeurs de l'article aux variables d'état
      setTitle(data.title);
      setBody(data.body);
      setAutor(data.autor);
      setDate(data.date);
      setCategoryId(data.categoryId);
    })();
  }, []);

  const handleSubmit = async (e) => { // fonction a l'envoi du formulaire
    e.preventDefault(); // je bloque le comportement par défaut du formulaire
    // requete d'envoi des données du body par la méthode 'PUT'
    const response = await fetch('http://localhost:3001/articles/' + window.location.search.split('=')[1], {
      method: 'PUT',
      headers: { // je définis le type de données du body en ficher 'JSON'
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // je converti en string les veleurs des variables d'état et définis les valeurs du body
        title,
        body,
        autor,
        date,
        categoryId
      })
    });
    // je redirige vers la page de l'article modifié
    // window.location.href = '/article?id=' + window.location.search.split('=')[1];
    navigate('/article?id=' + window.location.search.split('=')[1]);
  } 

  return (
    <>
      <Header />
      <main className="editArticle">
        <h1>Modifier un article</h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="title"
          >
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="content"
          >
            Contenu
          </label>
          <textarea
            id="content"
            name="content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label
            htmlFor="autor"
          >
            Auteur
          </label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
          <label
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label
            htmlFor="category"
          >
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
          >
            Modifier
          </button>
        </form>
      </main>
    </>
  );
};

export default EditArticle;