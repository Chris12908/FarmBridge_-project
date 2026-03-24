import Link from 'next/link'

export default function Onboarding() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden">
      {/* Left Side: Hero Image Section */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvoEkE8pCKopWk6d_ncqv8U6BlOAjdml0Qp4hh07_ax55PEkfzJAWQK5ogGCn4k1QiTu_mObsQWMMqWOXfgREMajJhxPCMvcH6YN3PvK3Z0XeDz0EvsDs7S_jeAsCmAGnJtRlw132_8Cs1f3M-eDC8-95z7Ww_Bb4WiCiOAGekGoeurHSZu6yqJ95XkbCtk3sYZZ84kdu_ErG6O1OKqEE-AEeuW425MPfGAztvr0s2Zf1PDEJO6C9yBuUhMrcRLSzKT1dJIeU82W1h')",
          }}
        />
        {/* Logo & Tagline Overlay */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center lg:items-start px-8 lg:px-16 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-primary text-3xl">eco</span>
            </div>
            <span className="text-white text-3xl font-black tracking-tight">AgriConnect</span>
          </div>
          <h1 className="text-white text-4xl lg:text-6xl font-black leading-tight max-w-md text-center lg:text-left">
            Buy direct from the source.
          </h1>
          <p className="text-white/90 mt-4 text-lg hidden lg:block max-w-sm">
            Empowering local farmers and connecting them with sustainable markets worldwide.
          </p>
        </div>
      </div>

      {/* Right Side: Role Selection Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-16 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-xl">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome to AgriConnect
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Choose how you want to use the platform today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Buyer Card */}
            <div className="group relative flex flex-col p-8 bg-white dark:bg-slate-800 rounded-xl border border-primary/10 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">
                  shopping_basket
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">I am a Buyer</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Source fresh produce directly from local farms. Get access to wholesale prices and organic quality.
              </p>
              <Link
                href="/auth/buyer/signup"
                className="mt-auto flex items-center justify-center w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md"
              >
                Join as Buyer
              </Link>
            </div>

            {/* Farmer Card */}
            <div className="group relative flex flex-col p-8 bg-white dark:bg-slate-800 rounded-xl border border-primary/10 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-3xl">
                  agriculture
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">I am a Farmer</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                List your crops, manage inventory, and connect directly with bulk buyers globally.
              </p>
              <Link
                href="/auth/farmer/signup"
                className="mt-auto flex items-center justify-center w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md"
              >
                Join as Farmer
              </Link>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Trust Footer */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span className="text-xs font-semibold tracking-widest uppercase">Certified Organic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">local_shipping</span>
              <span className="text-xs font-semibold tracking-widest uppercase">Global Logistics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">payments</span>
              <span className="text-xs font-semibold tracking-widest uppercase">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
