"use client"
import Link from "next/link";
import slugify from "./utils/Slugify";

interface Breadcrumb {
  uri?: string,
  title: string,
}

interface BreadCrumbsProps {
  breadcrumbs: Breadcrumb[],
}

export default function Breadcrumbs(props: BreadCrumbsProps) {
  
  return (
    <div className="not-prose text-sm breadcrumbs mb-6">
      <ul>
        { props.breadcrumbs
          .map(
            breadcrumb => breadcrumb.uri
              ? <li key={slugify(breadcrumb.title)}><Link href={breadcrumb.uri}>{breadcrumb.title}</Link></li>
              : <li key={slugify(breadcrumb.title)}>{breadcrumb.title}</li>
          )
        }
      </ul>
    </div>
  )
}
