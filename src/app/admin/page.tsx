"use client"

import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"

type Investment = {
  id: string
  email: string
  amount: number
  status: string
  createdAt: string
}

type User = {
  id: string
  email: string
  name: string
  wallet: number
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [investments, setInvestments] = useState<Investment[]>([])

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(setUsers)

    fetch("/api/admin/investments")
      .then(res => res.json())
      .then(setInvestments)
  }, [])

  const markPaid = async (id: string) => {
    const res = await fetch(`/api/admin/mark-paid`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      setInvestments(prev =>
        prev.map(inv => (inv.id === id ? { ...inv, status: "paid" } : inv))
      )
    }
  }

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>

      <section>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="overflow-auto border rounded p-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Wallet (₦)</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>₦{(user.wallet / 100).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Investments</h2>
        <div className="overflow-auto border rounded p-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Email</th>
                <th>Amount (₦)</th>
                <th>Status</th>
                <th>Mark Paid</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(inv => (
                <tr key={inv.id}>
                  <td>{inv.email}</td>
                  <td>₦{(inv.amount / 100).toLocaleString()}</td>
                  <td>{inv.status}</td>
                  <td>
                    {inv.status !== "paid" && (
                      <button
                        onClick={() => markPaid(inv.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
      }
