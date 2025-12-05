# 🔧 Hướng dẫn cấu hình Chat Server

## ⚠️ Vấn đề: "Network request failed"

React Native không thể dùng `localhost` từ thiết bị/emulator. Bạn cần sử dụng địa chỉ IP thực của máy chạy server.

## 📍 Tìm IP của máy

### Windows
1. Mở Command Prompt (cmd) hoặc PowerShell
2. Gõ: `ipconfig`
3. Tìm **IPv4 Address** (thường là `192.168.x.x` hoặc `10.x.x.x`)

### Mac/Linux
1. Mở Terminal
2. Gõ: `ifconfig`
3. Tìm **inet address** dưới en0 hoặc wlan0

## 🔧 Cài đặt IP trong ứng dụng

### Cách 1: Sửa trong ChatScreen.js
Mở file `src/screens/ChatScreen.js` và thay đổi dòng:
```javascript
const API_HOST = '192.168.1.100'; // Thay bằng IP của bạn
```

### Cách 2: Sửa trong config/api.js
Mở file `src/config/api.js` và cập nhật:
```javascript
const API_HOST = '192.168.1.100'; // Thay bằng IP của bạn
```

## ✅ Kiểm tra kết nối

1. **Đảm bảo server đang chạy**
   ```bash
   cd server
   node server.js
   ```
   Nên thấy: `Proxy server listening on http://localhost:3000`

2. **Kiểm tra từ máy**
   - Windows: Mở trình duyệt, truy cập `http://[YOUR_IP]:3000/health`
   - Nên thấy: `{"status":"ok","model":"gemini-2.5-flash"}`

3. **Đảm bảo cùng mạng**
   - Máy chạy app (PC/emulator) phải kết nối cùng Wi-Fi với máy chạy server
   - Hoặc nếu dùng Android Studio emulator, cần cấu hình mạng đặc biệt

## 🔌 Network Setup cho Android Emulator

Nếu dùng Android Studio Emulator:
- IP host từ emulator là: `10.0.2.2` (thay vì localhost)
- Hoặc sửa thành IP máy thực tế

## 📝 Ví dụ

Nếu IP máy là `192.168.1.50`:
```javascript
const API_HOST = '192.168.1.50';
```

Sau đó app sẽ kết nối đến: `http://192.168.1.50:3000/api/chat`

## 🐛 Debugging

Nếu vẫn lỗi "Network request failed":
1. Kiểm tra app logs ở React Native console
2. Kiểm tra firewall - cho phép port 3000 nếu cần
3. Chắc chắn không dùng VPN hoặc proxy
4. Thử khởi động lại app
