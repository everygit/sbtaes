const program = require('commander')
const { aes } = require('@xiaoerr/crypt')
require('colors')

program
  .option('<no args>', 'Enter REPL mode')
  .option('-k, --key <key>', 'Set the current AES key')
  .option('-e, --encrypt <pwd>', 'AES encrypts current password')
  .option('-d, --decrypt <encrypted_pwd>', 'AES decrypts current password')
  .parse(process.argv)

const { key, encrypt, decrypt } = program.opts()

if (key === undefined || key.length <= 0) {
  return console.log(
    `${'AES key can not be empty'.red}\n${`input 'sbtaes -h' for help`.yellow}`
  )
}

if (
  (encrypt === undefined || encrypt.length <= 0) &&
  (decrypt === undefined || decrypt.length <= 0)
) {
  return console.log(
    `${'please enter the password or encrypted password'.red}\n${`input 'sbtaes -h' for help`.yellow}`
  )
}

const aesIns = aes(key)

if (encrypt !== undefined && encrypt.length > 0) {
  return console.log('encrypt result: \n'.yellow + aesIns.encrypt(encrypt).green)
}

if (decrypt !== undefined && decrypt.length > 0) {
  console.log('decrypt result: \n'.yellow + aesIns.decrypt(decrypt).green)
}
