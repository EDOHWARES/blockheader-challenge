"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Wallet } from "lucide-react"

interface AddressInputProps {
  input: string
  onInputChange: (value: string) => void
  onValidate: () => void
  isValidating: boolean
}

export function AddressInput({ input, onInputChange, onValidate, isValidating }: AddressInputProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Enter Ethereum Addresses
        </CardTitle>
        <CardDescription>
          Paste your addresses separated by commas or new lines. Each address should start with 0x and be 42 characters
          long.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87&#10;0x8ba1f109551bD432803012645Hac136c&#10;0x1234567890123456789012345678901234567890"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
        />
        <Button
          onClick={onValidate}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={isValidating}
        >
          {isValidating ? "Validating..." : "Validate Addresses"}
        </Button>
      </CardContent>
    </Card>
  )
}
