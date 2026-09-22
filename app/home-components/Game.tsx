"use client"
import { figtree } from '../ui/fonts';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import homeCSS from '../ui/home.module.css';

import Square from './Square';

import * as images from "@/public/images/personal";

export default function Game() {
  const x = 15;
  const y = 10;
  const sqaures = [];
  const direction = useRef<"up" | "down" | "left" | "right">("right");
  const [player, setPlayer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      sqaures.push(<Square key={i + "" + j} state={player.x == j && player.y == i ? "player" : "blank"}
                           alt={i % 2 + j % 2 != 1} x={j} y={i}/>);
    }
  }

  useEffect(() => {
    // handle setting the player by direction every interval
    const interval = setInterval(() => {
      setPlayer(prev => {
        if (direction.current == "up" && prev.y > 0) return { x: prev.x, y: prev.y - 1 };
        if (direction.current == "down" && prev.y < y - 1) return { x: prev.x, y: prev.y + 1 };
        if (direction.current == "left" && prev.x > 0) return { x: prev.x - 1, y: prev.y };
        if (direction.current == "right" && prev.x < x - 1) return { x: prev.x + 1, y: prev.y };
        return prev;
      })
    }, 250);

    // put key down listener to change direction
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.key === "ArrowUp" || e.key === "w") && direction.current != "down") direction.current = "up";
      if ((e.key === "ArrowDown" || e.key === "s") && direction.current != "up") direction.current = "down";
      if ((e.key === "ArrowLeft" || e.key === "a") && direction.current != "right") direction.current = "left";
      if ((e.key === "ArrowRight" || e.key === "d") && direction.current != "left") direction.current = "right";
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  return <div className={homeCSS.game}>
    {sqaures}
  </div>
}
