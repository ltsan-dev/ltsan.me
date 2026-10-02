'use client';

import navCSS from './ui/navbar.module.css';
import { figtree } from './ui/fonts';
import Link from 'next/link';
import { ViewTransition } from "react";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function NavBar() {
  const pathname = usePathname();


  return <div className={`${navCSS.navbar} ${figtree.className}`}>
    <div className={navCSS.titleDiv}>
      <Link href="/">ltsan.me</Link>
      {pathname === '/' ? <Underline /> : ""}
    </div>
    <div>
      <div>
        <Link href="/projects" className={navCSS.link}>Projects</Link>
        {pathname === '/projects' ? <Underline /> : ""}
      </div>
      <div>
        <Link href="/bio" className={navCSS.link}>Experience</Link>
        {pathname === '/bio' ? <Underline /> : ""}
      </div>
    </div>
    {/* <Link href="/contact" className={navCSS.button}>Contact</Link> */}
  </div>
}


function Underline() {
  return <ViewTransition name="underline"><hr className={navCSS.underline} /></ViewTransition>;
}
