import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigateTo = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/test`)).json();
      setData(text);
    })();
  }, []);

  return (
    <div>
      <p
        onClick={() => {
          navigateTo("/signup");
        }}
      >
        Click to go to sign up
      </p>
      <p>{data}</p>
    </div>
  );
}