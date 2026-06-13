import { db } from "./db.js";

const sampleEvents = [
  {
    title: "Design Leadership Summit",
    price: 299,
    duration: "1 Day",
    description: "A gathering of top design minds exploring the future of digital product creation and team dynamics.",
    location: "San Francisco, CA",
    distanceNote: "2.5 km from City Center",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeBvZ_CUepyGnmovfBf_-eZwc3rqxFyRXFZQM2rqXFDhE7zYXFCEgRhPtQ9vMSbimQNnv67UjISG1AwcvB0kkiaIykKC-b06KL8BdNBToFRuhW0cBm41OipvHyNH5xOwInJPa86WvJM10KtUhbuywfUS2BdfFgT2Znecmv7Pc8Cvxff4BBwAYsymQ-Zm1jrNDFOkP61MSZggTcjAEYRgeKybUWz0Ud-MW5XgVPJN8MF63PbhGLoTKebw",
    popular: true,
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    rating: "9.8",
    reviews: "96",
    category: "Design",
    inclusions: [
      "Full access pass to all keynote events",
      "Gourmet lunch and coffee breaks",
      "Exclusive event workbook and resource pack",
      "Invitation to the private networking cocktail hours"
    ],
    itinerary: [
      {
        day: 1,
        title: "Keynotes & Executive Panel Discussions",
        description: "Registration opens at 8:00 AM. Keynote sessions start at 9:00 AM covering AI integration in design workflows. Evening cocktail mixer begins at 6:00 PM."
      }
    ],
    reviewsBreakdown: {
      "Speakers": 9.9,
      "Venue": 9.6,
      "Content": 9.8,
      "Networking": 9.7
    }
  },
  {
    title: "Art & Tech Mixer",
    price: 0,
    duration: "3 Hours",
    description: "An evening of networking for creatives and technologists in a stunning gallery space.",
    location: "New York, NY",
    distanceNote: "0.8 km from Metro Station",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbH_2m1oEkxUd31uPGJc-fXGQw3-GvMypAiUAfiLtiFDdhC-Ce4GYvPQHk0AZ79TyXLELjpM_-EgyrikXM3gNg8iLHhFEMqRRinl43D7Of0qmE16nPdmQbf9ze7S29w_bXQkuVigAU19ji7ZclEIl0zqR5AlAnwUEvLT48HiSbBUbGF0k6SdZK6aS2MidahlFmNKSCgY-4mDnSmZZS740QAcTDykSKTzZlUfctqT2f36GgINjE8oecfw",
    popular: true,
    startDate: "2026-11-05",
    endDate: "2026-11-05",
    rating: "9.5",
    reviews: "45",
    category: "Networking",
    inclusions: [
      "Admission to the contemporary art showcase",
      "Complimentary wine and premium appetizers",
      "Interactive digital installation demo access"
    ],
    itinerary: [
      {
        day: 1,
        title: "Creative Dialogue & Demos",
        description: "Open doors at 6:30 PM. Introduction to featured digital artists at 7:00 PM, followed by open networking and interactive system demos."
      }
    ],
    reviewsBreakdown: {
      "Atmosphere": 9.8,
      "Refreshments": 9.2,
      "Organization": 9.4,
      "Value": 9.7
    }
  },
  {
    title: "Sustainable Future Expo",
    price: 150,
    duration: "2 Days",
    description: "Discover the latest innovations in sustainable technology and eco-friendly business practices.",
    location: "Austin, TX",
    distanceNote: "1.2 km from Downtown",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyScamyVoRhS7QAcboNWlItepWRrAvauwTa-eXonXHIVwIiTlOHr0bDQkcbdomEWB2GFccW-Y4zpvzjgHftf81Xq-r2CNLJijGRTDyqmlmlFQT0lsTqzFLnF4hUZKSOTlSyn09gXp_wMovakt2M1DOGqLS0ZFFCds3TzyeCuYpceikDq8nIDNSQTHwugHOk4xv87bLyLei8FrOmNztV_Cqrh-ToIIfOUfU6y5SU6iMPMTcXE-fer5z5w",
    popular: false,
    startDate: "2026-12-12",
    endDate: "2026-12-14",
    rating: "9.2",
    reviews: "112",
    category: "Conference",
    inclusions: [
      "Access to all green-tech exhibitor zones",
      "Workshops led by environmental scientists",
      "Sustainable product sample gift box"
    ],
    itinerary: [
      {
        day: 1,
        title: "Exhibitor Showroom & Panels",
        description: "Explore over 100 eco-tech booths. Panels start at 10:30 AM focusing on circular economics."
      },
      {
        day: 2,
        title: "Action-Oriented Workshops",
        description: "Practical breakout sessions on carbon footprint accounting and transition strategy. Closing ceremony at 4:00 PM."
      }
    ],
    reviewsBreakdown: {
      "Exhibits": 9.4,
      "Educational Value": 9.5,
      "Logistics": 9.0,
      "Eco-Commitment": 9.8
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
