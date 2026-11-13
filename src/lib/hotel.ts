import facade from "@/assets/photos/facade.jpg.asset.json";
import facade2 from "@/assets/photos/facade2.jpg.asset.json";
import reception from "@/assets/photos/reception.jpg.asset.json";
import lounge from "@/assets/photos/lounge.jpg.asset.json";
import porch from "@/assets/photos/porch.jpg.asset.json";
import chandelier from "@/assets/photos/chandelier.jpg.asset.json";
import executive from "@/assets/photos/executive.jpg.asset.json";
import executive2 from "@/assets/photos/executive2.jpg.asset.json";
import deluxe from "@/assets/photos/deluxe.jpg.asset.json";
import deluxe2 from "@/assets/photos/deluxe2.jpg.asset.json";
import presidential from "@/assets/photos/presidential.jpg.asset.json";
import presidential2 from "@/assets/photos/presidential2.jpg.asset.json";
import suite from "@/assets/photos/suite.jpg.asset.json";
import suite2 from "@/assets/photos/suite2.jpg.asset.json";
import restaurant from "@/assets/photos/restaurant.jpg.asset.json";
import restaurant2 from "@/assets/photos/restaurant2.jpg.asset.json";
import meltingpot from "@/assets/photos/meltingpot.jpg.asset.json";
import restaurant3 from "@/assets/photos/restaurant3.jpg.asset.json";
import barrel from "@/assets/photos/barrel.jpg.asset.json";
import barrel2 from "@/assets/photos/barrel2.jpg.asset.json";
import barrel3 from "@/assets/photos/barrel3.jpg.asset.json";
import barrel4 from "@/assets/photos/barrel4.jpg.asset.json";
import royalcasa from "@/assets/photos/royalcasa.jpg.asset.json";
import royalcasa2 from "@/assets/photos/royalcasa2.jpg.asset.json";
import royalcasa3 from "@/assets/photos/royalcasa3.jpg.asset.json";
import ivory from "@/assets/photos/ivory.jpg.asset.json";
import bluebell from "@/assets/photos/bluebell.jpg.asset.json";
import conference from "@/assets/photos/conference.jpg.asset.json";

export const img = {
  facade: facade.url, facadeTall: facade2.url, reception: reception.url, lounge: lounge.url, porch: porch.url,
  chandelier: chandelier.url, lobby: reception.url,
  suite: presidential2.url, dining: restaurant.url, dining2: restaurant2.url, meltingpot: meltingpot.url, dining3: restaurant3.url,
  bar: barrel.url, bar2: barrel2.url, bar3: barrel3.url, bar4: barrel4.url,
  banquet: royalcasa.url, banquet2: royalcasa2.url, banquet3: royalcasa3.url, conference: conference.url,
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
  { name: "Executive Twin Bed Room", price: 4499, size: "280 sq ft", bed: "Two twin beds", image: executive.url, alt: executive2.url,
    text: "Planned around the corporate guest: two plush twin beds, a proper desk and chair, fast internet and natural toiletries in the bath. Room to rest, and room to work.",
    amenities: ["Tea & coffee maker", "In-room safe", "LED television", "Mini fridge", "Work desk", "High-speed Wi-Fi"] },
  { name: "Deluxe Room", price: 5499, size: "320 sq ft", bed: "King bed", image: deluxe.url, alt: deluxe2.url,
    text: "A generous king-size bed, a dedicated corner for work and a marble bathroom with a rain shower. Our most requested room for a reason.",
    amenities: ["Marble bath, rain shower", "Complimentary Wi-Fi", "Work area", "Hairdryer", "LED television", "Mini fridge"] },
  { name: "Harmony Suite", price: 6499, size: "450 sq ft", bed: "King bed · lounge", image: suite.url, alt: suite2.url,
    text: "Herbal bath amenities, a Jacuzzi tub in a modern bathroom and views over the city. A separate lounge makes it easy to receive guests.",
    amenities: ["Jacuzzi bathtub", "City view", "Herbal amenities", "Separate lounge", "Complimentary Wi-Fi", "Mini fridge"] },
  { name: "Presidential Suite", price: 7499, size: "560 sq ft", bed: "King bed · salon", image: presidential.url, alt: presidential2.url,
    text: "Our largest suite. Marble detailing, deep closets, commissioned artwork and a separate sitting salon for the end of a long day.",
    amenities: ["Separate sitting salon", "Jacuzzi bathtub", "Walk-in closets", "Curated artwork", "Marble finishes", "Complimentary Wi-Fi"] },
];

export const silentFeatures = [
  "Centrally air-conditioned", "Complimentary buffet breakfast", "Complimentary mineral water", "Daily newspaper",
  "Jacuzzi baths in suites", "Conference & party hall", "CCTV security", "24-hour power back-up", "Free valet parking",
];

export const policies = [
  "Please carry photo identification. Foreign nationals: passport and valid visa. Indian nationals: passport, driving licence or voter ID.",
  "Check-in and check-out are both at 12:00 noon.",
  "Early check-in and late check-out can be arranged, subject to availability. To guarantee an early arrival, reserve from the previous night.",
  "Cancel at least 24 hours ahead to avoid cancellation or no-show charges, which may include the full tariff and taxes for the stay.",
];

export const extraBed = 999;

export const venues = [
  { name: "Royal Casa", capacity: "Level 6 · 45 m above the city", image: royalcasa.url, image2: royalcasa2.url,
    text: "Our grandest hall sits on the sixth floor, beneath a ceiling of gathered gold drapes and crystal chandeliers, with a landscaped dining area beside it. Built for weddings, engagements, receptions and large corporate evenings.",
    for: ["Weddings", "Engagements", "Exhibitions", "Corporate galas"] },
  { name: "Petals Banquet", capacity: "25 – 500 guests", image: royalcasa3.url, image2: null,
    text: "One of the city's best-dressed conference and party halls. Petals hosts weddings, sangeet, roka, cocktails and anniversaries as well as private and corporate events.",
    for: ["Sangeet & roka", "Cocktails", "Anniversaries", "Conferences"] },
  { name: "Ivory", capacity: "80 – 100 guests", image: ivory.url, image2: null,
    text: "A centrally air-conditioned party hall with lounge seating and a carved buffet counter. Sized for mid-scale gatherings.",
    for: ["Ring ceremonies", "Birthdays", "Get-togethers", "Corporate meets"] },
  { name: "Bluebell", capacity: "30 – 35 guests", image: bluebell.url, image2: null,
    text: "A smaller hall with modern furnishings, for gatherings where everyone should be able to hear each other.",
    for: ["Kitty parties", "Birthdays", "Doctors' meets", "Small gatherings"] },
];

export const pdas = [["Orchid Lounge", "30 – 35 guests"], ["Dining Hall", "20 – 25 guests"], ["Tulip Lounge", "12 – 15 guests"]] as const;

export const weekly = [
  { day: "Tuesday", name: "Ghazal Nights", where: "Melting Pot", text: "Candlelit dinner with live ghazals, for a slower kind of evening." },
  { day: "Thursday", name: "Retro Nights", where: "Melting Pot", text: "Live singer Pawan Chugh performs golden-era Bollywood." },
  { day: "Saturday", name: "Bollywood Nights", where: "Barrel", text: "Live DJ, the newest tracks and the classics. Ladies receive a complimentary drink." },
  { day: "Sunday", name: "Ladies Night", where: "Barrel", text: "Special cocktails, discounted drinks and the resident DJ." },
];

export const seasonal = ["New Year", "Baisakhi", "Halloween", "Christmas"];

export const testimonials = [
  { name: "Yatin Arora", text: "Really a good place to have a family function. The food is tasty, the decoration and lighting beautiful, and there's a great view from the terrace." },
  { name: "Ishika Sethi", text: "The location is perfect. The room was very clean, comfortable and pleasant. All the amenities were first class." },
  { name: "Sidhant Malhotra", text: "Really commendable services and very cooperative staff. Highly impressed by each and every service provided." },
  { name: "Mallika Goel", text: "Beautiful ambience, and food that makes you come back with family and friends again and again." },
  { name: "Hrithika Ramteke", text: "The hotel is clean, the hospitality great, and the cook excellent. It was an amazing experience." },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
