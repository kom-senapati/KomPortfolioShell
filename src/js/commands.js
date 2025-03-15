let specialCommands = {};
let aboutCommands = {};
let socials = {};
let header = "Welcome to Portfolio shell,\nType help to see all the commands";
let title = "Kom | PorfolioShell";

// Load special commands from JSON file
fetch('src/config/commands.json')
  .then(response => response.json())
  .then(data => {
    // Set title if provided
    if (data.title) {
      title = data.title;
      document.title = title;
    }
    
    // Set description/header if provided
    if (data.description) {
      header = data.description;
    }
    
    // Set special commands
    if (data.specialCommands) {
      specialCommands = data.specialCommands;
      
      // Add special commands to aboutCommands for help display
      for (let cmd in specialCommands) {
        aboutCommands[cmd] = specialCommands[cmd].description;
      }
    }
    
    // Set socials if provided
    if (data.socials) {
      socials = data.socials;
    }
    
    // Display header after loading
    displayOutput(header);
  })
  .catch(error => {
    console.error('Error loading commands.json:', error);
    displayOutput(header);
  });
