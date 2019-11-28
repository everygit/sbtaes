var readlineSync = require('readline-sync');
var { aes } = require('@xiaoerr/crypt');
require('colors');


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

var invaildCommandStr = 'Invalid command, you can use help to see the specific usage!'.red;

readlineSync.promptCLLoop({
    help() {
        console.log(helpStr);
    },
    show(s) {
        if (s === 'password') {
            console.log(pwd.gray);
        } else {
            console.log(invaildCommandStr);
        }
    },
    change(s) {
        if (s === 'password') {
            pwd = readlineSync.question('please input aes password: '.yellow, {
                hideEchoBack: true
            });
            aesIns = aes(pwd);
            console.log('password has changed!'.green);
        } else {
            console.log(invaildCommandStr);
        }
    },
    en(s) {
        var p = [...arguments].join('\n');
        try {
            console.log('encrypt result: \n'.yellow + aesIns.encrypt(p).green);
        } catch(ex) {
            console.log('Error Message: '.yellow + ex.message.red);
        }
       
    },
    de() {
        var p = [...arguments].join('\n');
        try {
            console.log('decrypt result: \n'.yellow + aesIns.decrypt(p).green);
        } catch(ex) {
            console.log('Error Message: '.yellow + ex.message.red);
        }
    }
}, {
    limitMessage: invaildCommandStr
});

console.log("goodbye");
