const { buildSchema } = require("graphql");
const { GraphQLJSON } = require("graphql-type-json");
const { makeExecutableSchema } = require("graphql-tools");

const typeDef = `
    scalar JSON
    type Query{
        getProcessor(processorId: String!): ConfiguredProcessorInformation
        getAllProcessors(processGroupId: String!): AllProcessorsInformation
    }
    type Mutation {
         getConnectionDetails(connectionId: String!): ListingRequest
        addProcessor(processGroupId: String!, input: AddProcessorReqBody): AddedProcessorInformation
        configureProcessor(processorId: String!, input: ConfigureProcessorReqBody): ConfiguredProcessorInformation
        createConnection(processGroupId: String!, input: CreateConnectionReqBody): CreatedConnectionInformation
    },
    type AllProcessorsInformation {
        processors: [AddedProcessorInformation]
    }
    type ListingRequest {
       listingRequest: listingRequestObj
    }
    type listingRequestObj {
        id: String,
        uri: String,
        submissionTime: String,
        lastUpdated: String,
        percentCompleted: Int,
        finished: Boolean,
        maxResults: Int,
        state: String,
        queueSize: QueSize,
        sourceRunning: Boolean,
        destinationRunning: Boolean
    }
    type QueSize {
        byteCount: Int,
        objectCount: Int
    }

    input ConfigureProcessorReqBody{
        revision: Revision,
        component: ConfigureProccesorComponent,
        disconnectedNodeAcknowledged: Boolean,

    }
    input ConfigureProccesorComponent{
        id: String,
        name: String,
        config: ConfigureProcessorConfig,
        state: String
    }
    input ConfigureProcessorConfig {
        concurrentlySchedulableTaskCount: String,
        schedulingPeriod: String,
        executionNode: String,
        penaltyDuration: String,
        yieldDuration: String,
        schedulingStrategy: String,
        comments: String,
        properties: JSON,
    }



    input AddProcessorReqBody {
        revision: Revision,
        component: Component,
    }
    input Revision {
        version: Int
    }
    input Component {
        type: String,
        bundle: Bundle,
        name: String,
        position: Position

    }
    input Bundle {
        group: String,
        artifact: String,
        version: String
    }
    input Position {
        x: Float,
        y: Float
    }
   

    input CreateConnectionReqBody{
        revision: Revision,
        disconnectedNodeAcknowledged: Boolean,
        component: ConnectionComponentsDetails
    }
    input ConnectionComponentsDetails{
        name: String,
        source: ComponentDetail,
        destination: ComponentDetail,
        selectedRelationships: [String],
        flowFileExpiration: String,
        backPressureDataSizeThreshold: String,
        backPressureObjectThreshold: String,
        loadBalanceStrategy: String,
        loadBalancePartitionAttribute: String,
        loadBalanceCompression: String
    }
    input ComponentDetail {
        id: String,
        groupId: String,
        type: String
    }

    type AddedProcessorInformation {
        id: String,
        uri: String,
        position: PositionType,
        permissions: PermissionsType,
        component: ComponentType,
        inputRequirement: String,
        status: StatusType
    }
    type PositionType {
        x: Float,
        y: Float
    }
    type PermissionsType {
        canRead: Boolean,
        canWrite: Boolean
    }
    type ComponentType {
        name: String,
        parentGroupId: String,
        state: String,
        relationships: [RelationshipsType],
        config: ConfigType,
        type: String
    }
    type RelationshipsType {
        name: String,
        description: String,
        autoTerminate: Boolean
    }
    type ConfigType {
        properties: JSON,
        schedulingPeriod: String,
        schedulingStrategy: String,
    }

    type StatusType {
        runStatus: String,
        statsLastRefreshed: String,
        aggregateSnapshot: AggregateSnapshotType,
        name: String,
        sourceId: String,
        sourceName: String,
        destinationId: String,
        destinationName: String
    }
    type AggregateSnapshotType {
        bytesRead: Int,
        bytesWritten: Int,
        read: String,
        written: String,
        flowFilesIn: Int,
        bytesIn: Int,
        input: String,
        flowFilesOut:Int,
        bytesOut: Int,
        output: String,
        taskCount: Int,
        tasksDurationNanos: Int,
        tasks: Int,
        tasksDuration: String,
        activeThreadCount: Int,
        terminatedThreadCount: Int,
        flowFilesQueued: Int,
        bytesQueued: Int,
        queued: String,
        queuedSize: String,
        queuedCount: String,
        percentUseCount: Int,
        percentUseBytes: Int
    }



    type ConfiguredProcessorInformation{
        id: String,
        uri: String,
        position: PositionType,
        permissions: PermissionsType,
        component: ComponentType,
        inputRequirement: String,
        status: StatusType

    }

    type CreatedConnectionInformation {
        id: String,
        uri: String,
        permissions: PermissionsType,
        component: ConnectionComponentsType,
        status: StatusType,
        sourceGroupId: String,
        sourceType: String,
        destinationGroupId: String,
        destinationType: String
    }
    type ConnectionComponentsType {
        parentGroupId: String,
        source: ConnectionComponentsDetailType,
        destination: ConnectionComponentsDetailType,
        name: String,
        labelIndex: Int,
        selectedRelationships: [String],
        availableRelationships: [String],
    }
    type ConnectionComponentsDetailType {
        id: String,
        type: String,
        groupId: String,
        name: String,
        running: Boolean,
        comments: String
    }
`;

const schema = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: {}
});
module.exports = schema;
