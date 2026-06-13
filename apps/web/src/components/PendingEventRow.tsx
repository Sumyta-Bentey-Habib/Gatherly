import { PendingEvent } from "../app/data/dummyData";

interface PendingEventRowProps {
  event: PendingEvent;
}

export default function PendingEventRow({ event }: PendingEventRowProps) {
  return (
    <tr className="hover:bg-surface-container-low/50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-label-md text-label-md text-on-surface">
          {event.title}
        </div>
        <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">
          {event.type} • {event.expectedAttendees}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-label-sm ${event.organizerBgClass}`}>
            {event.organizerInitials}
          </div>
          <span className="font-body-md text-body-md text-on-surface">
            {event.organizerName}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">
        {event.dateSubmitted}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container font-label-sm text-label-sm transition-colors">
            Review
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm hover:bg-primary transition-colors">
            Approve
          </button>
        </div>
      </td>
    </tr>
  );
}
