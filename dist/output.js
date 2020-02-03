'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.formatOutput = formatOutput;
exports.saveOutputToFile = saveOutputToFile;

var _os = _interopRequireDefault(require('os'));

var _path = _interopRequireDefault(require('path'));

var _fs = _interopRequireDefault(require('fs'));

var _html = require('./html');

var _appError = require('./app-error');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function formatOutput(results, options) {
  if (!options.output) {
    return;
  }

  switch (options.output.format) {
    case 'json':
      return JSON.stringify(
        {
          results,
        },
        null,
        '  '
      );

    case 'tsv':
      return outputAsTsv(results);

    case 'html':
      return (0, _html.generateHtml)(results, options);
  }
}

function outputAsTsv(results) {
  const lines = ['Source\tSize'];
  results.forEach((bundle, index) => {
    if (index > 0) {
      // Separate bundles by empty line
      lines.push('');
    }

    Object.entries(bundle.files)
      .map(([source, data]) => [source, data.size])
      .sort(sortFilesBySize)
      .forEach(([source, size]) => {
        lines.push(`${source}\t${size}`);
      });
  });
  return lines.join(_os.default.EOL);
}

function sortFilesBySize([, aSize], [, bSize]) {
  return bSize - aSize;
}

function saveOutputToFile(result, options) {
  if (!options.output) {
    return;
  }

  const output = result.output;
  const filename = options.output.filename;

  if (output && filename) {
    try {
      const dir = _path.default.dirname(filename);

      _fs.default.mkdirSync(dir, {
        recursive: true,
      });

      _fs.default.writeFileSync(filename, output);
    } catch (error) {
      throw new _appError.AppError(
        {
          code: 'CannotSaveFile',
        },
        error
      );
    }
  }
}
