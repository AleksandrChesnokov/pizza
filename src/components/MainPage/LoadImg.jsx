import { useState, memo, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadImg = memo(function Load({ urlImg }) {
  const [ready, setReady] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    async function fetchImg() {
      try {
        let response = await fetch(urlImg);
        const reader = response.body.getReader();
        let receivedLength = 0;
        let chunks = [];
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          chunks.push(value);
          receivedLength += value.length;
        }
        let chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (let chunk of chunks) {
          chunksAll.set(chunk, position);
          position += chunk.length;
        }
        let blob = new Blob([chunksAll], { type: "image/jpeg" });
        setImageSrc(URL.createObjectURL(blob));
        setReady(true);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }
    fetchImg();
  }, [urlImg]);

  return (
    <>
      {ready ? (
        <img src={imageSrc} alt="pizza" className="pizza-card__img" />
      ) : (
        <div className="pizza-card__img">
          <CircularProgress sx={{ color: "rgba(212, 223, 177, 0.45)" }} />
        </div>
      )}
    </>
  );
});
