'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/index.module.css'; // Import the CSS module
import { useSearchParams } from 'next/navigation';

interface Apartment {
  _id: string;
  title: string;
  project: string;
  unitNumber: number;
  description: string;
  price: number;
  imageUrl: string; 
  location: string;
}

const Home = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const searchParams = useSearchParams(); // Get search params using Next.js hook

  useEffect(() => {
    const fetchApartments = async () => {
      const query = searchParams?.get('search') || ''; // Get search query from URL
      console.log(`Query from URL: ${query}`); // Log the query to debug
  
      try {
        const response = await axios.get(
          query
            ? 'http://localhost:5000/api/apartments/search'
            : 'http://localhost:5000/api/apartments',
          { params: query ? { search: query } : {} }
        );
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };
  
    fetchApartments();
  }, [searchParams]);

  return (
    <div>
      <div className={styles.cardContainer}>
        {apartments.map((apartment) => (
          <Link key={apartment._id} href={`/apartments/${apartment._id}`} className={styles.card}>
            <img src={apartment.imageUrl[0]} alt={apartment.title} className={styles.image} />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{apartment.title}</h2>
              <p className={styles.cardLocation}>{apartment.location}</p>
              <p className={styles.cardDescription}>{apartment.description}</p>
              <p className={styles.cardPrice}>Price: {apartment.price} EGP</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
