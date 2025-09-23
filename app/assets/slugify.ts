export function slugify(name: string, existingSlugs: Set<string>): string {
  let baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces & symbols with dash
    .replace(/(^-|-$)+/g, "");   // remove leading/trailing dash

  let slug = baseSlug;
  let counter = 2;
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  existingSlugs.add(slug);
  return slug;
}