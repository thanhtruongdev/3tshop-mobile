const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

// Ensure we're always using the project root directory
const projectRoot = __dirname;
 
const config = getDefaultConfig(projectRoot);
 
module.exports = withNativeWind(config, { input: './global.css' });