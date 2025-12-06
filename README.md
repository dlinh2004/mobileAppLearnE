# 📱 Mobile App Learning - Ứng Dụng Học Từ Vựng Tiếng Anh

Một ứng dụng di động được xây dựng bằng **React Native** giúp người dùng học từ vựng tiếng Anh thông qua các tính năng học flashcard, làm quiz, trò chuyện với AI, và theo dõi tiến độ.

## ✨ Tính Năng Chính

- 📚 **Học Flashcard**: Học từ vựng thông qua các thẻ ghi nhớ tương tác
- 🎯 **Làm Quiz**: Kiểm tra kiến thức với các câu hỏi trắc nghiệm ngẫu nhiên
- 🤖 **Trò Chuyện với AI**: Trao đổi với AI được hỗ trợ bởi Google Gemini
- 📊 **Theo Dõi Tiến Độ**: Xem thống kê học tập, tiến độ theo cấp độ, và thành tựu
- 🌐 **Đa Ngôn Ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- 📱 **Giao Diện Thân Thiện**: Thiết kế UI/UX hiện đại, dễ sử dụng

## 🛠️ Công Nghệ Sử Dụng

- **React Native**: Framework phát triển ứng dụng di động
- **React Navigation**: Điều hướng giữa các màn hình
- **Google Generative AI (Gemini API)**: Hỗ trợ tính năng chat AI
- **Node.js/Express**: Server backend (tùy chọn)
- **AsyncStorage**: Lưu trữ dữ liệu cục bộ

## 📋 Yêu Cầu Hệ Thống

### Bắt Buộc
- **Node.js** phiên bản 14 trở lên (khuyến cáo 18+)
- **npm** phiên bản 6+ hoặc **yarn** phiên bản 1.22+
- **Java Development Kit (JDK)** phiên bản 17+ (Bắt buộc cho Android)
- **Google Gemini API Key** (để sử dụng tính năng chat AI)

### Cho Android Development
- **Android Studio** phiên bản 2021.1 trở lên
- **Android SDK** với API Level 33+ (Android 13+)
- **Android Gradle Plugin** phiên bản 8.0+
- **Emulator Android** hoặc **thiết bị Android thực** (USB debugging bật)

### Cho iOS Development (macOS only)
- **Xcode** phiên bản 14.0 trở lên
- **CocoaPods** phiên bản 1.11+
- **iOS** phiên bản 12.0 trở lên

## ✅ Cách Kiểm Tra Yêu Cầu

```bash
# Kiểm tra Node.js
node --version

# Kiểm tra npm
npm --version

# Kiểm tra Java/JDK
java -version
javac -version

# Kiểm tra CocoaPods (macOS)
pod --version
```

## 🚀 Hướng Dẫn Cài Đặt

### 1. Clone Repository

```bash
git clone <repository-url>
cd MobileAppLearningE
```

### 2. Cài Đặt Dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Cấu Hình API Host (IP Máy Tính)

React Native không thể sử dụng `localhost` từ emulator hoặc thiết bị di động. Bạn cần cập nhật IP thực của máy tính chạy server.

#### Bước 1: Tìm IP Máy Tính

**Windows (PowerShell)**:
```powershell
ipconfig
# Tìm "IPv4 Address" - thường là 192.168.x.x hoặc 10.x.x.x
```

**macOS/Linux (Terminal)**:
```bash
ifconfig
# Tìm địa chỉ IP, thường bắt đầu bằng 192.168 hoặc 10
```

#### Bước 2: Cập Nhật API Host

Cập nhật `API_HOST` ở **2 file**:

**File 1: `src/config/api.js`**
```javascript
// Trước:
const API_HOST = '192.168.111.1'; // TODO: Update with your machine IP

// Sau (thay bằng IP của bạn):
const API_HOST = '192.168.1.100'; // Thay bằng IP thực của máy tính
```

**File 2: `src/screens/ChatScreen.js`** (line 9)
```javascript
// Trước:
const API_HOST = '192.168.111.1'; // CHANGE THIS TO YOUR MACHINE IP

// Sau (thay bằng IP của bạn):
const API_HOST = '192.168.1.100'; // Thay bằng IP thực của máy tính
```

#### Bước 3: Kiểm Tra Kết Nối

Chắc chắn server đang chạy:
```bash
cd server
npm start
# Output sẽ hiển thị: "Proxy server listening on http://localhost:3000"
```

Bây giờ app sẽ kết nối đến `http://[YOUR_IP]:3000/api/chat`

### 4. Cấu Hình Gemini API Key

Ứng dụng sử dụng **Google Generative AI (Gemini)** cho tính năng chat. Bạn cần:

#### Bước 1: Tạo API Key
1. Truy cập [Google AI Studio](https://aistudio.google.com/apikey)
2. Đăng nhập bằng tài khoản Google
3. Nhấp "Create API Key" để tạo key mới
4. Copy API Key được tạo

#### Bước 2: Thêm .env File

Tạo file `.env` trong thư mục `server/`:

```bash
# Windows PowerShell
echo "GEMINI_API_KEY=your_api_key_here" > server\.env
echo "GEMINI_MODEL=gemini-2.5-flash" >> server\.env
echo "PORT=3000" >> server\.env

# macOS/Linux
echo "GEMINI_API_KEY=your_api_key_here" > server/.env
echo "GEMINI_MODEL=gemini-2.5-flash" >> server/.env
echo "PORT=3000" >> server/.env
```

Hoặc tạo file thủ công với nội dung:
```dotenv
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

**⚠️ QUAN TRỌNG**: 
- Đừng bao giờ commit file `.env` lên Git
- File `.env` đã được thêm vào `.gitignore`
- Mỗi người cần tạo API key của riêng họ

### 5. Cấu Hình Android (Nếu Cần)

Nếu build cho Android lần đầu tiên, chạy:

```bash
cd android
./gradlew clean
cd ..
```

### 6. Khởi Động Metro Dev Server

```bash
npm start
# hoặc
yarn start
```

Cửa sổ terminal sẽ hiển thị menu. Nhấn `a` để chạy trên Android hoặc `i` cho iOS.

## 📱 Chạy Ứng Dụng

### Android

```bash
npm run android
# hoặc
yarn android
```

### iOS (macOS only)

Cài đặt dependencies CocoaPods (lần đầu tiên):

```bash
cd ios
pod install
cd ..
```

Sau đó chạy:

```bash
npm run ios
# hoặc
yarn ios
```

## 🖥️ Chạy Server (Nếu Cần)

Để chạy backend server cho tính năng chat AI:

```bash
cd server
npm install
npm start
```

Server sẽ chạy trên `http://localhost:3000` (hoặc port được chỉ định trong `.env`)

## 📁 Cấu Trúc Thư Mục

```
MobileAppLearningE/
├── src/
│   ├── screens/              # Các màn hình ứng dụng
│   │   ├── HomeScreen.js
│   │   ├── FlashcardScreen.js
│   │   ├── QuizScreen.js
│   │   ├── ChatScreen.js
│   │   └── StatisticsScreen.js
│   ├── data/                 # Dữ liệu tĩnh
│   │   ├── words.js          # Danh sách từ vựng
│   │   ├── translations.js   # Bản dịch (Việt/Anh)
│   │   └── statistics.js     # Dữ liệu thống kê
│   ├── navigation/           # Cấu hình điều hướng
│   │   └── AppNavigator.js
│   ├── context/              # React Context
│   │   └── LanguageContext.js
│   └── config/               # Cấu hình API
│       └── api.js
├── server/                   # Backend server
│   ├── server.js
│   ├── package.json
│   └── .env                  # File cấu hình (tạo thủ công)
├── android/                  # Native code Android
├── ios/                      # Native code iOS
├── package.json
├── babel.config.js
├── tsconfig.json
├── metro.config.js
└── README.md
```

## 🔑 Biến Môi Trường

### server/.env

| Biến | Mô Tả | Mặc Định |
|------|-------|---------|
| `GEMINI_API_KEY` | API Key từ Google Gemini | Bắt buộc |
| `GEMINI_MODEL` | Model Gemini để sử dụng | `gemini-2.5-flash` |
| `PORT` | Cổng server chạy | `3000` |

## 🐛 Khắc Phục Sự Cố Phổ Biến

### 1. Lỗi: "Không thể kết nối đến server" hoặc "Network error"
**Nguyên nhân**: API Host sai hoặc server không chạy

**Giải pháp**:
1. Kiểm tra server đang chạy: `cd server && npm start`
2. Kiểm tra IP máy tính của bạn:
   - Windows: `ipconfig` (tìm IPv4 Address)
   - macOS/Linux: `ifconfig`
3. Cập nhật **cả 2 file** này với IP đúng:
   - `src/config/api.js` (line 7)
   - `src/screens/ChatScreen.js` (line 9)
4. Restart Metro: `npm start -- --reset-cache`
5. Rebuild app: `npm run android` hoặc `npm run ios`

**Ví dụ**: Nếu IP máy là `192.168.1.100`:
```javascript
const API_HOST = '192.168.1.100';
```

### 2. Lỗi: "GEMINI_API_KEY not found"
**Giải pháp**: Kiểm tra file `server/.env` có tồn tại và có `GEMINI_API_KEY` không

### 3. Lỗi: "API key was reported as leaked"
**Giải pháp**: Tạo API key mới từ [Google AI Studio](https://aistudio.google.com/apikey)

### 4. Lỗi: "Metro bundler crashed"
**Giải pháp**: 
```bash
npm start -- --reset-cache
# hoặc
yarn start --reset-cache
```

### 5. Lỗi: Android build fail
**Giải pháp**:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### 6. Lỗi: Port 3000 đang sử dụng
**Giải pháp**: Đổi PORT trong file `server/.env` hoặc kill process đang dùng port

## 📚 Thêm Từ Vựng Mới

Để thêm từ vựng mới, chỉnh sửa file `src/data/words.js`:

```javascript
export const WORDS = [
  {
    id: '31',
    term: 'innovative',
    definition: 'đổi mới, sáng tạo',
    example: 'The company has an innovative approach to problem solving.',
    level: 'B2',
  },
  // ... thêm từ khác
];
```

## 🌐 Đa Ngôn Ngữ

Để thêm ngôn ngữ mới, chỉnh sửa `src/data/translations.js`:

```javascript
export const translations = {
  vi: { /* Tiếng Việt */ },
  en: { /* Tiếng Anh */ },
  fr: { /* Tiếng Pháp - thêm mới */ },
};
```

