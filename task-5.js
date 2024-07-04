const https = require('https');

let userRepoData = "";

let options = {
    host: 'api.github.com',
    path: '/users/' + 'mikhail-stick' + '/repos',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
};

https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        // console.log(data)
        userRepoData += data;
    });
    res.on('end', function () {
        userRepoData = JSON.parse(userRepoData);
        userRepoData.forEach((repo) => {
            console.log(repo.full_name)
        })
    })
}).end();

