export type IconName =
  | 'book' | 'map' | 'brain' | 'trophy' | 'user' | 'home' | 'logout'
  | 'flame' | 'star' | 'lock' | 'play' | 'check' | 'search' | 'arrow-right'
  | 'menu' | 'eye' | 'eye-off' | 'sparkle' | 'library';

const paths: Record<IconName, string> = {
  book: 'M5 4.5h10.5A2.5 2.5 0 0 1 18 7v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5Zm0 0v12A2.5 2.5 0 0 0 7.5 19.5M8 8h6M8 11h6',
  map: 'M4 5.5 9 3l6 2.5L20 3v15.5L15 21l-6-2.5L4 21V5.5Zm5 0v13M15 5.5v13',
  brain: 'M9.2 5.2A3.2 3.2 0 0 1 15 7.5a3.5 3.5 0 0 1 .5 6.9A3.2 3.2 0 0 1 9 16a3.2 3.2 0 0 1-3.4-4.9A3.2 3.2 0 0 1 9.2 5.2ZM12 4v16M8.5 8.5H12M12 12h3.5M8.5 15.5H12',
  trophy: 'M7 4h10v4.5a5 5 0 0 1-10 0V4Zm5 9v4M8.5 20h7M4 5h3v3a3 3 0 0 1-3-3ZM20 5h-3v3a3 3 0 0 0 3-3Z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  home: 'M3.5 10.5 12 3l8.5 7.5M5.5 9.5V20h13V9.5M9.5 20v-6h5v6',
  logout: 'M10 5H5v14h5M13 8l4 4-4 4M9 12h8',
  flame: 'M12 21a6 6 0 0 0 6-6c0-4-3-6-4.5-9.5-2 1.5-2.5 3.5-2.5 5.5-1.5-1-2.5-2.5-2.5-4.5C6 9 6 12 6 15a6 6 0 0 0 6 6Z',
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2-4.5-4.4 6.2-.9L12 3Z',
  lock: 'M6 10h12v10H6V10Zm3 0V7a3 3 0 0 1 6 0v3M12 14v2',
  play: 'm9 6 8 6-8 6V6Z',
  check: 'm5 12 4 4L19 6',
  search: 'm20 20-4.5-4.5M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z',
  'arrow-right': 'M4 12h15m-6-6 6 6-6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  eye: 'M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Zm9.5 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'eye-off': 'm3 3 18 18M10.6 5.2A10.5 10.5 0 0 1 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-3.1 3.8M6.2 6.3C3.7 8 2.5 12 2.5 12S6 19 12 19a10 10 0 0 0 3.1-.5',
  sparkle: 'm12 3 1.3 5.7L19 12l-5.7 1.3L12 19l-1.3-5.7L5 12l5.7-3.3L12 3Z',
  library: 'M4 5h3v14H4V5Zm6 0h3v14h-3V5Zm6 0h3v14h-3V5ZM3 20h18',
};

export function Icon({ name, size = 18, strokeWidth = 1.8, className = '' }: { name: IconName; size?: number; strokeWidth?: number; className?: string }) {
  return <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
