"use client"
import { figtree } from '../ui/fonts';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import homeCSS from '../ui/home.module.css';

import Square from './Square';

import * as images from "@/public/images/personal";

export default function Game() {
  const x = 15;
  const y = 10;
  const sqaures = [];
  const [direction, setDirection] = useState<("up" | "down" | "left" | "right")>("right");
  const [player, setPlayer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      sqaures.push(<Square key={i + "" + j} state={player.x == j && player.y == i ? "player" : "blank"}
                           alt={i % 2 + j % 2 != 1} x={j} y={i}/>);
    }
  }

  // handle setting the player by direction every interval
  function handleFrame() {
    setPlayer(prev => {
      if (direction == "up" && prev.y > 0) return { x: prev.x, y: prev.y - 1 };
      if (direction == "down" && prev.y < y - 1) return { x: prev.x, y: prev.y + 1 };
      if (direction == "left" && prev.x > 0) return { x: prev.x - 1, y: prev.y };
      if (direction == "right" && prev.x < x - 1) return { x: prev.x + 1, y: prev.y };
      return prev;
    });}
  useEffect(() => {
    const interval = setInterval(handleFrame, 250);
    return () => clearInterval(interval);
  }, [direction]);

  // put key down listener to change direction
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowUp" || e.key === "w") setDirection("up");
      if (e.key === "ArrowDown" || e.key === "s") setDirection("down");
      if (e.key === "ArrowLeft" || e.key === "a") setDirection("left");
      if (e.key === "ArrowRight" || e.key === "d") setDirection("right");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("keydown", handleKeyDown); };
  }, []);

  return <div className={homeCSS.game}>
    {sqaures}
  </div>
}
