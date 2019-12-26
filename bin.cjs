#!/usr/bin/env node

const path = require('path');
const {pathToFileURL} = require('url');

const [source, ...args] = process.argv.slice(2);
const exportName = args.length === 0 ? 'default' : args.shift();

require('./suppress-experimental.cjs');

process.exitCode = 0;

import(pathToFileURL(path.resolve(source)))
	.then(async mod => {
		const fn = mod[exportName];
		if (typeof fn !== 'function') {
			throw new TypeError(`${source} does not export a function ${exportName}`);
		}

		await fn(...args);
	})
	.catch(error => {
		console.error(error);
		/* istanbul ignore next */
		if (process.exitCode === 0) {
			process.exitCode = 1;
		}

		process.exit();
	});
