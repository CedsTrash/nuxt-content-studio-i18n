export const formatAmount = (amount: number, locale: string): string => {
  return amount.toLocaleString(locale)
}

export const formatDate = (date: string, locale: string): string => {
  return new Date(date).toLocaleDateString(locale)
}
