import { ORDER_STATUS } from "@/constants/order-status";

export const statusColor = (status?: string) => {
  if (!status) return "bg-gray-200 text-gray-700";
  switch (status) {
    case ORDER_STATUS.DANGGIAO[0]:
      return "bg-amber-100 text-amber-800";
    case ORDER_STATUS.HOANTAT[0]:
      return "bg-emerald-100 text-emerald-800";
    case ORDER_STATUS.DAHUY[0]:
      return "bg-red-100 text-red-800";
    case ORDER_STATUS.TRAHANG[0]:
      return "bg-purple-100 text-purple-800";
  }
};
