<template>
  <div class="container">
    <br /><br />

    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />

    <div class="card" v-if="user.role == 1">
      <div class="card-body">
        <div class="table-responsive">
          <!--Insert Item Btn-->
          <div
            v-if="user.role == 1"
            class="container-fluid"
            alert="left"
            align="right"
          >
            <button
              class="btn btn-success"
              @click="itemAdd()"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fa fa-check-square"></i>&nbsp; ADD ITEM
            </button>
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

    <!--Items Card View -->
    <!--Items Horizontal Card View -->
    <div class="container mt-5">
      <div class="card" v-for="i in filteredItems" :key="i._id">
        <div class="row">
          <div class="col-md-4">
            <img :src="getImage(i)" width="300" />
          </div>
          <div class="col-md-8">
            <h2 class="card-title mt-2">{{ i.itemName }}</h2>
            <p class="price">Rs.{{ i.itemPrice }}</p>
            <p>{{ i.description }}</p>
            <div>
              <button
                class="btn btn-warning"
                @click="itemEdit(i)"
                data-toggle="modal"
                data-target="#exampleModal"
                v-if="user.role == 1"
              >
                <i className="fa fa-edit"></i>&nbsp; EDIT
              </button>
              &nbsp;
              <button
                class="btn btn-danger"
                v-if="user.role == 1"
                data-toggle="modal"
                data-target="#deleteModal"
                @click="itemDelete(i)"
              >
                <i className="far fa-trash-alt"></i>&nbsp; DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Items Big Card View  -->
    <!-- <section class="products">
      <div class="product" v-for="i in filteredItems" :key="i._id">
        <div class="product-inner">
          <div class="product-text-wrap">
            <h2 class="bg-text">{{ i.itemName }}</h2>
          </div>
          <div class="product-image-wrap">
          <img :src="getImage(i)" width="100" />
          </div>
          <div class="producr-details">
            <h2>RS.{{ i.itemPrice }}</h2>
            <p>{{ i.itemCode }}</p>
            <p>{{ i.description }}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              a accusamus soluta iusto quos praesentium cupiditate, vero nam
              consequuntur rerum voluptate et, quod dolorem! Nihil aliquid
              ducimus suscipit voluptas beatae!
            </p>
            <div align="center">
              <button
                class="btn btn-warning"
                @click="itemEdit(i)"
                data-toggle="modal"
                data-target="#exampleModal"
                v-if="user.role == 1"
              >
                <i className="fa fa-edit"></i>&nbsp; EDIT
              </button>
              &nbsp;
              <button
                class="btn btn-danger"
                v-if="user.role == 1"
                data-toggle="modal"
                data-target="#deleteModal"
                @click="itemDelete(i)"
              >
                <i className="far fa-trash-alt"></i>&nbsp; DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!--Items Table View  -->
    <!-- <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">IMAGE</th>
                <th scope="col">CODE</th>
                <th scope="col">ITEM NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in filteredItems" :key="i._id">
                <td><img :src="getImage(i)" width="100" /></td>
                <td><span v-text="i.itemCode"></span></td>
                <td><span v-text="i.itemName"></span></td>
                <td><span v-text="i.itemPrice"></span></td>
                <td><span v-text="i.description"></span></td>
                <td>
                  <button
                    class="btn btn-warning"
                    @click="itemEdit(i)"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    v-if="user.role == 1"
                  >
                    <i className="fa fa-edit"></i>&nbsp; EDIT
                  </button>
                  &nbsp;
                  <button
                    class="btn btn-danger"
                    v-if="user.role == 1"
                    data-toggle="modal"
                    data-target="#deleteModal"
                    @click="itemDelete(i)"
                  >
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
            <div class="error" v-if="errors.itemCode">
              <small>{{ errors.itemCode }}</small>
            </div>
            <input
              type="number"
              class="form-control form-control-sm mb-2"
              placeholder="Item Code"
              v-model="item.itemCode"
              required
            />
            <div class="error" v-if="errors.itemName">
              <small>{{ errors.itemName }}</small>
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Item Name"
              v-model="item.itemName"
              required
            />
            <div class="error" v-if="errors.itemPrice">
              <small>{{ errors.itemPrice }}</small>
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Item Price"
              required
              v-model="item.itemPrice"
            />
            <div class="error" v-if="errors.description">
              <small>{{ errors.description }}</small>
            </div>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Description"
              v-model="item.description"
              required
            />
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
                required
              />
            </form>
            <img id="preview" :src="previewImage" width="100" />
          </div>
          <!--Form Validation-->
          <!-- <div v-for="i in error" v-bind:key="i">
            <div
              please
              class="alert alert-danger w-10 p3"
              role="alert"
              align="center"
            >
              <p>Please Enter {{ i }}</p>
            </div>
          </div> -->
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
              Submit
            </button>
          </div>
          <!--Form Validation-->
          <!-- <div
            please
            class="alert alert-danger w-10 p-2"
            role="alert"
            v-if="error.length"
          >
            <ui>
              <li v-for="(error, index) in error" :key="index">{{ error }}</li>
            </ui>
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
      item: {
        itemCode: "",
        itemName: "",
        itemPrice: "",
        description: "",
        image: "",
      },
      items: [],
      filteredItems: [],
      search: "",
      previewImage: null,
      error: [],
      errors: {
        itemCode: "",
        itemName: "",
        itemPrice: "",
        description: "",
        imageSize: "",
        imageType: "",
      },
    };
  },
  watch: {
    search: function () {
      this.filteredItems = this.items.filter((i) =>
        i.itemName.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    getData: async function () {
      const response = await axios.get("http://localhost:8070/store");
      this.items = response.data.data;
      this.filteredItems = response.data.data;
    },
    itemAdd: function () {
      this.item = {
        itemCode: "",
        itemName: "",
        itemPrice: "",
        description: "",
        image: "",
      };
      $("#exampleModalLabel").text("ADD ITEM");
      this.isAdd = true;
      this.error = []; //form validation
    },
    itemEdit: function (i) {
      this.item = i;
      $("#exampleModalLabel").text("EDIT ITEM");
      this.isAdd = false;
      console.log(i);
    },
    itemDelete: function (i) {
      this.item = i;
      $("#exampleDeleteModalLabel").text("REMOVE ITEM");
      $("#deleteModalBody").text(
        `Are you sure you want to remove ${i.itemName}`
      );
    },
    dateTimePicker: function () {
      $("#datetimepicker").datetimepicker({
        format: "YYYY-MM-DD",
      });
    },
    save: async function () {
      this.errors.itemCode = "";
      this.errors.itemName = "";
      this.errors.itemPrice = "";
      this.errors.description = "";
      this.errors.imageSize = "";
      this.errors.imageType = "";
      // this.error = [];

      // if (
      //   this.item.itemCode &&
      //   this.item.itemName &&
      //   this.item.itemPrice &&
      //   this.item.description
      // ) {
      if (this.item.itemCode == "") {
        this.errors.itemCode = "Item Code is required";
        console.log(this.errors.itemCode);
      }
      if (this.item.itemName == "") {
        this.errors.itemName = "Item Name is required";
        console.log(this.errors.itemName);
      }
      if (this.item.itemPrice == "") {
        this.errors.itemPrice = "Item Price is required";
        console.log(this.errors.itemPrice);
      }
      if (this.item.description == "") {
        this.errors.description = "Item Description is required";
        console.log(this.errors.description);
      }
      if (
        this.item.itemCode &&
        this.item.itemName &&
        this.item.itemPrice &&
        this.item.description
      ) {
        //save to database
        const formData = new FormData();
        formData.append("file", this.item.file);
        const serverFile = await axios.post(
          "http://localhost:8070/store/upload",
          formData
        );
        this.item.file = serverFile.data.file.filename;
        if (this.isAdd) {
          const response = await axios.post(
            "http://localhost:8070/store",
            this.item
          );
          swal({
            title: "Good job",
            text: "Item Saved Successfully",
            icon: "success",
            button: "Aww yiss!",
          }).then(function () {
            location.reload();
          });
          console.log(response.data);
        } else {
          const response = await axios.put(
            `http://localhost:8070/store/${this.item._id}`,
            this.item
          );
          swal({
            title: "Good job",
            text: "Item Updated Successfully",
            icon: "success",
            button: "Aww yiss!",
          }).then(function () {
            location.reload();
          });
          console.log(response.data);
        }
        //location.reload();
      }

      // } else {
      //   if (!this.item.itemCode) this.error.push("Code is Required");
      //   if (!this.item.itemName) this.error.push("Name is Required");
      //   if (!this.item.itemPrice) this.error.push("Price is Required");
      //   if (!this.item.description) this.error.push("Description is Required");
      // }
    },
    remove: async function () {
      const response = await axios.delete(
        `http://localhost:8070/store/${this.item._id}`
      );
      console.log(response.data);
      swal({
        title: "Good job",
        text: "Item Deleted Successfully",
        icon: "success",
        button: "Aww yiss!",
      }).then(function () {
        location.reload();
      });
    },
    onSelect: function () {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.item.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
        //this.errors.push("Filetype is wrong");
        this.errors.imageType = "Filetype is wrong!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
        //this.errors.push("Too large, max size allowed is 500kb");
        this.errors.imageSize = "Too large, max size allowed is 500kb";
      }
      this.previewImage = URL.createObjectURL(file);
    },
    getImage(i) {
      return `data:image/${i.file.contentType};base64,${i.file.data.toString(
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
.price {
  font-size: 20px;
  font-weight: bold;
}
.error {
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
</style>