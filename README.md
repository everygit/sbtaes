# sbtaes

[![image](https://img.shields.io/npm/v/sbtaes.svg)](https://www.npmjs.com/package/sbtaes)
[![](https://img.shields.io/npm/l/sbtaes.svg)](https://www.npmjs.com/package/sbtaes)
[![](https://img.shields.io/github/issues/everygit/sbtaes)](https://github.com/everygit/sbtaes/issues)

AES encryption and decryption command line tool

## ARGS

### encrypt
```sh
$ sbtaes -k a -e a
encrypt result: 
24OtX7FRWGVFvCd1trX90g==
```
### decrypt
```sh
$ sbtaes -k a -d 24OtX7FRWGVFvCd1trX90g==
decrypt result: 
a
```
### help
```
$ sbtaes -h
Usage: cli [options]

Options:
  <no args>                      Enter REPL mode
  -k, --key <key>                Set the current AES key
  -e, --encrypt <pwd>            AES encrypts current password
  -d, --decrypt <encrypted_pwd>  AES decrypts current password
  -h, --help                     output usage information
```

## REPL

```sh
$ sbtaes
please input aes password: * # a
# encrypt
> en a
encrypt result: 
24OtX7FRWGVFvCd1trX90g==
# decrypt
> de 24OtX7FRWGVFvCd1trX90g==
decrypt result: 
a
# help
> help
help                    Show all operational commands
show password           Show current AES password
change password         Modify the current AES password
en [content]            AES encrypts current content
de [content]            AES decrypts the current content
clear                   Clear console content
quit or exit            Exit the app
# show password
> show password
a
```