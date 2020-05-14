export default `
directive @goModel(
  model: String
  models: [String!]
) on OBJECT | INPUT_OBJECT | SCALAR | ENUM | INTERFACE | UNION

directive @goField(
  forceResolver: Boolean
  name: String
) on INPUT_FIELD_DEFINITION | FIELD_DEFINITION

type Component {
  id: ID!
  service: Service!
  name: String!
  description: String!
  processors: [Processor!]!
  sinks: [Sink!]!
  sources: [Source!]!
  viewSinks: [ViewSink!]!
  viewSources: [ViewSource!]!
  views: [View!]!
  dependsOn: [Component!]!
}

type Pod {
  id: ID!
  name: String!
  processors: [Processor!]!
  sinks: [Sink!]!
  sources: [Source!]!
  viewSinks: [ViewSink!]!
  viewSources: [ViewSource!]!
  views: [View!]!
}

type Processor {
  id: ID!
  component: Component!
  name: String!
  description: String!
  groupName: String!
  persistence: Topic
  pods: [Pod!]!
  inputs: [ProcessorInput!]!
  joins: [ProcessorJoin!]!
  lookups: [ProcessorLookup!]!
  outputs: [ProcessorOutput!]!
}

type ProcessorInput {
  id: ID!
  processor: Processor!
  topic: Topic!
}

type ProcessorJoin {
  id: ID!
  processor: Processor!
  topic: Topic!
}

type ProcessorLookup {
  id: ID!
  processor: Processor!
  topic: Topic!
}

type ProcessorOutput {
  id: ID!
  processor: Processor!
  topic: Topic!
}

type Service {
  id: ID!
  name: String!
  description: String!
  components: [Component!]!
  dependsOn: [Service!]!
}

type Sink {
  id: ID!
  component: Component!
  name: String!
  description: String!
  topic: Topic!
  pods: [Pod!]!
}

type Source {
  id: ID!
  component: Component!
  topic: Topic!
  pods: [Pod!]!
}

type Topic {
  id: ID!
  name: String!
  message: String!
  processorInputs: [ProcessorInput!]!
  processorJoins: [ProcessorJoin!]!
  processorLookups: [ProcessorLookup!]!
  processorOutputs: [ProcessorOutput!]!
  processorPersistences: [Processor!]!
  sinks: [Sink!]!
  sources: [Source!]!
  viewSinks: [ViewSink!]!
  viewSources: [ViewSource!]!
  views: [View!]!
}

type View {
  id: ID!
  component: Component!
  topic: Topic!
  pods: [Pod!]!
}

type ViewSink {
  id: ID!
  component: Component!
  name: String!
  description: String!
  topic: Topic!
  pods: [Pod!]!
}

type ViewSource {
  id: ID!
  component: Component!
  description: String!
  name: String!
  topic: Topic!
  pods: [Pod!]!
}

type Query {
	services: [Service!]!
	pods: [Pod!]!
  topics: [Topic!]!

  serviceById(id: ID!): Service
  componentById(id: ID!): Component
}

type Operation {
	input: Input!
	startTime: Int!
	endTime: Int!
	actions: [Action!]!
}

type Input {
	topic: String!
	message: String!
	value: String!
}

interface Action {
	topic: String!
	message: String!
	value: String!
}

type Join implements Action {
	topic: String!
	message: String!
	value: String!
}

type Lookup implements Action {
	topic: String!
	message: String!
	value: String!
	key: String!
}

type GetState implements Action {
	topic: String!
	message: String!
	value: String!
}

type SetState implements Action {
	topic: String!
	message: String!
	value: String!
}

type Output implements Action {
	topic: String!
	message: String!
	value: String!
	key: String!
}

input WatchProcessorInput {
	processorId: ID!
	key: String!
}

type Subscription {
	watchProcessor(options: WatchProcessorInput): Operation!
}

schema {
  query: Query
  subscription: Subscription
}
`;
