'use client';
import Link from 'next/link';

interface navLink {
  uri: string;
  label: string;
}

export default function Footer() {
  return (
    <footer className="px-6">
      <div className="divider mt-6 mb-2"></div>
      <div>
        Built by <Link href="https://interactive.guru">Chris</Link>
      </div>
    </footer>
  );
}
