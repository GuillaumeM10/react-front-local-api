import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [ articles, setArticles ] = useState([]);
  
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3001/articles');
      const data =  await response.json();

      // recharge le composant et stock la variable "mealsData" dans la variable "meals"
      setArticles(data)
    })();
  }, []);

  const delArticle = (e) => {
    fetch('http://localhost:3001/articles/' + e.target.parentElement.id, {
      method: 'DELETE',
    })
    e.target.parentElement.remove();
  }

  return (
    <>
      <Header />
      <main className="home">
        <div className="createArticle">
          <h1>Articles</h1>
          <NavLink to="/createArticle">Ajouter un article</NavLink>
        </div>
        <div className="articlesContainer">
        {articles.map(article => {
          return(
            <div id={article.id} key={article.id}>
              <a href={"/article?id=" + article.id}>
                <h2 onClick={(e) => showMealSingle(e, article.id)}>{article.title}</h2>
                <span className="fakeImg"></span>
                <p>{ article.body.substring(0, 50) + '...'}</p>
              </a>
              <span className="delArticle" onClick={(e)=> {delArticle(e)}}>X</span>
              <NavLink to={"editArticle?id=" + article.id} className="editArticle">Edit</NavLink>
            </div>
          )
        })}
        </div>
      </main>
    </>
  );
};

export default Home;