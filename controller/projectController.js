var zip = require('express-easy-zip');
var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;



exports.create = function (request, response, next) {
    try {
        var params = request.body;
        const sourceFolderPath = getSourceFolderPath(params);
        const destinationFolderPath = getDestinationFolderPath();

        return copyFolder(sourceFolderPath, destinationFolderPath, (err) => {
            if (err) {
                return err;
            }
            const packageJsonFilePath = path.join(destinationFolderPath, 'package.json')
            saveToPackage(packageJsonFilePath,'dependency',params.dependenciesItem);
            return createZip(destinationFolderPath,response);
        });


    } catch (exception) {
        console.log(exception)
        return response.send(exception);
    }
}


function saveToPackage(packageJsonFilePath, category, requestedData) {

    const data = readFromFile(packageJsonFilePath);
    let json;

    try {
        json = JSON.parse(data);
    } catch (e) {
        console.error('Could not parse package.json. Stop.');
    }

    let modifiedJsonData = Object.assign(json[getTargetName(category)] || {}, requestedData)

    modifiedJsonData = Object.keys(modifiedJsonData).sort().reduce((res, key) => {
        res[key] = modifiedJsonData[key];
        return res;
    }, {});

    json[getTargetName(category)] = modifiedJsonData;

    writeToFile(packageJsonFilePath, JSON.stringify(json, null, 2));
    console.log('Done.');
}



function readFromFile(filePath) {
    const readFileData = fs.readFileSync(filePath);
    return readFileData.toString();
}

function writeToFile(filePath, fileContent) {
    fs.writeFileSync(filePath, fileContent);
};


function getTargetName(target) {
    switch (target) {
        case 'dev': return 'devDependencies';
        case 'peer': return 'peerDependencies';
        case 'bundled': return 'bundledDependencies';
        case 'optional': return 'optionalDependencies';
        default: return 'dependencies';
    }
}

const getSourceFolderPath = (params) => {

    const language = params.tabs.find(item => {
        return item.label === 'Language';
    })
    const technology = params.tabs.find(item => {
        return item.label === 'Technology';
    });

    const folderName = language.value + '_' + technology.value;
    var projectDirPath = path.resolve(__dirname + './../public/');

    const folderSourcePath = path.join(projectDirPath, folderName)
    return folderSourcePath;
}


const getDestinationFolderPath = () => {
    return path.resolve(__dirname + './../public/TempFolder');
}

const copyFolder = (source, destination, callback) => {
    ncp.limit = 16;

    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('done!');
        callback(err);
    });
}

const createZip = (folderPath,response) => {
        return response.zip({
            files: [{
                content: 'this is a string',
                name: 'file-name',
                mode: 0755,
                comment: 'comment-for-the-file',
                date: new Date(),
                type: 'file'
            },
            { path: folderPath, name: "foldername" }
            ],
            filename: "foldername" + '.zip'
        });
}



