import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
};

const Breadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <div className="w-full flex justify-center">
      <nav aria-label="Breadcrumb" className="py-3 px-4 max-w-4xl w-full">
        <ol className="flex items-center justify-center flex-wrap space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="flex items-center hover:text-blue-600">
              <Home className="w-4 h-4 mr-1" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              {index === items.length - 1 ? (
                <span className="font-medium text-gray-800" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
