const { TransformStream } = require('stream/web');

function transformText(text, mode) {
    return new TransformStream({
        transform(chunk, controller) {
            let transformedText;
            switch (mode) {
                case 'uppercase':
                    transformedText = chunk.toString().toUpperCase();
                    break;
                case 'lowercase':
                    transformedText = chunk.toString().toLowerCase();
                    break;
                default:
                    transformedText = chunk.toString();
            }
            controller.enqueue(transformedText);
        }
    });
}

const readableStream = new ReadableStream({
    start(controller) {
        controller.enqueue('This is some sample text.');
        controller.close();
    }
});

const transformStream = transformText(readableStream, 'uppercase');

const writableStream = new WritableStream({
    write(chunk) {
        console.log(chunk);
    }
});

readableStream.pipeThrough(transformStream).pipeTo(writableStream);