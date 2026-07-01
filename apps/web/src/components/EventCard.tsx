import Link from "next/link";

export interface EventItemType {
  _id?: string;
  id: string;
  title: string;
  category: string;
  date?: string;
  startDate?: string;
  location: string;
  price: string | number;
  tag?: string;
  imageUrl?: string;
  imgUrl?: string;
  description: string;
}

interface EventCardProps {
  event: EventItemType;
}

export default function EventCard({ event }: EventCardProps) {
  const eventId = event._id || event.id;
  const image = event.imgUrl || event.imageUrl || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4";
  
  const formattedPrice = typeof event.price === "number"
    ? (event.price === 0 ? "Free" : `BDT ${event.price}`)
    : event.price;

  const formattedDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : event.date || "Upcoming Event";

  return (
    <Link
      href={`/events/${eventId}`}
      className="bg-white rounded-2xl card-ambient overflow-hidden group cursor-pointer flex flex-col h-full hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-surface-container">
        <img
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
        />
        {(event.tag || event.category) && (
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm border border-secondary-fixed-dim/20 text-secondary capitalize">
            {event.tag || event.category}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-secondary font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-sm">calendar_month</span>
          <span>{formattedDate}</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow line-clamp-2">
          {event.description}
        </p>
        <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center mt-auto">
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{event.location}</span>
          </div>
          <span className="font-label-md text-label-md text-primary font-bold">{formattedPrice}</span>
        </div>
      </div>
    </Link>
  );
}
