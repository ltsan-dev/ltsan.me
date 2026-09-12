'use client';

import projectsCSS from '@/app/ui/projects.module.css';
import { figtree } from '@/app/ui/fonts';

import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import ReactCardFlip from 'react-card-flip';
import clsx from 'clsx';

import { useState, useRef, useEffect } from 'react';
import { Card as CardType } from '@/app/lib/definitions';

type CardProps = {
  cardData: CardType;
  chosenData: CardType | null;
  setChosenCard: React.Dispatch<React.SetStateAction<CardType | null>>;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

type TiltLayerProps = {
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  clicked: boolean;
  children: React.ReactNode;
  cardData: CardType;
};

const TRANS_MS: number = 250;

export default function Card({cardData, chosenData, setChosenCard, setCards }: CardProps) {
  const chosen = chosenData !== null && cardData.id === chosenData.id;
  const [clicked, setClicked] = useState(false);
  const [flipped, setFlipped] = useState(chosen);

  useEffect(() => {
    if (!chosen) return;

    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${projectsCSS.chosen}`)) {
        setChosenCard(null);
        setTimeout(() => {setCards(prev => {
            if (!chosenData) return prev;
            return [...prev, chosenData];
        });}, TRANS_MS);
      }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [chosen, setChosenCard]);

  function handleCardClick() {
    document.body.style.backgroundColor = cardData.colors[0];

    if (!chosenData || cardData.id !== chosenData.id) {
      setChosenCard(cardData);

      setCards(prev => {
        const filtered = prev.filter(card => card.id !== cardData.id);
        return chosenData ? [...filtered, chosenData] : filtered;
      });
    } else {
      setClicked(prev => !prev);
    }
  }


  return (
    <div className={clsx(projectsCSS.cardContainer, projectsCSS["rarity-" + cardData.rarity], {[projectsCSS.chosen]: chosen })} onClick={handleCardClick}>
      <TiltLayer setFlipped={setFlipped} clicked={clicked} cardData={cardData}>
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

function TiltLayer({ setFlipped, children }: TiltLayerProps) {
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
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={3000}
      transitionSpeed={TRANS_MS}
      scale={1.02}
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareBorderRadius="5px"
      className={clsx(projectsCSS.cardContainerTilt)}
      onEnter={handleEnter}
      onLeave={handleLeave}
    >
      {children}</Tilt>
}


function CardFront({ cardData }: { cardData: CardType }) {
  return <div className={projectsCSS.cardFront} style={{ backgroundColor: cardData.colors[0] }}>
            <h1 style={cardData.id === '5' ? { fontSize: '9.2cqw', marginTop: '0.15em' } : undefined} className={figtree.className}>{cardData.name}</h1>
            <div className={projectsCSS.mainTechGroup}>
            {cardData.mainTech.map((name, index) => (
              <div key={cardData.name + index} className={projectsCSS.mainTech}>
                <Image
                  src={`/images/logos/${name}-logo.svg`}
                  width={512}
                  height={512}
                  className={projectsCSS.mainTechLogo}
                  alt={`Logo of ${name}`} />
                <span className={figtree.className}>{name}</span>
              </div>
            ))}
            </div>
            <hr className={projectsCSS.rightLine}></hr>
            <hr className={projectsCSS.leftLine}></hr>
            <Image
              src={`/images/ui/rarity-${cardData.rarity}.png`}
              width={200} height={200}
              alt={`Star icon`} className={projectsCSS.starLogo}/>
            <h1 className={figtree.className}>{cardData.type}</h1>
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
              <a href={cardData.link} target="_blank" rel="noopener noreferrer">
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