import React, { useState } from "react";
import "./LastSnapshotModal.css";
import { fetchLatestSnapshot } from "../../services/api";

export default function LastSnapshotModal() {
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLatest = () => {
    setLoading(true);
    fetchLatestSnapshot()
      .then(d => {
        if (d.url) {
          const fullUrl = `${process.env.REACT_APP_API_URL}${d.url}`;
          setImgUrl(fullUrl);
          setOpen(true);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <>
      <button className="snap-btn" onClick={fetchLatest}>
        {loading ? "Loading…" : "Camera (Last Image)"}
      </button>

      {open && (
        <div className="snap-overlay" onClick={() => setOpen(false)}>
          <div className="snap-modal" onClick={e => e.stopPropagation()}>
            {imgUrl ? (
              <img src={imgUrl} alt="Last snapshot" />
            ) : (
              <p>No snapshot found</p>
            )}
            <button className="close-btn" onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
