import React, { useState, useRef, useEffect } from 'react';
import '../assets/theme/Player.css';
import APlayer from 'aplayer';
import songs from '../assets/js/songs';
import { useSelector } from 'react-redux';

/**APlayer */
const Player: React.FC = () => {
  const aplayer = useRef<HTMLDivElement>(null);
  const { scene } = useSelector((state) => state);
  const [ap, setAp] = useState(null);
  const [vol, setVol] = useState(0);

  useEffect(() => {
    const player = new APlayer({
      fixed: true,
      volume: 0.3,
      container: aplayer.current,
      listFolded: true,
      listMaxHeight: 60,
      audio: songs,
    });
    setAp(player);
  }, []);

  /**模拟静音 */
  useEffect(() => {
    if (scene) {
      if (ap) {
        setVol(ap.audio.volume);
        ap.volume(0);
      }
    } else {
      ap && ap.volume(ap.audio.volume || vol);
    }
  }, [scene]);

  return (
    <div
      id="aplayer"
      ref={aplayer}
      style={{ display: scene ? 'none' : 'block' }}
    />
  );
};

export default React.memo(Player);
