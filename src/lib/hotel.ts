// Photography: Hotel Harmony Inn shoot (Google Drive "Photo Content"), colour-corrected
// and resized for the web. Files live in src/assets/photos so they ship with every build.
import facade from "@/assets/photos/facade.jpg";
import porch from "@/assets/photos/porch.jpg";
import reception from "@/assets/photos/reception.jpg";
import welcome from "@/assets/photos/welcome.jpg";
import lounge from "@/assets/photos/lounge.jpg";
import nook from "@/assets/photos/nook.jpg";
import lights from "@/assets/photos/lights.jpg";
import petals from "@/assets/photos/petals.jpg";
import corridor from "@/assets/photos/corridor.jpg";
import executive from "@/assets/photos/executive.jpg";
import executive2 from "@/assets/photos/executive2.jpg";
import executive3 from "@/assets/photos/executive3.jpg";
import deluxe from "@/assets/photos/deluxe.jpg";
import deluxe2 from "@/assets/photos/deluxe2.jpg";
import deluxe3 from "@/assets/photos/deluxe3.jpg";
import suite from "@/assets/photos/suite.jpg";
import suite2 from "@/assets/photos/suite2.jpg";
import presidential from "@/assets/photos/presidential.jpg";
import presidential2 from "@/assets/photos/presidential2.jpg";
import presidential3 from "@/assets/photos/presidential3.jpg";
import presidential4 from "@/assets/photos/presidential4.jpg";
import dining from "@/assets/photos/dining.jpg";
import dining2 from "@/assets/photos/dining2.jpg";
import dining3 from "@/assets/photos/dining3.jpg";
import meltingpot from "@/assets/photos/meltingpot.jpg";
import privatedining from "@/assets/photos/privatedining.jpg";
import orchid from "@/assets/photos/orchid.jpg";
import tulip from "@/assets/photos/tulip.jpg";
import bar from "@/assets/photos/bar.jpg";
import bar2 from "@/assets/photos/bar2.jpg";
import bar3 from "@/assets/photos/bar3.jpg";
import bar4 from "@/assets/photos/bar4.jpg";
import royalcasa from "@/assets/photos/royalcasa.jpg";
import royalcasa2 from "@/assets/photos/royalcasa2.jpg";
import royalcasa3 from "@/assets/photos/royalcasa3.jpg";
import royalcasa4 from "@/assets/photos/royalcasa4.jpg";
import ivory from "@/assets/photos/ivory.jpg";
import ivory2 from "@/assets/photos/ivory2.jpg";
import bluebell from "@/assets/photos/bluebell.jpg";
import bluebell2 from "@/assets/photos/bluebell2.jpg";
import conference from "@/assets/photos/conference.jpg";

export const img = {
  facade,
  facadeTall: facade,
  porch,
  reception,
  welcome,
  lounge,
  lobby: lounge,
  nook,
  chandelier: lights,
  lights,
  petals,
  corridor,
  suite: presidential,
  dining,
  dining2,
  dining3,
  meltingpot,
  privatedining,
  orchid,
  tulip,
  bar,
  bar2,
  bar3,
  bar4,
  banquet: royalcasa,
  banquet2: royalcasa2,
  banquet3: royalcasa3,
  banquet4: royalcasa4,
  ivory,
  ivory2,
  bluebell,
  bluebell2,
  conference,
};

export const contact = {
  address: "Opp. Nai Sadak, Main Garh Road, Meerut (U.P) – 250002",
  phones: ["+91 93687 03112", "0121-4328222", "0121-4329222"],
  phoneHref: "tel:+919368703112",
  whatsapp: "https://api.whatsapp.com/send?phone=919368703112&text=Welcome%20Hotel%20Harmony%20Inn",
  email: "info@hotelharmonyinn.com",
  enquiryEmail: "enquiry@hotelharmonyinn.com",
  maps: "https://g.page/HotelHarmonyInn?share",
  social: [
    ["Instagram", "https://www.instagram.com/hotelharmonyinnm/"],
    ["Facebook", "https://www.facebook.com/harmonyinnmeer/"],
    ["YouTube", "https://www.youtube.com/@hotelharmonyinn"],
  ] as const,
};

export const rooms = [
  {
    name: "Executive Twin Bed Room",
    price: 4499,
    size: "280 sq ft",
    bed: "Two twin beds",
    image: executive,
    alt: executive2,
    gallery: [executive, executive2, executive3],
    short: "Two plush twin beds and a proper desk, planned around the working traveller.",
    text: "Planned around the corporate guest: two plush twin beds, a proper desk and chair, fast internet and natural toiletries in the bath. Room to rest, and room to work.",
    amenities: ["Tea & coffee maker", "In-room safe", "LED television", "Mini fridge", "Work desk", "High-speed Wi-Fi"],
  },
  {
    name: "Deluxe Room",
    price: 5499,
    size: "320 sq ft",
    bed: "King bed",
    image: deluxe,
    alt: deluxe2,
    gallery: [deluxe, deluxe2, deluxe3],
    short: "A generous king bed, a corner for work and a marble bath with rain shower.",
    text: "A generous king-size bed, a dedicated corner for work and a marble bathroom with a rain shower. Our most requested room for a reason.",
    amenities: ["Marble bath, rain shower", "Complimentary Wi-Fi", "Work area", "Hairdryer", "LED television", "Mini fridge"],
  },
  {
    name: "Harmony Suite",
    price: 6499,
    size: "450 sq ft",
    bed: "King bed · lounge",
    image: suite,
    alt: suite2,
    gallery: [suite, suite2],
    short: "A Jacuzzi bath, city views and a separate lounge for receiving guests.",
    text: "Herbal bath amenities, a Jacuzzi tub in a modern bathroom and views over the city. A separate lounge makes it easy to receive guests.",
    amenities: ["Jacuzzi bathtub", "City view", "Herbal amenities", "Separate lounge", "Complimentary Wi-Fi", "Mini fridge"],
  },
  {
    name: "Presidential Suite",
    price: 7499,
    size: "560 sq ft",
    bed: "King bed · salon",
    image: presidential,
    alt: presidential2,
    gallery: [presidential, presidential2, presidential3, presidential4],
    short: "Our largest suite, with marble detailing and its own sitting salon.",
    text: "Our largest suite. Marble detailing, deep closets, commissioned artwork and a separate sitting salon for the end of a long day.",
    amenities: ["Separate sitting salon", "Jacuzzi bathtub", "Walk-in closets", "Curated artwork", "Marble finishes", "Complimentary Wi-Fi"],
  },
];

export const silentFeatures = [
  "Centrally air-conditioned",
  "Complimentary buffet breakfast",
  "Complimentary mineral water",
  "Daily newspaper",
  "Jacuzzi baths in suites",
  "Conference & party hall",
  "CCTV security",
  "24-hour power back-up",
  "Free valet parking",
];

export const policies = [
  "Please carry photo identification. Foreign nationals: passport and valid visa. Indian nationals: passport, driving licence or voter ID.",
  "Check-in and check-out are both at 12:00 noon.",
  "Early check-in and late check-out can be arranged, subject to availability. To guarantee an early arrival, reserve from the previous night.",
  "Cancel at least 24 hours ahead to avoid cancellation or no-show charges, which may include the full tariff and taxes for the stay.",
];

export const extraBed = 999;

export const venues = [
  {
    name: "Royal Casa",
    capacity: "Level 6 · 45 m above the city",
    image: royalcasa,
    image2: royalcasa2,
    text: "Our grandest hall sits on the sixth floor, beneath a ceiling of gathered gold drapes and crystal chandeliers, with a landscaped dining area beside it. Built for weddings, engagements, receptions and large corporate evenings.",
    for: ["Weddings", "Engagements", "Exhibitions", "Corporate galas"],
  },
  {
    name: "Petals Banquet",
    capacity: "25 – 500 guests",
    image: petals,
    image2: null,
    text: "One of the city's best-dressed conference and party halls. Petals hosts weddings, sangeet, roka, cocktails and anniversaries as well as private and corporate events.",
    for: ["Sangeet & roka", "Cocktails", "Anniversaries", "Conferences"],
  },
  {
    name: "Ivory",
    capacity: "80 – 100 guests",
    image: ivory,
    image2: ivory2,
    text: "A centrally air-conditioned party hall with lounge seating and a carved buffet counter. Sized for mid-scale gatherings.",
    for: ["Ring ceremonies", "Birthdays", "Get-togethers", "Corporate meets"],
  },
  {
    name: "Bluebell",
    capacity: "30 – 35 guests",
    image: bluebell,
    image2: bluebell2,
    text: "A smaller hall with modern furnishings, for gatherings where everyone should be able to hear each other.",
    for: ["Kitty parties", "Birthdays", "Doctors' meets", "Small gatherings"],
  },
];

export const pdas = [
  { name: "Orchid Lounge", capacity: "30 – 35 guests", image: orchid },
  { name: "Dining Hall", capacity: "20 – 25 guests", image: privatedining },
  { name: "Tulip Lounge", capacity: "12 – 15 guests", image: tulip },
] as const;

export const weekly = [
  { day: "Tuesday", name: "Ghazal Nights", where: "Melting Pot", image: dining3, text: "Candlelit dinner with live ghazals, for a slower kind of evening." },
  { day: "Thursday", name: "Retro Nights", where: "Melting Pot", image: dining2, text: "Live singer Pawan Chugh performs golden-era Bollywood." },
  { day: "Saturday", name: "Bollywood Nights", where: "Barrel", image: bar, text: "Live DJ, the newest tracks and the classics. Ladies receive a complimentary drink." },
  { day: "Sunday", name: "Ladies Night", where: "Barrel", image: bar2, text: "Special cocktails, discounted drinks and the resident DJ." },
];

export const seasonal = ["New Year", "Baisakhi", "Halloween", "Christmas"];

export const testimonials = [
  { name: "Yatin Arora", text: "Really a good place to have a family function. The food is tasty, the decoration and lighting beautiful, and there's a great view from the terrace." },
  { name: "Ishika Sethi", text: "The location is perfect. The room was very clean, comfortable and pleasant. All the amenities were first class." },
  { name: "Sidhant Malhotra", text: "Really commendable services and very cooperative staff. Highly impressed by each and every service provided." },
  { name: "Mallika Goel", text: "Beautiful ambience, and food that makes you come back with family and friends again and again." },
  { name: "Hrithika Ramteke", text: "The hotel is clean, the hospitality great, and the cook excellent. It was an amazing experience." },
];

export const faqs = [
  { q: "What time are check-in and check-out?", a: "Check-in and check-out are both at 12:00 noon. Early check-in and late check-out can be arranged, subject to availability. To guarantee an early arrival, reserve from the previous night." },
  { q: "What do I need to bring at check-in?", a: "Please carry photo identification. Foreign nationals need a passport and valid visa. Indian nationals can use a passport, driving licence or voter ID." },
  { q: "Is breakfast included?", a: "Yes. Every room rate includes our buffet breakfast, along with complimentary mineral water and a daily newspaper." },
  { q: "Is there parking at the hotel?", a: "Yes, valet parking is free for all guests. The hotel also has round-the-clock power back-up and CCTV security." },
  { q: "What is the cancellation policy?", a: "Cancel at least 24 hours ahead to avoid cancellation or no-show charges, which may include the full tariff and taxes for the stay." },
  { q: "Can you host weddings and events?", a: "Yes. We have four halls, from Bluebell for 30 guests to Royal Casa on the sixth floor, plus three private dining lounges at Melting Pot and a fully equipped conference room." },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const roomSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
export const findRoom = (slug: string) => rooms.find((r) => roomSlug(r.name) === slug);

/**
 * Background videos. These are placeholder clips built from the hotel photos.
 * To use your own footage, drop an .mp4 (H.264, muted, ~10–30 s, under ~8 MB) into
 * /public/videos and point `src` at it, or paste a full https:// URL.
 * `poster` shows while the video loads and on devices that block autoplay.
 */
export const videos = {
  hero: { src: "/videos/hero.mp4", poster: facade },
  evenings: { src: "/videos/evenings.mp4", poster: bar },
  celebrations: { src: "/videos/celebrations.mp4", poster: royalcasa },
};

/** What makes the hotel special, shown as an icon row on the homepage. */
export const highlights = [
  { icon: "landmark", label: "Carved Jaali Lobby" },
  { icon: "gem", label: "Rooftop Royal Casa" },
  { icon: "coffee", label: "Buffet Breakfast" },
  { icon: "car", label: "Free Valet Parking" },
  { icon: "music", label: "Live Music Nights" },
  { icon: "users", label: "Four Banquet Halls" },
  { icon: "map-pin", label: "Heart of Meerut" },
] as const;

/** Places around the hotel, shown in the "Explore" carousel. */
export const spaces = [
  { name: "The Lobby", image: lounge, text: "A carved jaali ceiling, marble floors and a carpet in royal blue. Tea is always on offer.", to: "/contact" as const },
  { name: "Melting Pot", image: dining, text: "Indian, Oriental and Continental, cooked to order in our all-day restaurant.", to: "/dining" as const },
  { name: "Barrel", image: bar, text: "Low light, live DJs at the weekend and an honest pour at the bar.", to: "/dining" as const },
  { name: "Royal Casa", image: royalcasa3, text: "Gold drapes and crystal chandeliers on the sixth floor, built for weddings.", to: "/banquets" as const },
  { name: "Presidential Suite", image: presidential, text: "Our largest suite, with a sitting salon and marble detailing.", to: "/rooms" as const },
  { name: "Conference Room", image: conference, text: "A boardroom for twenty, with catering from Melting Pot.", to: "/banquets" as const },
];

/** Standing offers. Kept to what the hotel already provides; edit freely. */
export const offers = [
  { title: "Book Direct & Save", image: deluxe, text: "Our best available rate, with buffet breakfast, mineral water and free valet parking included.", cta: "Book your stay", kind: "room" as const },
  { title: "Evenings at Harmony", image: bar2, text: "Ghazals on Tuesday, retro on Thursday and DJ nights at Barrel every weekend.", cta: "See the programme", to: "/dining" as const },
  { title: "Weddings at Royal Casa", image: royalcasa, text: "A sixth-floor hall for up to 500 guests, with menus and décor planned by our events team.", cta: "Plan your event", kind: "event" as const },
  { title: "Private Dining Lounges", image: orchid, text: "Orchid, Tulip and the Dining Hall, for family dinners of 12 to 35 guests.", cta: "Book a lounge", kind: "event" as const },
];

export const gallery = [presidential, dining, reception, royalcasa3, bar, deluxe, facade, lounge, royalcasa2, executive, meltingpot, welcome];
