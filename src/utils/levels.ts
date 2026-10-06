export type LevelInfo = { level: number; title: string; current: number; next: number; percent: number };

export function getLevelFromXp(xp: number): number {
  return Math.max(1, Math.floor(Math.max(0, xp) / 200) + 1);
}

export function getXpForNextLevel(xp: number): number {
  return getLevelFromXp(xp) * 200;
}

export function getLevelInfo(xp: number): LevelInfo {
  const level = getLevelFromXp(xp);
  const start = (level - 1) * 200;
  const next = level * 200;
  const current = Math.max(0, xp - start);
  return { level, title: level >= 8 ? 'Mestre' : level >= 4 ? 'Discípulo' : level >= 2 ? 'Estudante' : 'Iniciante', current, next: next - start, percent: Math.min(100, Math.round((current / (next - start)) * 100)) };
}
