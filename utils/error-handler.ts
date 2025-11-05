import { HttpError } from '@/lib/http';
import { showToast } from './toast';

/**
 * Xử lý lỗi từ API và hiển thị toast message
 */
export function handleApiError(error: unknown, customMessage?: string) {
  if (isHttpError(error)) {
    const message = customMessage || error.message || getErrorMessageByStatus(error.status);
    showToast.error(message);
    return;
  }

  // Lỗi không xác định
  showToast.error(customMessage || 'Đã xảy ra lỗi không xác định');
}

/**
 * Type guard để kiểm tra xem error có phải là HttpError không
 */
function isHttpError(error: unknown): error is HttpError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as HttpError).message === 'string'
  );
}

/**
 * Lấy message mặc định dựa trên status code
 */
function getErrorMessageByStatus(status?: number): string {
  if (!status) return 'Không thể kết nối đến máy chủ';

  switch (status) {
    case 400:
      return 'Yêu cầu không hợp lệ';
    case 401:
      return 'Phiên đăng nhập đã hết hạn';
    case 403:
      return 'Bạn không có quyền thực hiện thao tác này';
    case 404:
      return 'Không tìm thấy tài nguyên';
    case 408:
      return 'Yêu cầu đã hết thời gian chờ';
    case 409:
      return 'Xung đột dữ liệu';
    case 422:
      return 'Dữ liệu không hợp lệ';
    case 429:
      return 'Quá nhiều yêu cầu, vui lòng thử lại sau';
    case 500:
      return 'Lỗi máy chủ nội bộ';
    case 502:
      return 'Máy chủ không phản hồi';
    case 503:
      return 'Dịch vụ tạm thời không khả dụng';
    case 504:
      return 'Máy chủ không phản hồi kịp thời';
    default:
      if (status >= 500) return 'Lỗi máy chủ';
      if (status >= 400) return 'Yêu cầu không hợp lệ';
      return 'Đã xảy ra lỗi';
  }
}

/**
 * Wrapper cho async function để tự động handle error
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  customMessage?: string
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleApiError(error, customMessage);
      throw error; // Re-throw để component có thể handle thêm nếu cần
    }
  }) as T;
}
