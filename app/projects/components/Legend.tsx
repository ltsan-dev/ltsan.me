import clsx from "clsx";
import projectsCSS from '@/app/ui/projects.module.css';

import Image from "next/image";
import colors from "@/app/lib/ccolors";

export default function() {
    return <div className={projectsCSS.legend}>
        <h2>Legend</h2>
        <div>
          <span>Rarities</span>
          <div>
            <Image src={`/images/ui/rarity-1.png`} width={200} height={200}
              alt={`rarity-1 icon`}/>
            <Image src={`/images/ui/rarity-2.png`} width={200} height={200}
              alt={`rarity-2 icon`}/>
            <Image src={`/images/ui/rarity-3.png`} width={200} height={200}
              alt={`rarity-3 icon`}/>
            <Image src={`/images/ui/rarity-4.png`} width={200} height={200}
              alt={`rarity-4 icon`}/>
          </div>
        </div>
        <div>
          <span>Project Types</span>
          <div>
            {Object.values(colors).map((color: string, i) => {
                return <div key={i} className={projectsCSS.legendBox} style={{ backgroundColor: color }}></div>
            })}
          </div>
        </div>
        <div>
          <span>Open Link</span>
          <div>
            <Image src={`/images/ui/link.png`} width={200} height={200}
              alt={`Open link icon`}/>
          </div>
        </div>
    </div>
}