"use client"

import projectsCSS from '@/app/ui/projects.module.css';
import { AnimatePresence, motion, useReducedMotion } from "motion/react";


import Deck from '@/app/projects/components/Deck';
import Card from '@/app/projects/components/Card';
import Legend from '@/app/projects/components/Legend';

import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';

import { Card as CardType } from '@/app/lib/definitions';
import cardsData from '../lib/cards';
import TechList from './components/TechList';


export default function Page() {
  const [gameOn, setGameOn] = useState(false);
  const [cards, setCards] = useState<CardType[]>(cardsData);
  const [chosenCard, setChosenCard] = useState<CardType | null>(null);
  const prevCardCount = useRef(cards.length);
  const shouldReduceMotion = useReducedMotion();

  const animationOptions = {
    layout: true,
    initial: { opacity: 0, y: 40, rotate: -5 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: 40, rotate: 5 },
    transition: {
      layout: { type: "spring", stiffness: 100, damping: 20 },
      opacity: { duration: 0.2 },
      y: { type: "spring", stiffness: 100, damping: 20 },
      rotate: { duration: 0.5 },
    }
  };

  useEffect(() => {
    document.body.classList.toggle("bodyDim", !gameOn);
    return () => { document.body.classList.remove("bodyDim"); };
  }, [gameOn]);

  useEffect(() => {
    if (!chosenCard) document.body.style.backgroundColor = "";
    prevCardCount.current = cards.length;
  }, [cards.length]);
  

  function drawCard() {
    const newCard:CardType = {
        id: "" + cards.length + 1,
        type: 'Full-stack',
        rarity: 2,
        colors: ['#57007F'],
        name: 'DubCards (Fake)',
        desc: 'DubCards is a University of Washington themed trading card game featuring UW themed cards and packs. Cards can be bought, sold or favorited. Users can add friends to trade cards wish. Enjoy DubCards with many cards and packs to choose from!',
        mainTech: ['Express', 'HTML', 'MongoDB', 'Azure'],
        sideTech: ['CSS'],
        link: '',
        dates: {
          start: new Date('2026-1-01'),
          end: null,
        },
      };
    setCards([...cards, newCard]);
  }

  return <> 
  <div className={clsx(projectsCSS.mainContent, { [projectsCSS.gameOn]: gameOn })}>
    <div className={projectsCSS.titleDiv}>
      <h1 className={projectsCSS.title}>Projects</h1>
    </div>
    <AnimatePresence mode="wait">
      {chosenCard && (
        <motion.div className={projectsCSS.chosenCardMotionDiv}
          key={chosenCard.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 90, rotate: 5 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 90, rotate: -5 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
        >
        <Card cardData={chosenCard} setChosenCard={setChosenCard} chosenData={chosenCard} setCards={setCards} />
        </motion.div>
      )}
    </AnimatePresence>
    <Deck username="Lance" setGameOn={setGameOn} gameOn={gameOn} drawCard={drawCard} image={"/images/personal/nrt-ramen.gif"} />
    {gameOn && <motion.div layout={!shouldReduceMotion} className={clsx(projectsCSS.handContainer, { [projectsCSS.gameOn]: gameOn })}>
      <AnimatePresence mode="popLayout">
        
        {cards.map((item, i) => (
          <motion.div
            layout={!shouldReduceMotion} key={item.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40, rotate: -5 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, rotate: 5, transition: { delay: 0 } }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              layout: { type: "spring", stiffness: 100, damping: 20, },
              opacity: { duration: 0.2, delay: (prevCardCount.current > i ? i * 0.5 : 0), },
              y: { type: "spring", stiffness: 100, damping: 20, delay: (prevCardCount.current > i ? i * 0.5 : 0), },
              rotate: { duration: 0.5, delay: (prevCardCount.current > i ? i * 0.5 : 0), },
            }}>
            <Card
              cardData={item}
              setChosenCard={setChosenCard}
              chosenData={chosenCard ?? null}
              setCards={setCards}
            />
          </motion.div>
        ))}

      </AnimatePresence>
    </motion.div> }
  </div>
  </>
}
