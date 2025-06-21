import React, { useEffect, useState } from "react";
import { fetchSnapshots } from "../../services/api"; // Adjust the import path as needed
import "./SnapshotGallery.css";

export default function SnapshotGallery({ onClose }) {
  const [list, setList]       = useState([]);
  const [query, setQuery]     = useState("");
  const [active, setActive]   = useState(null);

  /* fetch once */
  useEffect(() => {
    fetchSnapshots()
  .then(setList)
  .catch(console.error);
  }, []);
  const normalizeQuery = q =>
  q
    .toLowerCase()
    .replace(/\s+/g, "")   // remove spaces
    .replace(/:/,  "_")    // first colon → underscore  (date _ time)
    .replace(/:/g, "-");   // remaining colons → hyphens (HH-MM-SS)

  const filtered = list.filter(item =>
  item.toLowerCase().includes(normalizeQuery(query))
);
  return (
    <div className="sg-overlay" onClick={onClose}>
      <div className="sg-modal" onClick={e => e.stopPropagation()}>
        <input
          className="sg-search"
          placeholder="Search  (e.g. 2025-06-02)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <div className="sg-grid">
          {filtered.map(url => (
            <img
              key={url}
              src={`${process.env.REACT_APP_API_URL}${url}`}
              alt={url}
              onClick={() => setActive(url)}
            />
          ))}
          {filtered.length === 0 && <p>No images match.</p>}
        </div>

          {active && (
            <div className="sg-full" onClick={() => setActive(null)}>
              <img
                src={`${process.env.REACT_APP_API_URL}${active}`}
                alt="snapshot"
              />
            </div>
          )}

        <button className="sg-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
