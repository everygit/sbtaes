var readlineSync = require('readline-sync');
var { aes } = require('@xiaoerr/crypt');
var colors = require('colors');


var pwd = readlineSync.question('please input aes password: '.yellow, {
    hideEchoBack: true
});

var aesIns = aes(pwd);

var helps = [];

helps.push(`${'help'.magenta}\t\t\tShow all operational commands`);
helps.push(`${'show password'.magenta}\t\tShow current AES password`);
helps.push(`${'change password'.magenta}\t\tModify the current AES password`);
helps.push(`${'en [content]'.magenta}\t\tAES encrypts current content`);
helps.push(`${'de [content]'.magenta}\t\tAES decrypts the current content`);
helps.push(`${'clear'.magenta}\t\t\tClear console content`);
helps.push(`${'quit or exit'.magenta}\t\tExit the app`);

var helpStr = helps.join('\n');

var cmd;

while (true) {
    // input
    cmd = readlineSync.prompt();

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
        console.log(helpStr);
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
