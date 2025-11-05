import { DonDatHang } from "@/types/order";

/**
 * Loại bỏ dấu tiếng Việt và chuyển về chữ thường
 * @param str - Chuỗi cần xử lý
 * @returns Chuỗi đã loại bỏ dấu và chuyển về chữ thường
 */
const removeVietnameseTones = (str: string): string => {
	if (!str) return "";
	
	// Normalize Unicode (NFC)
	str = str.normalize('NFD');
	
	// Chuyển về chữ thường
	str = str.toLowerCase();
	
	// Loại bỏ dấu tiếng Việt
	str = str.replace(/[\u0300-\u036f]/g, ''); // Loại bỏ combining diacritical marks
	str = str.replace(/đ/g, "d");
	str = str.replace(/Đ/g, "d");
	
	// Trim khoảng trắng thừa
	str = str.trim();
	
	return str;
};

/**
 * Sắp xếp danh sách đơn đặt hàng theo ngày cập nhật mới nhất
 * @param orders - Danh sách các đơn đặt hàng cần sắp xếp
 * @returns Danh sách đơn đặt hàng đã được sắp xếp theo ngày cập nhật giảm dần (mới nhất lên đầu)
 */
export const sortOrdersByLatestUpdate = (orders: DonDatHang[]): DonDatHang[] => {
	return [...orders].sort((a, b) => {
		const dateA = new Date(a.NgayCapNhat);
		const dateB = new Date(b.NgayCapNhat);
		return dateB.getTime() - dateA.getTime();
	});
};

/**
 * Sắp xếp danh sách đơn đặt hàng theo ngày tạo
 * @param orders - Danh sách các đơn đặt hàng cần sắp xếp
 * @param ascending - Sắp xếp tăng dần (true) hoặc giảm dần (false)
 * @returns Danh sách đơn đặt hàng đã được sắp xếp
 */
export const sortOrdersByCreatedDate = (orders: DonDatHang[], ascending: boolean = false): DonDatHang[] => {
	return [...orders].sort((a, b) => {
		const dateA = new Date(a.NgayTao);
		const dateB = new Date(b.NgayTao);
		return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
	});
};

/**
 * Sắp xếp danh sách đơn đặt hàng theo mã đơn hàng
 * @param orders - Danh sách các đơn đặt hàng cần sắp xếp
 * @param ascending - Sắp xếp tăng dần (true) hoặc giảm dần (false)
 * @returns Danh sách đơn đặt hàng đã được sắp xếp
 */
export const sortOrdersByOrderId = (orders: DonDatHang[], ascending: boolean = false): DonDatHang[] => {
	return [...orders].sort((a, b) => {
		return ascending ? a.MaDDH - b.MaDDH : b.MaDDH - a.MaDDH;
	});
};

/**
 * Tìm kiếm đơn đặt hàng theo mã đơn hoặc tên người nhận
 * Hỗ trợ tìm kiếm không phân biệt chữ hoa/thường và có/không dấu
 * @param orders - Danh sách các đơn đặt hàng
 * @param searchText - Từ khóa tìm kiếm
 * @returns Danh sách đơn đặt hàng phù hợp với từ khóa tìm kiếm
 */
export const searchOrders = (orders: DonDatHang[], searchText: string): DonDatHang[] => {
	if (!searchText || searchText.trim() === "") {
		return orders;
	}

	const trimmedSearch = searchText.trim();
	// Chuẩn hóa từ khóa tìm kiếm: loại bỏ dấu, chuyển về chữ thường
	const normalizedSearch = removeVietnameseTones(trimmedSearch);

	return orders.filter((order) => {
		// Tìm kiếm theo mã đơn hàng
		const orderIdMatch = order.MaDDH.toString().includes(trimmedSearch);

		// Tìm kiếm theo tên người nhận (chuẩn hóa trước khi so sánh)
		const receiverName = order.NguoiNhan || '';
		const normalizedReceiver = removeVietnameseTones(receiverName);
		const receiverNameMatch = normalizedReceiver.includes(normalizedSearch);

		return orderIdMatch || receiverNameMatch;
	});
};

export type SortOption = "latest" | "oldest" | "idDesc" | "idAsc";

/**
 * Sắp xếp đơn đặt hàng theo tùy chọn
 * @param orders - Danh sách các đơn đặt hàng
 * @param sortBy - Tùy chọn sắp xếp
 * @returns Danh sách đơn đặt hàng đã được sắp xếp
 */
export const sortOrders = (orders: DonDatHang[], sortBy: SortOption): DonDatHang[] => {
	switch (sortBy) {
		case "latest":
			return sortOrdersByLatestUpdate(orders);
		case "oldest":
			return sortOrdersByCreatedDate(orders, true);
		case "idDesc":
			return sortOrdersByOrderId(orders, false);
		case "idAsc":
			return sortOrdersByOrderId(orders, true);
		default:
			return orders;
	}
};
