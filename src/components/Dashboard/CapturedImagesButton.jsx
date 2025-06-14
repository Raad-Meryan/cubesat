import React, { useState } from "react";
import SnapshotGallery from "./SnapshotGallery";

export default function CapturedImagesButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="snap-btn" onClick={() => setOpen(true)}>
        Captured Images
      </button>
      {open && <SnapshotGallery onClose={() => setOpen(false)} />}
    </>
  );
}
