import React from 'react';
import './NavBar.css';

export default function NavBar({pageName}) {
    return (
        <>
        <header className='header'>
            <a className='pageName' href='/'>{pageName}</a>
            <nav className='navbar'>
                <a href='/'>Home</a>
                <a href='/'>Contact</a>
            </nav>
        </header>
        </>
    )
}