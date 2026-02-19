/**
 * Маска для российских номеров: отображение +7 (999) 123-45-67,
 * на бэк отправляем только цифры (без + и скобок).
 */

export function parsePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Нормализует к 11 цифрам: 7XXXXXXXXXX (для России) */
export function normalizePhoneDigits(digits: string): string {
  let d = digits.replace(/\D/g, "");
  if (d.startsWith("8") && d.length === 11) d = "7" + d.slice(1);
  if (d.length === 10 && !d.startsWith("7")) d = "7" + d;
  return d.slice(0, 11);
}

/**
 * Форматирует цифры для отображения: +7 (999) 123-45-67
 */
export function formatPhoneDisplay(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 0) return "";
  const rest = d.startsWith("7") ? d.slice(1) : d.startsWith("8") ? d.slice(1) : d;
  let out = "+7";
  if (rest.length > 0) out += " (" + rest.slice(0, 3);
  if (rest.length > 3) out += ") " + rest.slice(3, 6);
  if (rest.length > 6) out += "-" + rest.slice(6, 8);
  if (rest.length > 8) out += "-" + rest.slice(8, 10);
  if (rest.length > 0 && rest.length <= 3) out += ")";
  return out;
}

