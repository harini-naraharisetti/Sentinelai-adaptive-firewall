import { URLScanResult } from '../types/security';

export function analyzeUrlString(rawInput: string): URLScanResult {
  const cleanInput = (rawInput || 'https://example-login-security.com/verify').trim();
  let parsedUrl: URL | null = null;
  let hasHttps = false;
  let hostname = cleanInput;
  let pathname = '';
  
  try {
    const withProto = cleanInput.startsWith('http://') || cleanInput.startsWith('https://')
      ? cleanInput
      : `http://${cleanInput}`;
    parsedUrl = new URL(withProto);
    hasHttps = parsedUrl.protocol === 'https:';
    hostname = parsedUrl.hostname;
    pathname = parsedUrl.pathname;
  } catch {
    hostname = cleanInput.split('/')[0];
  }

  const indicators: URLScanResult['indicators'] = [];
  let riskScore = 15;
  
  // 1. HTTPS Check
  if (hasHttps) {
    indicators.push({
      label: 'HTTPS Protocol Present',
      type: 'safe',
      description: 'Connection uses SSL/TLS certificate layer.'
    });
  } else {
    riskScore += 25;
    indicators.push({
      label: 'Missing HTTPS Encryption',
      type: 'warning',
      description: 'Cleartext HTTP connection vulnerable to adversary sniffing.'
    });
  }

  // 2. IP-based URL check
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const hasIpHostname = ipRegex.test(hostname);
  if (hasIpHostname) {
    riskScore += 35;
    indicators.push({
      label: 'IP-based URL Hostname',
      type: 'critical',
      description: 'Host connects directly via raw IP address instead of registered domain.'
    });
  }

  // 3. Number of Subdomains & Domain Length
  const dotCount = (hostname.match(/\./g) || []).length;
  const subdomains = hostname.split('.');
  const subdomainCount = Math.max(0, subdomains.length - 2);

  if (subdomainCount >= 3) {
    riskScore += 25;
    indicators.push({
      label: 'Multiple Subdomains Detected',
      type: 'critical',
      description: `Domain contains ${subdomainCount} subdomains, typical of phishing redirection layers.`
    });
  } else if (subdomainCount >= 2) {
    riskScore += 15;
    indicators.push({
      label: 'Elevated Subdomain Count',
      type: 'warning',
      description: 'Unusual multi-tier domain hierarchy.'
    });
  } else {
    indicators.push({
      label: 'Standard Subdomain Hierarchy',
      type: 'safe',
      description: 'Standard domain depth.'
    });
  }

  // Domain length check
  if (hostname.length > 25) {
    riskScore += 15;
    indicators.push({
      label: 'Long Domain String',
      type: 'warning',
      description: `Domain name length (${hostname.length} chars) exceeds standard branding limits.`
    });
  }

  // 4. Suspicious Keywords
  const suspiciousKeywordsList = [
    'login', 'verify', 'account', 'secure', 'bank', 'auth', 'update', 'password',
    'wallet', 'crypto', 'free', 'support', 'billing', 'portal', 'token', 'confirm',
    'suspended', 'security-alert', 'recover', 'webscr', 'signin', 'service-desk', 'security'
  ];
  
  const lowerUrl = cleanInput.toLowerCase();
  const detectedKeywords = suspiciousKeywordsList.filter(kw => lowerUrl.includes(kw));

  if (detectedKeywords.length >= 2) {
    riskScore += 28;
    indicators.push({
      label: `Suspicious Keywords (${detectedKeywords.slice(0, 3).join(', ')})`,
      type: 'critical',
      description: 'Multiple authentication/security keywords combined in URL string.'
    });
  } else if (detectedKeywords.length === 1) {
    riskScore += 14;
    indicators.push({
      label: `Suspicious Keyword (${detectedKeywords[0]})`,
      type: 'warning',
      description: 'URL contains sensitive credential or verification phrasing.'
    });
  }

  // 5. Brand Impersonation
  const brands = ['paypal', 'microsoft', 'google', 'apple', 'amazon', 'chase', 'wellsfargo', 'coinbase', 'binance', 'netflix', 'facebook', 'meta'];
  const matchedBrand = brands.find(b => lowerUrl.includes(b) && !hostname.endsWith(`${b}.com`));
  if (matchedBrand) {
    riskScore += 35;
    indicators.push({
      label: `Brand Impersonation (${matchedBrand.toUpperCase()})`,
      type: 'critical',
      description: `Domain appears to mimic legitimate ${matchedBrand} authentication portals.`
    });
  }

  // 6. Suspicious TLDs
  const highRiskTLDs = ['.xyz', '.top', '.tk', '.zip', '.work', '.click', '.buzz', '.country', '.gq', '.cf', '.ga', '.ml', '.rest'];
  const hasHighRiskTLD = highRiskTLDs.some(tld => hostname.toLowerCase().endsWith(tld));
  let tldRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

  if (hasHighRiskTLD) {
    riskScore += 20;
    tldRisk = 'HIGH';
    indicators.push({
      label: 'Suspicious TLD Extension',
      type: 'critical',
      description: 'Domain extension is heavily associated with low-reputation spoofing domains.'
    });
  }

  // 7. Special Characters & Obfuscation
  const specialChars = (cleanInput.match(/[@%&=#_\-~]/g) || []).length;
  if (specialChars > 4) {
    riskScore += 15;
    indicators.push({
      label: 'Special Characters & Encoding',
      type: 'warning',
      description: `URL contains ${specialChars} non-alphanumeric punctuation marks.`
    });
  }

  // 8. URL Length
  if (cleanInput.length > 70) {
    riskScore += 12;
    indicators.push({
      label: 'Long URL Length',
      type: 'warning',
      description: `Total URL length (${cleanInput.length} chars) suggests embedded payloads or query stuffing.`
    });
  }

  // 9. Shannon Entropy calculation
  const charFreq: Record<string, number> = {};
  for (const c of hostname) {
    charFreq[c] = (charFreq[c] || 0) + 1;
  }
  let domainEntropy = 0;
  for (const c in charFreq) {
    const p = charFreq[c] / hostname.length;
    domainEntropy -= p * Math.log2(p);
  }
  domainEntropy = parseFloat(domainEntropy.toFixed(2));

  if (domainEntropy > 3.4) {
    riskScore += 18;
    indicators.push({
      label: 'High Domain Entropy',
      type: 'critical',
      description: `Shannon entropy is ${domainEntropy} bits (indicates algorithmically generated domain).`
    });
  }

  // Final score clamping
  riskScore = Math.min(98, Math.max(8, riskScore));

  let verdict: 'SAFE' | 'SUSPICIOUS' | 'HIGH RISK' = 'SAFE';
  let recommendation = 'ALLOW: Verified safe against simulated heuristic security checks.';
  
  if (riskScore >= 71) {
    verdict = 'HIGH RISK';
    recommendation = 'DO NOT VISIT: High probability of credential harvesting and phishing impersonation. Simulated automated block recommended.';
  } else if (riskScore >= 31) {
    verdict = 'SUSPICIOUS';
    recommendation = 'MONITOR: Elevated risk indicators detected. SOC analyst review and endpoint isolation recommended.';
  }

  return {
    id: `URL-SCAN-${Date.now().toString().slice(-6)}`,
    url: cleanInput,
    timestamp: new Date().toLocaleTimeString(),
    riskScore,
    verdict,
    confidence: Math.min(96, Math.max(80, 65 + Math.floor(indicators.length * 6))),
    indicators,
    analysisDetails: {
      hasHttps,
      domainEntropy,
      subdomainCount,
      dotCount,
      hasIpHostname,
      suspiciousKeywordsDetected: detectedKeywords,
      urlLength: cleanInput.length,
      tldRisk,
      brandImpersonation: matchedBrand
    },
    recommendation
  };
}

export const analyzeUrlHeuristics = analyzeUrlString;

export const PRESET_URLS = {
  exampleSpec: 'https://example-login-security.com/verify',
  safe: 'https://internal-service.corp.company.internal/dashboard',
  suspicious: 'http://cdn-update.server-traffic-test.net:8080/check-token',
  highRisk: 'https://secure-login-bank-verify.fake-auth-update.xyz/account/login?token=x99182'
};
