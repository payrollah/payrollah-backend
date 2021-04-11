const { utils } = require("ethers");

module.exports = () => {
  var methods = {};

  methods.hashImage = (imageName) => {
    return utils.id(imageName);
  }

  return methods;
}