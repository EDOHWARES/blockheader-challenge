"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Copy } from "lucide-react"
import type { ValidationResult, ValidationStats } from "@/types/validation";

interface ValidationResultsProps {
  results: ValidationResult[]
  stats: ValidationStats
  onCopyValid: () => void
}

export function ValidationResults({ results, stats, onCopyValid }: ValidationResultsProps) {
  if (results.length === 0) return null

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">Validation Results</CardTitle>
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
          <Button onClick={onCopyValid} variant="outline" className="w-full">
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
  )
}
