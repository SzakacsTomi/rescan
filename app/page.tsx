// Never rendered: proxy.ts rewrites / to /en or /sv before it is reached. The file exists
// only because Next requires a page at the route root.
export default function RootPage() {
  return null;
}
