const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

export async function getCloudinaryFolderImages(folder: string): Promise<string[]> {
  const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search?expression=folder%3D${encodeURIComponent(folder)}&max_results=500`;

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${credentials}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Cloudinary API error: ${res.status} ${await res.text()}`);

  const data = await res.json();

  return (data.resources as { public_id: string }[]).map(
    (r) => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${r.public_id}`,
  );
}
