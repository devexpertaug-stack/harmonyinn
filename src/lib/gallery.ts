/** Photo gallery data. Add a photo: drop the .jpg in src/assets/photos and add a line below. */
const files = import.meta.glob("/src/assets/photos/*.jpg", { eager: true, import: "default" }) as Record<
  string,
  string
>;
const url = (key: string) => files[`/src/assets/photos/${key}.jpg`] ?? "";

export const galleryCategories = ["Hotel", "Rooms", "Dining & Bar", "Banquets & Conference"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

// [file name, caption, category, landscape?]  (all photos are 3:2 landscape or 2:3 portrait)
const rows: [string, string, GalleryCategory, boolean][] = [
  ["facade", "Hotel Harmony Inn at dusk", "Hotel", false],
  ["reception", "Reception under the carved jaali ceiling", "Hotel", false],
  ["royalcasa", "Royal Casa", "Banquets & Conference", true],
  ["presidential", "Presidential Suite", "Rooms", false],
  ["dining", "Melting Pot restaurant", "Dining & Bar", true],
  ["lounge", "Lobby lounge", "Hotel", false],
  ["deluxe", "Deluxe Room", "Rooms", false],
  ["royalcasa3", "Royal Casa, gold drapes and chandeliers", "Banquets & Conference", true],
  ["bar", "Barrel bar", "Dining & Bar", true],
  ["porch", "Entrance porch", "Hotel", false],
  ["executive", "Executive Twin Bed Room", "Rooms", false],
  ["ivory", "Ivory Hall", "Banquets & Conference", true],
  ["dining3", "Melting Pot banquette seating", "Dining & Bar", false],
  ["suite", "Harmony Suite", "Rooms", false],
  ["conference", "Conference room", "Banquets & Conference", false],
  ["welcome", "Reception desk", "Hotel", false],
  ["meltingpot", "Melting Pot entrance", "Dining & Bar", false],
  ["bluebell", "Bluebell Hall", "Banquets & Conference", true],
  ["presidential2", "Presidential Suite, sitting salon", "Rooms", false],
  ["bar2", "Barrel lounge seating", "Dining & Bar", true],
  ["nook", "Lobby seating", "Hotel", false],
  ["royalcasa2", "Royal Casa buffet", "Banquets & Conference", true],
  ["deluxe2", "Deluxe Room, work area", "Rooms", false],
  ["dining2", "Melting Pot dining room", "Dining & Bar", true],
  ["petals", "Petals Hall entrance", "Banquets & Conference", false],
  ["suite2", "Harmony Suite, lounge", "Rooms", false],
  ["lights", "Lobby chandelier", "Hotel", false],
  ["privatedining", "Melting Pot long-table hall", "Dining & Bar", true],
  ["executive2", "Executive Twin Bed Room, seating corner", "Rooms", false],
  ["royalcasa4", "Royal Casa, grand hall", "Banquets & Conference", false],
  ["corridor", "Guest corridor", "Hotel", false],
  ["presidential3", "Presidential Suite, work area", "Rooms", false],
  ["bar3", "Barrel booth seating", "Dining & Bar", false],
  ["ivory2", "Ivory Hall buffet", "Banquets & Conference", false],
  ["orchid", "Orchid Lounge", "Dining & Bar", false],
  ["deluxe3", "Deluxe Room, bedroom", "Rooms", false],
  ["bluebell2", "Bluebell Hall buffet", "Banquets & Conference", true],
  ["presidential4", "Presidential Suite, drapes", "Rooms", false],
  ["executive3", "Executive Twin Bed Room, writing desk", "Rooms", false],
  ["tulip", "Tulip Lounge", "Dining & Bar", false],
  ["bar4", "Barrel, private table", "Dining & Bar", false],
];

export type GalleryPhoto = { key: string; src: string; caption: string; category: GalleryCategory; ratio: string };

export const galleryPhotos: GalleryPhoto[] = rows
  .map(([key, caption, category, land]) => ({ key, src: url(key), caption, category, ratio: land ? "3 / 2" : "2 / 3" }))
  .filter((p) => p.src);
