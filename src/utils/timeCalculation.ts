/**
 * Time Calculation Utilities
 * Funções para calcular tempo de permanência
 */

export interface TimeCalculation {
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number;
  formatted: string;
  formattedShort: string;
}

/**
 * Calcula o tempo decorrido entre duas datas
 */
export function calculateDuration(
  startDate: string | Date,
  endDate: string | Date = new Date()
): TimeCalculation {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const diffMs = end.getTime() - start.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  
  const hours = diffHours;
  const minutes = diffMinutes % 60;
  const seconds = diffSeconds % 60;
  
  return {
    hours,
    minutes,
    seconds,
    totalMinutes: diffMinutes,
    formatted: formatDuration(hours, minutes, seconds),
    formattedShort: formatDurationShort(hours, minutes),
  };
}

/**
 * Formata duração de forma completa
 * Exemplo: "2 horas, 30 minutos e 15 segundos"
 */
function formatDuration(hours: number, minutes: number, seconds: number): string {
  const parts: string[] = [];
  
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`);
  }
  
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
  }
  
  if (seconds > 0 && hours === 0) {
    parts.push(`${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`);
  }
  
  if (parts.length === 0) {
    return 'menos de 1 segundo';
  }
  
  if (parts.length === 1) {
    return parts[0];
  }
  
  if (parts.length === 2) {
    return `${parts[0]} e ${parts[1]}`;
  }
  
  return `${parts[0]}, ${parts[1]} e ${parts[2]}`;
}

/**
 * Formata duração de forma curta
 * Exemplo: "2h 30min"
 */
export function formatDurationShort(hours: number, minutes: number): string {
  if (hours === 0 && minutes === 0) {
    return '< 1min';
  }
  
  if (hours === 0) {
    return `${minutes}min`;
  }
  
  if (minutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${minutes}min`;
}

/**
 * Calcula o tempo de permanência entre entrada e saída
 */
export function calculateStayDuration(
  entryTimestamp: string,
  exitTimestamp: string | null = null
): TimeCalculation {
  return calculateDuration(entryTimestamp, exitTimestamp || new Date());
}

/**
 * Formata timestamp para exibição
 */
export function formatTimestamp(timestamp: string | Date): string {
  const date = new Date(timestamp);
  
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formata apenas a hora
 */
export function formatTime(timestamp: string | Date): string {
  const date = new Date(timestamp);
  
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formata apenas a data
 */
export function formatDate(timestamp: string | Date): string {
  const date = new Date(timestamp);
  
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Verifica se é hoje
 */
export function isToday(timestamp: string | Date): boolean {
  const date = new Date(timestamp);
  const today = new Date();
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Retorna descrição relativa do tempo
 * Exemplo: "Há 5 minutos", "Há 2 horas", "Ontem", etc.
 */
export function getRelativeTime(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 1) {
    return 'Agora';
  }
  
  if (diffMinutes < 60) {
    return `Há ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
  }
  
  if (diffHours < 24) {
    return `Há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  }
  
  if (diffDays === 1) {
    return 'Ontem';
  }
  
  if (diffDays < 7) {
    return `Há ${diffDays} dias`;
  }
  
  return formatDate(date);
}
