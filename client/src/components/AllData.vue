<template>
<div>
<h1>Login</h1>
<input
type="email"
name="email"
v-model="email"
placeholder="email"
/>
<br>
<input
type="password"
name="password"
v-model="password"
placeholder="password"
/>
<br>
<button type="login" 
@click = "login">Login</button>
</div>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationServices'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
  	async login () {
  		const response = await AuthenticationServices.register({
  			email: this.email,
  			password: this.password
  		})
  		console.log(response.data);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
