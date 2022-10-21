import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [ category, setCategory] = useState([]);
  const [ articles, setArticles] = useState([]);
  const [ articlesFiltered, setArticlesFiltered] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/categories/' + window.location.href.split('/categories/')[1]);
      const data =  await response.json();
      setCategory(data);
    })(); 

  }, [navigate]);

  useEffect(() => { 
    (async () => {
      const response = await fetch("http://localhost:3001/articles");
      const data =  await response.json();
      setArticles(data);
      const articlesForCat = articles.filter(article => +article._links.category.href.split('categories/')[1] === category.id);
      setArticlesFiltered(articlesForCat);
    })()
  }, [category]);

  return (
    <>
      <Header />
      <main className="categorySingle">
        <h1>{category.name}</h1>
        <div className="articlesContainer">
        {articlesFiltered.length ? 
          <>
            {articlesFiltered.map(article => {
                return(
                  <div key={article.id} id={article.id} >
                    <a href={"/article?id=" + article.id}>
                      <h2 onClick={(e) => showMealSingle(e, article.id)}>{article.title}</h2>
                      <span className="fakeImg"></span>
                      <p>{ article.body.substring(0, 50) + '...'}</p>
                    </a>
                  </div>
                )
              })}
            </>
          : 
            <p>Il n'y a pas d'article dans cette catégorie</p>
        }
        </div>
      </main>
    </>
  );
};

export default Category;