import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ThemeContext } from "../context/Themecontext";
const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(false);
    const [input, setInput] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // State to track sorting order
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Fetch all user data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users/"
            );
            setData(response.data);
            setFilteredData(response.data); // Initialize filtered data
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setInput(query);


        const filtered = data.filter(
            (user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.address.city.toLowerCase().includes(query)
        );

        setFilteredData(filtered);
    };


    const handleSort = (e) => {
        const order = e.target.value;
        setSortOrder(order);

        // Sort the filtered data
        const sorted = [...filteredData].sort((a, b) => {
            if (order === "asc") {
                return a.name.localeCompare(b.name); // Ascending order
            } else if (order === "desc") {
                return b.name.localeCompare(a.name); // Descending order
            } else {
                return 0; // Default order (no sorting)
            }
        });

        setFilteredData(sorted);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            <div
                style={{
                    backgroundColor: theme === "light" ? "#fff" : "#333",
                    color: theme === "light" ? "#000" : "#fff", // Adjust text color
                    minHeight: "100vh",
                    padding: "1rem",
                }}
            >
                <button onClick={toggleTheme} style={{ marginBottom: "1rem" }}>
                    Toggle to {theme === "light" ? "Dark" : "Light"} Mode
                </button>
                {error ? (
                    <h3>Something went wrong...</h3>
                ) : (
                    <div>
                        <div className="searchBox">
                            <input
                                type="text"
                                placeholder="Search by name, email, or city"
                                value={input}
                                onChange={handleSearch}
                                style={{
                                    padding: "0.5rem",
                                    marginBottom: "1rem",
                                    backgroundColor: theme === "light" ? "#f9f9f9" : "#555",
                                    color: theme === "light" ? "#000" : "#fff", // Adjust text color
                                }}
                            />
                            <select
                                value={sortOrder}
                                onChange={handleSort}
                                style={{
                                    padding: "0.5rem",
                                    backgroundColor: theme === "light" ? "#f9f9f9" : "#555",
                                    color: theme === "light" ? "#000" : "#fff", // Adjust text color
                                }}
                            >
                                <option value="">Sort by Name</option>
                                <option value="asc">By A - Z</option>
                                <option value="desc">By Z - A</option>
                            </select>
                        </div>

                        <h1>Users</h1>
                        <div className="profiles">
                            {filteredData.map((elem) => {
                                return (
                                    <Link to={`/user/${elem.id}`} key={elem.id}>
                                        <div
                                            className="user-profile"
                                            style={{
                                                backgroundColor: theme === "light" ? "#eee" : "#444",
                                                color: theme === "light" ? "#000" : "#fff", // Adjust text color
                                                padding: "1rem",
                                                margin: "0.5rem 0",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            <h2>Name: {elem.name}</h2>
                                            <h4>Email: {elem.email}</h4>
                                            <h4>City: {elem.address.city}</h4>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

        </>
    );
};

export default Home;
