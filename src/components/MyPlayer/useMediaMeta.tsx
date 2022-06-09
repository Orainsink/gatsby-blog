import { useEffect } from 'react';

import SONGS from '../../assets/constants/songs';

/**
 * used for chrome / mac global audio controller
 * @param id song id
 */
const useMediaMeta = (id: number): void => {
  useEffect(() => {
    if ('mediaSession' in navigator) {
      const curSong = SONGS[id - 1];
      if (navigator && navigator.mediaSession) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: curSong.name,
          artist: curSong.artist,
          artwork: [
            { src: curSong.cover, sizes: '130x130', type: 'image/jpg' },
          ],
        });
      }
    }
  }, [id]);
};

export default useMediaMeta;
