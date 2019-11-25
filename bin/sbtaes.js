#!/usr/bin/env node

var readlineSync = require('readline-sync');
var { aes } = require('@xiaoerr/crypt');
var colors = require('colors');


var pwd = readlineSync.question('please input aes password: '.yellow, {
    hideEchoBack: true
});

var aesIns = aes(pwd);

var cmd;

while (true) {
    // input
    cmd = readlineSync.question("> ");

    // trim
    cmd = cmd.trim();

    if (cmd === "") {
        continue;
    }

    // quit
    if(cmd === "quit" || cmd === "exit") {
        break;
    }

    if (cmd === 'help') {
        console.log('help'.magenta + '\t\t\tShow all operational commands' + '\n' +
            'show password'.magenta + '\t\tShow current AES password' + '\n' +
            'change password'.magenta + '\t\tModify the current AES password' + '\n' +
            'en [content]'.magenta + '\t\tAES encrypts current content' + '\n' +
            'de [content]'.magenta + '\t\tAES decrypts the current content' + '\n' +
            'clear'.magenta + '\t\t\tClear console content' + '\n' +
            'quit or exit'.magenta + '\t\tExit the app'
        );
        continue;
    }

    // show password
    if (cmd === 'show password') {
        console.log(pwd.gray);
        continue;
    }

    // change password
    if (cmd === 'change password') {
        pwd = readlineSync.question('please input aes password: '.yellow, {
            hideEchoBack: true
        });
        aesIns = aes(pwd);
        console.log('password has changed!'.green);
        continue;
    }

    if (cmd === "clear" || cmd === "cls") {
        process.stdout.write('\033[2J');
        process.stdout.write('\033[0f');
        continue;
    }

    reg = /^(en|de) +(.+)$/.exec(cmd);
    if (reg) {
        try {
            if (reg[1] === "en") {
                console.log('encrypt result: \n'.yellow + aesIns.encrypt(reg[2]).green);
            } else {
                console.log('decrypt result: \n'.yellow + aesIns.decrypt(reg[2]).green);
            }
        } catch(e) {
            console.log('Error Message: '.yellow + e.message.red);
        }
        
        continue;
    }

    console.log('Invalid command, you can use help to see the specific usage!'.red);
}

console.log("goodbye");
