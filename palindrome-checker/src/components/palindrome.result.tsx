import { CheckCircle, XCircle, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCleanedText } from "@/utils/text-processing"
import type { PalindromeResult } from "../types/palindrome"

interface PalindromeResultProps {
  result: PalindromeResult
}

export function PalindromeResultDisplay({ result }: PalindromeResultProps) {
  const { isPalindrome, cleanedText } = result

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-500">
      {/* Cleaned Text Display */}
      <Card className="border-dashed">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Cleaned Text</span>
          </div>
          <p className="font-mono text-lg tracking-wider text-center p-3 bg-muted/50 rounded-md">
            {formatCleanedText(cleanedText)}
          </p>
        </CardContent>
      </Card>

      {/* Result Display */}
      <Card
        className={`border-2 ${
          isPalindrome
            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
            : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
        }`}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-3">
            {isPalindrome ? (
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            )}
            <div className="text-center">
              <p
                className={`text-xl font-bold ${
                  isPalindrome ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                }`}
              >
                {isPalindrome ? "Yes, it's a palindrome!" : "No, it's not a palindrome"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isPalindrome
                  ? "This text reads the same forwards and backwards"
                  : "This text doesn't read the same forwards and backwards"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
