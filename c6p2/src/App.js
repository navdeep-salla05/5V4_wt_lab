import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const result = await response.json();
        setData(result);
        setFilterData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilterData(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Driven ReactJS Application</h1>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {filterData.length > 0 ? (
        <ul>
          {filterData.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}