import { EventItem } from "../app/data/dummyData";

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl card-ambient overflow-hidden group cursor-pointer flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={event.imageUrl}
        />
        {event.tag && (
          <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary px-3 py-1 rounded-full font-label-sm text-label-sm shadow-sm">
            {event.tag}
          </div>
        )}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface-variant hover:text-tertiary transition-colors">
          <span className="material-symbols-outlined text-lg">favorite</span>
        </button>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-secondary font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-sm">calendar_month</span>
          <span>{event.date}</span>
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
          <span className="font-label-md text-label-md text-on-surface">{event.price}</span>
        </div>
      </div>
    </div>
  );
}
