"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ValidationProps {
  value: string
  rules: {
    pattern?: RegExp
    minLength?: number
    maxLength?: number
    required?: boolean
  }
  messages?: {
    pattern?: string
    minLength?: string
    maxLength?: string
    required?: string
  }
  showValid?: boolean
}

export function FormValidation({ value, rules, messages, showValid = true }: ValidationProps) {
  const [error, setError] = useState<string | null>(null)
  const [valid, setValid] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (!touched && value) {
      setTouched(true)
    }

    if (!touched) return

    if (rules.required && !value) {
      setError(messages?.required || "This field is required")
      setValid(false)
      return
    }

    if (rules.minLength && value.length < rules.minLength) {
      setError(messages?.minLength || `Minimum length is ${rules.minLength} characters`)
      setValid(false)
      return
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      setError(messages?.maxLength || `Maximum length is ${rules.maxLength} characters`)
      setValid(false)
      return
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      setError(messages?.pattern || "Invalid format")
      setValid(false)
      return
    }

    setError(null)
    setValid(true)
  }, [value, rules, messages, touched])

  if (!touched) return null

  if (error) {
    return (
      <div className="flex items-center gap-1 text-red-400 text-xs mt-1">
        <AlertCircle className="h-3 w-3" />
        <span>{error}</span>
      </div>
    )
  }

  if (valid && showValid && value) {
    return (
      <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
        <CheckCircle className="h-3 w-3" />
        <span>Looks good!</span>
      </div>
    )
  }

  return null
}
