<template>
    <div class="container">
      <br /><br />
      <div class="row">
        <div class="col-md-12 bg-light text-right">
          <div v-if="user.role == 1" class="container-fluid" alert="left">
            <button
              class="btn btn-success"
              @click="trainerAdd()"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fa fa-check-square"></i>&nbsp; ADD ITEM
            </button>
          </div>
        </div>
      </div>
      <br /><br />
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Time</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in trainers" :key="t._id">
                  <td>image</td>
                  <td><span v-text="t.trainerName"></span></td>
                  <td><span v-text="t.trainerContact"></span></td>
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
                    <button class="btn btn-danger" v-if="user.role == 1">
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
            <div class="modal-body">
              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Trainer Name"
                v-model="trainer.trainerName"
              />
              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Trainer Contact"
                v-model="trainer.trainerContact"
              />
              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Trainer Qualification"
                v-model="trainer.trainerQualification"
              />
              <input
                type="text"
                class="form-control form-control-sm mb-2"
                placeholder="Available Time"
                v-model="trainer.trainerTime"
              />
              
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="save()">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Delete Modal -->
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
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import store from "../store";
  import { useStore } from "vuex";
  export default {
    data() {
      return {
        store: useStore(),
        user: store.getters.getCurrentUser,
        isAdd: true,
        trainer: {
          trainerName: "",
          trainerContact: "",
          trainerQualification: "",
          trainerTime: "",
          
        },
        trainers: [],
      };
    },
    methods: {
      getData: async function () {
        const response = await axios.get("http://localhost:8070/trainers");
        this.trainers = response.data.data;
        console.log(this.trainers);
      },
      trainerAdd: function () {
        this.trainer = {
          trainerName: "",
          trainerContact: "",
          trainerQualification: "",
          trainerTime: "",
         
        };
        $("#exampleModalLabel").text("ADD ITEM");
        this.isAdd = true;
      },
      trainerEdit: function (t) {
        this.trainer = t;
        $("#exampleModalLabel").text("EDIT ITEM");
        this.isAdd = false;
        console.log(t);
      },
      save: async function () {
        if (this.isAdd) {
          const response = await axios.post(
            "http://localhost:8070/trainers",
            this.trainer
          );
          console.log(response.data);
        } else {
          console.log(this.trainer);
          console.log(this.isAdd);
        }
        location.reload();
      },
      
    },
    mounted: async function () {
      await this.getData();
    },
  };
  </script>