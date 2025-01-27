export function decodeStatus(status: string) {
  if (status === 'COMPLETED') return 'Finalizada'
  if (status === 'PENDING') return 'Pendente'
  if (status === 'IN_PROGRESS') return 'Em progresso'
  return ''
}
