import { figtree } from './ui/fonts';
import Image from 'next/image';
import homeCSS from './ui/home.module.css';

import Game from './home-components/Game';

import * as images from "@/public/images/personal";

export default function Home() {
  return <div className='main'>
    {/* <h1 className={homeCSS.title}>Game</h1> <Game/> */}
    <h1 className={homeCSS.title}>Welcome!</h1>
    <p className={homeCSS.subtitle}>Thanks for checking out my page!</p>
    <div className={homeCSS.content}>
      <div>
        <div className={homeCSS.titleDiv}><h2 className={homeCSS.headshotTitle}>Lance Santos</h2></div>
        <Image src={images.nrtRamen} alt="Headshot IMage" className={homeCSS.headshot} />
      </div>
      <div>
        <div className={homeCSS.titleDiv}><h2 className={homeCSS.sectionTitle}>About Me</h2></div>
        <p>I am a passionate developer, experienced in creating interactive full-stack applications. I have a wide amount of experience and knowledge in design, Human-Computer Interaction, data vizualization, data science, machine learning and information architecture.
           I am currently a student at the University of Washington majoring in Informatics with a Data Science option.</p>
      </div>
      <div>
        <div className={homeCSS.titleDiv}><h2 className={homeCSS.sectionTitle}>Career Highlights</h2></div>
        <ul className={homeCSS.list}>
          <li>Built DubCards in a team of 4 using an Express backend, MongoDB, and hosted on Azure.</li>
          <li>Developed BALLER//BROWSER with a partner, an NBA player buying and selling platform.</li>
          <li>Achieved Dean's List for 7 consecutive quarters, maintaining a high GPA throughout my academic career.</li>
          <li>Designed and presented an interactive p5.js visualization that tells a story about international players in the NBA.</li>
        </ul>
      </div>
    </div>
  </div>
}
