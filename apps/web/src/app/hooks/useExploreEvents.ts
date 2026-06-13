"use client";

import { useEffect, useState } from "react";
import { featuredEvents } from "../data/dummyData";
import { apiFetch } from "../../lib/api";

export interface EventItem {
  _id?: string;
  id: string;
  title: string;
  category: string;
  startDate?: string;
  date?: string;
  location: string;
  price: string | number;
  imgUrl?: string;
  imageUrl?: string;
  description: string;
  tag?: string;
}

export function useExploreEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const popularCategories = [
    "Design",
    "Networking",
    "Conference",
    "Tech Summits",
  ];

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/events");
      if (data && data.length > 0) {
        // Normalize IDs
        const normalized = data.map((evt: any) => ({
          ...evt,
          id: evt._id || evt.id,
        }));
        setEvents(normalized);
        setFilteredEvents(normalized);
      } else {
        // Fallback to dummy events if database is empty
        setEvents(featuredEvents);
        setFilteredEvents(featuredEvents);
      }
    } catch (err) {
      console.error("Failed to load events from server:", err);
      // Fallback
      setEvents(featuredEvents);
      setFilteredEvents(featuredEvents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let result = [...events];

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (evt) =>
          evt.title.toLowerCase().includes(keyword) ||
          evt.description.toLowerCase().includes(keyword)
      );
    }

    if (searchLocation.trim()) {
      const loc = searchLocation.toLowerCase();
      result = result.filter((evt) =>
        evt.location.toLowerCase().includes(loc)
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (evt) => evt.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredEvents(result);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedCategory, events]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory.toLowerCase() === category.toLowerCase()) {
      setSelectedCategory(""); // toggle off
    } else {
      setSelectedCategory(category);
    }
  };

  return {
    events,
    filteredEvents,
    loading,
    searchKeyword,
    setSearchKeyword,
    searchLocation,
    setSearchLocation,
    selectedCategory,
    setSelectedCategory,
    popularCategories,
    handleSearch,
    handleCategoryClick,
  };
}
