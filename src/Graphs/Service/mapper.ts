import * as models from './models';
import * as Graph from '../Graph/Graph';

export function mapToGraphElements(service: models.service): Graph.item[] {
	const elements: Graph.item[] = [];

	const topics = getTopicSources(service);

	let hasUnkown = false;

	const toTopic = function(id: number, source: string) {
		if (topics.has(id)) {
			for (let topic of topics.get(id)) {
				if (topic.data.type != 'node') continue;
				elements.push({
					data: {
						type: 'edge',
						source: source,
						target: topic.data.id
					}
				});
			}
		} else {
			if (!hasUnkown) {
				elements.push({
					data: {
						type: 'node',
						id: 'unknown',
						label: 'unknown'
					},
					classes: 'unknown'
				});
				hasUnkown = true;
			}
			elements.push({
				data: {
					type: 'edge',
					source: source,
					target: 'unknown'
				}
			});
		}
	};
	const fromTopic = function(id: number, target: string) {
		if (topics.has(id)) {
			for (let topic of topics.get(id)) {
				if (topic.data.type != 'node') continue;
				elements.push({
					data: {
						type: 'edge',
						target: target,
						source: topic.data.id
					}
				});
			}
		} else {
			if (!hasUnkown) {
				elements.push({
					data: {
						type: 'node',
						id: 'unknown',
						label: 'unknown'
					},
					classes: 'unknown'
				});
				hasUnkown = true;
			}
			elements.push({
				data: {
					type: 'edge',
					target: target,
					source: 'unknown'
				}
			});
		}
	};

	for (let topic of topics.values()) {
		for (let item of topic) {
			elements.push(item);
		}
	}

	elements.push({
		data: {
			type: 'node',
			id: 'service',
			label: ''
		},
		classes: 'service'
	});
	for (let component of service.components) {
		elements.push({
			data: {
				type: 'node',
				id: 'component_' + component.id,
				label: component.name,
				parent: 'service'
			},
			classes: 'component'
		});

		for (let source of component.sources) {
			elements.push({
				data: {
					type: 'node',
					id: 'source_' + source.id,
					label: '',
					parent: 'component_' + component.id
				},
				classes: 'source'
			});
			toTopic(source.topic.id, 'source_' + source.id);
		}

		for (let view of component.views) {
			elements.push({
				data: {
					type: 'node',
					id: 'view_' + view.id,
					label: '',
					parent: 'component_' + component.id
				},
				classes: 'view'
			});
			fromTopic(view.topic.id, 'view_' + view.id);
		}

		for (let sink of component.sinks) {
			elements.push({
				data: {
					type: 'node',
					id: 'sink_' + sink.id,
					label: '',
					parent: 'component_' + component.id
				},
				classes: 'sink'
			});
			fromTopic(sink.topic.id, 'sink_' + sink.id);
		}

		for (let viewSink of component.viewSinks) {
			elements.push({
				data: {
					type: 'node',
					id: 'viewSink_' + viewSink.id,
					label: '',
					parent: 'component_' + component.id
				},
				classes: 'viewSink'
			});
			fromTopic(viewSink.topic.id, 'viewSink_' + viewSink.id);
		}

		for (let processor of component.processors) {
			const id = 'processor_' + processor.id;
			elements.push({
				data: {
					type: 'node',
					id: id,
					label: processor.name,
					parent: 'component_' + component.id
				},
				classes: 'processor'
			});

			for (let input of processor.inputs) {
				fromTopic(input.id, id);
			}
			for (let output of processor.outputs) {
				toTopic(output.topic.id, id);
			}
			for (let join of processor.joins) {
				fromTopic(join.id, id);
			}
			for (let lookup of processor.lookups) {
				fromTopic(lookup.id, id);
			}
			if (processor.persistence == null) continue;

			toTopic(processor.persistence.id, id);
			fromTopic(processor.persistence.id, id);
		}
	}

	return elements;
}

function getTopicSources(service: models.service): Map<number, Graph.item[]> {
	const results = new Map<number, Graph.item[]>();

	const addTopic = function(topic: models.topic, component: number) {
		if (!results.has(topic.id)) {
			results.set(topic.id, []);
		}
		results.get(topic.id).push({
			data: {
				type: 'node',
				id: 'topic_' + topic.id,
				label: topic.name,
				parent: 'component_' + component
			},
			classes: 'topic'
		});
	};

	for (let component of service.components) {
		for (let source of component.sources) {
			addTopic(source.topic, component.id);
		}
		for (let processor of component.processors) {
			for (let output of processor.outputs) {
				addTopic(output.topic, component.id);
			}
			if (processor.persistence == null) continue;

			addTopic(processor.persistence, component.id);
		}
	}

	return results;
}
