const modelNamespace = 'Game.Models'
const outputFolder = '../Client/Assets/Models'

const exec = require('child_process').exec

var files = 
[
    //models
    'src/rooms/match/models/player.ts',
    'src/rooms/match/models/position.ts',
    'src/rooms/match/models/unit.ts',
    //states
    'src/rooms/match/state/index.ts',
    'src/rooms/match/state/statePlayers.ts',
    'src/rooms/match/state/stateUnits.ts'
]

var filesString = ''

files.forEach(filePath => {
    filesString = filesString + filePath + ' '
})

var command = `npx schema-codegen ${filesString} --output ${outputFolder} --csharp --namespace ${modelNamespace}`

exec(command,
function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
         console.log('exec error: ' + error)
    }
})