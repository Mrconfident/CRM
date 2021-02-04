<template>
    <div id="agentDashboard">
      <div class="navbar">
        <div class="nav-item" id="leads">
          <router-link to="/agentdashboard/">Leads</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/contact">Contact</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/ticketdashboard">Ticket</router-link>
        </div>
        <div class="nav-item">
          <button @click="clear">Logout</button>
        </div>
      </div>
      <router-view>
      </router-view>
    </div>
</template>

<script>
import { setCookie } from '../cookies'
import router from '../router/index'
// import axios from 'axios'
// import api from '../config/api'
export default {
  name: 'AgentDashboard',
  data: () => ({
    leadList: [],
    agentCategory: true
  }),
  methods: {
    clear () {
      setCookie('agent_id', '', 0)
      router.push('/loginagent')
    }
  }
}
</script>

<style lang="scss">
.router-link-exact-active {
  text-decoration-line: underline;
}
a, a:visited{
  color: white;
  text-decoration: none;
}
.navbar{
  display: flex;
  margin-bottom: 30px;
}

.nav-item{
  height: 30px;
  width: 358px;
  border:0.2px solid white;
  color: white;
  padding-top: 13px;
  text-align: center;
  font-weight: 600;
  font-size:13px;
  font-family: "Gill Sans", sans-serif;
  background: #405C58;
  button {
    background: none;
    color: white;
    border: none;
    font-weight: bold;
  }
}
#agentDashboard{
  // margin: 130px 50px;
  h1{
    color: #405c58;
    display: flex;
    float: left;
  }
  table{
      margin: 0 auto;
    table-layout: fixed;
    border-collapse: collapse;
    width: 80%;
  }
  thead{
    background:#405C58;
    color: white;
  }
}
</style>
