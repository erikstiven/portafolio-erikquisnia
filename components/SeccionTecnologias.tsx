'use client';

type Item = { name: string; slug: string };
type Card = { title: string; topColor: string; items: Item[] };

/** Overrides directos (primero se intentan estos) */
const DIRECT_OVERRIDES: Record<string, string> = {
  //cc3
  css3:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYWV_njdUAZhI966A6j3PnpfjE9XnZqy-Mkw&s',
  microsoftazure:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/2048px-Microsoft_Azure.svg.png',
  visualstudiocode:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl15638LBK0kjpT6d7iuMBDox9L2rXDJOm_w&s',
  adobeillustrator:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2101px-Adobe_Illustrator_CC_icon.svg.png',
  adobephotoshop:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1051px-Adobe_Photoshop_CC_icon.svg.png',
  csharp: 'https://e7.pngegg.com/pngimages/520/669/png-clipart-c-logo-c-programming-language-computer-icons-computer-programming-programming-miscellaneous-blue.png',


  // Si dejaste CSS3 local porque te fallaba, mantén este override:
  // css3: '/icons/css3.svg',
};

/** Genera lista de fuentes en orden de prioridad */
const sources = (slug: string) => {
  // Caso especial: CapCut con tu PNG primero
  if (slug === 'capcut') {
    return [
      'https://freepnglogo.com/images/all_img/1691746000capcut-logo%20(2).png', // tu enlace
      '/icons/video-editor.svg',                                                // opcional: fallback local neutral
      'https://cdn.simpleicons.org/capcut',
      'https://cdn.jsdelivr.net/npm/simple-icons/icons/capcut.svg',
      'https://unpkg.com/simple-icons@latest/icons/capcut.svg',
      'https://api.iconify.design/simple-icons:capcut.svg',
    ];
  }

  const direct = DIRECT_OVERRIDES[slug];
  return [
    ...(direct ? [direct] : []),
    `https://cdn.simpleicons.org/${slug}`,
    `https://cdn.jsdelivr.net/npm/simple-icons/icons/${slug}.svg`,
    `https://unpkg.com/simple-icons@latest/icons/${slug}.svg`,
    `https://api.iconify.design/simple-icons:${slug}.svg`,
  ];
};

function TechCard({
  title,
  topColor,
  items,
  showLabels = true,
}: Card & { showLabels?: boolean }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6 border-t-4"
      style={{ borderTopColor: topColor }}
    >
      <h3
        className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700"
        style={{ color: topColor }}
      >
        {title}
      </h3>

      <ul className="grid grid-cols-3 gap-4">
        {items.map(({ name, slug }) => (
          <li key={name} className="flex flex-col items-center">
            <div className="w-12 h-12 grid place-items-center mb-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <img
                loading="lazy"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                src={sources(slug)[0]}
                alt={name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  const step = Number(img.dataset.step || 0);
                  const list = sources(slug);
                  const next = list[step + 1];
                  if (next) {
                    img.dataset.step = String(step + 1);
                    img.src = next;
                  }
                }}
              />
            </div>
            {showLabels ? (
              <span className="text-xs sm:text-sm text-center font-medium text-gray-600 dark:text-gray-300">
                {name}
              </span>
            ) : (
              <span className="sr-only">{name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SeccionTecnologias() {
  // Slugs correctos
  const FRONTEND: Item[] = [
    { name: 'HTML5', slug: 'html5' },
    { name: 'CSS 3', slug: 'css3' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'React', slug: 'react' },
    { name: 'Astro', slug: 'astro' },
    { name: 'Vue.js', slug: 'vuedotjs' },
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
  ];

  const BACKEND: Item[] = [
    { name: 'Node.js', slug: 'nodedotjs' },
    { name: 'Laravel', slug: 'laravel' },
    { name: 'Nest.js', slug: 'nestjs' },
    { name: 'C#', slug: 'csharp' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'MySQL', slug: 'mysql' },
  ];

  const LEARNING: Item[] = [
    { name: 'Angular', slug: 'angular' },
    { name: 'Python', slug: 'python' },
    { name: 'Flutter', slug: 'flutter' },
    { name: 'Azure', slug: 'microsoftazure' }, // override directo
    { name: 'Docker', slug: 'docker' },
  ];

  const TOOLS: Item[] = [
    { name: 'Git', slug: 'git' },
    { name: 'GitHub', slug: 'github' },
    { name: 'Visual Studio Code', slug: 'visualstudiocode' }, // override directo
    { name: 'NPM', slug: 'npm' },
    { name: 'Figma', slug: 'figma' },
    { name: 'Adobe Illustrator', slug: 'adobeillustrator' },  // override directo
    { name: 'Adobe Photoshop', slug: 'adobephotoshop' },      // override directo
    { name: 'CapCut', slug: 'capcut' },                       // PNG primero
  ];

  return (
    <section id="tecnologias" className="pt-10 md:pt-14 scroll-mt-28 border-t border-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Tecnologías y Herramientas
        </h2>
        <p className="mt-3 text-slate-600 max-w-[72ch]">
          En mi viaje por el desarrollo web, he cultivado experiencia en diferentes capas del stack.
          Estas son las tecnologías que uso a diario y herramientas con las que trabajo.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <TechCard title="Frontend" topColor="#3F4B5E" items={FRONTEND} />
          <TechCard title="Backend" topColor="#3F4B5E" items={BACKEND} />
          <TechCard title="Learning" topColor="#3F4B5E" items={LEARNING} />
          <TechCard title="Tools" topColor="#3F4B5E" items={TOOLS} />
        </div>
      </div>
    </section>
  );
}
