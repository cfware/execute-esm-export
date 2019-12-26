'use strict';

const {emitWarning} = process;

process.emitWarning = (...args) => {
	if (args[0] === 'The ESM module loader is experimental.' && args[1] === 'ExperimentalWarning') {
		process.emitWarning = emitWarning;
	} else {
		return emitWarning(...args);
	}
};
