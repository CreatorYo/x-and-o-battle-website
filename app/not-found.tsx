import Link from 'next/link'
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative grid min-h-screen place-items-center bg-background px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute text-7xl font-bold text-red-400 opacity-20 animate-float-slow top-1/4 left-1/4 select-none hidden md:block">X</div>
          <div className="absolute text-7xl font-bold text-blue-400 opacity-20 animate-float-slow-delayed bottom-1/3 right-1/3 select-none hidden md:block">X</div>
          <div className="absolute text-7xl font-bold text-red-400 opacity-20 animate-float-slow top-2/3 left-3/4 select-none hidden md:block">O</div>
          <div className="absolute text-7xl font-bold text-blue-400 opacity-20 animate-float-slow-delayed bottom-1/4 right-2/3 select-none hidden md:block">O</div>
        </div>
        <div className="text-center relative z-10">
          <p className="text-blue-400 text-base font-semibold mb-4 select-none">404</p>
          <h1 className="text-5xl font-bold tracking-tight text-foreground mb-4">Page Not Found</h1>
          <p className="text-base font-medium text-muted-foreground mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-[#0073ff] hover:bg-[#005fd1] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 select-none"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}