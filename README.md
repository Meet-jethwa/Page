# 🛡️ PhishSentinel - AI-Powered Phishing Detection

A modern, professional security tool that protects users from phishing attacks in real-time using artificial intelligence.

---

## 📁 Project Structure

```
PhishSentinel/
├── frontend/                 # Landing page and web interface
│   ├── index.html           # Main website
│   ├── styles.css           # Modern, responsive styling
│   ├── script.js            # Frontend logic and API integration
│   └── package.json         # Frontend dependencies
│
└── backend/                 # Node.js/Express API server
    ├── server.js            # Main backend server with phishing detection logic
    └── package.json         # Backend dependencies
```

---

## 🚀 Quick Start

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

**Expected Output:**
```
╔════════════════════════════════════╗
║   PhishSentinel Backend Running    ║
║   Server: http://localhost:5000    ║
║   Status: ✅ Active                 ║
╚════════════════════════════════════╝
```

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the web server:
```bash
npm start
```

The frontend will run on `http://localhost:8000`

---

## 📊 API Endpoints

### Health Check
```bash
GET /api/health
```

### Scan Single URL
```bash
POST /api/scan
Content-Type: application/json

{
  "url": "https://example.com",
  "message": "Click here urgently!" (optional)
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "riskScore": 25,
  "domainAge": "1500 days old",
  "sslValid": true,
  "messageAnalysis": {
    "urgency": true,
    "fear": false,
    "authority": false
  },
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### Batch Scan Multiple URLs
```bash
POST /api/scan-batch
Content-Type: application/json

{
  "urls": ["https://example1.com", "https://example2.com"]
}
```

### Get Statistics
```bash
GET /api/stats
```

---

## 🧠 Features

### ✅ Instant Link Checking
- Scans URLs in under 1 second
- Real-time risk assessment

### 🔍 Advanced Detection
- **URL Pattern Analysis** - Detects suspicious domain structures
- **SSL Validation** - Checks for secure connections
- **Domain Age Check** - Identifies newly registered domains
- **Typosquatting Detection** - Catches domain name mimics
- **AI Message Analysis** - Analyzes text for phishing indicators
- **Threat Intelligence** - Integrates with threat feeds

### 📱 Multi-Platform Support
- Browser Extension (Chrome/Firefox)
- Android Mobile App
- Web Interface

### 🛡️ Privacy-First
- On-device processing
- No data storage
- No tracking

---

## 🎯 Detection Algorithms

### Risk Scoring (0-100)

The system calculates risk using:

1. **Domain Analysis (25 points)**
   - Known phishing domains
   - Domain reputation

2. **Domain Age (15 points)**
   - Very new domains get higher risk

3. **SSL Certificate (10 points)**
   - Missing HTTPS = higher risk

4. **URL Patterns (20 points)**
   - IP addresses instead of domains
   - Suspicious subdomains
   - Unusual paths and parameters

5. **Message Analysis (30 points)**
   - Urgency indicators
   - Fear-inducing language
   - False authority claims
   - Suspicious keywords

6. **Typosquatting (15 points)**
   - Similarity to known legitimate domains

---

## 🧪 Testing the Demo

### Test URL Examples

**Safe URL (Low Risk):**
```
https://google.com
https://github.com
https://amazon.com
```

**Suspicious URLs (Medium Risk):**
```
https://goog1e.com
https://paypa1.com
https://amaz0n.com
```

**Dangerous Indicators:**
```
http://192.168.1.1/verify/login
http://suspicious-domain.xyz/banking/verify
```

### Test with Message:
```json
{
  "url": "https://paypa1.com/verify",
  "message": "URGENT: Verify your account immediately or it will be suspended! Click here now!"
}
```

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern, responsive design
- **JavaScript (Vanilla)** - No dependencies, lightweight
- **Gradient & Modern UI** - Professional appearance

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **Body-Parser** - Request parsing

---

## 📈 Why PhishSentinel?

| Feature | Browser Warnings | Antivirus | PhishSentinel |
|---------|-----------------|-----------|--------------|
| SMS/WhatsApp Detection | ❌ | ❌ | ✅ |
| AI Text Analysis | ❌ | ❌ | ✅ |
| Real-time Warnings | ❌ | ❌ | ✅ |
| Mobile + Desktop | ❌ | ⚠️ | ✅ |
| Always Free | ⚠️ | ❌ | ✅ |

---

## 📞 Support & Contact

- **Report Phishing:** report@phishsentinel.ai
- **Support Email:** support@phishsentinel.ai
- **Website:** https://phishsentinel.ai

---

## 📝 Statistics

🔴 **91%** of cyber attacks begin with a phishing link
🔴 **₹12,000+ Crores** lost in India due to scams in last 2 years
🔴 **Millions** of people fall for phishing annually

---

## 🎯 Taglines

- "Click smart. Stay safe."
- "Phishing protection for real humans, not experts."
- "Your personal AI cybersecurity shield."
- "Protecting your clicks, one link at a time."

---

## 📜 License

MIT License - Feel free to use, modify, and distribute.

---

## 👨‍💻 Built by PhishSentinel Team

*Protecting the internet, one link at a time.*
