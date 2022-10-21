import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [ categories, setCategories ] = useState([]);
    const [ searchValue, setSearchValue ] = useState("");

    useEffect(() => {
        (async () => { // article single
        const response = await fetch('http://localhost:3001/categories/');
        const data =  await response.json();
        setCategories(data);
        })()
    }, []);

    const rechercher = () => {
        window.location.href = "/results?s=" + searchValue
        console.log(searchValue);
    }
    const rechercherDynamique = (e) => {
        setSearchValue(e.target.value);
        console.log(e.target.value);
    }

    return (
        <header className="navigation">
            <div className="navigationLinks">
                <NavLink to="/" >
                    Accueil
                </NavLink>
                <div className="categoriesHeader">
                    <NavLink to="/categories">
                        Catégories
                    </NavLink>
                    <ul>
                    {categories.map(category => {
                        return(
                            <li><NavLink to={"/categories/" + category.id} key={category.id}>
                                {category.name}
                                
                            </NavLink></li>
                        )
                    })}
                    </ul>
                </div>
                <NavLink to="/about" >
                    À Propos
                </NavLink>
                <div className="research">
                    <input type="text" placeholder="Rechercher" onInput={(e) => rechercherDynamique(e)}/>
                    <button onClick={() => rechercher()}>Rechercher</button>
                </div>
            </div>
        </header>
    );
};

export default Header;