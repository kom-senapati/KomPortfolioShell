const terminalOutput = document.getElementById("terminal-output");
const commandLine = document.getElementById("command-line");
const terminal = document.getElementById("terminal");

const commands = {
    whois: "I am a CS engineering student studying in Outr BBSR. 🎓 I'm also a python enthusiast 🐍 and a tech explorer 🕵️‍♂️💻",
    whoami: "You are a visitor to our terminal. We will soon find out who you are. 🕵️‍♂️ But for now, enjoy the mystery! 🕵️‍♀️",
    projects: "Project Gallery will be made soon! 🚧 Meanwhile, why not imagine amazing projects? 🌟",
    contact: "Contact me at komnoob123@gmail.com 📧 Just don't spam me with cat pictures! 🐱",
};

const aboutCommands = {
    help: "You know what this does. 🙄 Want some hints? 😏",
    whois: "Who is kom? 🤔 The brains behind this terminal! 💡",
    whoami: "Who are you? 🧐 Dive into self-discovery! 🌊",
    social: "Connect with me. 🌐 Let's network! 🤝",
    projects: "Check out projects. 💻 Prepare to be amazed! ✨",
    joke: "Get a programming joke. 😄",
    theme: "Change terminal theme. 🎨",
    clear: "Clear terminal. 🧹 Keep it tidy! 😊",
};


const socials = {
    github: `<a href="https://github.com/kom-senapati" target="_blank" class="link">github.com/kom-senapati</a>`,
    linkedin: `<a href="https://www.linkedin.com/in/kom-senapati/" target="_blank" class="link">linkedin.com/in/kom-senapati</a>`,
    twitter: `<a href="https://twitter.com/kom_senapati" target="_blank" class="link">twitter.com/kom_senapati</a>`
};

const header = "Welcome to Portfolio shell,\nType help to see all the commands";

const themes = {
    default: {
        '--background-color': '#1F2430',
        '--foreground-color': '#FFA759',
        '--red-color': '#FF3333',
        '--green-color': '#BAE67E',
        '--yellow-color': '#FFA759',
        '--blue-color': '#73D0FF',
        '--purple-color': '#D4BFFF',
        '--cyan-color': '#95E6CB',
        '--white-color': '#CBCCC6',
        '--bright-black-color': '#707A8C'
    },
    dracula: {
        '--background-color': '#282a36',
        '--foreground-color': '#f8f8f2',
        '--red-color': '#ff5555',
        '--green-color': '#50fa7b',
        '--yellow-color': '#f1fa8c',
        '--blue-color': '#6272a4',
        '--purple-color': '#bd93f9',
        '--cyan-color': '#8be9fd',
        '--white-color': '#f8f8f2',
        '--bright-black-color': '#44475a'
    },
    ayu: {
        '--background-color': '#0f1419',
        '--foreground-color': '#e6e1cf',
        '--red-color': '#ff3333',
        '--green-color': '#b8cc52',
        '--yellow-color': '#e7c547',
        '--blue-color': '#6CA0E6',
        '--purple-color': '#C578DD',
        '--cyan-color': '#80CBC4',
        '--white-color': '#C1C2D3',
        '--bright-black-color': '#7A8298'
    },
    light: {
        '--background-color': '#ffffff',
        '--foreground-color': '#000000',
        '--red-color': '#ff0000',
        '--green-color': '#00ff00',
        '--yellow-color': '#ffff00',
        '--blue-color': '#0000ff',
        '--purple-color': '#ff00ff',
        '--cyan-color': '#00ffff',
        '--white-color': '#ffffff',
        '--bright-black-color': '#808080'
    },
    dark: {
        '--background-color': '#000000',
        '--foreground-color': '#ffffff',
        '--red-color': '#ff0000',
        '--green-color': '#00ff00',
        '--yellow-color': '#ffff00',
        '--blue-color': '#0000ff',
        '--purple-color': '#ff00ff',
        '--cyan-color': '#00ffff',
        '--white-color': '#ffffff',
        '--bright-black-color': '#808080'
    }
};

window.addEventListener("load", (event) => {
    setTheme(localStorage.getItem("terminal_theme"))
});


displayOutput(header);
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
    const commandElement = document.createElement('p');
    commandElement.innerHTML = `<span id="prompt">visitor@shell:~/kom $</span> <span class="command">${command}</span>`;
    terminalOutput.appendChild(commandElement);
}

function displayOutput(output) {
    if (output instanceof Promise) {
        output.then(data => {
            const outputElement = document.createElement('pre');
            outputElement.classList.add('output');
            outputElement.textContent = data;
            terminalOutput.appendChild(outputElement);
            scrollToBottom();
        }).catch(error => {
            console.error('Error displaying output:', error);
        });
    } else {
        const outputElement = document.createElement('p');
        outputElement.classList.add('output');
        outputElement.innerHTML = output;
        terminalOutput.appendChild(outputElement);
        scrollToBottom();
    }
}


function processCommand(command) {
    if (command === 'clear') {
        clearTerminal();
        return null;
    } else if (command === 'help') {
        let output = '<table>';
        for (let cmd in aboutCommands) {
            output += `<tr><td class="available-command">${cmd}</td><td class="command-description">${aboutCommands[cmd]}</td></tr>`;
        }
        output += '</table>';
        return output;
    } else if (command === 'social') {
        let output = '<table>';
        for (let social in socials) {
            output += `<tr><td class="name">${social}</td><td class="link">${socials[social]}</td></tr>`;
        }
        output += '</table>';
        return output;
    } else if (command === 'banner') {
        return ``
    } else if (command === 'joke') {
        return fetchJoke();
    } else if (command.startsWith('theme')) {
        if (command === 'theme') {
            let availableThemesMsg = 'Available themes: ';
            availableThemesMsg += Object.keys(themes).join(', ');
            availableThemesMsg += '. Type "theme THEME" to change theme to THEME.';
            return availableThemesMsg;
        } else {
            const selectedTheme = command.split(' ')[1];
            return setTheme(selectedTheme);
        }
    } else if (commands.hasOwnProperty(command)) {
        return commands[command];
    } else {
        return `${command}: command not found`;
    }
}

function clearTerminal() {
    terminalOutput.innerHTML = "";
    displayOutput(header)
}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

async function fetchJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
        const data = await response.json();
        return data.joke;
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Failed to fetch joke. 😕';
    }
}

function setTheme(theme) {
    const selectedTheme = themes[theme];
    if (selectedTheme) {
        for (const [property, value] of Object.entries(selectedTheme)) {
            document.documentElement.style.setProperty(property, value);
        }
        localStorage.setItem("terminal_theme", theme);
        return `Theme set to ${theme}.`;
    } else {
        return `Theme ${theme} not found.`;
    }
}