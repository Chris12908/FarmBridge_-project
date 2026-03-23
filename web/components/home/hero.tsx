import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="mb-12 lg:mb-0">
                    <h1
                        className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-6">
                        Direct from Farm to Table. <span className="text-primary">Negotiate your price,</span> secure your
                        harvest.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                        Empowering local agriculture through direct negotiation and transparent pricing. No middlemen,
                        just fresh produce.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                            Start Trading Now
                            <span className="material-symbols-outlined">trending_flat</span>
                        </button>
                        <button
                            className="border-2 border-primary/20 text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/5 transition-all">
                            Learn More
                        </button>
                    </div>
                    <div className="mt-12 flex flex-wrap gap-6">
                        <div className="bg-neutral-sage dark:bg-primary/10 p-4 rounded-xl flex-1 min-w-[160px]">
                            <p className="text-primary font-medium">Local Farmers</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-slate-100">500+</p>
                        </div>
                        <div className="bg-neutral-sage dark:bg-primary/10 p-4 rounded-xl flex-1 min-w-[160px]">
                            <p className="text-primary font-medium">Successful Deals</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-slate-100">10k+</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                        <Image className="w-full h-full object-cover"
                            alt="Beautiful landscape of a lush organic vegetable farm"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuYdyf7zEle-rfb2p0E3RqyhPjcKUITB3sK6jTVcFlp0tU45NcMgd4lt-Kly3BvMxLucN5LBKXn9ASODoqipXVK4pjvvafKO1zfDezBmoTJkYtUmxD2bJouY03lflKSNwxabUS6_KJcyF6ulRZPKN5clQvL8RWtk4_0XjC3aQH1X-f1JFnJly9Erfl9CKRGwXnj6Hlzl8KxdtBvQVF9H1jpOsidqhEgg1himLtEqjIesD3vyNNTZW65bDEFk3HVkxzbLUwbIHScxUt"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div
                        className="absolute -bottom-6 -left-6 bg-white dark:bg-background-dark p-6 rounded-2xl shadow-xl hidden md:block">
                        <div className="flex items-center gap-4">
                            <div className="bg-accent-amber/10 p-3 rounded-full">
                                <span className="material-symbols-outlined text-accent-amber">verified</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Verified Farmers Only</p>
                                <p className="text-xs text-slate-500">Quality assurance guaranteed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero