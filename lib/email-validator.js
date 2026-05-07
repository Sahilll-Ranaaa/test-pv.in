/**
 * Advanced Email Validation Utility
 * Filters out disposable, garbage, and obvious test emails.
 */

const DISPOSABLE_DOMAINS = [
  "mailinator.com", "guerrillamail.com", "tempmail.com", "10minutemail.com", 
  "throwawaymail.com", "getnada.com", "yopmail.com", "sharklasers.com",
  "dispostable.com", "maildrop.cc", "mail-temporaire.fr", "temp-mail.org",
  "fakeinbox.com", "tempmailaddress.com", "trashmail.com", "dropmail.me"
];

const GARBAGE_PATTERNS = [
  /^test@/i,
  /^admin@/i,
  /^example@/i,
  /^asdf@/i,
  /^qwerty@/i,
  /^abc@/i,
  /@test\.com$/i,
  /@example\.com$/i,
  /@abc\.com$/i
];

const MAJOR_PROVIDERS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "pvadvisory.in"];

/**
 * Calculates the similarity between two strings
 */
const getLevenshteinDistance = (s1, s2) => {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};

/**
 * Validates if an email is likely real and professional.
 * @param {string} email 
 * @returns {{isValid: boolean, error?: string}}
 */
export const validateProfessionalEmail = (email) => {
  if (!email) return { isValid: false, error: "Email is required" };
  
  const cleanEmail = email.toLowerCase().trim();
  
  // 1. Basic Regex
  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRegex.test(cleanEmail)) {
    return { isValid: false, error: "Invalid email format" };
  }

  const [localPart, domain] = cleanEmail.split('@');

  // 2. Check for Similarity/Typos in Major Providers
  for (const provider of MAJOR_PROVIDERS) {
    const distance = getLevenshteinDistance(domain, provider);
    // If the domain is 1 or 2 characters different from a major provider, it's likely a typo
    if (distance > 0 && distance <= 2) {
      return { isValid: false, error: `Did you mean ${provider}?` };
    }
  }

  // 3. Check Garbage Patterns in local part
  for (const pattern of GARBAGE_PATTERNS) {
    if (pattern.test(cleanEmail)) {
      return { isValid: false, error: "Please use a professional email address" };
    }
  }

  // 4. Check Disposable Domains
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { isValid: false, error: "Disposable email addresses are not allowed" };
  }

  // 5. Strict Domain Validation (check for dots and TLD length)
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  
  if (domainParts.length < 2 || tld.length < 2) {
    return { isValid: false, error: "Invalid domain extension" };
  }

  // 6. Block suspicious keywords in domain
  const suspiciousKeywords = ['temp', 'fake', 'test', 'trash', 'garbage', 'dummy'];
  if (suspiciousKeywords.some(keyword => domain.includes(keyword))) {
    return { isValid: false, error: "Please use a legitimate email domain" };
  }

  return { isValid: true };
};
