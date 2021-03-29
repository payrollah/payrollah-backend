module.exports = {
  "port": process.env.PORT,
  "dbEndpoint": process.env.DATABASE_URL,
  "ACCESS_TOKEN_SECRET": process.env.ACCESS_TOKEN_SECRET || "access-testing-token",
  "REFRESH_TOKEN_SECRET": process.env.REFRESH_TOKEN_SECRET || "refresh-testing-token",
  "INFURA_API_KEY": process.env.INFURA_API_KEY || "d37844d2ca6b4415a8bcd2073481e989",
  "PAYROLLAH_CONTRACT_ADDRESS": process.env.PAYROLLAH_CONTRACT_ADDRESS || "0x638b9E34c588D32CAD318E524A02B7e398BBfe2E",
  "NETWORK": process.env.NETWORK || "ropsten",
}