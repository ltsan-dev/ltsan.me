import { figtree } from '../ui/fonts';
import Image from 'next/image';
import clsx from 'clsx';

import homeCSS from '../ui/home.module.css';

type SquareProps = {
    state: ("player" | "tail" | "blank");
    alt: boolean;
    x: number;
    y: number;
};

export default function Square({state, alt, x, y }: SquareProps) {

  return <div className={clsx(homeCSS.square, homeCSS[state], { [homeCSS.alt]: alt })}>
  </div>
}
