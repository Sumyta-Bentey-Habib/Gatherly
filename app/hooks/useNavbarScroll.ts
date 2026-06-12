import { useEffect, useState } from "react";

export function useNavbarScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    // Call handler immediately in case the page is already scrolled on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
}
