'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'termly-jssdk';
const SCRIPT_SRC = 'https://app.termly.io/embed-policy.min.js';

export default function TermlyEmbed({ policyId }: { policyId: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.setAttribute('name', 'termly-embed');
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement('script');
      s.id = SCRIPT_ID;
      s.src = SCRIPT_SRC;
      s.async = true;
      document.body.appendChild(s);
      return;
    }

    const w = window as unknown as { Termly?: { initialize?: () => void } };
    w.Termly?.initialize?.();
  }, [policyId]);

  return <div ref={containerRef} data-id={policyId} />;
}
