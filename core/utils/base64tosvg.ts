export const base64ToSvg = (base64: string): string => {
  const svg = Buffer.from(base64, "base64").toString("utf8");
  return svg;
};