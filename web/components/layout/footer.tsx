import React from 'react'

const Footer = () => {
  return (
     <footer className="bg-background-light dark:bg-background-dark pt-20 pb-10 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                <div className="col-span-2 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="text-primary">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-primary">AgriConnect</span>
                    </div>
                    <p className="text-slate-500 mb-8 max-w-xs">Connecting the world&apos;s harvesters with the tables that need
                        them. Fair, Direct, Transparent.</p>
                    <div className="flex gap-4">
                        <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                            href="#">
                            <span className="material-symbols-outlined text-xl">language</span>
                        </a>
                        <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                            href="#">
                            <span className="material-symbols-outlined text-xl">public</span>
                        </a>
                        <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                            href="#">
                            <span className="material-symbols-outlined text-xl">mail</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h5 className="font-bold mb-6">Platform</h5>
                    <ul className="space-y-4 text-slate-500">
                        <li><a className="hover:text-primary" href="#">Marketplace</a></li>
                        <li><a className="hover:text-primary" href="#">Direct Chat</a></li>
                        <li><a className="hover:text-primary" href="#">Pricing</a></li>
                        <li><a className="hover:text-primary" href="#">Mobile App</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-6">Resources</h5>
                    <ul className="space-y-4 text-slate-500">
                        <li><a className="hover:text-primary" href="#">Farmer Blog</a></li>
                        <li><a className="hover:text-primary" href="#">Buyer Guide</a></li>
                        <li><a className="hover:text-primary" href="#">Safety</a></li>
                        <li><a className="hover:text-primary" href="#">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-6">Company</h5>
                    <ul className="space-y-4 text-slate-500">
                        <li><a className="hover:text-primary" href="#">About Us</a></li>
                        <li><a className="hover:text-primary" href="#">Careers</a></li>
                        <li><a className="hover:text-primary" href="#">Sustainability</a></li>
                        <li><a className="hover:text-primary" href="#">Legal</a></li>
                    </ul>
                </div>
            </div>
            <div className="pt-10 border-t border-primary/10 text-center text-slate-400 text-sm">
                <p>© 2024 AgriConnect Marketplace. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer