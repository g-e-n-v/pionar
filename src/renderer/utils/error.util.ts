export function getErrorMessage(error: unknown) {
  if (String(error).startsWith('Error: Error invoking remote method')) {
    return String(error).replace(/^Error: Error invoking remote method '[^']+':\s*/, '')
  }

  return 'Unknown error'
}
