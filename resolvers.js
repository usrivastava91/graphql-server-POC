const axios = require("axios");

const addProcessorResolver = async function(args) {
  let requestBody = JSON.stringify(args.input);
  let processGroupId = args.processGroupId;
  let result = await axios
    .post(
      `http://localhost:8080/nifi-api/process-groups/${processGroupId}/processors`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
  return result;
};

const getConnectionDetailsResolver = async function(args) {
  let connectionId = args.connectionId;
  let result = await axios
    .post(
      `http://localhost:8080/nifi-api/flowfile-queues/${connectionId}/listing-requests`
    )
    .then(response => {
      return response.data;
    })
    .catch(error => console.error(error));
  return result;
};

const configureProcessorResolver = async function(args) {
  let requestBody = JSON.stringify(args.input);
  let processorId = args.processorId;

  let result = await axios
    .put(
      `http://localhost:8080/nifi-api/processors/${processorId}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
  return result;
};

const createConnectionResolver = async function(args) {
  let requestBody = JSON.stringify(args.input);
  let processGroupId = args.processGroupId;
  let result = await axios
    .post(
      `http://localhost:8080/nifi-api/process-groups/${processGroupId}/connections`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
  return result;
};

const getProcessorResolver = async function(args) {
  let processorId = args.processorId;
  let result = await axios
    .get(`http://localhost:8080/nifi-api/processors/${processorId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => console.log(error));
  return result;
};

const getAllProcessorsResolver = async function(args) {
  let processGroupId = args.processGroupId;
  let result = await axios
    .get(
      `http://localhost:8080/nifi-api/process-groups/${processGroupId}/processors`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => console.log(error));
  return result;
};

module.exports = {
  rootResolver: {
    getConnectionDetails: getConnectionDetailsResolver,
    addProcessor: addProcessorResolver,
    configureProcessor: configureProcessorResolver,
    createConnection: createConnectionResolver,
    getProcessor: getProcessorResolver,
    getAllProcessors: getAllProcessorsResolver
  }
};
