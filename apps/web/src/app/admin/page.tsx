"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";
import PendingEventRow from "../../components/PendingEventRow";
import { statsOverview, quickActions, pendingEvents, chartRegistrationData } from "../data/dummyData";

interface CustomWindow extends Window {
  Chart?: any;
}

declare let window: CustomWindow;

export default function AdminDashboard() {
  const chartInstance = useRef<any>(null);

  const initChart = () => {
    const canvas = document.getElementById("registrationsChart") as HTMLCanvasElement | null;
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart to prevent duplicates on hot-reload
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const primaryColor = "#3EB489";

    chartInstance.current = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: chartRegistrationData.labels,
        datasets: [
          {
            label: "Registrations",
            data: chartRegistrationData.data,
            borderColor: primaryColor,
            backgroundColor: "rgba(62, 180, 137, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: primaryColor,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "#2c322e",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#bccac1",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            grid: {
              color: "rgba(109, 122, 114, 0.1)",
            },
            ticks: {
              color: "#3d4943",
              font: {
                family: "Inter",
                size: 12,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#3d4943",
              font: {
                family: "Inter",
                size: 12,
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    if (window.Chart) {
      initChart();
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex w-full">
      <Script
        src="https://cdn.jsdelivr.net/npm/chart.js"
        strategy="afterInteractive"
        onLoad={initChart}
      />
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top App Bar */}
        <Topbar />

        <div className="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full space-y-stack-lg">
          {/* Page Header */}
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              Overview
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Monitor platform activity and manage key operations.
            </p>
          </div>

          {/* Analytics Overview (Bento Grid) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {statsOverview.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}

            {/* Main Chart (Spans 2 cols on desktop) */}
            <div className="bg-surface-container-lowest rounded-xl p-gutter ambient-shadow border border-outline-variant/30 md:col-span-2 min-h-[300px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Registration Trends
                </h2>
                <select className="bg-surface-container-low border-none text-on-surface font-label-sm text-label-sm rounded-lg focus:ring-1 focus:ring-primary-container px-3 py-1.5 cursor-pointer">
                  <option>Last 7 Days</option>
                  <option defaultValue="Last 30 Days">Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="relative h-[250px] w-full">
                <canvas id="registrationsChart"></canvas>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-container-lowest rounded-xl p-gutter ambient-shadow border border-outline-variant/30 flex flex-col">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4 flex-1">
                {quickActions.map((action) => (
                  <button key={action.id} className="w-full flex items-center gap-4 p-4 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                      <span className="material-symbols-outlined">{action.icon}</span>
                    </div>
                    <div className="text-left flex-1">
                      <span className="block font-label-md text-label-md text-on-surface">
                        {action.title}
                      </span>
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        {action.subtitle}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      chevron_right
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Pending Events Queue */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Pending Approval
              </h2>
              <a className="font-label-md text-label-md text-primary hover:underline" href="#">
                View All
              </a>
            </div>
            <div className="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                      <th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                        Event Details
                      </th>
                      <th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                        Organizer
                      </th>
                      <th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                        Date Submitted
                      </th>
                      <th className="px-6 py-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {pendingEvents.map((event) => (
                      <PendingEventRow key={event.id} event={event} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
