"use client"

import { useEffect, useState } from "react"

export function ScrollProgressIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
      setProgress(scrolled)
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-[linear-gradient(90deg,#203A84_0%,#3157D5_35%,#4E6FD0_65%,#1FB7D8_100%)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
