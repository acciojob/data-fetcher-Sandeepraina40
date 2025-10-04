import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime"; // if async/await is used

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ UseEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const result = await res.json();

        // ✅ Check for empty data
        if (!result || !result.products || result.products.length === 0) {
          setData([]);
        } else {
          setData(result.products);
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Return JSX expected by Cypress
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data || data.length === 0) return <pre>[]</pre>;

  return (
    <div>
      <h2>Data Fetched from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetcher;
