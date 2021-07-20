import { useEffect } from 'react';
import { songs } from '../../assets/config/songs';

/**
 * used for chrome / mac global audio controller
 * @param id song id
 */
const useMediaMeta = (id: number) => {
  useEffect(() => {
    if ('mediaSession' in navigator) {
      const curSong = songs[id - 1];
      navigator.mediaSession.metadata = new MediaMetadata({
        title: curSong.name,
        artist: curSong.artist,
        artwork: [{ src: curSong.cover, sizes: '130x130', type: 'image/jpg' }],
      });
    }
  }, [id]);
};

export default useMediaMeta;
