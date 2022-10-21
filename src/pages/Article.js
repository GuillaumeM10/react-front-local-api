import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; 

const Article = () => {
  const [ article, setArticle ] = useState([]);
  const [ category, setCategory ] = useState([]);
  
  useEffect(() => {
    (async () => { // article single
      const response = await fetch('http://localhost:3001/articles/' + window.location.search.substring(4));
      const data =  await response.json();
      setArticle(data);
      const urlcategory = data._links.category.href;
      
      (async () => { //categories
        const response = await fetch(urlcategory);
        const data =  await response.json();
        setCategory(data);
      })()

    })();
  }, []);

  return (
    <>
      <Header />
      <main className="article">
        <article>
          <h1>{article.title}</h1>
          <ul className="tags">
            <li className="category">{category.name}</li>
            <li className="autor">{article.autor}</li>
            <li className="date">{article.date}</li>
          </ul>
          <span className="fakeImage"></span>
          <p>{article.body}</p>
        </article>
      </main>
    </>
  );
};

export default Article;