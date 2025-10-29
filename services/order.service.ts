import { get, put } from "@/lib/http";
import { ConfirmDelivery, DonDatHang } from "@/types/order";
import OrderDetailResponse, { OrderDetailData } from "@/types/order-detail-response";

export const OrderService = {
    getAssignedOrders: async (): Promise<DonDatHang[]> => {
        const res = await get<any>("/api/orders/delivery/assigned");
        console.debug("API response for assigned orders:", res);
        if (res && res.data && Array.isArray(res.data.orders)) {
            console.debug("Fetched assigned orders (data.orders):", res.data.orders);
            return res.data.orders as DonDatHang[];
        }
        return [];
    },

    getOrderAssignedDetails: async (orderId: number): Promise<OrderDetailData | null> => {
        const res = await get<OrderDetailResponse>(`/api/orders/${orderId}/detail`);
        if (res && res.data) {
            console.debug("Order detail:", res.data);
            return res.data;
        }
        return null;
    },
    confirmDelivery: async (o : ConfirmDelivery): Promise<boolean> => {
        const res = await put<any>(`/api/orders/delivery/confirm/image`, o);
        if (res && res.data) {
            console.debug("Confirm delivery response:", res.data);
            return res.data !== null;
        }
        return false;
    }
};