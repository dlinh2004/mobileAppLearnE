require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:19006', // Expo web default
    'http://localhost:19000',
    'http://localhost:8081',  // RN packager
    'http://localhost:3000',
    'http://127.0.0.1:19006',
  ],
  credentials: false,
}));
app.use(bodyParser.json());

// Validate API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is missing. Set it in .env');
}

const genAI = new GoogleGenerativeAI(apiKey);
// Choose model: gemini-2.5-flash or gemini-1.5-pro
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', model: MODEL_NAME });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return res.status(500).json({ error: 'Server missing GEMINI_API_KEY' });
    }

    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid payload: messages must be a non-empty array' });
    }

    console.log(`[Chat] Processing ${messages.length} messages`);

    // Map client messages to the format expected by @google/generative-ai
    const history = messages.slice(0, -1).map(m => ({ 
      role: m.role === 'user' ? 'user' : 'model', 
      parts: [{ text: m.text || '' }] 
    }));

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const chat = model.startChat({ history });

    // The latest user message to send as a prompt
    const lastUser = messages[messages.length - 1];
    const prompt = lastUser?.text || '';

    if (!prompt.trim()) {
      return res.status(400).json({ error: 'Prompt cannot be empty' });
    }

    console.log(`[Chat] Sending prompt to ${MODEL_NAME}: "${prompt.substring(0, 50)}..."`);
    const response = await chat.sendMessage(prompt);
    const text = response.response.text() || '';

    console.log(`[Chat] Received response: "${text.substring(0, 50)}..."`);
    // Remove markdown formatting: **bold**, *italic*, __underline__
    let cleanedText = text
      .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove **text**
      .replace(/\*(.+?)\*/g, '$1')      // Remove *text*
      .replace(/__(.+?)__/g, '$1')      // Remove __text__
      .replace(/`(.+?)`/g, '$1');       // Remove `code`
    
    console.log(`[Chat] Cleaned response: "${cleanedText.substring(0, 50)}..."`);
    return res.json({ text: cleanedText });
  } catch (err) {
    console.error('[Chat Error]', err.message || err);
    const errorMsg = err.message || 'Chat request failed';
    return res.status(500).json({ error: errorMsg });
  }
});

const server = app.listen(PORT, () => {
  console.log(`\n✅ Server started on PORT ${PORT}`);
  
  const os = require('os');
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  
  if (addresses.length > 0) {
    console.log(`\n📍 Available on:`);
    addresses.forEach(addr => {
      console.log(`   🔗 http://${addr}:${PORT}`);
    });
  }
  console.log(`   🔗 http://127.0.0.1:${PORT} (localhost)\n`);
  console.log(`🔗 API endpoints:`);
  console.log(`   - GET /health`);
  console.log(`   - POST /api/chat\n`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});

server.on('listening', () => {
  console.log('✅ Server is listening');
});
