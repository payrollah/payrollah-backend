const { providers } = require("ethers");
const { Task__factory, Job__factory } = require("@payrollah/payrollah-registry");
const config = require("../config/keys");

module.exports = () => {
  var methods = {};

  methods.ethersProvider = new providers.InfuraProvider(config.NETWORK, config.INFURA_API_KEY);

  methods.getTaskContract = async () => {
    const taskContract = await Task__factory.connect(config.TASK_CONTRACT_ADDRESS, methods.ethersProvider)
    return taskContract;
  }

  methods.isTaskComplete = async (taskId) => {
    try {
      const taskContract = await methods.getTaskContract();
      const transaction = await taskContract.isCompletedTask(taskId);
      return transaction
    } catch (err){
      throw err
    }
  }

  methods.getJobContract = async (jobAddress) => {
    const jobContract = await Job__factory.connect(jobAddress, methods.ethersProvider)
    return jobContract;
  }

  return methods;
}