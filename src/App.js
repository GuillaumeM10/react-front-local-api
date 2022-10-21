import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './styles/App.scss';
import './styles/main.scss';

import About from './pages/About';
import Home from './pages/Home';
import Article from './pages/Article';
import NotFound from './pages/NotFound';
import Categories from './pages/Categories';
import Category from './pages/Category';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          {/* <Route exact path='/recherche' element={<Search/>} /> */}
          <Route exact path='/article' element={<Article/>} />
          <Route exact path='/categories' element={<Categories/>} />
          <Route exact path='/categories/:id' element={<Category/>} />
          <Route exact path='/createArticle' element={<CreateArticle/>} />
          <Route exact path='/editArticle' element={<EditArticle/>} />
          <Route exact path='/about' element={<About/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
