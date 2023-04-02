import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigateTo = useNavigate();
  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      const { text } = await( await fetch(`/api/signUp`)).json();
      setData(text);
    })();
  });

  return (
    <p 
      onClick={() => {
        navigateTo("/signup");
      }}
    >
      Click to go to sign up
    </p>,
    <p>{data}</p>
  );
}
