import { PalindromeChecker } from "@/components/palindrome-checker"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <PalindromeChecker />
      </div>
    </div>
  )
}
