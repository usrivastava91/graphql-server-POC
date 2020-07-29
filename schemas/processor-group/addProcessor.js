const AddProcessorReqBody = `
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
    x: Int,
    y: Int
}
`;

module.exports = AddProcessorReqBody;
