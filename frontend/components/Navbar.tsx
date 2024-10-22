'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Import CSS module for styling
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Store the search term
  const router = useRouter(); // Use router from next/navigation

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log search term to debug
    console.log(`Search Term: ${searchTerm}`);

    // Check if search term is not empty
    if (searchTerm.trim()) {
      router.push(`/apartments/search?search=${searchTerm}`);
    } else {
      console.log('Search term is empty.');
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Left side: Logo */}
      <div className={styles.logo}>
        <Link href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nawy_Logo.png/800px-Nawy_Logo.png" alt="NawyLogo" /> 
        </Link>
      </div>

      {/* Center: Search bar */}
      <div className={styles.searchBar}>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
          />
        </form>
      </div>

      {/* Right side: Arabic Language link */}
      <div className={styles.languageSwitch}>
        <Link href="/">
          <span>العربيه</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
