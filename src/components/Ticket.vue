<template>
  <div>
    <h2 style="text-align:center">Ticket</h2>
    <div class="card">
      <div>
        <label for="">Ticket ID:</label> <p class="style"> {{ lead.ticketId }} </p>
      </div>
      <div class="leads"><label>First Name:</label> <p class="style"> {{lead.firstName}}</p>
      <label>Last Name:</label> <p class="style">{{lead.lastName}}</p></div>
      <div class="leads"><label>Lead E-mail:</label> <p class="style">{{lead.userEmail}}</p>
      <label>Source:</label> <p class="style">{{lead.source}}</p></div>
      <div class="leads"><label>Status:</label> <p class="style">{{lead.ticketStatus}}</p>
      <label>Post Id:</label> <p class="style">{{lead.postId}}</p></div>
      <div class="leads"><label id=comment>Comments:</label> <input type="text" name="comments" placeholder="Enter the comments" v-model="comments"></div>
      <div class="leads"><label>Support Documents:</label>
      <input type="file" accept="image/*" v-on:change="imageAdded($event)" id="uploadPic" />
      </div>
      <button @click="Posting(), $refs.dpModal.closeModal()">Save</button>
      <div v-if="docSaved">Document Saved</div>
      <button class = "full" @click="closeTicket">Close Ticket</button>
   </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/storage'
import axios from 'axios'
import { getCookie } from '../cookies'
import api from '../config/api'
export default {
  data: () => ({
    comments: '',
    documentURL: '',
    selectedFile: null,
    api: '3abb699ec797f36df2928d0be30785c9',
    docSaved: false
  }),
  props: {
    lead: {
      type: Object
    }
  },
  methods: ({
    closeTicket () {
      const url = api.BASE_URL_LOCAL + 'ticket/closeTicket'
      const headers = {
        Authorization: getCookie('agent_id')
      }
      axios.post(url, { source: this.lead.source, firstName: this.lead.firstName, lastName: this.lead.lastName, postId: this.lead.postId, userEmail: this.lead.userEmail, ticketStatus: 'Closed', comments: this.comments, documentURL: this.documentURL, adminEmail: this.lead.adminEmail, ticketId: this.lead.ticketId }, { headers: headers }).then((res) => {
        console.log(res)
        // this.$router.push('/ticketdashboard')
        window.location.reload()
      }).catch(e => {
        console.log(e)
      })
    },
    imageAdded (event) {
      console.log('inside imageAdded')
      this.imageData = event.target.files[0]
    },
    Posting () {
      console.log('inside posting')
      //   this.imgUrl = null
      this.docSaved = true
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData)
      storageRef.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error.message)
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            // this.imgUrl = url
            this.storyURL = url
            console.log('storyURL  = ', this.storyURL)
            this.documentURL = this.storyURL
            console.log(this.documentURL)
            this.saveUpload()
          })
        }
      )
    }
  })
}
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: auto;
  text-align: center;
  font-family: arial;
  font-size: 18px;
}

.title {
  color: grey;
  font-size: 18px;
}

.style {
  margin-right: 40px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: fit-content;
  font-size: 18px;
  margin-top: 10px;
}

.full {
  width: 100%;
}

label {
  /* display: block; */
  padding: 5px;
  text-decoration-line: underline;
  font-weight: bold;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}

input[type=file] {
  width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
  background: #ffffff;
  font-size: 18px;
}

input[type=text] {
width: 60%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border-bottom: 1px solid #ccc;
  border-top: none;
  border-left: none;
  border-right: none;
  box-sizing: border-box;
  background: #ffffff;
  margin-bottom: 2%;
  font-size: 18px;
}
.leads {
  display: flex;
  padding: 10px;
  justify-content: space-between;
}

p {
  display: inline;
}

</style>
