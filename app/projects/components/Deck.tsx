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


  return <button
    type="button"
    className={clsx(projectsCSS.deckContainer, { [projectsCSS.gameOn]: gameOn })}
    onClick={handleDeckClick}
    aria-disabled={gameOn}
    aria-expanded={gameOn}
    aria-label={gameOn ? `${username}'s project deck, cards displayed` : `Show ${username}'s project cards`}
  >
    <span className={clsx(projectsCSS.deckTitle, figtree.className)}>{username}'s Deck</span>
    {image ? <Image src={image} width={512} height={512} alt=""/>
    : <span className={projectsCSS.deckLetter}>{firstLetter}</span>}
  </button>;
}
