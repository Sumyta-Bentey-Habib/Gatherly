import { db } from "./db.js";

const sampleEvents = [
  {
    title: "Dhaka Tech Summit 2026",
    price: 15,
    duration: "1 Day",
    description: "The largest tech conference in Bangladesh bringing together developers, designers, and innovators to discuss the future of Web3, AI, and cloud computing.",
    location: "Dhaka, Bangladesh",
    distanceNote: "1.2 km from Gulshan Circle",
    imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    popular: true,
    startDate: "2026-10-15",
    endDate: "2026-10-15",
    rating: "9.7",
    reviews: "128",
    category: "Technology",
    inclusions: [
      "Access to all tech sessions & workshops",
      "Buffet lunch & networking coffee breaks",
      "Gatherly delegate kit with swag",
      "Entry to the evening rooftop mixer"
    ],
    itinerary: [
      {
        day: 1,
        title: "AI & Innovation Keynotes",
        description: "Doors open at 9:00 AM. Keynote talks on the future of AI in Southeast Asia begin at 10:00 AM, followed by track presentations and startup pitching."
      }
    ],
    reviewsBreakdown: {
      "Speakers": 9.8,
      "Venue": 9.5,
      "Content": 9.7,
      "Swag": 9.6
    }
  },
  {
    title: "Cox's Bazar Beach Carnival",
    price: 25,
    duration: "2 Days",
    description: "Experience the ultimate beach festival at the world's longest natural sandy beach. Enjoy local music, fire dances, and mouth-watering seafood.",
    location: "Cox's Bazar, Bangladesh",
    distanceNote: "0.5 km from Laboni Beach",
    imgUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    popular: true,
    startDate: "2026-11-20",
    endDate: "2026-11-21",
    rating: "9.9",
    reviews: "210",
    category: "Music & Festival",
    inclusions: [
      "2-Day general admission pass",
      "Complimentary BBQ dinner buffet",
      "Beach volleyball tourney registration",
      "Exclusive concert wristband"
    ],
    itinerary: [
      {
        day: 1,
        title: "Beach Sports & Sunsets",
        description: "Kick off at 2:00 PM with sports. Enjoy local food stalls during sunset, followed by beachside acoustic sessions."
      },
      {
        day: 2,
        title: "Mega Concert & Fire Show",
        description: "Live DJ acts starting at 4:00 PM. Headline bands perform until midnight, closed by an epic fire dance showcase."
      }
    ],
    reviewsBreakdown: {
      "Atmosphere": 10.0,
      "Music": 9.9,
      "Food": 9.8,
      "Location": 10.0
    }
  },
  {
    title: "Sylhet Tea Garden Retreat",
    price: 0,
    duration: "5 Hours",
    description: "Unwind with a peaceful morning walking tour through the lush green tea gardens of Sreemangal, followed by a local seven-color tea tasting session.",
    location: "Sylhet, Bangladesh",
    distanceNote: "3 km from Sreemangal Town",
    imgUrl: "https://images.unsplash.com/photo-1595841696660-327549241e8e?q=80&w=2070&auto=format&fit=crop",
    popular: false,
    startDate: "2026-12-05",
    endDate: "2026-12-05",
    rating: "9.4",
    reviews: "84",
    category: "Nature & Travel",
    inclusions: [
      "Guided tour through historic tea estates",
      "Tasting session of the famous 7-color tea",
      "Traditional Bengali snack platter",
      "Transport from Sreemangal center"
    ],
    itinerary: [
      {
        day: 1,
        title: "Walking Tour & Tea Tasting",
        description: "Meet at 8:00 AM. 3-hour guided nature walk, ending at a local cottage for tea tasting and snack platter by 12:30 PM."
      }
    ],
    reviewsBreakdown: {
      "Scenery": 9.8,
      "Guide": 9.6,
      "Tea Quality": 9.5,
      "Value": 9.2
    }
  }
];

async function seed() {
  console.log("🌱 Firestore Seeding: Starting events import...");
  const collectionRef = db.collection("events");
  
  // Clean up existing events first to avoid duplicates
  const snapshot = await collectionRef.get();
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log("🧹 Cleaned up existing events in database.");

  // Insert new events
  for (const event of sampleEvents) {
    const docRef = await collectionRef.add({
      ...event,
      createdAt: new Date(),
    });
    console.log(`✅ Seeded event: "${event.title}" (ID: ${docRef.id})`);
  }
  console.log("🎉 Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Error seeding data:", err);
  process.exit(1);
});
