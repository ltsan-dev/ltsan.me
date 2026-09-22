import { figtree } from './ui/fonts';
import Image from 'next/image';
import homeCSS from './ui/home.module.css';

import Game from './home-components/Game';

import * as images from "@/public/images/personal";

export default function Home() {
  return <div className='main main-tm'>
    <h1 className={homeCSS.title}>Game</h1>
    <Game/>
    <h1 className={homeCSS.title}>Welcome to my page!!</h1>
    <Image src={images.jcoleWh} alt="J Cole shooting the 'Whole House' music video with PFG." className={homeCSS.image}/>
    <Image src={images.dbzSS} alt="Goku in Super Saiyan form." className={homeCSS.image}/>
  </div>
}
