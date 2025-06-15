"use client"

import { CheckCircle, XCircle, X } from "lucide-react"
import { useEffect } from "react"

interface NotificationProps {
  message: string
  type: "success" | "error"
  onClose: () => void
  duration?: number
}

export function Notification({ message, type, onClose, duration = 3000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div
        className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border max-w-sm ${
          type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="ml-auto p-1 hover:bg-black/5 rounded-full transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
