export const validateEthereumAddress = (address: string): boolean => {
    // Remove whitespace
    const cleanAddress = address.trim()
  
    // Must start with 0x
    if (!cleanAddress.startsWith("0x")) return false
  
    // Must be exactly 42 characters
    if (cleanAddress.length !== 42) return false
  
    // Must contain only hexadecimal characters after 0x
    const hexPart = cleanAddress.slice(2)
    const hexRegex = /^[0-9a-fA-F]+$/
  
    return hexRegex.test(hexPart)
  }
  
  export const truncateAddress = (address: string): string => {
    if (address.length <= 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }
  
  export const parseAddresses = (input: string): string[] => {
    // Split by both newlines and commas, then filter out empty strings
    return input
      .split(/[\n,]/)
      .map((addr) => addr.trim())
      .filter((addr) => addr.length > 0)
  }
  