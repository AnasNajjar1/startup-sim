'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/signin')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition duration-200 hover:scale-105"
    >
      Logout
    </button>
  )
}