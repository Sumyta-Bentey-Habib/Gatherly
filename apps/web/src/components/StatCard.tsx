import { StatCard as StatCardType } from "../app/data/dummyData";

interface StatCardProps {
  stat: StatCardType;
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-gutter ambient-shadow border border-outline-variant/30 flex flex-col justify-between h-48">
      <div className="flex items-center justify-between">
        <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          {stat.title}
        </h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.iconBgClass} ${stat.iconTextClass}`}>
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            {stat.icon}
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-display-lg text-display-lg text-on-surface">
            {stat.value}
          </span>
        </div>
        <p className={`font-label-sm text-label-sm flex items-center mt-2 ${stat.isPositive ? 'text-primary' : 'text-tertiary'}`}>
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            {stat.isPositive ? 'trending_up' : 'trending_down'}
          </span>
          <span className="ml-1">{stat.change}</span>
        </p>
      </div>
    </div>
  );
}
