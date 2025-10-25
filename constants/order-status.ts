export const ORDER_STATUS = {
  DAXACNHAN: ["DAXACNHAN", "Đã xác nhận","bg-amber-100", "text-green-800"],
  DANGGIAO: ["DANGGIAO", "Đang giao","bg-amber-100", "text-yellow-800"],
  HOANTAT: ["HOANTAT", "Hoàn tất","bg-green-100", "text-green-800"],
  DAHUY: ["DAHUY", "Đã hủy","bg-red-100", "text-red-800"],
  TRAHANG: ["TRAHANG", "Trả hàng","bg-slate-100", "text-slate-800"],
};

export const TABS: { key: string; label: string }[] = [
  { key: "DANGGIAO", label: "Đang giao" },
  { key: "HOANTAT", label: "Hoàn tất" },
  { key: "DAHUY", label: "Đã hủy" },
  { key: "TRAHANG", label: "Trả hàng" },
];
