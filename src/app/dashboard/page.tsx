"use client"

import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

type Investment = {
  id: string
  amount: number
  status: string
  createdAt: string
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [wallet, setWallet] = useState(0)
  const [investments, setInvestments] = useState<Investment[]>([])

  const email = session?.user?.email

  useEffect(() => {
    if (!email) return

    fetch(`/api/user/wallet?email=${email}`)
      .then(res => res.json())
      .then(data => setWallet(data.wallet))

    fetch(`/api/user/investments?email=${email}`)
      .then(res => res.json())
      .then(data => setInvestments(data))
  }, [email])

  if (!email) return <div className="p-6">Loading...</div>

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <p className="text-lg text-green-700 font-bold">
          ₦{(wallet / 100).toLocaleString()}
        </p>
        <a
          href="https://paystack.shop/pay/pocket-investie"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Top Up Wallet
        </a>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Your Investments</h2>
        <div className="overflow-auto border rounded p-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Amount (₦)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(inv => (
                <tr key={inv.id}>
                  <td>₦{(inv.amount / 100).toLocaleString()}</td>
                  <td>{inv.status}</td>
                  <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
      }
