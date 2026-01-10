'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './variableFontHero.module.scss';
import InkEffect from './InkEffect';
import SecretAdminCopyright from './SecretAdminCopyright';

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
      </main>

      <nav
        className={styles.navLinks}
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <Link href="/about">about</Link>
        <Link href="/timeline">timeline</Link>
        <Link href="/guestbook">guestbook</Link>
      </nav>

      <footer
        className={styles.copyright}
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      >
        <SecretAdminCopyright />
      </footer>
    </div>
  );
}
