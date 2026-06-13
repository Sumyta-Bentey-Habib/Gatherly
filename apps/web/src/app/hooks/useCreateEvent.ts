"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import { apiFetch } from "../../lib/api";

export function useCreateEvent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Form States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [distanceNote, setDistanceNote] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  
  const [inclusions, setInclusions] = useState<string[]>(["Full access pass", "Food & drinks included"]);
  const [inclusionInput, setInclusionInput] = useState("");

  const [itinerary, setItinerary] = useState<{ day: number; title: string; description: string }[]>([
    { day: 1, title: "Opening and Keynotes", description: "Introduction, welcome address, and main presentations." },
  ]);
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryDesc, setItineraryDesc] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Preset premium cover images
  const coverPresets = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", // Summit
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", // Workshop
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", // Festival
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", // Cocktail/Gala
  ];

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      } else if (session.user.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [session, isPending, router]);

  const handleAddInclusion = () => {
    if (inclusionInput.trim()) {
      setInclusions((prev) => [...prev, inclusionInput.trim()]);
      setInclusionInput("");
    }
  };

  const handleRemoveInclusion = (idx: number) => {
    setInclusions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddItinerary = () => {
    if (itineraryTitle.trim() && itineraryDesc.trim()) {
      setItinerary((prev) => [
        ...prev,
        {
          day: prev.length + 1,
          title: itineraryTitle.trim(),
          description: itineraryDesc.trim(),
        },
      ]);
      setItineraryTitle("");
      setItineraryDesc("");
    }
  };

  const handleRemoveItinerary = (idx: number) => {
    const filtered = itinerary.filter((_, i) => i !== idx);
    // Re-index days
    const reindexed = filtered.map((item, i) => ({
      ...item,
      day: i + 1,
    }));
    setItinerary(reindexed);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!imgUrl) {
      // Pick random preset if empty
      setImgUrl(coverPresets[Math.floor(Math.random() * coverPresets.length)]);
    }

    try {
      await apiFetch("/api/events", {
        method: "POST",
        body: JSON.stringify({
          title,
          category,
          price: Number(price),
          startDate,
          endDate: startDate,
          location,
          distanceNote,
          imgUrl: imgUrl || coverPresets[0],
          description,
          inclusions,
          itinerary,
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    isPending,
    router,
    title,
    setTitle,
    category,
    setCategory,
    price,
    setPrice,
    startDate,
    setStartDate,
    location,
    setLocation,
    distanceNote,
    setDistanceNote,
    imgUrl,
    setImgUrl,
    description,
    setDescription,
    inclusions,
    setInclusions,
    inclusionInput,
    setInclusionInput,
    itinerary,
    setItinerary,
    itineraryTitle,
    setItineraryTitle,
    itineraryDesc,
    setItineraryDesc,
    error,
    setError,
    loading,
    success,
    coverPresets,
    handleAddInclusion,
    handleRemoveInclusion,
    handleAddItinerary,
    handleRemoveItinerary,
    handleSubmit,
  };
}
