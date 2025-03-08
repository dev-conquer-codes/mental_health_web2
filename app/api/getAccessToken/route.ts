import { NextResponse } from 'next/server';
import { fetchAccessToken } from 'hume';

export async function GET() {
  try {
    const accessToken = await fetchAccessToken({
      apiKey: process.env.HUME_API_KEY!,
      secretKey: process.env.HUME_SECRET_KEY!,
    });

    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 401 });
    }

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Error fetching access token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
