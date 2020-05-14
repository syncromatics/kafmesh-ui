export interface operation {
	input: input;
	actions: Array<action>;
}

interface input {
	topic: string;
	message: string;
	value: string;
}

export type action = join | lookup | getState | setState | output;

interface join {
	type: 'Join';
	topic: string;
	message: string;
	value: string;
}

interface lookup {
	type: 'Lookup';
	topic: string;
	message: string;
	key: string;
	value: string;
}

interface getState {
	type: 'GetState';
	topic: string;
	message: string;
	value: string;
}

interface setState {
	type: 'SetState';
	topic: string;
	message: string;
	value: string;
}

interface output {
	type: 'Output';
	topic: string;
	message: string;
	key: string;
	value: string;
}
