import React from 'react'
import { FieldError } from "react-hook-form";

export default function ErrorLabel(props: {field: any, message?: string}) {
  const { field, message = 'Field required.' } = props
  if (!field) return null

  return (
    <div className="error">{message}</div>
  )
}