import { get } from "@/lib/http";
import InvoiceResponse, { InvoiceData } from "@/types/invoice-response";

export const InvoiceService = {
    getInvoiceDetails: async (invoiceId: string): Promise<InvoiceData | null> => {
        const res = await get<InvoiceResponse>(`/api/invoices/detail/${invoiceId}`);
        if (res && res.data) {
            console.debug("Invoice detail:", res.data);
            return res.data;
        }
        return null;
    }
}