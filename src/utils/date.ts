const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
];

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

// Mengembalikan tanggal hari ini dalam format YYYY-MM-DD.
export function todayString(offsetDays = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Memastikan teks berformat YYYY-MM-DD dan merupakan tanggal yang benar-benar ada.
export function isValidDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// Mengubah YYYY-MM-DD menjadi format tampilan, misalnya 28 Okt 2026.
export function formatDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number);

  return `${day} ${MONTHS[month - 1]} ${year}`;
}
