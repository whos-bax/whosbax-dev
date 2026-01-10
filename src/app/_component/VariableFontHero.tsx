'use client';

import { useState, useEffect } from 'react';
import styles from './variableFontHero.module.scss';
import InkEffect from './InkEffect';

export default function VariableFontHero() {
  const [weight, setWeight] = useState(300);
  const [spacing, setSpacing] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    let frame = 0;
    const animate = () => {
      frame += 0.015;
      setWeight(400 + Math.sin(frame) * 200);
      // letter-spacing: -0.02em ~ 0.02em
      setSpacing(Math.sin(frame) * 0.05);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <div className={styles.headlineWrapper}>
          <InkEffect />
          <h1
            className={styles.headline}
            style={{
              fontVariationSettings: `'wght' ${weight}`,
              letterSpacing: `${spacing}em`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            꿈이 많은
            <br />
            어른 아이
          </h1>
        </div>

        <div className={styles.divider} style={{ opacity: isLoaded ? 1 : 0 }} />

        <p
          className={styles.name}
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          박상호 · SANGHO PARK
        </p>

        <p
          className={styles.description}
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          본질을 추구하고 기록하고자 합니다.
        </p>
      </main>

      <footer
        className={styles.copyright}
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      >
        © whosbax
      </footer>
    </div>
  );
}
