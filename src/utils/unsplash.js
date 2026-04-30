export const getProductImg = (query, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${query}?auto=format&fit=crop&q=80&w=${w}&h=${h}`

// The user provided a specific format, but Unsplash source is deprecated.
// I'll use a helper that maps keywords to specific high-quality Unsplash IDs for consistency.

const categoryImages = {
  Pomades: "1591711019318-791781290378",
  Gommages: "1608248597279-f99d160bfcbc",
  Savons: "1602930301355-dc97c8a1d597",
  Huiles: "1608247764146-d736450f82ce",
  Crèmes: "1556229174-5e42a09e45af",
  Masques: "1596755326903-5f2945486d30",
  Kits: "1556228578-0d85b1a4d571",
  Ambiance: "1540555700478-4be289fbecef"
}

export const getCategoryImg = (category) => {
  const id = categoryImages[category] || "1556228412-afc71a3f8197"
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`
}
