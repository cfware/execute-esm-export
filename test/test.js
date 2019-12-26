import path from 'path';
import {spawnSync} from 'child_process';
import {fileURLToPath} from 'url';

import t from 'libtap';

const projectDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const bin = path.join(projectDir, 'bin.cjs');
let script = path.join(projectDir, 'fixtures', 'script.js');

function execute(...args) {
	return spawnSync(process.execPath, [bin, script, ...args], {
		encoding: 'utf8',
		cwd: path.join(projectDir, 'test')
	});
}

t.test('default', async t => {
	t.match(execute(), {
		status: 0,
		stdout: 'default: []\n',
		stderr: '',
	});

	t.match(execute('default'), {
		status: 0,
		stdout: 'default: []\n',
		stderr: '',
	});

	// Ensure it works using a relative path
	script = path.join('..', 'fixtures', 'script.js');

	t.match(execute('default', 'arg1', 2), {
		status: 0,
		stdout: 'default: ["arg1","2"]\n',
		stderr: '',
	});
});

t.test('named', async t => {
	t.match(execute('named'), {
		status: 0,
		stdout: 'named: []\n',
		stderr: '',
	});

	t.match(execute('named', 'arg1', 2), {
		status: 0,
		stdout: 'named: ["arg1","2"]\n',
		stderr: '',
	});
});

t.test('throws', async t => {
	t.match(execute('throws'), {
		status: 1,
		stdout: '',
		stderr: /Error: throw\n\s*at throws/,
	});
});

t.test('rejects', async t => {
	t.match(execute('rejects'), {
		status: 1,
		stdout: '',
		stderr: /Error: reject\n\s*at rejects/,
	});
});

t.test('notAFunction', async t => {
	t.match(execute('notAFunction'), {
		status: 1,
		stdout: '',
		stderr: /TypeError: [^\n]* does not export a function notAFunction\n/,
	});
});
