export function getPublicIdFromUrl(url) {
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;

  let path = parts[1];

  path = path.replace(/^v\d+\//, "");

  path = path.replace(/\.[^/.]+$/, "");

  return path; 
}
