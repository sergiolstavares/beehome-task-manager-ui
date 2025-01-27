export function decodeStatus(status: string) {
  if (status === 'PENDING') return 'Pendente'
  if (status === 'IN_PROGRESS') return 'Em progresso'
  if (status === 'COMPLETED') return 'Concluído'
  return ''
}
