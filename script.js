const terminalOutput = document.getElementById("terminal-output");
const commandLine = document.getElementById("command-line");
const terminal = document.getElementById("terminal");

// Configuration variables
let specialCommands = {};
let aboutCommands = {};
let socials = {};
let header = "Welcome to Portfolio shell,\nType help to see all the commands";
let title = "Kom | PorfolioShell";

// General commands implementation
const generalCommands = {
  clear: {
    execute: () => {
      clearTerminal();
      return null;
    },
    description: "Clear terminal. 🧹 Keep it tidy! 😊"
  },
  echo: {
    execute: (args) => {
      return args.join(" ");
    },
    description: "Echo back your text. 🔊 Like shouting in a canyon! 🏔️"
  },
  date: {
    execute: () => {
      return new Date().toString();
    },
    description: "Display current date and time. ⏰ Time flies! ⏱️"
  },
  ls: {
    execute: () => {
      return "commands.json\nindex.html\nREADME.md\nscript.js\nstyles.css\nterminal.png";
    },
    description: "List files in the directory. 📁 What's in here? 🔍"
  },
  pwd: {
    execute: () => {
      return "/home/visitor/kom";
    },
    description: "Print working directory. 📍 Where am I? 🗺️"
  },
  cat: {
    execute: (args) => {
      if (args.length === 0) {
        return "Usage: cat [filename]";
      }
      
      const filename = args[0];
      const files = {
        "readme.md": "# KomPortfolioShell\n\nA terminal-like portfolio page for Kom Senapati.",
        "commands.json": "This file contains all the special commands for this terminal."
      };
      
      if (files[filename.toLowerCase()]) {
        return files[filename.toLowerCase()];
      } else {
        return `cat: ${filename}: No such file or directory`;
      }
    },
    description: "Display file contents. 📄 What's inside? 👀"
  },
  man: {
    execute: (args) => {
      if (args.length === 0) {
        return "What manual page do you want? Try 'man [command]'";
      }
      
      const command = args[0];
      
      if (generalCommands[command]) {
        return `NAME\n    ${command} - ${generalCommands[command].description}\n\nDESCRIPTION\n    ${getManualDescription(command)}`;
      } else if (specialCommands[command]) {
        return `NAME\n    ${command} - ${specialCommands[command].description}\n\nDESCRIPTION\n    A special command that provides information about Kom's portfolio.`;
      } else {
        return `No manual entry for ${command}`;
      }
    },
    description: "Display manual for a command. 📚 Need help? 🆘"
  },
  uname: {
    execute: () => {
      return "KomShell";
    },
    description: "Print system information. 💻 What am I running on? 🖥️"
  },
  history: {
    execute: () => {
      return "Not implemented";
    },
    description: "Show command history. 📜 What did I type before? 🔍"
  },
  help: {
    execute: () => {
      let output = "<table>";
      // Add general commands
      for (let cmd in generalCommands) {
        output += `<tr><td class="available-command">${cmd}</td><td class="command-description">${generalCommands[cmd].description}</td></tr>`;
      }
      // Add special commands
      for (let cmd in specialCommands) {
        output += `<tr><td class="available-command">${cmd}</td><td class="command-description">${specialCommands[cmd].description}</td></tr>`;
      }
      output += "</table>";
      return output;
    },
    description: "You know what this does. 🙄 Want some hints? 😏"
  },
  banner: {
    execute: () => {
      return header;
    },
    description: "Display the welcome banner. 👋 Hello again! 🎉"
  }
};

// Helper function for man command
function getManualDescription(command) {
  const manuals = {
    clear: "Clear the terminal screen.",
    echo: "Display a line of text. Usage: echo [text]",
    date: "Display the current date and time.",
    ls: "List directory contents.",
    pwd: "Print the name of the current working directory.",
    cat: "Concatenate and display file contents. Usage: cat [filename]",
    man: "Display manual page for a command. Usage: man [command]",
    uname: "Print system information.",
    history: "Display the command history list.",
    help: "Display help information about available commands.",
    banner: "Display the welcome banner."
  };
  
  return manuals[command] || "No detailed description available.";
}

// Load special commands from JSON file
fetch('commands.json')
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

const themes = {
  default: {
    "--background-color": "#1F2430",
    "--foreground-color": "#FFA759",
    "--red-color": "#FF3333",
    "--green-color": "#BAE67E",
    "--yellow-color": "#FFA759",
    "--blue-color": "#73D0FF",
    "--purple-color": "#D4BFFF",
    "--cyan-color": "#95E6CB",
    "--white-color": "#CBCCC6",
    "--bright-black-color": "#707A8C",
  },
  dracula: {
    "--background-color": "#282a36",
    "--foreground-color": "#f8f8f2",
    "--red-color": "#ff5555",
    "--green-color": "#50fa7b",
    "--yellow-color": "#f1fa8c",
    "--blue-color": "#6272a4",
    "--purple-color": "#bd93f9",
    "--cyan-color": "#8be9fd",
    "--white-color": "#f8f8f2",
    "--bright-black-color": "#44475a",
  },
  ayu: {
    "--background-color": "#0f1419",
    "--foreground-color": "#e6e1cf",
    "--red-color": "#ff3333",
    "--green-color": "#b8cc52",
    "--yellow-color": "#e7c547",
    "--blue-color": "#6CA0E6",
    "--purple-color": "#C578DD",
    "--cyan-color": "#80CBC4",
    "--white-color": "#C1C2D3",
    "--bright-black-color": "#7A8298",
  },
  light: {
    "--background-color": "#ffffff",
    "--foreground-color": "#000000",
    "--red-color": "#ff0000",
    "--green-color": "#00ff00",
    "--yellow-color": "#ffff00",
    "--blue-color": "#0000ff",
    "--purple-color": "#ff00ff",
    "--cyan-color": "#00ffff",
    "--white-color": "#ffffff",
    "--bright-black-color": "#808080",
  },
  dark: {
    "--background-color": "#000000",
    "--foreground-color": "#ffffff",
    "--red-color": "#ff0000",
    "--green-color": "#00ff00",
    "--yellow-color": "#ffff00",
    "--blue-color": "#0000ff",
    "--purple-color": "#ff00ff",
    "--cyan-color": "#00ffff",
    "--white-color": "#ffffff",
    "--bright-black-color": "#808080",
  },
};

window.addEventListener("load", (event) => {
  setTheme(localStorage.getItem("terminal_theme") ?? "default");
});

// Header is now displayed after loading commands.json
commandLine.focus();

terminal.addEventListener("click", function () {
  commandLine.focus();
});

commandLine.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const command = commandLine.value;
    const output = processCommand(command.toLowerCase().trim());
    if (output) {
      displayCommand(command);
      displayOutput(output);
    }
    commandLine.value = "";
  }
});

function displayCommand(command) {
  const commandElement = document.createElement("p");
  commandElement.innerHTML = `<span id="prompt">visitor@shell:~/kom $</span> <span class="command">${command}</span>`;
  terminalOutput.appendChild(commandElement);
}

function displayOutput(output) {
  if (output instanceof Promise) {
    output
      .then((data) => {
        const outputElement = document.createElement("pre");
        outputElement.classList.add("output");
        outputElement.textContent = data;
        terminalOutput.appendChild(outputElement);
        scrollToBottom();
      })
      .catch((error) => {
        console.error("Error displaying output:", error);
      });
  } else {
    const outputElement = document.createElement("p");
    outputElement.classList.add("output");
    outputElement.innerHTML = output;
    terminalOutput.appendChild(outputElement);
    scrollToBottom();
  }
}

function processCommand(commandInput) {
  if (commandInput === "") return "<hr hidden />";
  
  // Parse command and arguments
  const parts = commandInput.split(" ");
  const command = parts[0];
  const args = parts.slice(1);
  
  // Check if it's a general command
  if (generalCommands.hasOwnProperty(command)) {
    return generalCommands[command].execute(args);
  } 
  // Check if it's a special command
  else if (specialCommands.hasOwnProperty(command)) {
    const specialCmd = specialCommands[command];
    
    // Handle function-based special commands
    if (specialCmd.isFunction) {
      switch (specialCmd.output) {
        case "social":
          let output = "<table>";
          for (let social in socials) {
            output += `<tr><td class="name">${social}</td><td class="link">${socials[social]}</td></tr>`;
          }
          output += "</table>";
          return output;
        case "joke":
          return fetchJoke();
        case "theme":
          if (args.length === 0) {
            let availableThemesMsg = "Available themes: ";
            availableThemesMsg += Object.keys(themes).join(", ");
            availableThemesMsg += '. Type "theme THEME" to change theme to THEME.';
            return availableThemesMsg;
          } else {
            return setTheme(args[0]);
          }
        default:
          return `Error: Function ${specialCmd.output} not implemented`;
      }
    } 
    // Return static output for non-function special commands
    else {
      return specialCmd.output;
    }
  } 
  // Handle unknown commands
  else {
    return `${command}: command not found`;
  }
}

function clearTerminal() {
  terminalOutput.innerHTML = "";
  displayOutput(header);
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

async function fetchJoke() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
    );
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error("Error fetching joke:", error);
    return "Failed to fetch joke. 😕";
  }
}

function setTheme(theme) {
  const selectedTheme = themes[theme];
  if (selectedTheme) {
    for (const [property, value] of Object.entries(selectedTheme)) {
      document.documentElement.style.setProperty(property, value);
    }
    if (theme !== "default") localStorage.setItem("terminal_theme", theme);
    else localStorage.removeItem("terminal_theme");
    return `Theme set to ${theme}.`;
  } else {
    return `Theme ${theme} not found.`;
  }
}
