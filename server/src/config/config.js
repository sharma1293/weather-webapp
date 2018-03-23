module.exports = {
	port: process.env.PORT || 8095,
	authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}