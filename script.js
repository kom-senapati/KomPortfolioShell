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
    clear: "Clear terminal. 🧹 Keep it tidy! 😊",
};


const socials = {
    github: `<a href="https://github.com/kom-senapati" target="_blank" class="link">github.com/kom-senapati</a>`,
    linkedin: `<a href="https://www.linkedin.com/in/kom-senapati/" target="_blank" class="link">linkedin.com/in/kom-senapati</a>`,
    twitter: `<a href="https://twitter.com/kom_senapati" target="_blank" class="link">twitter.com/kom_senapati</a>`
};

commandLine.focus();

terminal.addEventListener("click", function () {
    commandLine.focus();
});

commandLine.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const command = commandLine.value;
        const output = processCommand(command);
        if (output) {
            displayCommand(command);
            displayOutput(output);
        }
        commandLine.value = "";
        scrollToBottom()
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
        }).catch(error => {
            console.error('Error displaying output:', error);
        });
    } else {
        const outputElement = document.createElement('p');
        outputElement.classList.add('output');
        outputElement.style.textIndent = "2em";
        outputElement.innerHTML = output;
        terminalOutput.appendChild(outputElement);
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
    }
    else if (commands.hasOwnProperty(command)) {
        return commands[command];
    } else {
        return `${command}: command not found`;
    }
}

function clearTerminal() {
    terminalOutput.innerHTML = "";
}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}