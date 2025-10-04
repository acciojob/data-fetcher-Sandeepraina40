import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const result = await res.json();

        // ✅ Save the full JSON object, not just products
        if (!result || Object.keys(result).length === 0) {
          setData([]);
        } else {
          setData(result);
        }
      } catch (err) {
        setError("An error occurred: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data || (Array.isArray(data) && data.length === 0)) return <pre>[]</pre>;

  return (
    <div>
      <h2>Data Fetched from API</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetcher;
