<template>
  <div class="container">
    <br /><br />
    <div class="card" >
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
              @click="memberAdd()"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fa fa-check-square"></i>&nbsp; ADD MEMBER
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
              placeholder="Search Member in here..."
              aria-label="Search"
              v-model="search"
            /><br /><br />
          </form>
        </div>
      </div>
    </div>
    <br /><br />

    <!-- <div class="card" v-for="m in filteredMembers" :key="m._id">
      <div class="card-header">
        {{ m.memberName }}
      </div>
      <div class="card-body">
        <img :src="getImage(m)" width="100" />
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div> -->

    <!-- table view -->
    <section class="memberTable">
    <div class="card" style="background: #c3fdb8;">
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table align-middle table table-hover table-fixed table table-success table-striped"
          >
            <thead class="thead-dark">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                <th scope="col">Description</th>
                <th scope="col">Schedule</th>
                <th scope="col">Modify</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in filteredMembers" :key="m._id">
                <td><img :src="getImage(m)" width="100" /></td>
                <td><span v-text="m.memberName"></span></td>
                <td><span v-text="m.memberAddress"></span></td>
                <td><span v-text="m.memberContact"></span></td>
                <td><span v-text="m.description"></span></td>
                <td><span v-text="m.schedule"></span></td>
                <td>
                  <button
                    class="btn btn-warning"
                    @click="memberEdit(m)"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    v-if="user.role == 1"
                  >
                    <i className="fa fa-edit"></i>&nbsp; EDIT
                  </button>
                  &nbsp;
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    v-if="user.role == 1"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    @click="memberDelete(m)"
                  >
                    <i className="far fa-trash-alt"></i>&nbsp; DELETE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </section>
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
            <div class="error" v-if="errors.memberName">
              <span class="badge bg-danger text-white"
                >{{ errors.imageType }} {{ errors.memberName }}</span
              >
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Member Name"
              v-model="member.memberName"
            />
            <div class="error" v-if="errors.memberAddress">
              <span class="badge bg-danger text-white">{{
                errors.memberAddress
              }}</span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Member Address"
              v-model="member.memberAddress"
            />
            <div class="error" v-if="errors.memberContact">
              <span class="badge bg-danger text-white">{{
                errors.memberContact
              }}</span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Member Contact"
              v-model="member.memberContact"
            />
            <div class="error" v-if="errors.description">
              <span class="badge bg-danger text-white">{{
                errors.description
              }}</span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Description"
              v-model="member.description"
            />
            <div class="error" v-if="errors.schedule">
              <span class="badge bg-danger text-white">{{
                errors.schedule
              }}</span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Schedule"
              v-model="member.schedule"
            />
            <div class="error" v-if="errors.imageSize">
              <span class="badge bg-danger text-white">{{
                errors.imageSize
              }}</span>
            </div>
            <div class="error" v-if="errors.imageType">
              <span class="badge bg-danger text-white">{{
                errors.imageType
              }}</span>
            </div>
            <form @submit.prevent="" enctype="multipart/form-data">
              <input
                type="file"
                accept="image/*"
                ref="file"
                @change="onSelect"
              />
            </form>
            <img id="preview" :src="previewImage" width="100" /><br/>
            <span class="badge bg-warning text-dark">Allowed JPG/JPEG/PNG files only! Maximum image size is 500kb only!</span>
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
          <!--Form validation -->
          <!-- <div
            please
            class="alert alert-danger w-10 p-2"
            role="alert"
            v-if="error.length"
          >
            <ui>
              <li v-for="(error, index) in error" :key="index">
                {{ error }}
              </li>
            >
          </div> -->
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
            <h5 class="modal-title" id="exampleDeleteModalLabel">
              Modal title
            </h5>
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
            <button type="button" class="btn btn-primary" @click="remove()">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../../store";
import { useStore } from "vuex";
import swal from "sweetalert";
export default {
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
      isAdd: true,
      isEditing: false,
      member: {
        memberName: "",
        memberAddress: "",
        memberContact: "",
        description: "",
        schedule: "",
        image: "",
      },
      members: [],
      filteredMembers: [],
      search: "",
      previewImage: null,
      error: [],
      errors: {
        memberName: "",
        memberAddress: "",
        memberContact: "",
        description: "",
        schedule: "",
        imageSize: "",
        imageType: "",
      },
    };
  },
  watch: {
    search: function () {
      this.filteredMembers = this.members.filter((m) =>
        m.memberName.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    getData: async function () {
      const response = await axios.get("http://localhost:8070/members");
      this.members = response.data.data;
      this.filteredMembers = response.data.data;
    },
    memberAdd: function () {
      this.member = {
        memberName: "",
        memberAddress: "",
        memberContact: "",
        description: "",
        schedule: "",
        image: "",
      };
      $("#exampleModalLabel").text("ADD MEMBER");
      this.isAdd = true;
    },
    memberEdit: function (m) {
      this.member = m;
      $("#exampleModalLabel").text("UPDATE MEMBER");
      this.isAdd = false;
      console.log(m);
    },
    memberDelete: function (m) {
      this.member = m;
      $("#exampleDeleteModalLabel").text("REMOVE MEMBER");
      $("#deleteModalBody").text(
        `Are you sure you want to remove ${m.memberName}`
      );
    },
    save: async function () {
      this.errors.memberName = "";
      this.errors.memberAddress = "";
      this.errors.memberContact = "";
      this.errors.description = "";
      this.errors.schedule = "";
      this.errors.imageSize = "";
      this.errors.imageType = "";
      // this.error = [];

      // if (
      //   this.member.memberName &&
      //   this.member.memberAddress &&
      //   this.member.memberContact &&
      //   this.member.description &&
      //   this.member.schedule
      // ) {
      if (this.member.memberName == "") {
        this.errors.memberName = "Member Name is required";
        console.log(this.errors.memberName);
      }
      if (this.member.memberAddress == "") {
        this.errors.memberAddress = "Member Address is required";
        console.log(this.errors.memberAddress);
      }
      if (this.member.memberContact == "") {
        this.errors.memberContact = "Member Contact is required";
        console.log(this.errors.memberContact);
      }
      if (this.member.description == "") {
        this.errors.description = "Description is required";
        console.log(this.errors.description);
      }
      if (this.member.schedule == "") {
        this.errors.schedule = "Schedule is required";
        console.log(this.errors.schedule);
      }
      if (
        this.member.memberName &&
        this.member.memberAddress &&
        this.member.memberContact &&
        this.member.description &&
        this.member.schedule
      ) {
        const formData = new FormData();
        formData.append("file", this.member.file);
        const serverFile = await axios.post(
          "http://localhost:8070/members/upload",
          formData
        );
        this.member.file = serverFile.data.file.filename;
        if (this.isAdd) {
          const response = await axios.post(
            "http://localhost:8070/members",
            this.member
          );
          swal({
            title: "Good job",
            text: "Member added successfully",
            icon: "success",
            button: "OK",
          }).then(function () {
            location.reload();
          });
          console.log(response.data);
        } else {
          const response = await axios.put(
            `http://localhost:8070/members/${this.member._id}`,
            this.member
          );
          swal({
            title: "Good job",
            text: "Member updated successfully",
            icon: "success",
            button: "OK",
          }).then(function () {
            location.reload();
          });
          console.log(response.data);
        }
        // location.reload();
      }

      // } else {
      //   if (!this.member.memberName) this.error.push("Name is required");
      //   if (!this.member.memberAddress) this.error.push("Address is required");
      //   if (!this.member.memberContact) this.error.push("Contact is required");
      //   if (!this.member.description)
      //     this.error.push("Description is required");
      //   if (!this.member.schedule) this.error.push("Schedule is required");
      // }
    },

    remove: async function () {
      const response = await axios.delete(
        `http://localhost:8070/members/${this.member._id}`
      );
      swal({
        title: "Good job",
        text: "Member deleted successfully",
        icon: "success",
        button: "OK",
      }).then(function () {
        location.reload();
      });
      console.log(response.data);
      location.reload();
    },
    onSelect: function () {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.member.file = file;
      if (!allowedTypes.includes(file.type)) {
        // this.message = "Filetype is wrong!!";
        this.errors.imageType = "Filetype is wrong!";
      }
      if (file.size > 500000) {
        // this.message = "Too large, max size allowed is 500kb";
        this.errors.imageSize = "Too large, max size allowed is 500kb";
      }
      this.previewImage = URL.createObjectURL(file);
    },
    getImage(m) {
      return `data:image/${m.file.contentType};base64,${m.file.data.toString(
        "base64"
      )}`;
    },
    reload() {
      location.reload();
    },
  },
  mounted: async function () {
    await this.getData();
  },
};
</script>
<style>
.error {
  color: red;
}
</style>
