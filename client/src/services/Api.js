import axios from 'axios'
// This method will be used for creating connection to the server
export default () => {
	return axios.create({
      baseURL: 'http://localhost:8095/'
	})
}