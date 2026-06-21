"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useContact } from "../hooks/useContact";

export default function ContactPage() {
  const {
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    loading,
    success,
    setSuccess,
    error,
    handleSubmit,
  } = useContact();

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md antialiased landing-page">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col pt-32 pb-24 relative overflow-hidden gradient-bg">
        {/* Decorative blur blobs */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-start relative z-10">
          
          {/* Contact Information Cards (Bento Grid) - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-2">
                contact_support
              </span>
              <h1 className="font-display-lg text-headline-lg text-on-surface mb-2">
                Get in Touch
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
                Have a question or want to plan an event? We'd love to hear from you.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="space-y-4 pt-4">
              <div className="glass-panel p-6 rounded-2xl card-ambient bg-white/70 flex gap-4 items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">Email Us</h3>
                  <p className="text-on-surface-variant font-body-sm text-sm mt-1">
                    Our team is here to help.
                  </p>
                  <a href="mailto:hello@gatherly.com" className="text-primary hover:underline font-semibold block mt-1">
                    hello@gatherly.com
                  </a>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl card-ambient bg-white/70 flex gap-4 items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">pin_drop</span>
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">Office</h3>
                  <p className="text-on-surface-variant font-body-sm text-sm mt-1">
                    Come say hello at our HQ.
                  </p>
                  <span className="text-on-surface font-semibold block mt-1">
                    100 Pine Street, San Francisco, CA
                  </span>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl card-ambient bg-white/70 flex gap-4 items-start">
                <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">Hours</h3>
                  <p className="text-on-surface-variant font-body-sm text-sm mt-1">
                    We're active during weekdays.
                  </p>
                  <span className="text-on-surface font-semibold block mt-1">
                    Mon - Fri: 9:00 AM - 6:00 PM PST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-3">
            <div className="glass-panel p-8 md:p-10 rounded-3xl card-ambient bg-white/70">
              
              {success ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center text-primary mx-auto">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h2 className="font-display-lg text-headline-lg text-on-surface">
                    Message Sent!
                  </h2>
                  <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
                    Thank you for reaching out. We have received your inquiry and will respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:shadow-ambient hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
                    Send a Message
                  </h2>

                  {error && (
                    <div className="bg-error-container text-on-error-container p-4 rounded-xl border border-error/20 flex items-start gap-3">
                      <span className="material-symbols-outlined text-error mt-0.5">error</span>
                      <span className="font-label-sm text-label-sm">{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block font-label-md text-label-md text-on-surface mb-2">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block font-label-md text-label-md text-on-surface mb-2">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-label-md text-label-md text-on-surface mb-2">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-label-md text-label-md text-on-surface mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-full hover:shadow-ambient hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
