import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./modules/client.module.css";
import { useNavigate } from "react-router-dom";

const IMAGES = [
  new URL('../assets/images/mobilemetuchen.svg', import.meta.url).href,
  new URL('../assets/images/mobilespinning.svg', import.meta.url).href,
];

const LABELS = [
  "METUCHEN DINER",
  "SPINNING WHEEL DINER",
];

const LINKS = [
  "https://metuchendiner.net",
  "https://spinningwheeldiner.com",
];

const DURATION = 8000; // keep in sync with desktop

export default function MobileClients() {
  const [index, setIndex] = React.useState(0);
  const navigate = useNavigate();

  // auto-advance
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), DURATION);
    return () => clearInterval(id);
  }, []);

  // prefetch next
  React.useEffect(() => {
    const next = IMAGES[(index + 1) % IMAGES.length];
    const img = new Image();
    img.src = next;
  }, [index]);

  return (
    <div className={`${styles["client-outer"]} ${styles["mobile-client"]}`}>
      {/* Background cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={IMAGES[index]}
          className={styles.bg}
          style={{
            backgroundImage: `url(${IMAGES[index]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* darken for readability */}
      <div className={styles["bg-overlay"]} />

      {/* Content */}
      <div className={styles["mobile-inner"]}>
        <h1 className={styles["mobile-title"]}>
        Client Projects 
        </h1>
        <p className={styles["hero-subtext"]} style={{marginBottom: "30px"}}>
        Full stack business applications built with React, Node.js, Tailwind CSS, and more.
        </p>

        {/* Slide label */}
        <p className={styles["mobile-subtext"]}>{LABELS[index]}</p>

        {/* Progress bars (one per slide) */}
        <div className={styles["mobile-bars"]} role="tablist" aria-label="Slides progress">
          {LABELS.map((_, i) => {
            const active = i === index;
            return (
              <div
                key={i}
                className={styles["mobile-bar"]}
                role="tab"
                aria-selected={active ? "true" : "false"}
                onClick={() => setIndex(i)}
                title={LABELS[i]}
              >
                <motion.div
                  key={active ? `bar-${i}-${index}` : `bar-idle-${i}`}
                  className={styles["mobile-bar__fill"]}
                  initial={{ scaleX: active ? 0 : 0 }}
                  animate={{ scaleX: active ? 1 : 0 }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                />
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className={styles["mobile-buttons"]}>
          <button
            className={`${styles["hero-btn"]} ${styles["hero-btn--dark"]}`}
            onClick={() =>
              window.open(LINKS[index], "_blank", "noopener,noreferrer")
            }
          >
            Open Site
          </button>

          <button
            onClick={() => navigate("/")}
            className={`${styles["hero-btn"]} ${styles["hero-btn--light"]}`}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
