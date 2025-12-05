import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet } from 'react-native';

// API Configuration - Update with your machine's IP address
// To find your IP: 
// - Windows: Open cmd, type "ipconfig" and find IPv4 Address
// - Mac/Linux: Open terminal, type "ifconfig"
const API_HOST = '192.168.111.1'; // CHANGE THIS TO YOUR MACHINE IP
const API_PORT = 3000;
const API_URL = `http://${API_HOST}:${API_PORT}/api/chat`;

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // { role: 'user' | 'model', text }
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    // Check server connection on mount
    checkServerConnection();
  }, []);

  const scrollToEnd = () => {
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  };

  const checkServerConnection = async () => {
    try {
      const res = await fetch(`http://${API_HOST}:${API_PORT}/health`, {
        method: 'GET',
        timeout: 5000,
      });
      if (res.ok) {
        setServerError('');
        console.log('✓ Server connected');
      } else {
        setServerError('Kết nối server thất bại. Vui lòng kiểm tra IP.');
      }
    } catch (e) {
      console.warn('Server connection check failed:', e.message);
      setServerError(`Không thể kết nối đến server tại ${API_HOST}:${API_PORT}. Hãy kiểm tra IP của máy và đảm bảo server đang chạy.`);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    if (serverError) {
      alert('Lỗi: ' + serverError);
      return;
    }

    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    scrollToEnd();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      console.log('Sending message to:', API_URL);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      const reply = data?.text || 'Xin lỗi, AI chưa có phản hồi.';
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
      scrollToEnd();
    } catch (e) {
      let errorMsg = 'Đã xảy ra lỗi khi gọi AI.';
      if (e.name === 'AbortError') {
        errorMsg = 'Yêu cầu timeout. Vui lòng thử lại.';
      } else if (e.message?.includes('Network')) {
        errorMsg = `Lỗi mạng: Không thể kết nối tới ${API_HOST}:${API_PORT}. Kiểm tra IP máy chủ.`;
      } else if (e.message) {
        errorMsg = `Lỗi: ${e.message}`;
      }
      console.error('Chat error:', e);
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.message, item.role === 'user' ? styles.user : styles.model]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {serverError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>⚠️ {serverError}</Text>
          <TouchableOpacity onPress={checkServerConnection} style={styles.retryBtn}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {isLoading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>AI đang trả lời...</Text>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập câu hỏi tiếng Anh..."
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 12 },
  message: { marginVertical: 6, padding: 10, borderRadius: 8, maxWidth: '90%' },
  user: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  model: { alignSelf: 'flex-start', backgroundColor: '#F0F0F0' },
  messageText: { fontSize: 16 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', padding: 8, borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, minHeight: 40, maxHeight: 120, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  sendBtn: { marginLeft: 8, backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  sendText: { color: '#fff', fontWeight: '600' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingBottom: 6 },
  loadingText: { marginLeft: 8, color: '#666' },
  errorBanner: { backgroundColor: '#FF6B6B', padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  errorText: { color: '#fff', fontSize: 14, flex: 1, marginRight: 10 },
  retryBtn: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  retryText: { color: '#FF6B6B', fontWeight: '600', fontSize: 12 },
});

export default ChatScreen;
