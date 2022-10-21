import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const CreateArticle = () => {
  const [ categories, setCategories ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ autor, setAutor ] = useState('');
  const [ date, setDate ] = useState('');
  const [ categoryId, setCategoryId ] = useState(0);
  
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/categories');
      const data =  await response.json();
      setCategories(data);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        autor,
        date,
        categoryId
      })
    });
    window.location.href = '/';
  }


  return (
    <>
      <Header />
      <main className="createArticle">
        <h1>Créer un article</h1>
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
            Corps de l'article
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
            <option value="0">Choisissez une catégorie</option>
            {categories.map(category => {
              return(
                <option value={category.id} key={category.id}>{category.name}</option>
              )
            })}
          </select>
          <button type="submit">Créer</button>
        </form>
      </main>
    </>
  );
};

export default CreateArticle;