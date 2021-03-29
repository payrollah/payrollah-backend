const { providers } = require("ethers");
const { Payrollah__factory } = require("@payrollah/payrollah-registry");
const config = require("../config/keys");

module.exports = () => {
  var methods = {};

  methods.ethersProvider = new providers.InfuraProvider(config.NETWORK, config.INFURA_API_KEY);

  methods.getPayrollahContract = async () => {
    const payrollahContract = await Payrollah__factory.connect(config.PAYROLLAH_CONTRACT_ADDRESS, methods.ethersProvider)
    return payrollahContract;
  }

  methods.isEmployeeAddressOfCompany = async (employeeAddress, companyId) => {
    try {
      const payrollahContract = await methods.getPayrollahContract();
      const transaction = await payrollahContract.isEmployeeAddressOfCompany(employeeAddress, companyId);
      return transaction
    } catch (err){
      throw err
    }
  }

  return methods;
}