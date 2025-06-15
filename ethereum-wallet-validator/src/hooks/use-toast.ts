"use client"

// Inspired by react-hot-toast library
import * as React from "react"

// Placeholder exports to disable functionality
export const useToast = () => {
  console.warn("useToast is disabled.")
  return {
    toasts: [],
    toast: () => console.warn("toast is disabled."),
    dismiss: () => console.warn("dismiss is disabled."),
  }
}

export const toast = ({ ...props }: any) => {
  console.warn("toast is disabled.")
  return {
    id: "disabled",
    dismiss: () => console.warn("dismiss is disabled."),
    update: () => console.warn("update is disabled."),
  }
}
