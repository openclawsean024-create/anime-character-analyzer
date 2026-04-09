import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/create') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('tab', 'create');
    return NextResponse.rewrite(url);
  }

  if (pathname === '/leaderboard') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('tab', 'leaderboard');
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/create', '/leaderboard'],
};
