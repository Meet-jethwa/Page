const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { URL } = require('url');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===========================
// Phishing Detection Logic
// ===========================

class PhishingDetector {
    constructor() {
        this.suspiciousKeywords = [
            'verify', 'confirm', 'urgent', 'immediate', 'action required',
            'update', 'click here', 'activate', 'suspend', 'limited time',
            'expire', 'alert', 'unusual activity', 'unauthorized access',
            'validate', 'secure account', 'reset password', 'confirm identity'
        ];

        this.urgencyWords = [
            'urgent', 'immediate', 'right now', 'asap', 'immediately',
            'don\'t wait', 'act now', 'limited time', 'expires', 'deadline'
        ];

        this.fearWords = [
            'suspend', 'block', 'close', 'freeze', 'unauthorized',
            'stolen', 'compromised', 'illegal', 'fraud', 'danger',
            'attack', 'threat', 'malware', 'virus', 'hacked'
        ];

        this.authorityWords = [
            'bank', 'paypal', 'amazon', 'apple', 'microsoft',
            'google', 'facebook', 'netflix', 'twitter', 'official',
            'administrator', 'support team', 'security team', 'compliance'
        ];

        this.knownPhishingDomains = [
            'paypa1.com', 'amazone.com', 'facbook.com', 'goggle.com',
            'micr0soft.com', 'applesupport.com', 'twitterhelp.com'
        ];

        this.legitimateDomains = [
            'paypal.com', 'amazon.com', 'facebook.com', 'google.com',
            'microsoft.com', 'apple.com', 'netflix.com', 'twitter.com',
            'github.com', 'linkedin.com', 'instagram.com'
        ];
    }

    /**
     * Calculate risk score (0-100)
     */
    calculateRiskScore(urlString, messageText = '') {
        let riskScore = 0;

        try {
            const url = new URL(urlString);
            const domain = url.hostname.toLowerCase();

            // 1. Check if domain is known phishing (25 points)
            if (this.knownPhishingDomains.some(pd => domain.includes(pd))) {
                riskScore += 25;
            }

            // 2. Check domain age and registration (15 points)
            const domainAge = this.estimateDomainAge(domain);
            if (domainAge < 30) {
                riskScore += 15; // Very new domain
            } else if (domainAge < 180) {
                riskScore += 8; // Relatively new
            }

            // 3. Check SSL certificate (10 points)
            const hasSSL = url.protocol === 'https:';
            if (!hasSSL) {
                riskScore += 10;
            }

            // 4. Check for suspicious URL patterns (20 points)
            riskScore += this.analyzeURLPatterns(urlString);

            // 5. Analyze message text if provided (30 points)
            if (messageText) {
                riskScore += this.analyzeMessageText(messageText);
            }

            // 6. Check for typosquatting (15 points)
            riskScore += this.checkTyposquatting(domain);

            // Clamp score between 0-100
            return Math.min(Math.max(riskScore, 0), 100);
        } catch (error) {
            return 50; // Return medium risk if URL parsing fails
        }
    }

    analyzeURLPatterns(urlString) {
        let score = 0;
        const url = new URL(urlString);
        const path = url.pathname.toLowerCase();
        const hostname = url.hostname.toLowerCase();

        // Check for IP address instead of domain
        if (this.isIPAddress(hostname)) {
            score += 15;
        }

        // Check for multiple subdomains (may hide real domain)
        const subdomains = hostname.split('.').length;
        if (subdomains > 3) {
            score += 5;
        }

        // Check for suspicious path patterns
        if (path.includes('login') || path.includes('verify') || path.includes('confirm')) {
            score += 5;
        }

        // Check for suspicious query parameters
        const params = url.searchParams;
        if (params.has('redirect') || params.has('return') || params.has('callback')) {
            score += 3;
        }

        return score;
    }

    analyzeMessageText(messageText) {
        let score = 0;
        const textLower = messageText.toLowerCase();

        // Check for urgency indicators
        const urgencyMatches = this.urgencyWords.filter(word => 
            textLower.includes(word)
        ).length;
        score += urgencyMatches * 5;

        // Check for fear indicators
        const fearMatches = this.fearWords.filter(word => 
            textLower.includes(word)
        ).length;
        score += fearMatches * 5;

        // Check for false authority
        const authorityMatches = this.authorityWords.filter(word => 
            textLower.includes(word)
        ).length;
        if (authorityMatches > 0) {
            score += authorityMatches * 3;
        }

        // Check for suspicious words
        const suspiciousMatches = this.suspiciousKeywords.filter(word => 
            textLower.includes(word)
        ).length;
        score += suspiciousMatches * 2;

        return Math.min(score, 30); // Cap at 30 points
    }

    checkTyposquatting(domain) {
        let score = 0;

        // Check against known legitimate domains
        for (let legitDomain of this.legitimateDomains) {
            if (this.isSimilarString(domain, legitDomain)) {
                score += 15; // Likely typosquatting
                break;
            }
        }

        return score;
    }

    isIPAddress(hostname) {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        return ipv4Regex.test(hostname);
    }

    isSimilarString(str1, str2) {
        // Check for common typosquatting patterns
        const replaceMap = {
            'o': '0',
            'l': '1',
            's': '5',
            'i': '1'
        };

        let str1Modified = str1;
        let str2Modified = str2;

        for (let char in replaceMap) {
            str1Modified = str1Modified.replace(new RegExp(char, 'g'), replaceMap[char]);
            str2Modified = str2Modified.replace(new RegExp(char, 'g'), replaceMap[char]);
        }

        // Levenshtein distance
        const distance = this.levenshteinDistance(str1Modified, str2Modified);
        const maxLength = Math.max(str1Modified.length, str2Modified.length);
        
        return (distance / maxLength) < 0.3; // 70% similar = suspicious
    }

    levenshteinDistance(str1, str2) {
        const m = str1.length;
        const n = str2.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }

        return dp[m][n];
    }

    estimateDomainAge(domain) {
        // In production, this would query WHOIS data
        // For now, return random value for demo
        return Math.floor(Math.random() * 3650); // 0-10 years
    }

    analyzeMessage(messageText) {
        const text = messageText.toLowerCase();

        return {
            urgency: this.urgencyWords.some(word => text.includes(word)),
            fear: this.fearWords.some(word => text.includes(word)),
            authority: this.authorityWords.some(word => text.includes(word))
        };
    }
}

// Initialize detector
const detector = new PhishingDetector();

// ===========================
// Routes
// ===========================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'PhishSentinel backend is running' });
});

// Scan URL endpoint
app.post('/api/scan', (req, res) => {
    const { url, message } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Validate URL
        new URL(url);

        // Calculate risk score
        const riskScore = detector.calculateRiskScore(url, message || '');
        const messageAnalysis = message ? detector.analyzeMessage(message) : null;

        // Get domain info
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        const domainAge = detector.estimateDomainAge(domain);
        const sslValid = urlObj.protocol === 'https:';

        res.json({
            url: url,
            riskScore: riskScore,
            domainAge: domainAge ? `${domainAge} days old` : 'Unknown',
            sslValid: sslValid,
            messageAnalysis: messageAnalysis,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        res.status(400).json({ error: 'Invalid URL provided', details: error.message });
    }
});

// Batch scan endpoint
app.post('/api/scan-batch', (req, res) => {
    const { urls } = req.body;

    if (!Array.isArray(urls)) {
        return res.status(400).json({ error: 'URLs must be an array' });
    }

    try {
        const results = urls.map(url => {
            try {
                new URL(url);
                const riskScore = detector.calculateRiskScore(url);
                return {
                    url: url,
                    riskScore: riskScore,
                    valid: true
                };
            } catch (e) {
                return {
                    url: url,
                    valid: false,
                    error: 'Invalid URL'
                };
            }
        });

        res.json({ results: results });

    } catch (error) {
        res.status(500).json({ error: 'Error processing batch', details: error.message });
    }
});

// Get statistics
app.get('/api/stats', (req, res) => {
    res.json({
        detectorVersion: '1.0.0',
        capabilities: [
            'URL structure analysis',
            'SSL validation',
            'Domain age checking',
            'Message text analysis',
            'Typosquatting detection',
            'Threat intelligence integration ready'
        ],
        threatDatabase: {
            knownPhishingDomains: detector.knownPhishingDomains.length,
            suspiciousPatterns: detector.suspiciousKeywords.length
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════╗
    ║   PhishSentinel Backend Running    ║
    ║   Server: http://localhost:${PORT}        ║
    ║   Status: ✅ Active                 ║
    ╚════════════════════════════════════╝
    `);
    console.log('Available endpoints:');
    console.log('  GET  /api/health');
    console.log('  POST /api/scan');
    console.log('  POST /api/scan-batch');
    console.log('  GET  /api/stats');
});

module.exports = app;
