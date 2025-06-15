export interface ValidationResult {
    address: string
    isValid: boolean
    truncated: string
  }
  
  export interface ValidationStats {
    total: number
    valid: number
    invalid: number
  }
  