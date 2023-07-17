'use client';
import Link from 'next/link';

interface Breadcrumb {
  uri?: string;
  title: string;
}

interface BreadCrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs(props: BreadCrumbsProps) {
  return (
    <div className="not-prose text-sm breadcrumbs mb-6">
      <ul>
        {props.breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.uri ? (
            <li key={`breadcrumb-${index}`}>
              <Link href={breadcrumb.uri}>{breadcrumb.title}</Link>
            </li>
          ) : (
            <li key={`breadcrumb-${index}`}>{breadcrumb.title}</li>
          ),
        )}
      </ul>
    </div>
  );
}
