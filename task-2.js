const fs = require('fs');
const path = require('path');

const sourceDir = './source_directory';

const targetDir = './target_directory';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('Ошибка при чтении директории:', err);
        return;
    }

    files.forEach((file) => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        fs.rename(sourcePath, targetPath, (err) => {
            if (err) {
                console.error(`Ошибка при перемещении файла ${file}:`, err);
                return;
            }
            console.log(`Файл ${file} успешно перемещен.`);
        });
    });

    console.log('Перемещение файлов завершено.');
});