#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to decode base64 encoded google-services.json before EAS build
 * Usage: node scripts/decode-google-services.js
 */

const GOOGLE_SERVICES_JSON = process.env.GOOGLE_SERVICES_JSON;
const OUTPUT_PATH = path.join(__dirname, '../android/app/google-services.json');

if (!GOOGLE_SERVICES_JSON) {
  console.error('❌ Error: GOOGLE_SERVICES_JSON environment variable is not set');
  console.log('Please set the environment variable in EAS secrets:');
  console.log('eas secret:create --scope project --name GOOGLE_SERVICES_JSON --value <base64-string>');
  process.exit(1);
}

try {
  // Decode base64 string to buffer
  const decodedContent = Buffer.from(GOOGLE_SERVICES_JSON, 'base64').toString('utf-8');
  
  // Parse JSON to validate
  JSON.parse(decodedContent);
  
  // Ensure directory exists
  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write to file
  fs.writeFileSync(OUTPUT_PATH, decodedContent, 'utf-8');
  
  console.log('✅ Successfully decoded google-services.json');
  console.log(`📁 File saved to: ${OUTPUT_PATH}`);
} catch (error) {
  console.error('❌ Error decoding google-services.json:', error.message);
  process.exit(1);
}
