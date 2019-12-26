export default function (...args) {
	console.log('default: ' + JSON.stringify(args));
}

export function named(...args) {
	console.log('named: ' + JSON.stringify(args));
}

export function throws() {
	throw new Error('throw');
}

export async function rejects() {
	throw new Error('reject');
}

export const notAFunction = 'not a function';
