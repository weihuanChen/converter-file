import  { type NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态资源和 API 路径
  if (
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // 如果已经有 locale，直接放行
  if (pathname.startsWith("/en") || pathname.startsWith("/zh")) {
    return;
  }

  // 否则重写到默认语言
  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};