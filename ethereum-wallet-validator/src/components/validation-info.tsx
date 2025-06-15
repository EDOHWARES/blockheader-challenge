import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ValidationInfo() {
  return (
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
  )
}
