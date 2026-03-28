import React from 'react'
import Image from 'next/image'

const Testimonial = () => {
  return (
    <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black mb-16 text-center">Trusted by the Community</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="flex gap-1 mb-4 text-accent-amber">
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                    </div>
                    <p className="text-xl italic mb-8 leading-relaxed">
                        &quot;AgriConnect changed my life. I used to sell to middlemen for pennies. Now, I talk directly to
                        chefs in the city and get 40% more for my tomatoes.&quot;
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/50 overflow-hidden relative">
                            <Image className="w-full h-full object-cover"
                                alt="Profile portrait of a smiling female farmer"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPTJu26nIi08eRolSwmv6uHSN459EB69z6lC5qB1lqjy-PBIZ9DjOfs-ENBAAjPbJFTP31wxnZmumFymmhAUv-sQsAv5H_R1SU8Bd1cPJbmDDX28QwYCHNZfIB1lhjS_V4E9Keh6yOBhWAPMDqBxSJm0A-YQGoMOUv-t--Bm-r7C1nioyedxXhT0hD0Dh3Yz0aUI8IfnDzUIGaIrSCh3a0VykEU8RnacZnuLtUth0vCZUanU2m6ms6xfO9FD2bQqJV9dEtviKBm56s"
                                fill
                                sizes="48px" />
                        </div>
                        <div>
                            <p className="font-bold">Sarah Jenkins</p>
                            <p className="text-white/60 text-sm">Organic Potato Farmer</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="flex gap-1 mb-4 text-accent-amber">
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                        <span className="material-symbols-outlined fill-1">star</span>
                    </div>
                    <p className="text-xl italic mb-8 leading-relaxed">
                        &quot;The transparency is what sold me. I know exactly where my produce is coming from and can ensure
                        my restaurant serves only the freshest ingredients.&quot;
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/50 overflow-hidden relative">
                            <Image className="w-full h-full object-cover" alt="Profile portrait of a professional chef"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKpwhJ_P_vJgR2--sKTwDbKgY8InzIw2nMKfsqaVcUQ786Rajj2UabBtIgrTPBdcMMglN7w0km9_SzATlpNeWUJyIWdj0vjF-lUFFHc8GwPOzqGG4jSacl3Za-6eNa56_cr8ACy5i1oauj_LcQjNf91-ts7Gq5L_jxhV8vrMTLWB1FTBvrSOvQEN7rSR3bhQOmi7LNGZTyuxtxs9D64V1UJwmHrMqipidrGljlwsOcKZA0d1l7sQg5DxoensHmNX0OAEgC-cP6imVJ"
                                fill
                                sizes="48px" />
                        </div>
                        <div>
                            <p className="font-bold">David Chen</p>
                            <p className="text-white/60 text-sm">Head Chef, The Green Bistro</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonial