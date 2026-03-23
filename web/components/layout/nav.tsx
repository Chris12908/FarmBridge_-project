'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';
import { routes } from '@/lib/routes';

const Nav = () => {
  const { isBuyer, isFarmer, user } = useAuth();

  const ctaHref = isFarmer
    ? routes.farmer.dashboard()
    : isBuyer
    ? routes.buyer.marketplace()
    : routes.auth.root();

  const ctaLabel = user ? 'Go to Dashboard' : 'Get Started';

  return (
    <nav className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">AgriConnect</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#features">Features</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#farmers">For Farmers</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#buyers">For Buyers</a>
            <Link
              href={ctaHref}
              className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all">
              {ctaLabel}
            </Link>
          </div>
          <div className="md:hidden">
            <Link href={ctaHref}>
              <span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
