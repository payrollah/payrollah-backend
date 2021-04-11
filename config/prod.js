module.exports = {
  "port": process.env.PORT,
  "dbEndpoint": process.env.DATABASE_URL,
  "ACCESS_TOKEN_SECRET": process.env.ACCESS_TOKEN_SECRET || "access-testing-token",
  "REFRESH_TOKEN_SECRET": process.env.REFRESH_TOKEN_SECRET || "refresh-testing-token",
  "INFURA_API_KEY": process.env.INFURA_API_KEY || "d37844d2ca6b4415a8bcd2073481e989",
  "TASK_CONTRACT_ADDRESS": process.env.TASK_CONTRACT_ADDRESS || "0x2fBd0b674B86BBb7Fb7CC76cD815be95eeCcE6c9",
  "NETWORK": process.env.NETWORK || "ropsten",
  "AWS_ACCESS_KEY_ID": process.env.AWS_ACCESS_KEY_ID,
  "AWS_SECRET_ACCESS_KEY": process.env.AWS_SECRET_ACCESS_KEY,
  "S3_BUCKET": process.env.S3_BUCKET || "payrollah",
}