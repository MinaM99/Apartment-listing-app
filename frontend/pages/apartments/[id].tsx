import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/ApartmentDetails.module.css'; // Import the CSS module

// Define the Apartment interface
interface Apartment {
  _id: string;
  title: string;
  imageUrl: string[];
  description: string;
  price: number;
  location: string;
  size: string;
  referenceNo: string;
  bedrooms: number;
  bathrooms: number;
  deliveryIn: string;
  compound: string;
  saleType: string;
  finishing: string;
}

const ApartmentDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchApartment = async () => {
      if (id) {
        const response = await axios.get(`http://localhost:5000/api/apartments/${id}`);
        setApartment(response.data);
      }
    };

    fetchApartment();
  }, [id]);

  const nextImage = () => {
    if (apartment && currentImageIndex < apartment.imageUrl.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (!apartment) return <div>Loading...</div>;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <button className={styles.navButton} onClick={prevImage}>&lt;</button>
        <img 
          className={styles.image} 
          src={apartment.imageUrl[currentImageIndex]} 
          alt={apartment.title} 
        />
        <button className={styles.navButton} onClick={nextImage}>&gt;</button>
      </div>
      <div className={styles.infoContainer}>
        <h1>{apartment.title}</h1>
        <p>{apartment.description}</p>
        <p>Price: {apartment.price} EGP</p>
        <p>Location: {apartment.location}</p>
      </div>
      
      {/*  table for additional apartment details */}
      <table className={styles.detailsTable}>
        <tbody>
          <tr>
            <td><strong>Size:</strong></td>
            <td><strong>{apartment.size}</strong></td>
          </tr>
          <tr>
            <td><strong>Reference No:</strong></td>
            <td>{apartment.referenceNo}</td>
          </tr>
          <tr>
            <td><strong>Bedrooms:</strong></td>
            <td>{apartment.bedrooms}</td>
          </tr>
          <tr>
            <td><strong>Bathrooms:</strong></td>
            <td>{apartment.bathrooms}</td>
          </tr>
          <tr>
            <td><strong>Delivery In:</strong></td>
            <td>{apartment.deliveryIn}</td>
          </tr>
          <tr>
            <td><strong>Compound:</strong></td>
            <td>{apartment.compound}</td>
          </tr>
          <tr>
            <td><strong>Sale Type:</strong></td>
            <td>{apartment.saleType}</td>
          </tr>
          <tr>
            <td><strong>Finishing:</strong></td>
            <td>{apartment.finishing}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApartmentDetails;
