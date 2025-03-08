'use client';

import { useEffect, useState } from 'react';
import ClientComponent from './_components/ClientComponent';

export const dynamic = 'force-dynamic'; // ✅ Disable static generation

export default function Page() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/getAccessToken');
        if (!response.ok) throw new Error('Failed to fetch token');

        const data = await response.json();
        setAccessToken(data.accessToken);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  if (!accessToken) return <div>Loading...</div>;

  return <ClientComponent accessToken={accessToken} />;
}
