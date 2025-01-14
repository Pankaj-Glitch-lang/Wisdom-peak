import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/Themecontext';
const Detailspage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const{theme}=useContext(ThemeContext)
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
  
    useEffect(() => {
      fetchUserDetails();
    }, [id]);
  
    return (
        <div
        style={{
          backgroundColor: "#333", 
          color: "#fff", // Set text color to white
          minHeight: "100vh",
          padding: "1rem",
        }}
      >
        {error ? (
          <h3>Something went wrong...</h3>
        ) : user ? (
          <div>
            <h1>User Details</h1>
            <h2>Name: {user.name}</h2>
            <h4>username: {user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>City: {user.address.city}</h4>
            <h4>Phone: {user.phone}</h4>
            <h4>Website: {user.website}</h4>

            <h4>Company: {user.company.name}</h4>
            <Link to="/">
              <button
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#555",
                  color: "#fff", // Set button text color to white
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Back to Home
              </button>
            </Link>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      
    )
}

export default Detailspage