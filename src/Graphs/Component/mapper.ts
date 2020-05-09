import * as models from './models';
import * as Graph from '../Graph/Graph';

export function mapToGraphElements(component: models.component): Graph.item[] {
	const elements: Graph.item[] = [];

	const topics = new Map<number, Graph.item>();

	const toTopic = function(target: models.topic, source: string) {
		if (!topics.has(target.id)) {
			topics.set(target.id, {
				data: {
					type: 'node',
					id: 'topic_' + target.id,
					label: target.name
				},
				classes: 'topic'
			});
		}
		const topic = topics.get(target.id);
		if (topic.data.type != 'node') return;
		elements.push({
			data: {
				type: 'edge',
				target: topic.data.id,
				source: source
			}
		});
	};

	const fromTopic = function(source: models.topic, target: string) {
		if (!topics.has(source.id)) {
			topics.set(source.id, {
				data: {
					type: 'node',
					id: 'topic_' + source.id,
					label: source.name
				},
				classes: 'topic'
			});
		}

		const topic = topics.get(source.id);
		if (topic.data.type != 'node') return;
		elements.push({
			data: {
				type: 'edge',
				target: target,
				source: topic.data.id
			}
		});
	};

	for (let source of component.sources) {
		elements.push({
			data: {
				type: 'node',
				id: 'source_' + source.id,
				label: source.topic.name
			},
			classes: 'source'
		});
		toTopic(source.topic, 'source_' + source.id);
	}

	for (let view of component.views) {
		elements.push({
			data: {
				type: 'node',
				id: 'view_' + view.id,
				label: view.topic.name
			},
			classes: 'view'
		});
		fromTopic(view.topic, 'view_' + view.id);
	}

	for (let sink of component.sinks) {
		elements.push({
			data: {
				type: 'node',
				id: 'sink_' + sink.id,
				label: sink.topic.name
			},
			classes: 'sink'
		});
		fromTopic(sink.topic, 'sink_' + sink.id);
	}

	for (let viewSink of component.viewSinks) {
		elements.push({
			data: {
				type: 'node',
				id: 'viewSink_' + viewSink.id,
				label: viewSink.name
			},
			classes: 'viewSink'
		});
		fromTopic(viewSink.topic, 'viewSink_' + viewSink.id);
	}

	for (let viewSource of component.viewSources) {
		elements.push({
			data: {
				type: 'node',
				id: 'viewSource_' + viewSource.id,
				label: viewSource.name
			},
			classes: 'viewSource'
		});
		toTopic(viewSource.topic, 'viewSource_' + viewSource.id);
	}

	for (let processor of component.processors) {
		const id = 'processor_' + processor.id;
		elements.push({
			data: {
				type: 'node',
				id: id,
				label: processor.name
			},
			classes: 'processor'
		});

		for (let input of processor.inputs) {
			fromTopic(input.topic, id);
		}
		for (let output of processor.outputs) {
			toTopic(output.topic, id);
		}
		for (let join of processor.joins) {
			fromTopic(join.topic, id);
		}
		for (let lookup of processor.lookups) {
			fromTopic(lookup.topic, id);
		}
		if (processor.persistence == null) continue;

		toTopic(processor.persistence, id);
		fromTopic(processor.persistence, id);
	}

	for (const topic of topics.values()) {
		elements.push(topic);
	}

	return elements;
}
