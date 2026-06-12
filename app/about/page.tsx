"use client";

import styles from "./about.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { aboutValues, teamMembers } from "../data/dummyData";

export default function About() {
  return (
    <div className="font-body-md text-body-md antialiased overflow-x-hidden landing-page">
      {/* TopNavBar */}
      <Navbar activePage="about" />

      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 md:pt-48 md:pb-28 overflow-hidden ${styles.aboutHeroBg}`}>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-secondary-fixed-dim/30">
            <span className={`material-symbols-outlined text-sm text-secondary ${styles.iconFilled}`}>
              eco
            </span>
            <span className="font-label-sm text-label-sm text-secondary">Our Mission</span>
          </div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface max-w-3xl mx-auto">
            We believe in <span className="text-primary">Humanizing</span> Gatherings
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Gatherly is born from a desire to bring people together effortlessly. We create space for genuine connection, leaving the complex details behind.
          </p>
        </div>
        {/* Decorative blur blobs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary-container/40 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-primary-fixed/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
            {aboutValues.map((value) => (
              <div key={value.id} className="p-8 space-y-4">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${value.iconBgClass} ${value.iconTextClass}`}>
                  <span className="material-symbols-outlined">{value.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">{value.title}</h3>
                <p className="text-on-surface-variant">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              Meet the Founders
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              The creative minds behind your seamless event planning experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className={`bg-white p-8 flex flex-col items-center text-center space-y-4 ${styles.teamCard}`}>
                <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-variant">
                  <img
                    alt={member.name}
                    className="w-full h-full object-cover"
                    src={member.imageUrl}
                  />
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface">{member.name}</h4>
                  <p className="text-primary font-semibold font-label-sm text-label-sm">{member.role}</p>
                </div>
                <p className="text-on-surface-variant text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
