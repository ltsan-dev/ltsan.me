'use client';
import Image from 'next/image';
import projectsCSS from '@/app/ui/projects.module.css';
import { figtree } from '@/app/ui/fonts';

import clsx from 'clsx';

type DeckProps = {
  username: string;
  image: string | null;
  setGameOn: (gameOn: boolean) => void;
  gameOn: boolean;
  drawCard: () => void;
};



export default function Deck({ username, image, setGameOn, gameOn, drawCard }: DeckProps) {
  const firstLetter = username.charAt(0);

  function handleDeckClick() {
    if(!gameOn) {
      console.log("Deck clicked!");
      setGameOn(true);
    } else {
      //drawCard(); this adds a card to the list but shows dummy cards atm
    }
  }


  return <div className={clsx(projectsCSS.deckContainer, { [projectsCSS.gameOn]: gameOn })} onClick={handleDeckClick}>
    <h3 className={clsx(figtree.className)}>{username}'s Deck</h3>
    {image ? <Image src={image} width={512} height={512} alt={`Profile picture of ${username}`}/>
    : <span className={projectsCSS.deckLetter}>{firstLetter}</span>}
  </div>;
}
