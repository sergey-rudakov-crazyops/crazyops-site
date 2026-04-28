import Image from 'next/image';

const links = [
  { href: '#why', label: 'Why Us' },
  { href: '#services', label: 'Services' },
  { href: '#docs', label: 'Legal Docs' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-[22px] md:px-10"
      style={{
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <a href="/" className="flex items-center gap-[10px] text-[17px] font-extrabold no-underline text-white">
        <div className="w-[60px] h-[60px] rounded-[14px] bg-white overflow-hidden shrink-0 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="CrazyOps"
            width={60}
            height={60}
            className="w-full h-full object-contain block"
          />
        </div>
        CrazyOps
      </a>

      <div className="hidden md:flex gap-8">
        {links.map(({ href, label }) => (
          <a key={href} href={href} className="nav-link text-sm font-medium">
            {label}
          </a>
        ))}
      </div>

      <a href="#contact" className="btn-grad hidden md:inline-block text-[13px] font-bold px-[22px] py-[10px] rounded-full">
        Get a Quote →
      </a>

      {/* Burger — mobile only, scrolls to first section */}
      <a href="#why" className="flex md:hidden flex-col gap-[5px] p-1">
        <span className="block w-[22px] h-[2px] bg-white rounded-sm" />
        <span className="block w-[22px] h-[2px] bg-white rounded-sm" />
        <span className="block w-[22px] h-[2px] bg-white rounded-sm" />
      </a>
    </nav>
  );
}
