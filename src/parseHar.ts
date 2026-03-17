import * as fs from 'fs';

const har = JSON.parse(fs.readFileSync('test-results/login.har','utf-8'));

const lines = ['method,url,status,responseTime'];

for (const entry of har.log.entries) {
    const method = entry.request.method;
    const url = entry.request.url;
    const status = entry.response.status;
    const responseTime = entry.time;
    lines.push(`${method},${url},${status},${responseTime}`);
}

fs.writeFileSync('test-results/login.csv', lines.join('\n'));
console.log('done');