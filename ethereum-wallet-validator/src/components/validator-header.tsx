import { Wallet, Sparkles } from "lucide-react"

export function ValidatorHeader() {
  return (
    <div className="text-center space-y-4 pt-8">
      <div className="flex items-center justify-center gap-2">
        <Wallet className="h-8 w-8 text-blue-600" />
        <Sparkles className="h-6 w-6 text-purple-500" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Ethereum Address Validator
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Validate multiple Ethereum wallet addresses instantly. Paste your addresses and get immediate feedback on their
        validity.
      </p>
    </div>
  )
}
