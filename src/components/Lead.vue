<template>
<div id="lead">
  <h1>Leads</h1>
  <table>
  <thead>
    <tr>
      <th>FIRSTNAME</th>
      <th>LASTNAME</th>
      <th>EMAIL</th>
      <th>SOURCE</th>
      <th></th>
    </tr>
  </thead>
  <tbody v-if="!nullLead">
    <tr class="lead" v-for="lead in leads" :key="lead.id">
      <td>{{ lead.firstName }}</td>
      <td>{{ lead.lastName }}</td>
      <td>{{ lead.leadEmail }}</td>
      <td>{{ lead.source }}</td>
      <td><button class="agent" @click="convertLead(lead)">Convert</button><button class="agent" @click="remove(lead.adminEmail, lead.leadEmail)">Remove</button></td>
    </tr>
  </tbody>
  <tbody v-if="nullLead" id="nullLead">No Leads Found</tbody>
</table>
</div>
</template>

<script>
import axios from 'axios'
import { getCookie } from '../cookies'
import api from '../config/api'
export default {
  name: 'Lead',
  // props: ['leads']
  data: () => ({
    convert: false,
    leads: [],
    convertObj: {},
    nullLead: false
  }),
  methods: ({
    convertLead (lead) {
      this.convertObj = lead
      this.$store.dispatch('fetchLead', this.convertObj)
      this.$router.push('/convertlead')
    },
    remove (adminEmail, leadEmail) {
      const url = api.BASE_URL_LOCAL + 'lead/deleteLead?adminEmail=' + adminEmail + '&leadEmail=' + leadEmail
      const headers = {
        Authorization: getCookie('agent_id')
      }
      axios.delete(url, { headers: headers }).then(() => {
        window.location.reload()
      })
    }
  }),
  created () {
    const url = api.BASE_URL_LOCAL + 'lead/getLead'
    const headers = {
      Authorization: getCookie('agent_id')
    }
    axios.get((url), { headers: headers }).then((response) => {
      console.log(response)
      this.leads = response.data
      console.log(this.leads)
      if (this.leads.length === 0) {
        this.nullLead = true
      }
    })
  }
}
</script>

<style lang="scss">
#lead{
  margin: 130px 50px;
  h1{
    color: #405c58;
    display: flex;
    float: left;
  }
table{
      margin: 0 auto;
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
  }
  thead{
    background:#405C58;
    color: white;
  }
  td{
    text-align: center;
    padding: 5px 3px;
    margin: 10px;
    word-break: break-all;
    border:1px solid #405C58;
    border-radius: 10px;
  }
  th{
    text-align: center;
    padding: 5px 3px;
    margin: 10px;
    word-break: break-all;
    border:1px solid #405C58;
  }
  a, a:visited{
    color:#405C58;
    text-decoration-line: none;
  }
  a:hover{
    color: white;
  }
.agent{
  margin:10px;
  width: 90px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #405C58;
  transition-duration: 500ms;
}
.agent:hover{
  background: #405C58;
  color: white;
  box-shadow: 2px 2px 10px #314b47;
}
.login:hover{
    background: #405C58;
  color: white;
  box-shadow: 2px 2px 10px #314b47;
}
}
#nullLead {
  width: 100%;
  text-align: center;
  // border: 2px dashed black;
  line-height: 70px;
  font-weight: bold;
}
</style>
