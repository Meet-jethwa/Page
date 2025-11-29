// Scroll functions
function scrollToDownload() {
    document.getElementById('download').scrollIntoView({ behavior: 'smooth' });
}

function scrollToHowItWorks() {
    document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
}

// URL Scanner function
async function scanURL() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const resultBox = document.getElementById('result');
    const loadingBox = document.getElementById('loading');

    // Validation
    if (!urlInput) {
        alert('Please enter a URL');
        return;
    }

    // Basic URL validation
    try {
        new URL(urlInput);
    } catch (e) {
        alert('Please enter a valid URL');
        return;
    }

    // Show loading, hide result
    loadingBox.style.display = 'block';
    resultBox.style.display = 'none';

    try {
        // Call the backend API
        const response = await fetch('http://localhost:5000/api/scan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();

        // Hide loading
        loadingBox.style.display = 'none';

        // Display results
        displayResults(data);
        resultBox.style.display = 'block';

    } catch (error) {
        loadingBox.style.display = 'none';
        alert('Error scanning URL. Make sure the backend server is running on port 5000.');
        console.error('Error:', error);
    }
}

function displayResults(data) {
    const resultBox = document.getElementById('result');
    const resultStatus = document.getElementById('resultStatus');
    const resultMessage = document.getElementById('resultMessage');
    const resultDetails = document.getElementById('resultDetails');

    // Clear previous classes
    resultBox.classList.remove('safe', 'suspicious', 'dangerous');

    // Determine status
    const riskScore = data.riskScore || 0;
    let status, message, emoji, className;

    if (riskScore < 30) {
        status = '✅ SAFE';
        message = 'This link appears to be legitimate.';
        emoji = '✅';
        className = 'safe';
    } else if (riskScore < 70) {
        status = '⚠️ SUSPICIOUS';
        message = 'This link has some characteristics of phishing. Proceed with caution.';
        emoji = '⚠️';
        className = 'suspicious';
    } else {
        status = '🚨 DANGEROUS';
        message = 'This link is likely a phishing attempt. DO NOT click it!';
        emoji = '🚨';
        className = 'dangerous';
    }

    resultBox.classList.add(className);
    resultStatus.innerHTML = status;
    resultMessage.innerHTML = message;

    // Display detailed analysis
    let detailsHTML = `
        <div style="margin-top: 1rem;">
            <h4>Detailed Analysis:</h4>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Risk Score:</strong> ${riskScore}/100</li>
                <li><strong>Domain Age:</strong> ${data.domainAge || 'Unknown'}</li>
                <li><strong>SSL Valid:</strong> ${data.sslValid ? '✅ Yes' : '❌ No'}</li>
    `;

    if (data.messageAnalysis) {
        detailsHTML += `
                <li><strong>Message Contains Urgency:</strong> ${data.messageAnalysis.urgency ? '⚠️ Yes' : '✅ No'}</li>
                <li><strong>Message Contains Fear:</strong> ${data.messageAnalysis.fear ? '⚠️ Yes' : '✅ No'}</li>
                <li><strong>Message Claims Authority:</strong> ${data.messageAnalysis.authority ? '⚠️ Yes' : '✅ No'}</li>
        `;
    }

    detailsHTML += `
                <li><strong>URL:</strong> <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">${data.url || 'N/A'}</code></li>
            </ul>
        </div>
    `;

    resultDetails.innerHTML = detailsHTML;
}

// Allow Enter key to scan
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        urlInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                scanURL();
            }
        });
    }
});
