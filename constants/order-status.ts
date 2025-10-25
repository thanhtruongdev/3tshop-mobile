export const ORDER_STATUS = {
  DAXACNHAN: ["DAXACNHAN", "Đã xác nhận","bg-amber-100 text-amber-800"],
  DANGGIAO: ["DANGGIAO", "Đang giao","bg-amber-100 text-amber-800"],
  HOANTAT: ["HOANTAT", "Hoàn tất","bg-emerald-100 text-emerald-800"],
  DAHUY: ["DAHUY", "Đã hủy","bg-red-100 text-red-800"],
  TRAHANG: ["TRAHANG", "Trả hàng","bg-purple-100 text-purple-800"],
};

export const TABS: { key: string; label: string }[] = [
  { key: "DANGGIAO", label: "Đang giao" },
  { key: "HOANTAT", label: "Hoàn tất" },
  { key: "DAHUY", label: "Đã hủy" },
  { key: "TRAHANG", label: "Trả hàng" },
];
