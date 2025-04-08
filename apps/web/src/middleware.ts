import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiClient } from "./lib/apiClient";
import { runtime } from "./app/not-found";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/autos/")) {
    const id = request.nextUrl.pathname.split("/").pop() || 0;

    try {
      await apiClient.listing.byId.$get({
        id: parseInt(id as string),
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Listing not found") {
          return NextResponse.rewrite(new URL("/404", request.url));
        }
      }
    }
  }
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/autos/:path*",
};
