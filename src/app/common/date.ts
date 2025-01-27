export function humanizeDateTime(date: string) {
  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime())) {
      return "Data inválida"
  }

  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export function humanizeDate(date: string) {
  const dateObj = new Date(date)

  if (isNaN(dateObj.getTime())) {
      return "Data inválida"
  }

  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}
