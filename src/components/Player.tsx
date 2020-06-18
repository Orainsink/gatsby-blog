import React, { useState, useRef, useEffect } from 'react';
import '../styles/Player.css';
import APlayer from 'aplayer';
import songs from '../assets/js/songs';
import { useSelector, useDispatch } from 'react-redux';

/**APlayer */
const Player: React.FC = () => {
  const aplayer = useRef<HTMLDivElement>(null);
  const { scene } = useSelector((state) => state);
  const [ap, setAp] = useState(null);

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

  useEffect(() => {
    if (scene) {
      ap && ap.pause();
    } else {
      ap && ap.play();
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
