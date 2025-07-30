"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetStarted = () => {
    if (session?.user) {
      router.push("/dashboard")
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-green-800">
        Pocket Investie
      </h1>

      <p className="text-center text-lg mb-6 max-w-xl text-gray-700">
        Invest Smart, Grow Your Wealth — Easily invest, earn monthly interest,
        and manage your funds securely with Pocket Investie.
      </p>

      <button
        onClick={handleGetStarted}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Get Started
      </button>

      <footer className="mt-12 text-sm text-gray-600 text-center">
        Contact us at{" "}
        <a
          href="mailto:victorexbinarysignalbot@gmail.com"
          className="text-blue-600 underline"
        >
          victorexbinarysignalbot@gmail.com
        </a>
      </footer>
    </main>
  )
        }
