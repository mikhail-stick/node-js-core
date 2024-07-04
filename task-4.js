const path = require('path');

if (process.argv.length < 3) {
    console.log('Пожалуйста, предоставьте аргументы командной строки для пути к файлу.');
    process.exit(1);
}

const parts = process.argv.slice(2);
const normalizedPath = path.normalize(path.join(...parts));

console.log('Нормализованный путь:', normalizedPath);