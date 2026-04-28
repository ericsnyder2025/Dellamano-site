// 410 Gone for the /video/?id=... spam URLs injected during the prior hack.
// 30K+ such URLs are still in Google's index; 410 de-indexes faster than 404.
export function GET() {
  return new Response("Gone", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export const HEAD = GET;
