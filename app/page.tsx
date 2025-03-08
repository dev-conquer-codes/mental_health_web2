"use client";
import { useEffect, useState } from "react";
import { fetchAccessToken } from "hume";
import ClientComponent from "./_components/ClientComponent";

export default function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchAccessToken({
          apiKey: String(process.env.NEXT_PUBLIC_HUME_API_KEY),
          secretKey: String(process.env.NEXT_PUBLIC_HUME_SECRET_KEY),
        });
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token", error);
      }
    };

    getToken();
  }, []);

  if (!accessToken) {
    return <p>Loading...</p>;
  }

  return <ClientComponent accessToken={accessToken} />;
}
