<template>
    <div class="container">
      <br /><br />

      <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />
      
      <div class="card" style="background: #C6F693;" v-if="user.role == 1">
      <div class="card-body">
        <div class="table-responsive">
          <!-- <div class="row">
            <div class="col-md-12 bg-light text-right"> -->
          <div
            v-if="user.role == 1"
            class="container-fluid"
            alert="left"
            align="right"
          >
            <button
              class="btn btn-success"
              @click="trainerAdd()"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fa fa-check-square"></i>&nbsp; ADD TRAINER
            </button>
            <!-- </div>
            </div> -->
          </div>
          <br /><br />
          <!--Search Bar-->
          <form align="left">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search Item in here..."
              aria-label="Search"
              v-model="search"
            /><br /><br />
          </form>
        </div>
      </div>
    </div>
      <br /><br />

      <!--Users Search View-->
    <div class="box" v-if="user.role == 2">
      <input type="checkbox" id="check" />
      <div class="search-box">
        <input type="text" placeholder="Search Here..." v-model="search" />
        <label for="check" class="icon">
          <i class="fas fa-search"></i>
        </label>
      </div>
    </div>
    <br/>
      <!--table view-->
      
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-middle table table-hover table-fixed table table-success table-striped" >
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th v-if="user.role == 1" scope="col">Contact</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Time</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  
                 
                </tr>
              <br/>
                
              </thead>
              <tbody>
                <tr v-for="t in filteredTrainers" :key="t._id">
                  <td><img :src="getImage(t)" width="100" /></td>
                  <td><span v-text="t.trainerName"></span></td>
                  <td v-if="user.role == 1"><span v-text="t.trainerContact"></span></td>
                  <td><span v-text="t.trainerQualification"></span></td>
                  <td><span v-text="t.trainerTime"></span></td>
                  
                  <td>
                    <button
                      class="btn btn-warning"
                      @click="trainerEdit(t)"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      v-if="user.role == 1"
                    >
                      <i className="fa fa-edit"></i>&nbsp; EDIT
                    </button>
                    &nbsp;
                    </td><td>
                    <button class="btn btn-danger" v-if="user.role == 1"
                      data-toggle="modal"
                    data-target="#deleteModal"
                    @click="trainerDelete(t)">
                      <i className="far fa-trash-alt"></i>&nbsp; DELETE
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Action Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body needs-validation">

              <div class="error" v-if="errors.trainerName">
                <span class="badge bg-danger text-white">{{
                  errors.trainerName
                  }}</span>

                

             <!-- <small>{{errors.trainerName}}</small>-->
              </div>
              <label for="fname">Trainer Name</label>
              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Trainer Name"
                v-model="trainer.trainerName"
                required
              />

              <div class="error" v-if="errors.trainerContact">
                <span class="badge bg-danger text-white">{{
                  errors.trainerContact
                  }}</span>

             <!-- <small>{{errors.trainerContact}}</small>-->
              </div>
              <label for="fname">Trainer Contact</label>

              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Trainer Contact"
                v-model="trainer.trainerContact"
                required
              />

              <div class="error" v-if="errors.trainerQualification">
                <span class="badge bg-danger text-white">{{
                  errors.trainerQualification
                  }}</span>

              <!--<small>{{errors.trainerQualification}}</small>-->
              </div>
              <label for="fname">Trainer Qualification</label>

              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Trainer Qualification"
                v-model="trainer.trainerQualification"
                required
              />

              <div class="error" v-if="errors.trainerTime">
                <span class="badge bg-danger text-white">{{
                  errors.trainerTime
                  }}</span>

              <!--<small>{{errors.trainerTime}}</small>-->
              </div>
              <label for="fname">Available Time</label>

              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Available Time"
                v-model="trainer.trainerTime"
                required
              />

              <div class="error" v-if="errors.imageSize">
                <span class="badge bg-danger text-white">{{
                  errors.imageSize
                  }}</span>

              <!--<small>{{errors.imageSize}}</small>-->
              </div>

              <div class="error" v-if="errors.imageType">
                <span class="badge bg-danger text-white">{{
                  errors.imageType
                  }}</span>

             <!-- <small>{{errors.imageType}}</small>-->
              </div>
              <label for ="fname">Item Image</label>
              <form @submit.prevent="" enctype="multipart/form-data">
              <input
                type="file"
                accept="image/*"
                ref="file"
                @change="onSelect"
                required
              />
            </form>
            <img id="preview" :src="previewImage" width="100" /><br/>
              <span class = "badge bg-warning text-dark">
                Allowed JPEG/PNG/JPG Files Only! & Maximum Image Size 500kb!
              </span>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="reload()"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="save()">
                Save changes
              </button>
            </div>

            <!--Form Validation-->
            <!--<div
              please
              class="alert alert-danger w-10 p-2"
              role="alert"
              v-if="error.length"
              >
              <ui>
                <li v-for="(error,index) in error" :key="index">{{error}}</li>
                </ui>
            </div>
-->
          </div>
        </div>
      </div>
      <!-- Delete Modal -->
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleDeleteModalLabel">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="deleteModalBody">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="reload()"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="remove()">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import store from "../store";
  import { useStore } from "vuex";
  import swal from "sweetalert";
  export default {
    data() {
      return {
        store: useStore(),
        user: store.getters.getCurrentUser,
        isAdd: true,
        isEditing: false,
        trainer: {
          trainerName: "",
          trainerContact: "",
          trainerQualification: "",
          trainerTime: "",
          image:""
          
        },
        trainers: [],
        filteredTrainers: [],
        search:"",
        previewImage:null,
        error: [],

        errors:{
          trainerName:"",
          trainerContact:"",
          trainerQualification:"",
          trainerTime:"",
          imageSize:"",
          imageType:"",

        },
      };
    },
    watch: {
    search: function () {
      this.filteredTrainers = this.trainers.filter(
        (t) =>
          t.trainerName.toLowerCase().includes(this.search.toLowerCase()) 
          
      );
    },
  },
    methods: {
      getData: async function () {
        const response = await axios.get("http://localhost:8070/trainers");
        this.trainers = response.data.data;
        this.filteredTrainers=response.data.data;
      },
      trainerAdd: function () {
        this.trainer = {
          trainerName: "",
          trainerContact: "",
          trainerQualification: "",
          trainerTime: "",
          image:"",
         
        };
        $("#exampleModalLabel").text("ADD TRAINER");
        this.isAdd = true;
      },
      trainerEdit: function (t) {
        this.trainer = t;
        $("#exampleModalLabel").text("UPDATE TRAINER");
        this.isAdd = false;
        console.log(t);
      },

      trainerDelete: function (t) {
      this.trainer = t;
      $("#exampleDeleteModalLabel").text("REMOVE TRAINER");
      $("#deleteModalBody").text(
        `Are you sure you want to remove ${t.trainerName}`
      );
    },
      save: async function () {

        this.errors.trainerName="";
        this.errors.trainerContact="";
        this.errors.trainerQualification="";
        this.errors.trainerTime="";
        this.errors.imageSize="";
        this.errors.imageType="";

        //this.error = [];
        //if(
          //this.trainer.trainerName &&
          //this.trainer.trainerContact&&
          //this.trainer.trainerQualification&&
          //this.trainer.trainerTime

       // ){

        if(this.trainer.trainerName==""){
          this.errors.trainerName="Trainer name is required";
          console.log(this.errors.trainerName);
        }

        if(this.trainer.trainerContact==""){
          this.errors.trainerContact="Trainer contact is required";
          console.log(this.errors.trainerContact);
        }

        if(this.trainer.trainerQualification==""){
          this.errors.trainerQualification="Trainer qualifications are required";
          console.log(this.errors.trainerQualification);
        }

        if(this.trainer.trainerTime==""){
          this.errors.trainerTime="Available time is required";
          console.log(this.errors.trainerTime);
        }

        if(
          this.trainer.trainerName &&
          this.trainer.trainerContact &&
          this.trainer.trainerQualification &&
          this.trainer.trainerTime
          ){
          const formData = new FormData();
      formData.append("file", this.trainer.file);
      const serverFile = await axios.post(
        "http://localhost:8070/trainers/upload",
        formData
      );
      this.trainer.file = serverFile.data.file.filename;
        if (this.isAdd) {
          const response = await axios.post(
            "http://localhost:8070/trainers",
            this.trainer
          );
          swal({
            title: "Good job",
            text:"Item Saved Successfully",
            icon:"success",
            button:"Aww yiss!",


          }).then(function(){
              location.reload();
          });
          
          console.log(response.data);
        } else {
          const response = await axios.put(`http://localhost:8070/trainers/${this.trainer._id}`,this.trainer);
          
          console.log(response.data);

          swal({
            title: "Good job",
            text:"Item Updated Successfully",
            icon:"success",
            button:"Aww yiss!",


          }).then(function(){
              location.reload();
          });
          
        }
        //location.reload();
        }



          
     // }else{
      //if(!this.trainer.trainerName)this.error.push("Name is Required");
      //if(!this.trainer.trainerContact)this.error.push("Contact Number is Required");
      //if(!this.trainer.trainerQualification)this.error.push("Qualifications are Required");
      //if(!this.trainer.trainerTime)this.error.push("Available Time is Required");
      //}
    },
     
      remove: async function () {
      const response = await axios.delete(
        `http://localhost:8070/trainers/${this.trainer._id}`
      );
      console.log(response.data);
      location.reload();
    },
    onSelect: function () {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.trainer.file = file;
      if (!allowedTypes.includes(file.type)) {
       // this.message = "Filetype is wrong!!";
        this.errors.imageType = "Filetype is wrong!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
        this.errors.imageSize = "Too large, max size allowed is 500kb";
      }
      this.previewImage = URL.createObjectURL(file);
    },
    getImage(t) {
      return `data:image/${t.file.contentType};base64,${t.file.data.toString(
        "base64"
      )}`;
    },
    reload(){
      location.reload();
    },
    },
    mounted: async function () {
      await this.getData();
    },
  };
  </script>

 <style>

  .error { color:red}

  .box {
  max-width: 1000px;
  width: 100%;
}
.box .search-box {
  position: relative;
  height: 50px;
  max-width: 50px;
  margin: auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  transition: all 0.3s ease;
}

#check:checked ~ .search-box {
  max-width: 380px;
}

.search-box input {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 25px;
  background: rgb(50, 228, 139);
  outline: none;
  border: none;
  padding-left: 20px;
  font-size: 18px;
}
.search-box .icon {
  position: absolute;
  right: -2px;
  top: 0;
  width: 50px;
  background: black;
  height: 100%;
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 20px;
  border-radius: 25px;
}
#check:checked ~ .search-box .icon {
  background: #fff;
  color: black;
  width: 60px;
  border-radius: 0 25px 25px 0;
}
#check {
  display: none;
}
 </style>