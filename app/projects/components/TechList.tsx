import clsx from "clsx";
import projectsCSS from '@/app/ui/projects.module.css';

import Image from "next/image";
import colors from "@/app/lib/ccolors";

import * as images from "@/public/images/logos/index";

export default function() {
    return <div className={projectsCSS.techlist}>
      <h2>Tech List</h2>
      <div>
        {Object.entries(images).map(([name, image], i) => (
          <div key={i}>
            <Image src={image} alt={`${name} logo`} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
}