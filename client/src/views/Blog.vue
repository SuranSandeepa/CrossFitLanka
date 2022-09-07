<template>

  <div class="container">
    <br /><br />

    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />

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


    <div class="card" v-if="user.role == 1">
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
              @click="blogAdd()"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fa fa-check-square"></i>&nbsp; ADD BLOG
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
              placeholder="Search Blog in here..."
              aria-label="Search"
              v-model="search"
            /><br /><br />
          </form>
        </div>
      </div>
    </div>
    <br /><br />


    <!-- card view 01 -->

    <!-- <div class = "container" v-for="b in filteredblogs" :key="b._id">
      <div class ="row ">
        <div class="col-12 ">
          <div class ="card">

            <img :src="getImage(b)" width = "340" height = "340" >
            <div class="card-body">
              <h4 class="card-title">{{b.blogTitle}}</h4>
              <p class="card-text">{{b.description}}</p>
              <button
                    class="btn btn-warning"
                    @click="blogEdit(b)"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    v-if="user.role == 1"
                  >
                    <i className="fa fa-edit"></i>&nbsp; EDIT
                  </button>
                  &nbsp;
                  <button class="btn btn-danger" v-if="user.role == 1" data-toggle="modal"
                    data-target="#deleteModal"
                    @click="blogDelete(b)">
                    <i className="far fa-trash-alt"></i>&nbsp; DELETE
                  </button>

            </div>
            
          </div>
        </div>
      </div>
   </div> -->

   <!-- card view 02 -->
<div align = "center">
  <div class="card" style="width: 50rem;" v-for="b in filteredblogs" :key="b._id">
      <img  :src="getImage(b)" class = "imgCenter" >
        <div class="card-body">
          <h5 class="card-title">{{b.blogTitle}}</h5>
          <p class="card-text">{{b.description}}</p>
          
          <button
                    class="btn btn-warning"
                    @click="blogEdit(b)"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    v-if="user.role == 1"
                  >
                    <i className="fa fa-edit"></i>&nbsp; EDIT
                  </button>
                  &nbsp;
                  <button class="btn btn-danger" v-if="user.role == 1" data-toggle="modal"
                    data-target="#deleteModal"
                    @click="blogDelete(b)">
                    <i className="far fa-trash-alt"></i>&nbsp; DELETE
                  </button>
        </div>
    </div>
</div>
    

  
    <!--Table view -->
    
    <!-- <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Code</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
            <tbody>
              <tr v-for="b in filteredblogs" :key="b._id">
                <td><img :src="getImage(b)" width="100" /></td>
                <td><span v-text="b.blogCode"></span></td>
                <td><span v-text="b.blogTitle"></span></td>
                <td><span v-text="b.description"></span></td>
                <td>
                  <button
                    class="btn btn-warning"
                    @click="blogEdit(b)"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    v-if="user.role == 1"
                  >
                    <i className="fa fa-edit"></i>&nbsp; EDIT
                  </button>
                  &nbsp;
                  <button class="btn btn-danger" v-if="user.role == 1" data-toggle="modal"
                    data-target="#deleteModal"
                    @click="blogDelete(b)">
                    <i className="far fa-trash-alt"></i>&nbsp; DELETE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> -->

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

            <!-- blogcode validation -->
            <div class="error" v-if="errors.blogCode">
              <small>{{errors.blogCode}}</small>
            </div>

            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Blog Code"
              v-model="blog.blogCode"
            />

            <!-- Title vallidation -->
            <div class="error" v-if="errors.blogTitle">
              <small>{{errors.blogTitle}}</small>
            </div>

            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Blog Title"
              v-model="blog.blogTitle"
            />

            <!-- description validation  -->
            <div class="error" v-if="errors.description">
              <small>{{errors.description}}</small>
            </div>

            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Description"
              v-model="blog.description"
            />

            <!-- image validation -->
            <div class="error" v-if="errors.imageSize">
              <small>{{ errors.imageSize }}</small>
            </div>
            <div class="error" v-if="errors.imageType">
              <small>{{ errors.imageType }}</small>
            </div>

            <form @submit.prevent="" enctype="multipart/form-data">
              <input
                type="file"
                accept="image/*"
                ref="file"
                @change="onSelect"
              />
            </form>
            <img id="preview" :src="previewImage" width="100" />

          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="reload"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="save()">
              Save changes
            </button>
          </div>

          <!--form validation -->
          <!-- <div
          please
          class="alert alert-danger w-10 p-2"
          role="alert"
          v-if="error.length"
          >
          <ui>
            <li v-for="(error, index) in error" :key="index">{{ error }}</li>
          </ui>
          </div>  -->
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
          <div class="modal-body" id = "deleteModelBody">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="reload"
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

<!-- Javascript code -->
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
      blog: { blogCode: "", blogTitle: "", description: "" ,image:"" },
      blogs: [],
      filteredblogs: [],
      search:"", 
      preveiwimage: null,
      error: [],
      errors: {
        blogCode: "", 
        blogTitle: "",
        description: "",
        imageSize: "",
        imageType: "",
      }
    };
  },


  watch: {
    search: function () {
      this.filteredblogs = this.blogs.filter(
        (b) =>
          
          b.blogTitle.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },

  methods: {
    getData: async function () {
      const response = await axios.get("http://localhost:8070/blog");
      this.blogs = response.data.data;
      this.filteredblogs = response.data.data;
    },
    blogAdd: function () {
      this.blog = {
        blogCode: "",
        blogTitle: "",
        description: "",
        image: "",        
      };

      $("#exampleModalLabel").text("Create Blogs");
      this.isAdd = true;
    },
    blogEdit: function (b) {
      this.blog = b;
      $("#exampleModalLabel").text("Edit Blogs");
      this.isAdd = false;
      console.log(b);
    },

    blogDelete: function (i) {
      this.blog = b;
      $("#exampleDeleteModalLabel").text("Remove Blogs");
      $("#deleteModalBody").text(
        `Are you sure you want to remove ${b.blogTitle}`
      );
    },

    save: async function () {

      this.errors.blogCode = "";
      this.errors.blogTitle = "";
      this.errors.description = "";
      this.errors.imageSize = "";
      this.errors.imageType = "";

      // this.error = [];

      // if (
      //   this.blog.blogCode &&
      //   this.blog.blogTitle &&
      //   this.blog.description 
      // ) 
      //{

        if(this.blog.blogCode == "") {
          this.errors.blogCode = "Blog code is required";
          console.log(this.errors.blogCode);
        
        }

        if(this.blog.blogTitle == "") {
          this.errors.blogTitle = "Blog Title is required";
          console.log(this.errors.blogTitle);
        }

        if(this.blog.description == "") {
          this.errors.description = "Description is required";
          console.log(this.errors.description);
        }

        if (
          this.blog.blogCode &&
          this.blog.blogTitle &&
          this.blog.description 
        )  { 

            //save into database
          const formData = new FormData();
            formData.append("file", this.blog.file);
          const serverFile = await axios.post(
            "http://localhost:8070/blog/upload",
          formData
      );

      this.blog.file = serverFile.data.file.filename;
      if (this.isAdd) {
        const response = await axios.post(
          "http://localhost:8070/blog",
          this.blog
        );

        swal({
          title: "Good Job",
          text: " Blog Saved Successfully",
          icon: "Success",
          button:"Aww yiss!",
        }).then(function (){
          location.reload();
        });

        console.log(response.data);
      } else {
        const response = await axios.put(`http://localhost:8070/blog/${this.blog._id}`,this.blog);
        console.log(response.data);

        swal({
          title: "Good Job",
          text: " Blog Updated Successfully",
          icon: "Success",
          button:"Aww yiss!",
        }).then(function (){
          location.reload();
        });
      }
      //location.reload();
        }
      
    
  

      // } else {
      //   if (!this.blog.blogCode) this.error.push("Code is Required");
      //   if (!this.blog.blogTitle) this.error.push("Title is Required");
      //   if (!this.blog.description) this.error.push("Description is Required");
      // }
    },

    remove: async function () {
      const response = await axios.delete(
        `http://localhost:8070/blog/${this.blog._id}`
      );

      console.log(response.data);

      swal({
          title: "Good Job",
          text: " BIog Delete Successfully",
          icon: "Success",
          button:"Aww yiss!",
        }).then(function (){
          location.reload();
        });

      
      location.reload();
    },
    onSelect: function () {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.blog.file = file;

      if (!allowedTypes.includes(file.type)) {
        //this.message = "Filetype is wrong!!";
        this.errors.imageType = "File Type is wrong!!!";
      }
      if (file.size > 500000) {
        //this.message = "Too large, max size allowed is 500kb";
        this.errors.imageSize = "Too large, max size allowed is 500kb";
      }
      this.previewImage = URL.createObjectURL(file);
    },
    getImage(b) {
      return `data:image/${b.file.contentType};base64,${b.file.data.toString(
        "base64"
      )}`;
    },

    reload() {
      location.reload();
    }

  },
  mounted: async function () {
    await this.getData();
  },
};
</script>

<style>
    .error{
    color: red;
  }

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

.imgCenter {
  display: block;
  margin-left: auto;
  margin-right: auto;
  widows: 20%;
}
</style>