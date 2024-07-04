const fs = require('fs');
const { EventEmitter } = require('events');
const path = require('path');

class FileWatcher extends EventEmitter {
    constructor(directory) {
        super();
        this.directory = directory;
        this.files = new Map();
        this.startWatching();
    }

    startWatching() {
        fs.readdir(this.directory, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            files.forEach((file) => {
                this.trackFile(path.join(this.directory, file));
            });

            this.watchDirectory();
        });
    }

    watchDirectory() {
        fs.watch(this.directory, (eventType, filename) => {
            const filePath = path.join(this.directory, filename);

            switch (eventType) {
                case 'rename':
                    if (!this.files.has(filePath)) {
                        this.trackFile(filePath);
                        this.emit('fileAdded', filePath);
                    } else {
                        this.untrackFile(filePath);
                        this.emit('fileDeleted', filePath);
                    }
                    break;
                case 'change':
                    this.emit('fileChanged', filePath);
                    break;
            }
        });
    }

    trackFile(filePath) {
        this.files.set(filePath, fs.statSync(filePath));
    }

    untrackFile(filePath) {
        this.files.delete(filePath);
    }
}

const fileWatcher = new FileWatcher('monitored_directory');

fileWatcher.on('fileAdded', (filePath) => {
    console.log('File added:', filePath);
});

fileWatcher.on('fileChanged', (filePath) => {
    console.log('File changed:', filePath);
});

fileWatcher.on('fileDeleted', (filePath) => {
    console.log('File deleted:', filePath);
});