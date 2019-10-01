var zip = require('express-easy-zip');
var fs = require('fs');
var path = require('path');


exports.create = function (request, response, next) {
    try {
        var params = request.body;
        var foldername;
        switch (params.category) {
            case 'angular':
                foldername = 'angular'
                break;
            case 'react':
                foldername = params.type === 'js' ? 'reactJs' : 'reactTS';
                break;
            case 'node':
                foldername = params.type === 'js' ? 'nodeJavascript' : 'nodeTypescript';
                break;
            case 'reactNative':
                foldername = 'reactNative';
                break;
        }
        if (!foldername) return response.send({ status: 0, message: 'Oops something went wrong!!!' });
        var projectListPath = __dirname + './../public/';
        fs.readdir(projectListPath, (error, list) => {
            if (error) {
                console.log(error);
                return response.send(error);
            }
            return response.zip({
                files: [{
                    content: 'this is a string',
                    name: 'file-name',
                    mode: 0755,
                    comment: 'comment-for-the-file',
                    date: new Date(),
                    type: 'file'
                },
                { path: path.join(projectListPath, foldername), name: foldername }
                ],
                filename: foldername + '.zip'
            });
        })
    } catch (exception) {
        console.log(exception)
        return response.send(exception);
    }
}

function getFolderName (category, type) {
    try {
        let foldername;
        
    } catch (exception) {
        console.log(exception)
        return '';
    }
}