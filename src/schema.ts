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
}

schema {
	query: Query
}
`;
