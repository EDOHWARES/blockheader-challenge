"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Copy, Wallet, Sparkles, X } from "lucide-react"

// Types
interface ValidationResult {
  address: string
  isValid: boolean
  truncated: string
}

interface ValidationStats {
  total: number
  valid: number
  invalid: number
}

interface NotificationState {
  message: string
  type: "success" | "error"
  show: boolean
}

// Utility functions
const validateEthereumAddress = (address: string): boolean => {
  const cleanAddress = address.trim()
  if (!cleanAddress.startsWith("0x")) return false
  if (cleanAddress.length !== 42) return false
  const hexPart = cleanAddress.slice(2)
  const hexRegex = /^[0-9a-fA-F]+$/
  return hexRegex.test(hexPart)
}

const truncateAddress = (address: string): string => {
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const parseAddresses = (input: string): string[] => {
  return input
    .split(/[\n,]/)
    .map((addr) => addr.trim())
    .filter((addr) => addr.length > 0)
}

// Notification Component
function Notification({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
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

export default function EthereumValidator() {
  const [input, setInput] = useState("")
  const [results, setResults] = useState<ValidationResult[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    type: "success",
    show: false,
  })

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type, show: true })
    setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 3000)
  }

  const handleValidate = () => {
    if (!input.trim()) {
      showNotification("Please enter some Ethereum addresses to validate.", "error")
      return
    }

    setIsValidating(true)

    setTimeout(() => {
      const addresses = parseAddresses(input)
      const validationResults: ValidationResult[] = addresses.map((address) => ({
        address,
        isValid: validateEthereumAddress(address),
        truncated: truncateAddress(address),
      }))

      setResults(validationResults)
      setIsValidating(false)
    }, 300)
  }

  const copyValidAddresses = () => {
    const validAddresses = results
      .filter((result) => result.isValid)
      .map((result) => result.address)
      .join("\n")

    if (validAddresses) {
      navigator.clipboard.writeText(validAddresses)
      showNotification(`${validAddresses.split("\n").length} valid addresses copied!`, "success")
    } else {
      showNotification("No valid addresses to copy.", "error")
    }
  }

  const stats: ValidationStats = {
    total: results.length,
    valid: results.filter((r) => r.isValid).length,
    invalid: results.filter((r) => !r.isValid).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-2">
            <Wallet className="h-8 w-8 text-blue-600" />
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ethereum Address Validator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Validate multiple Ethereum wallet addresses instantly. Paste your addresses and get immediate feedback on
            their validity.
          </p>
        </div>

        {/* Input Section */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Enter Ethereum Addresses
            </CardTitle>
            <CardDescription>
              Paste your addresses separated by commas or new lines. Each address should start with 0x and be 42
              characters long.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87&#10;0x8ba1f109551bD432803012645Hac136c&#10;0x1234567890123456789012345678901234567890"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
            <Button
              onClick={handleValidate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isValidating}
            >
              {isValidating ? "Validating..." : "Validate Addresses"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Validation Results</CardTitle>
                  <CardDescription>{stats.total} addresses processed</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {stats.valid} Valid
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    {stats.invalid} Invalid
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.valid > 0 && (
                <Button onClick={copyValidAddresses} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Valid Addresses ({stats.valid})
                </Button>
              )}

              <Separator />

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      result.isValid
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "bg-red-50 border-red-200 hover:bg-red-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {result.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <div className={`font-mono text-sm ${result.isValid ? "text-green-800" : "text-red-800"}`}>
                          {result.truncated}
                        </div>
                        {!result.isValid && result.address.length > 20 && (
                          <div className="text-xs text-gray-500 mt-1">Full: {result.address}</div>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={result.isValid ? "default" : "destructive"}
                      className={result.isValid ? "bg-green-600" : ""}
                    >
                      {result.isValid ? "Valid" : "Invalid"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Validation Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium">Starts with 0x</div>
                  <div className="text-gray-600">Must begin with the hexadecimal prefix</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium">42 Characters</div>
                  <div className="text-gray-600">Exactly 42 characters in total length</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-medium">Hexadecimal</div>
                  <div className="text-gray-600">Only 0-9, a-f, A-F after 0x</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  )
}
