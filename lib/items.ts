export type CatalogItem = {
  name: string
  description: string
}

export const itemCatalog: CatalogItem[] = Array.from({ length: 100 }, (_, index) => ({
  name: [
    "Edge Cache Primer", "Route Handler Notes", "Streaming UI Kit", "Database Index Map", "Request Boundary",
    "Mutation Notebook", "Cache Invalidation Fieldbook", "Server Action Atlas", "Runtime Signals", "Practical Serialization",
  ][index % 10] + ` ${index + 1}`,
  description: `A practical learning note for building dependable Next.js systems, collection ${index + 1}.`,
}))

export function randomPrice() {
  return Math.floor(Math.random() * 9_999_999) + 1
}

export function randomCatalogItem() {
  return itemCatalog[Math.floor(Math.random() * itemCatalog.length)]
}
