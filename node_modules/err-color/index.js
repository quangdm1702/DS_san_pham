// npm i chalk@4
const chalk = require('chalk');

async function colorStackTrace(error) {
    const stackTrace = error.stack.split('\n').slice(1); // Remove first line (error message)

    return stackTrace.map((line) => {
        const fileNameMatch = line.match(/(.+\/)?([^:]+):\d+/) || []; // Extract filename and line number
        const fileName = fileNameMatch[2] || '';
        const lineNumber = fileNameMatch[1] || '';

        return [
            chalk.gray(line.slice(0, line.indexOf(fileName))), // Gray for non-highlighted parts
            chalk.yellow(fileName), // Yellow for filename
            // chalk.gray(line.slice()), // Gray for remaining line
            // chalk.red(':' + lineNumber), // Red for line number
            chalk.green(line.slice(line.indexOf(lineNumber) + lineNumber.length + fileName.length)), // Gray for remaining line
        ].join('');
    });
}

async function handleError(error) {
    console.error(chalk.red('Error:'), error.message);
    const formattedStackTrace = await colorStackTrace(error);
    console.error(formattedStackTrace.join('\n'));
    // formattedStackTrace.forEach((line) => console.error(line));
}
exports.handleError = handleError;