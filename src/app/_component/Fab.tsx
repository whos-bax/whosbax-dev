'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './fab.module.scss';
import {
  FaSpotify,
  FaApple,
  FaYoutube,
  FaSoundcloud,
  FaInstagram,
  FaMusic,
  FaHeadphones,
  FaTimes,
  FaPrint,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

type Platform = {
  name: string;
  url: string;
  platform: string;
  icon: IconType;
};

type FabProps = {
  type: 'music' | 'print';
};

const streamingPlatforms: Platform[] = [
  { name: 'Spotify', url: 'https://open.spotify.com/artist/4yss9yTTyzgVjBMK03uQq9', platform: 'spotify', icon: FaSpotify },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/whosbax/1525508687?l=ko', platform: 'apple', icon: FaApple },
  { name: 'YouTube', url: 'https://www.youtube.com/@whosbax', platform: 'youtube', icon: FaYoutube },
  { name: 'Melon', url: 'https://www.melon.com/artist/timeline.htm?artistId=2883014', platform: 'melon', icon: FaMusic },
  { name: 'Genie', url: 'https://www.genie.co.kr/detail/artistInfo?xxnm=80880610', platform: 'genie', icon: FaMusic },
  { name: 'FLO', url: 'https://www.music-flo.com/detail/artist/404264765/track?sortType=POPULARITY&roleType=ALL', platform: 'flo', icon: FaMusic },
  { name: 'Bugs', url: 'https://music.bugs.co.kr/artist/20113150?wl_ref=list_ar_02_search', platform: 'bugs', icon: FaMusic },
  { name: 'SoundCloud', url: 'https://soundcloud.com/whosbax', platform: 'soundcloud', icon: FaSoundcloud },
];

const snsPlatforms: Platform[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/whosbax', platform: 'instagram', icon: FaInstagram },
];

export default function Fab({ type }: FabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  if (type === 'print') {
    return (
      <div className={styles.fabContainer}>
        <button
          className={styles.fabButton}
          onClick={() => window.print()}
          aria-label="Print"
        >
          <FaPrint />
        </button>
      </div>
    );
  }

  const allPlatforms = [...streamingPlatforms, ...snsPlatforms];

  return (
    <>
      {isOpen && (
        <div
          className={styles.fabOverlay}
          onClick={handleClose}
        />
      )}
      <div className={styles.fabContainer}>
        {isOpen && (
          <div className={`${styles.fabMenu} ${isClosing ? styles.fabMenuClosing : ''}`}>
            {allPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              const reverseIndex = allPlatforms.length - 1 - index;
              return (
                <Link
                  key={platform.platform}
                  href={platform.url}
                  target="_blank"
                  className={`${styles.fabItem} ${isClosing ? styles.fabItemClosing : ''}`}
                  data-platform={platform.platform}
                  style={{
                    animationDelay: isClosing ? `${reverseIndex * 0.02}s` : `${index * 0.03}s`
                  }}
                >
                  <Icon />
                  <span className={styles.fabItemLabel}>{platform.name}</span>
                </Link>
              );
            })}
          </div>
        )}
        <button
          className={`${styles.fabButton} ${isOpen ? styles.fabButtonOpen : ''}`}
          onClick={handleToggle}
          aria-label="Music platforms"
        >
          {isOpen ? <FaTimes /> : <FaHeadphones />}
        </button>
      </div>
    </>
  );
}
