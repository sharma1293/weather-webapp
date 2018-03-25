module.exports = {
	port: process.env.PORT || 8090,
	authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}