const http = require('http');

const urls = [
    'http://www.example.com',
    'http://www.google.com',
    'http://www.github.com',
    'http://www.yahoo.com',
    'http://www.amazon.com'
];

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function makeBlockingRequests() {
    console.time('Blocking Requests');
    for (const url of urls) {
        const req = http.request(url, (res) => {
            res.on('data', () => {
            });
            res.on('end', () => {
                console.log(`Blocking request to ${url} completed.`);
            });
        });
        req.on('error', (e) => {
            console.error(`Blocking request to ${url} failed: ${e.message}`);
        });
        req.end();
    }
    console.timeEnd('Blocking Requests');
}

function makeNonBlockingRequests() {
    console.time('Non-Blocking Requests');
    const promises = urls.map((url) => {
        return new Promise((resolve, reject) => {
            const req = http.get(url, (res) => {
                res.on('data', () => {
                });
                res.on('end', () => {
                    console.log(`Non-Blocking request to ${url} completed.`);
                    resolve();
                });
            });
            req.on('error', (e) => {
                console.error(`Non-Blocking request to ${url} failed: ${e.message}`);
                reject(e);
            });
        });
    });
    Promise.all(promises).then(() => {
        console.timeEnd('Non-Blocking Requests');
    });
}

makeBlockingRequests();
makeNonBlockingRequests();