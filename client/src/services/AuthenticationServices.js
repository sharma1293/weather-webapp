import Api from '@/services/Api'
// This method will be used to return object for calling the authentication end point
export default{
	register (credentials) {
		return Api().post('register', credentials)
	}
}
