"use client"

export default function ResetGameButton() {

  async function resetGame() {
    const res = await fetch("/api/reset-game", {
      method: "POST"
    })

    if (!res.ok) {
      alert("Failed to reset game")
      return
    }

    window.location.reload()
  }

  return (
    <button
      onClick={resetGame}
      className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition duration-200 hover:scale-105"
    >
      Start New Game
    </button>
  )
}