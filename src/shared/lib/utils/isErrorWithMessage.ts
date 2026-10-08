export function isErrorWithDetailArray(error: unknown): error is { errors: { detail: string }[] } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as any).errors) &&
    (error as any).errors.length > 0 &&
    typeof (error as any).errors[0].detail === 'string'
  )
}
export function trimToMaxLength(str: string, maxLength = 100): string {
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str
}

export function isErrorWithProperty<T extends string>(error: unknown, property: T): error is Record<T, string> {
  return (
    typeof error === 'object' &&
    error != null &&
    property in error &&
    typeof (error as Record<string, unknown>)[property] === 'string'
  )
}
