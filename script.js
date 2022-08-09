var body = document.querySelector("body");

let i = 0;
setTimeout(demo, 1000);


var directory = {};

fetch("./directory.json")
    .then(response => response.json())
    .then(data => directory = data);

class Command {
        constructor(name, desc, func) {
            this.name = name;
            this.desc = desc;
            this.func = func;
        }
        run() {
            this.func();
        }
    }

var commands = [
    new Command("cd", "Changes the current directory.", cd),
    new Command("cls", "Clears the screen.", cls),
    new Command("help", "Provides Help information for commands.", help),
    new Command("ls", "Displays a list of files and subdirectories in the directory.", ls),
];


function getPointer() {
    return document.querySelector(".active");
}

function makePointer(newlines = 2) {
    let active = getPointer();
    if (active) {
        active.innerHTML += "<br>".repeat(newlines);
        active.classList.remove("active");
    }

    let pointer = document.createElement("code");
    pointer.classList.add("pointer", "active");

    body.appendChild(pointer);

    return;
}


function demo(text = "help") {
    let pointer = getPointer();

    if (i < text.length) {
        pointer.innerHTML += text.charAt(i);
        i++
        setTimeout(demo, 100);
        return;
    }

    setTimeout(enter, 500)
}


document.onkeydown = function (event) {
    if (!getPointer()) {
        return;
    }
    if (event.key === "Enter") {
        enter();
        return;
    }

    if (event.key === "Backspace") {
        backspace();
        return;
    }

    if (event.key.length !== 1) {
        return;
    }

    let pointer = getPointer();
    pointer.innerHTML += event.key;

    return;
}

function enter() {
    let pointer = getPointer();

    let input = pointer.innerHTML;

    pointer.innerHTML += "<br>";

    // empty input
    if (input.trim() === "") {
        makePointer(0);
        return;
    }

    for (let command of commands) {
        if (command.name === input.trim().toLowerCase()) {
            command.run();
            return;
        }
    }

    pointer.innerHTML += `'${input}' is not recognized as an internal or external command,<br>operable program or batch file.`;
    makePointer();
}

function backspace() {
    let pointer = getPointer();
    let input = pointer.innerHTML;
    pointer.innerHTML = input.substring(0, input.length - 1);

}



function help() {
    let pointer = getPointer();
    let pre = document.createElement("pre");

    for (let command of commands) {
        // capitalize command name

        pre.innerHTML += `${command.name.toUpperCase()} &#9; ${command.desc}<br>`;
    }

    pointer.appendChild(pre);

    makePointer(1);
}

function cls() {
    body.innerHTML = "<br>";
    makePointer();

}

var current_directory = "\\";

function ls() {
    let pointer = getPointer();
    pointer.innerHTML += directory[current_directory][0].name;
    makePointer();

}

function cd() {
    let pointer = getPointer();
    pointer.innerHTML += "cdtest";
    makePointer();

}