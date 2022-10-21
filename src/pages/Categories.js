import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Categories = () => {
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:3001/categories');
            const data =  await response.json();
            setCategories(data);
        })();
    }, []);

  return (
    <>
      <Header />
      <main className="categories">
        <h1>Categories</h1>
        <div className="categoriesContainer">
        {categories.map(category => {
          return(
            <div id={category.id} key={category.id}>
              <a href={"/categories/" + category.id}>
                <h2>{category.name}</h2>
                <p>{ category.description.substring(0, 50) + '...'}</p>
              </a>
            </div>
          )
        })}
        </div>
      </main>
    </>
  );
};

export default Categories;