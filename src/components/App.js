import React, { useState, useEffect } from "react";

const DataFetcher = () => {
  const [data, setData] = useState(null); // state to hold fetched data
  const [loading, setLoading] = useState(true); // loading indicator
  const [error, setError] = useState(""); // error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loading
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // update state asynchronously
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, []); // run only once on mount

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Data Fetcher</h2>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display fetched data inside a pre tag */}
      {data && (
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "6px",
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default DataFetcher;
