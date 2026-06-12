import styles from "./components.module.css";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-inverse-surface w-full">
      <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <a
            className="font-display-lg text-headline-md text-primary dark:text-inverse-primary flex items-center gap-2"
            href="/"
          >
            <span className={`material-symbols-outlined text-primary-container ${styles.iconFilled}`}>
              eco
            </span>
            Gatherly
          </a>
          <p className="text-on-surface-variant font-body-md text-body-md mt-2">
            Effortless coordination for modern gatherings.
          </p>
          <p className="text-secondary dark:text-secondary-fixed-dim font-label-sm text-label-sm mt-auto pt-4">
            © 2024 Gatherly. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-2">
            Platform
          </h4>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="/"
          >
            Explore
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Features
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Pricing
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-2">
            Company
          </h4>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="/about"
          >
            About
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Contact
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Careers
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-2">
            Legal
          </h4>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            href="#"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
