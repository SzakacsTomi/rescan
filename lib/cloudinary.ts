const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

const DEFAULT_TRANSFORMATION = "f_auto,q_auto";

/** The public ids of every image in a Cloudinary asset folder, newest upload first.
 *  Separate from the URL because how an image should be delivered often depends on how
 *  many came back — see the case bands, where one image fills a band and fifteen tile it. */
export async function getCloudinaryFolderPublicIds(folder: string): Promise<string[]> {
  const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search?expression=folder%3D${encodeURIComponent(folder)}&max_results=500`;

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${credentials}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Cloudinary API error: ${res.status} ${await res.text()}`);

  const data = await res.json();

  return (data.resources as { public_id: string }[]).map((r) => r.public_id);
}

/**
 * A delivery URL for one image.
 *
 * The account keeps the folder as an asset folder rather than in the id, so a public id
 * is the bare filename: `projects-hero/carlqvist/<id>` locates the asset in the media
 * library but is not part of its URL, and prefixing it gives a 404.
 *
 * `transformation` is what Cloudinary applies before Next's optimiser ever sees the file.
 * Pass a width cap wherever the originals are large and the slot is small — some of these
 * folders hold 5000px exports, and having the optimiser pull one of those down to a 240px
 * thumbnail costs far more than serving a sensible source and resizing that. Omit it where
 * the slot is small enough that the fetch is cheap and the optimiser should be the only
 * thing that ever re-encodes the photograph.
 */
export function cloudinaryImageUrl(publicId: string, transformation?: string): string {
  const path = transformation ? `${transformation}/${encodeURI(publicId)}` : encodeURI(publicId);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${path}`;
}

export async function getCloudinaryFolderImages(
  folder: string,
  transformation: string = DEFAULT_TRANSFORMATION,
): Promise<string[]> {
  const publicIds = await getCloudinaryFolderPublicIds(folder);

  return publicIds.map((publicId) => cloudinaryImageUrl(publicId, transformation));
}
