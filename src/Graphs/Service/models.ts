export type service = {
	components: component[];
};

export type topic = {
	id: number;
	name: string;
};

export type component = {
	id: number;
	name: string;
	sources: source[];
	processors: processor[];
	views: view[];
	sinks: sink[];
	viewSources: viewSource[];
	viewSinks: viewSink[];
};

export type processor = {
	id: number;
	name: string;
	inputs: input[];
	outputs: output[];
	lookups: lookup[];
	joins: join[];
	persistence?: topic;
};

export type input = {
	id: number;
	topic: topic;
};

export type output = {
	id: number;
	topic: topic;
};

export type join = {
	id: number;
	topic: topic;
};

export type lookup = {
	id: number;
	topic: topic;
};

export type source = {
	id: number;
	topic: topic;
};

export type view = {
	id: number;
	topic: topic;
};

export type sink = {
	id: number;
	name: string;
	topic: topic;
};

export type viewSink = {
	id: number;
	name: string;
	topic: topic;
};

export type viewSource = {
	id: number;
	name: string;
	topic: topic;
};
