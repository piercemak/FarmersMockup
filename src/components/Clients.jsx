import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./modules/client.module.css";
import { Link, useNavigate } from 'react-router-dom';


const IMAGES = [
  new URL('../assets/images/metuchendinerbuilding.jpg', import.meta.url).href,
  new URL('../assets/images/spinningwheelbuilding.jpg', import.meta.url).href,
];

const LABELS = [
  "METUCHEN DINER",
  "SPINNING WHEEL DINER",
];

const LINKS = [
  "https://metuchendiner.net",       
  "https://spinningwheeldiner.com",   
];

const DURATION = 8000; // ms per slide

export default function Clients() {
  const [index, setIndex] = React.useState(0);

  const navigate = useNavigate();
  const navHome = () => {
    navigate('/');
  };

  // auto-advance
  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, DURATION);
    return () => clearInterval(id);
  }, []);

  // optional: prefetch next image
  React.useEffect(() => {
    const next = IMAGES[(index + 1) % IMAGES.length];
    const img = new Image();
    img.src = next;
  }, [index]);

  return (
    <div className={styles["client-outer"]}>
      {/* background cross-fade */}
      <div className={styles.bg} />
      <AnimatePresence mode="wait">
        <motion.div
          key={IMAGES[index]}
          className={styles.bg}
          style={{ backgroundImage: `url(${IMAGES[index]})`, backgroundPosition: "left center", backgroundSize: "cover" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>


      {/* Black overlay layer */}
      <div className={styles["bg-overlay"]} />

      {/* overlays */}
      <div className={styles.vignette} />
      <div className={styles.grain} />

      {/* content */}
      <div className={styles["client-inner"]}>
        <div className={styles["nav-index"]}>
          {(index + 1).toString().padStart(2, "0")}
        </div>

        {/* center buttons */}
        <div className={styles["center-content"]}>
          <h1 className={styles["hero-title"]}>
            Client-Commissioned Projects 
          </h1>
          <p className={styles["hero-subtext"]}>
            Full stack business applications built with React, Node.js, Tailwind CSS, and more.
          </p>

          <div className={styles["button-row"]}>
            <motion.button    
              className={`${styles["hero-btn"]} ${styles["hero-btn--dark"]}`}
              onClick={() => window.open(LINKS[index], "_blank", "noopener,noreferrer")}
            >
              Open Website <span className={styles["arrow-icon"]}>↗</span>
            </motion.button>
            <motion.button onClick={navHome} className={`${styles["hero-btn"]} ${styles["hero-btn--light"]}`}>
              Navigate Home
            </motion.button>
          </div>
        </div>


        {/* bottom nav (pinned) */}
        <nav className={styles["client-bottom-nav"]}>
          {LABELS.map((label, i) => {
            const isActive = i === index;
            return (
              <button
                key={label}
                className={styles["nav-item"]}
                onClick={() => setIndex(i)}
                aria-current={isActive ? "true" : undefined}
                style={{ background: "transparent", border: 0, color: "inherit", cursor: "pointer" }}
              >
                {/* progress line ABOVE the text */}
                <div className={styles["nav-line"]}>
                  <motion.div
                    key={isActive ? `fill-${i}-${index}` : `idle-${i}`}
                    className={styles["nav-line__fill"]}
                    initial={{ scaleX: isActive ? 0 : 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                  />
                </div>

                <span style={{ letterSpacing: "0.12em" }}>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
