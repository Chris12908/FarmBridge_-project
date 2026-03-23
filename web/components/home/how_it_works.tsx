import React from 'react'

const HowItWorks = () => {
  return (
    <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black mb-16 text-center">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
                <div
                    className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-primary/10 border-dashed border-t-2 border-primary">
                </div>
                <div className="relative flex flex-col items-center text-center">
                    <div
                        className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 z-10 shadow-lg">
                        <span className="material-symbols-outlined text-4xl">search</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">1. Search</h4>
                    <p className="text-slate-500">Find the perfect harvest or buyer using our advanced filters and
                        geolocation.</p>
                </div>
                <div className="relative flex flex-col items-center text-center">
                    <div
                        className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 z-10 shadow-lg">
                        <span className="material-symbols-outlined text-4xl">forum</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">2. Chat &amp; Negotiate</h4>
                    <p className="text-slate-500">Connect directly. Discuss quality, quantity, and settle on a price that
                        works for everyone.</p>
                </div>
                <div className="relative flex flex-col items-center text-center">
                    <div
                        className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 z-10 shadow-lg">
                        <span className="material-symbols-outlined text-4xl">shield_with_heart</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">3. Secure Payment</h4>
                    <p className="text-slate-500">Funds are held safely in escrow until delivery is confirmed by both
                        parties.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HowItWorks