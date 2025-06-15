"use client"

import { useState, useCallback, useEffect } from "react"
import { cleanText, isPalindrome } from "@/utils/text-processing"
import type { PalindromeResult } from "@/types/palindrome"

export function usePalindromeChecker() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<PalindromeResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  // Auto-clear result when input changes
  useEffect(() => {
    if (result && input !== result.originalText) {
      setResult(null)
    }
  }, [input, result])

  const checkPalindrome = useCallback(() => {
    if (!input.trim()) {
      setResult(null)
      return
    }

    setIsChecking(true)

    // Add a small delay for better UX
    setTimeout(() => {
      const cleaned = cleanText(input)
      const palindromeResult: PalindromeResult = {
        isPalindrome: isPalindrome(cleaned),
        cleanedText: cleaned,
        originalText: input,
      }

      setResult(palindromeResult)
      setIsChecking(false)
    }, 300)
  }, [input])

  const clearAll = useCallback(() => {
    setInput("")
    setResult(null)
  }, [])

  return {
    input,
    setInput,
    result,
    isChecking,
    checkPalindrome,
    clearAll,
  }
}
