/**
 * Chuyển đổi số thành chữ tiếng Việt
 * Ví dụ: 123456789 -> "Một trăm hai mươi ba triệu bốn trăm năm mươi sáu nghìn bảy trăm tám mươi chín"
 */

const UNITS = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const SCALES = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

/**
 * Đọc số có 3 chữ số
 */
function readThreeDigits(num: number, isFullZero: boolean = false): string {
  const hundred = Math.floor(num / 100);
  const ten = Math.floor((num % 100) / 10);
  const unit = num % 10;

  let result = '';

  // Hàng trăm
  if (hundred > 0) {
    result += UNITS[hundred] + ' trăm';
    if (ten === 0 && unit > 0) {
      result += ' linh';
    }
  }

  // Hàng chục
  if (ten > 1) {
    result += ' ' + UNITS[ten] + ' mươi';
  } else if (ten === 1) {
    result += ' mười';
  }

  // Hàng đơn vị
  if (unit > 0) {
    if (ten > 1 && unit === 1) {
      result += ' mốt';
    } else if (ten > 0 && unit === 5) {
      result += ' lăm';
    } else {
      result += ' ' + UNITS[unit];
    }
  }

  return result.trim();
}

/**
 * Chuyển số thành chữ
 */
export function numberToWords(num: number): string {
  if (num === 0) return 'Không';
  if (num < 0) return 'Âm ' + numberToWords(Math.abs(num));

  // Làm tròn đến 2 chữ số thập phân
  num = Math.round(num);

  const groups: number[] = [];
  let tempNum = num;

  // Chia thành các nhóm 3 chữ số
  while (tempNum > 0) {
    groups.unshift(tempNum % 1000);
    tempNum = Math.floor(tempNum / 1000);
  }

  let result = '';
  const len = groups.length;

  for (let i = 0; i < len; i++) {
    const group = groups[i];
    const scaleIndex = len - i - 1;

    if (group > 0) {
      const groupText = readThreeDigits(group);
      result += groupText;

      if (scaleIndex > 0 && SCALES[scaleIndex]) {
        result += ' ' + SCALES[scaleIndex];
      }

      if (i < len - 1) {
        result += ' ';
      }
    } else {
      // Nếu nhóm = 0 nhưng không phải nhóm cuối
      if (i < len - 1 && groups.slice(i + 1).some(g => g > 0)) {
        // Kiểm tra xem có cần thêm "không" không
        // (chỉ thêm nếu nhóm tiếp theo khác 0)
      }
    }
  }

  // Capitalize chữ cái đầu
  result = result.trim();
  if (result) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

/**
 * Chuyển số tiền thành chữ (có đơn vị tiền tệ)
 */
export function moneyToWords(amount: number, currency: string = 'đồng'): string {
  if (amount === 0) return `Không ${currency}`;
  
  const words = numberToWords(amount);
  return `${words} ${currency}`;
}

/**
 * Chuyển số tiền thành chữ (viết hoa toàn bộ)
 */
export function moneyToWordsUpperCase(amount: number, currency: string = 'đồng'): string {
  return moneyToWords(amount, currency).toUpperCase();
}

/**
 * Format số tiền thành chữ cho hóa đơn
 * Ví dụ: 123456789 -> "Một trăm hai mươi ba triệu bốn trăm năm mươi sáu nghìn bảy trăm tám mươi chín đồng chẵn"
 */
export function formatInvoiceAmount(amount: number): string {
  const words = moneyToWords(amount, 'đồng');
  return `${words} chẵn`;
}
