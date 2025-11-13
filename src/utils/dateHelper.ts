export function getTimeRemaining(dateString: string): string {
  const targetDate = new Date(dateString);
  const now = new Date();

  const diffTime = targetDate.getTime() - now.getTime();

  if (diffTime < 0) return 'Finalizado';

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) {
    if (days === 1) return 'Queda 1 día';
    return `Quedan ${days} días`;
  }

  if (hours > 0) {
    if (hours === 1) return 'Queda 1 hora';
    return `Quedan ${hours} horas`;
  }

  return '¡Últimos minutos!';
}

export function formatDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
