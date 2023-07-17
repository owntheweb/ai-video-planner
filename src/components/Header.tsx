'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

interface navLink {
  uri: string;
  label: string;
}

export default function Header() {
  const pathname = usePathname();

  const links: navLink[] = [
    {
      uri: '/segments',
      label: 'Segments',
    },
  ];

  return (
    <header className="navbar mb-6 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none px-2 mx-2">
        <Link className="text-lg font-bold" href="/">
          AI Video Planner
        </Link>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch lg:flex">
          {links.map((link, index) => (
            <Link
              className={classNames('btn btn-ghost btn-sm rounded-btn', {
                'btn-active': pathname.startsWith(link.uri),
              })}
              href={link.uri}
              key={`link-${index}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-none">
        <Link className="btn btn-square btn-ghost" href="https://interactive.guru">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
