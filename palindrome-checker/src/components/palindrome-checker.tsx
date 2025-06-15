"use client"

import type React from "react"

import { RotateCcw, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { usePalindromeChecker } from "@/hooks/use-palindrome-checker"
import { PalindromeResultDisplay } from "./palindrome.result"
import { PalindromeCheckerProps } from "@/types/palindrome"

export function PalindromeChecker({
  placeholder = "Enter a sentence to check if it's a palindrome...",
  className = "",
}: PalindromeCheckerProps) {
  const { input, setInput, result, isChecking, checkPalindrome, clearAll } = usePalindromeChecker()

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      checkPalindrome()
    }
  }

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-6 ${className}`}>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Palindrome Checker
          </CardTitle>
          <CardDescription className="text-lg">
            Check if your sentence reads the same forwards and backwards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="min-h-[100px] text-lg resize-none"
              disabled={isChecking}
            />
            <p className="text-xs text-muted-foreground">Press Enter to check, or use the button below</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={checkPalindrome} disabled={!input.trim() || isChecking} className="flex-1" size="lg">
              {isChecking ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Check Palindrome
                </>
              )}
            </Button>

            <Button onClick={clearAll} variant="outline" size="lg" disabled={!input && !result}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && <PalindromeResultDisplay result={result} />}

      {/* Examples Section */}
      <Card className="border-dashed">
        <CardContent className="pt-4">
          <h3 className="font-semibold mb-3 text-center">Try these examples:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {["A man, a plan, a canal: Panama", "race a car", "Was it a car or a cat I saw?", "Madam, I'm Adam"].map(
              (example, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="text-left justify-start h-auto p-3 text-sm"
                  onClick={() => setInput(example)}
                >
                  "{example}"
                </Button>
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
