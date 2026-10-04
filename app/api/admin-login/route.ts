import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Aap yahan apna manpasand username aur password set kar sakte hain
    if (
      username === (process.env.ADMIN_USER || 'admin') &&
      password === (process.env.ADMIN_PASS || 'your_secure_password')
    ) {
      // Secure cookie set karein jo 1 din tak valid rahegi (await ke sath)
      const cookieStore = await cookies();
      cookieStore.set('admin_logged_in', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Galat Username ya Password hai!' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Kuch gadbad ho gayi' },
      { status: 500 }
    );
  }
}