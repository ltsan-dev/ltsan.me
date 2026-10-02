import bioCSS from '../ui/bio.module.css';

import CardRow from './components/CardRow';

import * as images from "@/public/images/personal";

export default function Page() {
  return <p style={{ margin: 'auto' }} >This is the experience page, WIP.</p>
  return <div className='main main-tm'>
      <h1 className={bioCSS.title}>Career-wise, I've been:</h1>
      <CardRow
        sA="studying" imgA={images.dbzRamen}
        sB="programming" imgB={images.nrtRamen}
        sC="learning" imgC={images.dbzPower}
      />
      <h1 className={bioCSS.title}>For fun, I've been :</h1>
      <CardRow
        sA="anime" imgA={images.dbzSS}
        sB="gaming" imgB={images.dbzRamen}
        sC="sports" imgC={images.jcoleWh}
      />
      <h1>this the bio</h1>
  </div>
}
