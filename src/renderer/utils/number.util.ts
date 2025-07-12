export function formatNumber(num: number) {
  return num.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })
}
