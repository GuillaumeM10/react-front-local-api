import React from 'react';
import Header from "../components/Header";

const NotFound = () => {
    return (
        <>
            <Header />
            <main className="notFound">
                <h1>Error 404</h1>
            </main>
        </>
    );
};

export default NotFound;