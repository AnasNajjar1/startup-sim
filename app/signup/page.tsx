'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()

    if (loading) return

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/game')
    router.refresh()
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 p-8 border rounded w-80"
      >
        <h1 className="text-2xl font-bold">Sign Up</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition duration-200 hover:scale-105"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  )
}