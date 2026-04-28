import Image from 'next/image';

const socialLinks = [
  { label: '𝕏', href: '#' },
  { label: 'in', href: '#' },
  { label: 'gh', href: '#' },
];

export default function Footer() {
  return (
    <footer
      className="px-5 pt-12 pb-8 md:px-10"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="flex justify-between items-center flex-wrap gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-[10px] bg-white overflow-hidden flex items-center justify-center shrink-0">
            <Image src="/logo.png" alt="CrazyOps" width={44} height={44} className="w-full h-full object-contain block" />
          </div>
          <div>
            <div className="text-[18px] font-extrabold">CrazyOps</div>
            <div className="text-[13px]" style={{ color: 'var(--muted)' }}>
              We build performance
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="social-btn w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-base no-underline text-white"
              style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-4 pt-6"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p className="text-[12px]" style={{ color: 'var(--muted)' }}>
          © 2026 CrazyOps Ltd. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#docs" className="footer-legal-link text-[12px]">
            Privacy Policy
          </a>
          <a href="#docs" className="footer-legal-link text-[12px]">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}
