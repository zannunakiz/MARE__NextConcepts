export type LazyItem = {
  title: string
  description: string
  tag: string
  image_url: string
}

export const lazyItems: LazyItem[] = [
  "Editorial desk", "Quiet workspace", "Field notes", "Morning light", "Archive study",
  "Open landscape", "City details", "Material study", "A quiet corner", "Collected forms",
  "After the rain", "Useful objects", "Window study", "A long walk", "Soft geometry",
  "Studio notes", "The reading room", "Daily texture", "Small discoveries", "The final frame",
].map((title, index) => ({
  title,
  description: [
    "A focused card enters the DOM only when it is close to the viewport.",
    "Intersection Observer keeps below-the-fold work quiet and intentional.",
    "Lazy rendering makes long lists feel lighter, faster, and easier to explore.",
  ][index % 3],
  tag: ["Design", "Performance", "Next.js", "UX"][index % 4],
  image_url: `https://picsum.photos/id/${index + 1}/800/600`,
}))
