export function extractHexFromGradient(bg: string): string {
  const match = bg.match(/from-\[\#([0-9a-fA-F]{6})\]/);
  return match ? `#${match[1]}` : "#000000";
}
