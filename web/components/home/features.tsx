import React from 'react'

const Features = () => {
  return (
    <section className="py-20 bg-neutral-sage/30 dark:bg-background-dark/50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-black mb-4">Tailored for the Agriculture Ecosystem</h2>
                <p className="text-slate-600 dark:text-slate-400">Whether you are growing the crop or stocking the pantry,
                    we bridge the gap with tools built for your specific needs.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-background-dark p-10 rounded-3xl border border-primary/5 shadow-sm hover:shadow-xl transition-shadow group"
                    id="buyers">
                    <div
                        className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-3xl">shopping_basket</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">For Buyers</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Access fresh organic produce directly from source and negotiate deals that fit your budget.
                        Secure wholesale pricing for restaurants or retail.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            <span>Direct price negotiation with farmers</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            <span>Real-time harvest updates</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                            <span>Escrow-secured payments</span>
                        </li>
                    </ul>
                    <a className="text-primary font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all underline decoration-2 underline-offset-4"
                        href="/auth/buyer/signup">
                        Become a Buyer <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
                <div className="bg-white dark:bg-background-dark p-10 rounded-3xl border border-primary/5 shadow-sm hover:shadow-xl transition-shadow group"
                    id="farmers">
                    <div
                        className="bg-accent-amber/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-accent-amber text-3xl">agriculture</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">For Farmers</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Reach more customers, set your own terms, and secure fair prices for your hard work. Eliminate
                        expensive intermediaries.
                    </p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-accent-amber text-sm">check_circle</span>
                            <span>Global reach for local produce</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-accent-amber text-sm">check_circle</span>
                            <span>Flexible payment schedules</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-accent-amber text-sm">check_circle</span>
                            <span>Detailed market analytics</span>
                        </li>
                    </ul>
                    <a className="text-accent-amber font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all underline decoration-2 underline-offset-4"
                        href="/auth/farmer/signup">
                        Register as Farmer <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features