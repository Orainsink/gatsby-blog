import React, { useContext,useRef,useEffect } from 'react';
import { MainContext } from '../redux/Provider';
import '../styles/Player.css';
import APlayer  from 'aplayer'
import songs from '../assets/js/songs'

/**APlayer */
const Player:React.FC = () => {
const aplayer = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const ap = new APlayer({
      container: aplayer.current,
      listFolded: true,
      listMaxHeight: 60,
      audio: songs});
  },[])

  return (
      <div id="aplayer" ref={aplayer} />
  );
};

export default React.memo(Player);
