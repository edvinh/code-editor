const spawn = require('child_process').spawn
const exec = require('child_process').exec

//const child = spawn('/bin/bash', ['-c', 'docker run -i --rm node:8 node -v'], {stdio: 'inherit'})
//const child = spawn('docker', ['run', '-i', '--rm', '-v', '/home/edvin/programming/:/app', '-w', '/app', 'python:3', 'python', 'index.py'], {stdio: 'inherit'})
//exec('docker ' + ['run', '-i', '--rm', '-v', '/home/edvin/programming/:/app', '-w', '/app', 'python:3', 'python', 'index.py'].join(" "), (err, stdout, stderr) => {
//  console.log(err, stdout, stderr)
//})

//exec('docker run -i --sig-proxy=false ubuntu /bin/bash -c "echo lol; sleep 1"')

spawn('/bin/sh', ['-c', 'docker run -i --sig-proxy=false ubuntu /bin/bash -c "echo lol; sleep 1"'])

//exec('node /home/edvin/programming/index.js', (err, stdout, stderr) => {
//  console.log(err, stdout, stderr)
//})