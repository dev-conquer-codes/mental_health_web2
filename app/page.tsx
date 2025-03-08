import { fetchAccessToken } from 'hume';
import ClientComponent from './_components/ClientComponent';


export async function getServerSideProps() {
  try {
    const accessToken = await fetchAccessToken({
      apiKey: process.env.HUME_API_KEY!,
      secretKey: process.env.HUME_SECRET_KEY!,
    });

    if (!accessToken) {
      throw new Error('Failed to fetch token');
    }

    return {
      props: { accessToken },
    };
  } catch (error) {
    console.error('Error fetching token:', error);
    return {
      props: { accessToken: null },
    };
  }
}

export default function Page({ accessToken }: { accessToken: string | null }) {
  if (!accessToken) return <div>Error fetching token</div>;

  return <ClientComponent accessToken={accessToken} />;
}
