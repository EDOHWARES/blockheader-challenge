/**
 * Removes spaces, punctuation, and converts to lowercase
 */
export function cleanText(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]/g, "")
  }
  
  /**
   * Checks if a cleaned string is a palindrome
   */
  export function isPalindrome(cleanedText: string): boolean {
    if (cleanedText.length === 0) return false
  
    const reversed = cleanedText.split("").reverse().join("")
    return cleanedText === reversed
  }
  
  /**
   * Formats the cleaned text for display with spaces between characters
   */
  export function formatCleanedText(cleanedText: string): string {
    return cleanedText.split("").join(" ").toUpperCase()
  }
  