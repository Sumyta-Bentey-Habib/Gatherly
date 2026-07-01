import { db } from "./db.js";

const sampleEvents = [
  {
    title: "Dhaka Tech Summit 2026",
    price: 15,
    duration: "1 Day",
    description: "The largest tech conference in Bangladesh bringing together developers, designers, and innovators to discuss Web3, AI, and Cloud computing.",
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
        description: "Doors open at 9:00 AM. Keynote talks on the future of AI begin at 10:00 AM, followed by track presentations and startup pitching."
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
    description: "Experience the ultimate beach festival at the world's longest natural sandy beach. Enjoy local music, fire dances, and delicious seafood.",
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
    description: "Unwind with a peaceful morning walking tour through the lush green tea gardens of Sreemangal, followed by a seven-color tea tasting.",
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
  },
  {
    title: "Sreemangal Adventure Trek",
    price: 10,
    duration: "1 Day",
    description: "Trek through the dense forests of Lawachara National Park and discover rare wildlife, bird species, and indigenous villages.",
    location: "Sreemangal, Bangladesh",
    distanceNote: "5 km from Town Center",
    imgUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-18",
    endDate: "2026-10-18",
    rating: "9.3",
    reviews: "64",
    category: "Nature & Travel",
    inclusions: [
      "Guided forest trek entry fee",
      "Packed eco-friendly organic lunch",
      "Tribal village entry & greeting tea",
      "Hydration and safety support"
    ],
    itinerary: [
      {
        day: 1,
        title: "Lawachara Forest Expedition",
        description: "Expedition starts at 7:30 AM. Guided trek through trails, wildlife observation, tribal village visit, and return by late afternoon."
      }
    ],
    reviewsBreakdown: {
      "Adventure": 9.5,
      "Guide": 9.7,
      "Safety": 9.2,
      "Nature": 9.6
    }
  },
  {
    title: "Chittagong Hill Tracts Tour",
    price: 45,
    duration: "3 Days",
    description: "An unforgettable journey into Bandarban. Hike up Nilgiri, visit golden temples, and take a boat ride on the breathtaking Sangu River.",
    location: "Bandarban, Bangladesh",
    distanceNote: "15 km from Bandarban Town",
    imgUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    popular: true,
    startDate: "2026-11-12",
    endDate: "2026-11-14",
    rating: "9.8",
    reviews: "152",
    category: "Nature & Travel",
    inclusions: [
      "2 nights premium resort accommodation",
      "Guided 4x4 transport & boat tours",
      "All meals including local indigenous buffet",
      "Entry permits for CHT area"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nilgiri Sunset & Golden Temple",
        description: "Arrive in Bandarban. Take a 4x4 drive to Nilgiri for sunset views above the clouds. Visit the Golden Temple on return."
      },
      {
        day: 2,
        title: "Sangu River Cruise & Waterfall Hike",
        description: "Morning boat cruise along the scenic Sangu River. Hike to a hidden waterfall for a fresh wild dip. BBQ night at resort."
      },
      {
        day: 3,
        title: "Chimbuk Hill & Departure",
        description: "Visit Chimbuk Hill and Shoilo Propat waterfall. Souvenir shopping at local market before heading home."
      }
    ],
    reviewsBreakdown: {
      "Scenery": 10.0,
      "Accommodation": 9.6,
      "Food": 9.7,
      "Transport": 9.5
    }
  },
  {
    title: "Dhaka Food & Biryani Fest",
    price: 8,
    duration: "6 Hours",
    description: "Explore the historic lanes of Old Dhaka and feast on legendary delicacies like Kacchi Biryani, Bakarkhani, and Lassi.",
    location: "Old Dhaka, Bangladesh",
    distanceNote: "0.2 km from Lalbagh Fort",
    imgUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2000&auto=format&fit=crop",
    popular: true,
    startDate: "2026-10-30",
    endDate: "2026-10-30",
    rating: "9.6",
    reviews: "310",
    category: "Food & Culinary",
    inclusions: [
      "Access to 10+ selected street food stalls",
      "Full platter of authentic Old Dhaka Biryani",
      "Special local dessert and drinks tasting",
      "Expert guide sharing food history"
    ],
    itinerary: [
      {
        day: 1,
        title: "Culinary Heritage Trail",
        description: "Meetup near Lalbagh Fort at 3:00 PM. Guided food walk visiting historic stalls. Main Biryani feast at 7:00 PM."
      }
    ],
    reviewsBreakdown: {
      "Taste": 9.9,
      "Variety": 9.7,
      "Guide": 9.4,
      "Hygiene": 8.8
    }
  },
  {
    title: "Sundarbans Wildlife Safari",
    price: 80,
    duration: "4 Days",
    description: "Deep dive into the world's largest mangrove forest. Search for the majestic Royal Bengal Tiger, spotted deer, and wild boars.",
    location: "Sundarbans, Bangladesh",
    distanceNote: "From Mongla Port",
    imgUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=2000&auto=format&fit=crop",
    popular: true,
    startDate: "2026-12-15",
    endDate: "2026-12-18",
    rating: "9.5",
    reviews: "78",
    category: "Nature & Travel",
    inclusions: [
      "3 nights accommodation on a secure cruise ship",
      "Forest department entry fees & armed guards",
      "All meals, tea, snacks, and mineral water",
      "Small boat canals expeditions"
    ],
    itinerary: [
      {
        day: 1,
        title: "Boarding at Mongla & Harbaria",
        description: "Board the vessel at Mongla Port. Cruise down to Harbaria eco-tourism spot for your first walk inside the mangrove canopy."
      },
      {
        day: 2,
        title: "Kotka Wildlife Sanctuary & Beach Walk",
        description: "Early morning silent canal cruise. Walk through Kotka forest trails to spot deer and monkeys, ending at Kotka beach."
      },
      {
        day: 3,
        title: "Kachikhali Tiger Territory Exploration",
        description: "Explore Kachikhali forest area. Guided walk searching for tiger tracks and unique mudskippers. Cultural night on vessel."
      },
      {
        day: 4,
        title: "Karamjal Tour & Return",
        description: "Visit Karamjal crocodile breeding center. Cruise back to Mongla for afternoon departure."
      }
    ],
    reviewsBreakdown: {
      "Adventure": 9.8,
      "Service": 9.4,
      "Food": 9.3,
      "Wildlife": 9.2
    }
  },
  {
    title: "Dhaka Art & Photography Expo",
    price: 5,
    duration: "2 Days",
    description: "Exhibit of contemporary Bangladeshi art and photography highlighting the fast-evolving urban landscapes of Dhaka.",
    location: "Dhaka, Bangladesh",
    distanceNote: "0.5 km from TSC, Dhaka University",
    imgUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    rating: "9.1",
    reviews: "42",
    category: "Art & Culture",
    inclusions: [
      "Single entry ticket to the main galleries",
      "Artist talk panels and presentation guide",
      "Souvenir postcard bundle"
    ],
    itinerary: [
      {
        day: 1,
        title: "Inaugural Exhibition & Panel Discussion",
        description: "Inauguration ceremony at 11:00 AM. Guest artist panel discussion at 3:00 PM followed by gallery walk."
      },
      {
        day: 2,
        title: "Photography Workshop & Closing",
        description: "Open street photography critique session from 2:00 PM to 4:00 PM. Award announcement and closing."
      }
    ],
    reviewsBreakdown: {
      "Art Quality": 9.4,
      "Venue": 9.0,
      "Workshops": 9.2,
      "Value": 9.5
    }
  },
  {
    title: "Lalon Shah Mela Experience",
    price: 0,
    duration: "2 Days",
    description: "Immerse yourself in Sufi mysticism and folk music at the annual shrine festival of Fakir Lalon Shah in Kushtia.",
    location: "Kushtia, Bangladesh",
    distanceNote: "1 km from Kushtia Railway Station",
    imgUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-25",
    endDate: "2026-10-26",
    rating: "9.4",
    reviews: "115",
    category: "Art & Culture",
    inclusions: [
      "Access to open-air Baul music sessions",
      "Traditional ashram vegetarian meal sharing",
      "Guided explanation of Lalon philosophy"
    ],
    itinerary: [
      {
        day: 1,
        title: "Baul Geeti & Spiritual Gathering",
        description: "Gather at the main shrine arena. Enjoy traditional Baul singers performing mystic songs with Ektara and Dubki throughout the night."
      },
      {
        day: 2,
        title: "Philosophy Discussion & Shadhubazar",
        description: "Morning interactive session with Baul Gurus. Explore the local instrument makers' stalls before departure."
      }
    ],
    reviewsBreakdown: {
      "Music Quality": 9.8,
      "Culture": 9.9,
      "Organization": 8.5,
      "Vibe": 9.7
    }
  },
  {
    title: "Sajek Valley Star-gazing Tour",
    price: 35,
    duration: "2 Days",
    description: "Escape to Sajek Valley, the queen of hills. Sleep above the clouds and watch the Milky Way rise from your wooden cottage balcony.",
    location: "Sajek, Bangladesh",
    distanceNote: "From Khagrachari Town",
    imgUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000&auto=format&fit=crop",
    popular: true,
    startDate: "2026-11-15",
    endDate: "2026-11-16",
    rating: "9.7",
    reviews: "95",
    category: "Nature & Travel",
    inclusions: [
      "1 night cottage stay at Sajek Ruilui Para",
      "Khagrachari to Sajek 4x4 Chander Gari transfer",
      "Star-gazing camp with astronomical telescope",
      "Traditional bamboo shoot lunch & BBQ dinner"
    ],
    itinerary: [
      {
        day: 1,
        title: "Chander Gari Ride & Sunset at Konglak",
        description: "Board the 4x4 truck at Khagrachari. Ride through winding hill roads. Hike up Konglak Peak for a panoramic sunset. Stargazing starts at 10 PM."
      },
      {
        day: 2,
        title: "Helipad Sunrise & Return",
        description: "Wake up at 5:30 AM to catch the ocean of clouds from the resort helipad. Breakfast and check out for return journey."
      }
    ],
    reviewsBreakdown: {
      "Scenery": 10.0,
      "Stargazing": 9.8,
      "Food": 9.2,
      "Cottage Vibe": 9.6
    }
  },
  {
    title: "Dhaka Startup Meetup",
    price: 12,
    duration: "4 Hours",
    description: "Connect with angel investors, startup founders, and tech operators in Dhaka's premier co-working space.",
    location: "Gulshan, Dhaka",
    distanceNote: "Near Gulshan-2 Circle",
    imgUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-22",
    endDate: "2026-10-22",
    rating: "9.0",
    reviews: "56",
    category: "Networking",
    inclusions: [
      "Open networking slot with VC partners",
      "Appetizers, refreshments, and filter coffee",
      "Startup pitching slot (must register panel)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pitching & Open Networking",
        description: "Registration opens at 4:30 PM. Panel sharing at 5:00 PM, followed by 5-minute startup pitches and networking mixer."
      }
    ],
    reviewsBreakdown: {
      "Networking": 9.4,
      "Panel Quality": 9.1,
      "Food/Drinks": 8.8,
      "Value": 9.0
    }
  },
  {
    title: "Tanguar Haor Houseboat Tour",
    price: 55,
    duration: "2 Days",
    description: "Live on a luxurious traditional wooden houseboat on the vast waters of Tanguar Haor, surrounded by the Meghalaya hills.",
    location: "Sunamganj, Bangladesh",
    distanceNote: "From Sunamganj Town",
    imgUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
    popular: true,
    startDate: "2026-10-02",
    endDate: "2026-10-03",
    rating: "9.9",
    reviews: "184",
    category: "Nature & Travel",
    inclusions: [
      "1 night stay in an attached-bath houseboat cabin",
      "5 fresh premium meals featuring local Haor fish",
      "Kayaking, swimming safety gear & life jackets",
      "Speedboat tour to Niladri Lake (Lajghat)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Boarding, Watchtower & Swimming",
        description: "Board houseboat at Sunamganj at 9:00 AM. Cruise past swamp forests. Swimming and kayaking at watchtower site. Anchor at Niladri."
      },
      {
        day: 2,
        title: "Niladri Lake Exploration & Return",
        description: "Explore the limestone lake of Niladri early morning. Boat cruise back through Shimul forest. Return to Sunamganj by 5:00 PM."
      }
    ],
    reviewsBreakdown: {
      "Boat Quality": 9.9,
      "Hospitality": 10.0,
      "Scenery": 10.0,
      "Food": 9.8
    }
  },
  {
    title: "Chittagong Sea Food Festival",
    price: 15,
    duration: "8 Hours",
    description: "Indulge in freshly grilled crabs, lobsters, red snappers, and squids spiced with traditional Chittagonian masala.",
    location: "Chittagong, Bangladesh",
    distanceNote: "1 km from Patenga Sea Beach",
    imgUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-11-28",
    endDate: "2026-11-28",
    rating: "9.5",
    reviews: "140",
    category: "Food & Culinary",
    inclusions: [
      "Entry token to the seaside festival arena",
      "3-course premium seafood platter voucher",
      "Traditional local soft drinks (Lassi/Coconut)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Seaside Grills & Concert",
        description: "Gates open at 2:00 PM. Cooking demos by local chefs, followed by beachside dining. Folk-fusion concert starting at 6:00 PM."
      }
    ],
    reviewsBreakdown: {
      "Food Quality": 9.7,
      "Atmosphere": 9.4,
      "Value": 9.3,
      "Service": 9.1
    }
  },
  {
    title: "Rajshahi Mango & Silk Fest",
    price: 5,
    duration: "1 Day",
    description: "Celebrate the heritage of Rajshahi! Taste authentic mango-based dishes and explore traditional silk weaving factories.",
    location: "Rajshahi, Bangladesh",
    distanceNote: "2 km from Padma Garden",
    imgUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-05",
    endDate: "2026-10-05",
    rating: "9.2",
    reviews: "60",
    category: "Food & Culinary",
    inclusions: [
      "Guided silk factory factory tour",
      "Fresh gourmet mango product buffet tasting",
      "Silk souvenir discount coupon"
    ],
    itinerary: [
      {
        day: 1,
        title: "Silk Looms & Mango Gardens",
        description: "Gather at 9:30 AM. Tour the spinning and weaving units of Rajshahi Silk. Afternoon garden visit with mango desserts."
      }
    ],
    reviewsBreakdown: {
      "Educational": 9.4,
      "Mango Taste": 9.6,
      "Organization": 8.9,
      "Value": 9.1
    }
  },
  {
    title: "St. Martin's Coral Escape",
    price: 40,
    duration: "2 Days",
    description: "Travel to Bangladesh's only coral island. Cycle around Chera Dwip and enjoy fresh coconut water under palm trees.",
    location: "St. Martin's Island, Bangladesh",
    distanceNote: "From Teknaf Ship Jetty",
    imgUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop",
    popular: true,
    startDate: "2026-12-20",
    endDate: "2026-12-21",
    rating: "9.8",
    reviews: "167",
    category: "Nature & Travel",
    inclusions: [
      "Teknaf to St. Martin roundtrip ship ticket",
      "1 night hotel accommodation on the beachfront",
      "Guided cycle rental to explore Chera Dwip",
      "Traditional Koral Fish dinner"
    ],
    itinerary: [
      {
        day: 1,
        title: "Ship Cruise & Beach Sunset",
        description: "Board the sea cruise ship at Teknaf at 9:00 AM. Arrive by noon, check in, and enjoy sunset at West Beach. BBQ dinner at night."
      },
      {
        day: 2,
        title: "Chera Dwip Tour & Return",
        description: "Wake up early and take cycles to Chera Dwip coral reef. Board the return cruise ship to Teknaf at 3:00 PM."
      }
    ],
    reviewsBreakdown: {
      "Scenery": 10.0,
      "Sea Cruise": 9.6,
      "Food": 9.5,
      "Cottage Vibe": 9.4
    }
  },
  {
    title: "Dhaka International Film Festival",
    price: 20,
    duration: "3 Days",
    description: "Screenings of award-winning independent films and documentaries from South Asia and beyond, with guest directors.",
    location: "Dhaka, Bangladesh",
    distanceNote: "Near National Museum Auditorium",
    imgUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-11-05",
    endDate: "2026-11-07",
    rating: "9.3",
    reviews: "88",
    category: "Art & Culture",
    inclusions: [
      "3-Day multi-screening pass",
      "Panel discussions access with international filmmakers",
      "Digital festival catalog booklet"
    ],
    itinerary: [
      {
        day: 1,
        title: "Opening Ceremony & Screening",
        description: "Inaugural ceremony at 4:00 PM, followed by the opening feature film and Q&A session with the director."
      },
      {
        day: 2,
        title: "Documentary Showcases & Panel",
        description: "Back-to-back screenings from 10:00 AM. Afternoon panel on 'Modern Storytelling in Bengal' at 4:30 PM."
      },
      {
        day: 3,
        title: "Closing Ceremony & Awards",
        description: "Final film screening. Closing ceremony and award distribution starting at 6:00 PM."
      }
    ],
    reviewsBreakdown: {
      "Films Selection": 9.5,
      "Venue": 9.1,
      "Discussions": 9.4,
      "Value": 9.2
    }
  },
  {
    title: "Bagerhat Mosque Heritage Tour",
    price: 0,
    duration: "6 Hours",
    description: "Visit the UNESCO World Heritage Sixty Dome Mosque and other historic brick monuments of the medieval city of Bagerhat.",
    location: "Bagerhat, Bangladesh",
    distanceNote: "3 km from Bagerhat Town",
    imgUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-12",
    endDate: "2026-10-12",
    rating: "9.5",
    reviews: "52",
    category: "Art & Culture",
    inclusions: [
      "Guided tour of the Sixty Dome Mosque",
      "Admission to the Bagerhat Museum",
      "Traditional coconut water greeting"
    ],
    itinerary: [
      {
        day: 1,
        title: "Sixty Dome Mosque & Museum Walk",
        description: "Meet guide at 9:00 AM. Explore the architectural marvel of Sixty Dome Mosque, followed by Hazrat Khan Jahan Ali shrine and Bagerhat Museum."
      }
    ],
    reviewsBreakdown: {
      "History": 9.9,
      "Guide": 9.7,
      "Architecture": 9.8,
      "Value": 9.6
    }
  },
  {
    title: "Dhaka Marathon & Health Expo",
    price: 10,
    duration: "1 Day",
    description: "Join thousands of runners in a half-marathon through the scenic lakeside roads of Hatirjheel, promoting health and fitness.",
    location: "Hatirjheel, Dhaka",
    distanceNote: "Start point at Ampitheater",
    imgUrl: "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-11-01",
    endDate: "2026-11-01",
    rating: "9.2",
    reviews: "190",
    category: "Sports & Wellness",
    inclusions: [
      "Official Marathon running kit & t-shirt",
      "Timing chip and runner chest number bib",
      "Finisher medal & hydration point fruits",
      "Access to post-run health expo stalls"
    ],
    itinerary: [
      {
        day: 1,
        title: "Marathon Run & Health Expo",
        description: "Reporting starts at 5:00 AM. Race flags off at 6:00 AM. Health expo opens at 8:30 AM with organic food and medical checks."
      }
    ],
    reviewsBreakdown: {
      "Organization": 9.3,
      "Track Route": 9.4,
      "Kit Quality": 9.0,
      "Value": 9.1
    }
  },
  {
    title: "Sylhet Sufi Shrine Walk",
    price: 0,
    duration: "4 Hours",
    description: "Guided spiritual walk exploring the history and architecture of the shrines of Hazrat Shah Jalal and Hazrat Shah Paran.",
    location: "Sylhet, Bangladesh",
    distanceNote: "0.5 km from Sylhet City Center",
    imgUrl: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-08",
    endDate: "2026-10-08",
    rating: "9.4",
    reviews: "73",
    category: "Art & Culture",
    inclusions: [
      "Detailed historical description by local scholar",
      "Traditional Sufi dessert (Shinni) tasting",
      "Water and shoe preservation support"
    ],
    itinerary: [
      {
        day: 1,
        title: "Shah Jalal & Shah Paran Shrine Exploration",
        description: "Meet up at 3:30 PM. Explore Shah Jalal shrine, watch the famous catfish pond, and travel to Shah Paran shrine for late evening Sufi prayers."
      }
    ],
    reviewsBreakdown: {
      "Peacefulness": 9.8,
      "Information": 9.6,
      "Guide": 9.5,
      "Vibe": 9.7
    }
  },
  {
    title: "Comilla Khadi & Rasmalai Tour",
    price: 8,
    duration: "6 Hours",
    description: "Learn about Comilla's historic swadeshi Khadi weavers and treat yourself to the original Comilla Rasmalai.",
    location: "Comilla, Bangladesh",
    distanceNote: "1 km from Comilla Town Hall",
    imgUrl: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-10-28",
    endDate: "2026-10-28",
    rating: "9.3",
    reviews: "49",
    category: "Food & Culinary",
    inclusions: [
      "Live Khadi handloom weaving demo access",
      "Fresh authentic Rasmalai tasting buffet",
      "Guided transport inside Comilla town"
    ],
    itinerary: [
      {
        day: 1,
        title: "Khadi Handlooms & Rasmalai Tasting",
        description: "Meet at 10:00 AM. Visit handloom clusters. Traditional lunch followed by Rasmalai tasting at the famous Matri Bhandar."
      }
    ],
    reviewsBreakdown: {
      "Taste": 9.8,
      "Educational": 9.1,
      "Guide": 9.4,
      "Value": 9.2
    }
  },
  {
    title: "Sylhet Rainy Season Adventure",
    price: 30,
    duration: "2 Days",
    description: "Experience the monsoons in Sylhet! Take a boat ride through the flooded swamp forest of Ratargul and visit Jaflong.",
    location: "Sylhet, Bangladesh",
    distanceNote: "From Sylhet City",
    imgUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2000&auto=format&fit=crop",
    popular: true,
    startDate: "2026-10-01",
    endDate: "2026-10-02",
    rating: "9.8",
    reviews: "112",
    category: "Nature & Travel",
    inclusions: [
      "Traditional boat hire at Ratargul Swamp Forest",
      "Private transport to Jaflong riverbed border",
      "1 night hotel stay in Sylhet City",
      "Traditional Sylheti local lunch"
    ],
    itinerary: [
      {
        day: 1,
        title: "Ratargul Swamp Forest Cruise",
        description: "Travel to Ratargul at 9:00 AM. Take a silent wooden boat cruise inside the flooded forest canopy. Evening city tour."
      },
      {
        day: 2,
        title: "Jaflong Border & Tea Estate",
        description: "Drive to Jaflong. Explore the stone-collection riverbed and border hills. Visit a tea estate on the return leg."
      }
    ],
    reviewsBreakdown: {
      "Adventure": 9.9,
      "Scenery": 10.0,
      "Transport": 9.5,
      "Food": 9.4
    }
  },
  {
    title: "Kuakata Sunrise & Sunset Tour",
    price: 30,
    duration: "2 Days",
    description: "Travel to Kuakata, the daughter of the sea. Watch both the sunrise and sunset from the same sandy beach.",
    location: "Kuakata, Bangladesh",
    distanceNote: "0.2 km from Beach Center",
    imgUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
    popular: false,
    startDate: "2026-11-08",
    endDate: "2026-11-09",
    rating: "9.4",
    reviews: "82",
    category: "Nature & Travel",
    inclusions: [
      "1 night beachside hotel stay",
      "Gourmet sea fish dinner platter",
      "Guided tour to red crab beach and mangrove area"
    ],
    itinerary: [
      {
        day: 1,
        title: "Sunset Beach Walk & Crabs",
        description: "Arrive at Kuakata. Beach walk to spot red crabs. Watch the beautiful sunset from the beach. Sea-fish dinner party."
      },
      {
        day: 2,
        title: "Sunrise at Gangamati & Mangroves",
        description: "Wake up at 5:00 AM. Travel to Gangamati forest to watch the sunrise. Breakfast and departure."
      }
    ],
    reviewsBreakdown: {
      "Scenery": 9.8,
      "Vibe": 9.5,
      "Food": 9.3,
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
