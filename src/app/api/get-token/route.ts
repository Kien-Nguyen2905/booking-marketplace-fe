import { GoogleAuth } from 'google-auth-library';
import { NextResponse } from 'next/server';
import envConfig from '../../../../config';

export async function GET() {
  try {
    // Format the private key correctly (replace escaped \n with actual newlines)
    const privateKey = envConfig.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY
      ? envConfig.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : '';
    const auth = new GoogleAuth({
      credentials: {
        private_key: privateKey,
        client_email: envConfig.NEXT_PUBLIC_GOOGLE_SERVICE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return NextResponse.json({ accessToken: accessToken.token });
  } catch (error) {
    console.error('Error getting access token:', error);
    return NextResponse.json(
      { error: 'Failed to get access token' },
      { status: 500 },
    );
  }
}
