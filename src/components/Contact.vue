<template>
<div id="contact">
  <h1>Converted Contacts</h1>
  <table>
    <thead>
      <tr>
        <th>FIRSTNAME</th>
        <th>LASTNAME</th>
        <th>EMAIL</th>
        <th>PHONE NUMBER</th>
        <th>ADDRESS</th>
        <th>SOURCE</th>
      </tr>
    </thead>
    <tbody>
      <tr class="contact" v-for="contact in contacts" :key="contact.id">
        <td>{{ contact.firstName }}</td>
        <td>{{ contact.lastName }}</td>
        <td>{{ contact.leadEmail }}</td>
        <td>{{ contact.mobileNo }}</td>
        <td>{{ contact.address }}</td>
        <td>{{ contact.source }}</td>
      </tr>
    </tbody>
    <tbody v-if="nullContact" id="nullContact">No Contacts Found</tbody>
  </table>
</div>
</template>

<script>
import axios from 'axios'
import { getCookie } from '../cookies'
import api from '../config/api'
export default {
  name: 'Contact',
  // props: ['contacts']
  data: () => ({
    contacts: [],
    nullContact: false
  }),
  created () {
    const url = api.BASE_URL_LOCAL + 'lead/getContact'
    const headers = {
      Authorization: getCookie('agent_id')
    }
    axios.get(url, { headers: headers }).then((response) => {
      console.log(response)
      this.contacts = response.data
      if (this.contacts.length === 0) {
        this.nullContact = true
      }
    })
  }
}
</script>

<style lang="scss">
#contact{
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
#nullContact {
  width: 100%;
  text-align: center;
  // border: 2px dashed black;
  line-height: 70px;
  font-weight: bold;
}
}
</style>
