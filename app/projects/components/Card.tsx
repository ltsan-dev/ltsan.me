'use client';

import projectsCSS from '@/app/ui/projects.module.css';
import { figtree } from '@/app/ui/fonts';

import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import ReactCardFlip from 'react-card-flip';
import clsx from 'clsx';

import { useState, useRef, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import { Card as CardType } from '@/app/lib/definitions';

type CardProps = {
  cardData: CardType;
  chosenData: CardType | null;
  setChosenCard: React.Dispatch<React.SetStateAction<CardType | null>>;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

type TiltLayerProps = {
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  tiltEnabled: boolean;
};

const TRANS_MS: number = 250;

export default function Card({cardData, chosenData, setChosenCard, setCards }: CardProps) {
  const chosen = chosenData !== null && cardData.id === chosenData.id;
  const [flipped, setFlipped] = useState(chosen);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const tiltEnabled = !shouldReduceMotion && (!isMobile || chosen);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 580px)');
    const updateMobile = () => setIsMobile(mobileQuery.matches);

    updateMobile();
    mobileQuery.addEventListener('change', updateMobile);
    return () => mobileQuery.removeEventListener('change', updateMobile);
  }, []);

  useEffect(() => {
    if (chosen) cardRef.current?.focus();
  }, [chosen]);

  useEffect(() => {
    if (!chosen) return;

    function closeChosenCard() {
      setChosenCard(null);
      setTimeout(() => {
        setCards(prev => {
          if (!chosenData) return prev;
          return [...prev, chosenData];
        });
        setTimeout(() => {
          document.getElementById(`project-card-${cardData.id}`)?.focus();
        }, 0);
      }, shouldReduceMotion ? 0 : TRANS_MS);
    }

    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${projectsCSS.chosen}`)) {
        closeChosenCard();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeChosenCard();
      }
    }

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [chosen, chosenData, cardData.id, setCards, setChosenCard, shouldReduceMotion]);

  function handleCardClick(e?: React.MouseEvent<HTMLDivElement>) {
    if (e?.target instanceof Element && e.target.closest('a')) return;

    document.body.style.backgroundColor = cardData.colors[0];

    if (!chosenData || cardData.id !== chosenData.id) {
      setChosenCard(cardData);

      setCards(prev => {
        const filtered = prev.filter(card => card.id !== cardData.id);
        return chosenData ? [...filtered, chosenData] : filtered;
      });
    } else {
      setFlipped(prev => !prev);
    }
  }

  function handleCardKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }


  return (
    <div
      id={`project-card-${cardData.id}`}
      ref={cardRef}
      className={clsx(projectsCSS.cardContainer, projectsCSS["rarity-" + cardData.rarity], {[projectsCSS.chosen]: chosen })}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="group"
      tabIndex={0}
      aria-expanded={chosen}
      aria-label={`${cardData.name}, ${cardData.type} project. ${chosen ? 'Press Enter or Space to flip; press Escape to close.' : 'Press Enter or Space to open.'}`}
    >
      <TiltLayer setFlipped={setFlipped} tiltEnabled={tiltEnabled}>
        <ReactCardFlip 
          isFlipped={flipped}
          flipDirection="horizontal" 
          containerStyle={{ width: '100%', height: '100%' }}>
          <CardFront cardData={cardData} />
          <CardBack cardData={cardData} />
        </ReactCardFlip>
      </TiltLayer>
    </div>
  );
}

function TiltLayer({ setFlipped, children, tiltEnabled }: TiltLayerProps) {
  const flipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearFlipTimeout() {
    if (flipTimeout.current !== null) {
      clearTimeout(flipTimeout.current);
      flipTimeout.current = null;
    }
  }

  function handleEnter() {
    clearFlipTimeout();

    flipTimeout.current = setTimeout(() => {
      setFlipped(true);
    }, 700);
  }

  function handleLeave() {
    clearFlipTimeout();

    flipTimeout.current = setTimeout(() => {
      setFlipped(false);
    }, TRANS_MS);
  }
  return <Tilt
      tiltEnable={tiltEnabled}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={3000}
      transitionSpeed={tiltEnabled ? TRANS_MS : 0}
      scale={tiltEnabled ? 1.02 : 1}
      glareEnable={tiltEnabled}
      glareMaxOpacity={0.3}
      glareBorderRadius="5px"
      className={clsx(projectsCSS.cardContainerTilt)}
      onEnter={tiltEnabled ? handleEnter : undefined}
      onLeave={tiltEnabled ? handleLeave : undefined}
    >
      {children}</Tilt>
}


function CardFront({ cardData }: { cardData: CardType }) {
  const startDateText = cardData.dates.start.toLocaleString(
    'default',
    { month: 'short', year: 'numeric' }
  );

  const endDateText = cardData.dates.end
    ? cardData.dates.end.toLocaleString(
        'default',
        { month: 'short', year: 'numeric' }
      )
    : 'Current';
  return <div className={projectsCSS.cardFront} style={{ backgroundColor: cardData.colors[0] }}>
            <h1 style={cardData.id === '5' ? { fontSize: '9.2cqw' } : undefined} className={figtree.className}>{cardData.name}</h1>
            <h1 className={figtree.className}>{cardData.type}</h1>
            <div className={projectsCSS.mainTechGroup}>
            {cardData.mainTech.slice(0, 3).map((name, index) => (
              <div key={cardData.name + index} className={projectsCSS.mainTech}>
                <Image
                  src={`/images/logos/${name}-logo.svg`}
                  width={512}
                  height={512}
                  className={projectsCSS.mainTechLogo}
                  alt="" />
                <span className={figtree.className}>{name}</span>
              </div>
            ))}
            </div>
            <span className={figtree.className}>{startDateText + ' - ' + endDateText}</span>
            {/* <Image
              src={`/images/ui/rarity-${cardData.rarity}.png`}
              width={200} height={200}
              alt={`Star icon`} className={projectsCSS.starLogo}/> */}
          </div>
}

function CardBack({ cardData }: { cardData: CardType}) {
  const startDateText = cardData.dates.start.toLocaleString(
    'default',
    { month: 'short', year: 'numeric' }
  );

  const endDateText = cardData.dates.end
    ? cardData.dates.end.toLocaleString(
        'default',
        { month: 'short', year: 'numeric' }
      )
    : 'Current';

  return <div className={projectsCSS.cardBack} style={{ backgroundColor: cardData.colors[0] }}>
            <div className={projectsCSS.cardHeader}>
                <Image
                  src={`/images/cards/${cardData.id}/logo.png`}
                  width={27}
                  height={27}
                  alt={`Logo ${cardData.name}`}
                  className={projectsCSS.logo}
                />
              <h1 style={cardData.id === '5' ? { fontSize: '8.2cqw' } : undefined} className={figtree.className}>{cardData.name}</h1>
              <a href={cardData.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${cardData.name} project in a new tab`}>
                <Image
                  src="/images/ui/link.png"
                  width={27}
                  height={27}
                  alt={`Open ${cardData.name}`}
                />
              </a>
            </div>
            <div className={projectsCSS.techGroup}>
            {cardData.mainTech.map((name, index) => (
              <Image
                key={`main-${cardData.name}-${index}`}
                src={`/images/logos/${name}-logo.svg`}
                width={512}
                height={512}
                className={projectsCSS.mainTechLogo}
                alt={`Logo of ${name}`} />
            ))}
            {cardData.sideTech && cardData.sideTech.map((name, index) => (
              <Image
                key={`side-${cardData.name}-${index}`}
                src={`/images/logos/${name}-logo.svg`}
                width={512}
                height={512}
                className={projectsCSS.mainTechLogo}
                alt={`Logo of ${name}`} />
            ))}
            </div>
            <div className={projectsCSS.scDiv}>
              <Image
                src={`/images/cards/${cardData.id}/sc.png`}
                width={512}
                height={512}
                alt={`Screenshot for ${cardData.name}`}
              />
            </div>
            <p>{cardData.desc}</p>
            <div className={projectsCSS.bottomTextDiv}>
              <span className={figtree.className}>{cardData.type}</span>
              <span className={figtree.className}>{startDateText + ' - ' + endDateText}</span>
            </div>
          </div>
}