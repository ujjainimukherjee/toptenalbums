import React from 'react';
import Link from 'next/link';
import './header.css';

const Header = () => {

    return (
        <nav className="header">
            <ul className="menu">
                <li>
                    <Link href="/">
                        <a>Top Ten</a>
                    </Link>
                </li>
                <li>
                    <Link href="/Search">
                        <a>Search</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
