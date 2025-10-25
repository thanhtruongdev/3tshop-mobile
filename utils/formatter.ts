export const formatCurrency = (v?: string | number | null) => {
  if (v == null) return "-";
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  if (Number.isNaN(n)) return String(v);
  return n.toLocaleString("vi-VN");
};