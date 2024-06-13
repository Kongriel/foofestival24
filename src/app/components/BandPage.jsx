"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BandPage = () => {
  const [band, setBand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    // Ensure the router is ready and the slug is defined
    if (!router.isReady || !slug) {
      setLoading(false);
      setError("No band specified");
      return;
    }

    const fetchURL = `https://winter-frill-lemon.glitch.me/bands/${encodeURIComponent(slug)}`;
    setLoading(true);

    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setBand(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch or parse data: ${error.message}`);
        setLoading(false);
      });
  }, [router.isReady, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!band) return <div>No band data available.</div>;

  return (
    <div>
      <h1>{band.name}</h1>
      <p>{band.bio}</p>
    </div>
  );
};

export default BandPage;
