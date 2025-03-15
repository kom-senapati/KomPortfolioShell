let configData = {};

// Load config.json file
async function loadConfigData() {
  try {
    const response = await fetch('src/config/config.json');
    if (!response.ok) {
      throw new Error('Failed to load config data');
    }
    
    configData = await response.json();
    console.log("Config data loaded successfully.");
  } catch (error) {
    console.error("Error loading config data:", error);
    configData = null;
  }
}

loadConfigData();
