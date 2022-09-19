<template>

  <!--container-->
  <div class="container shop_container">
    <br /><br />

    <!--Admin View Top section-->
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

          <!--Admin's Search Bar-->
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

    <!--User's Search View-->
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
    <!-- <div class="container mt-5">
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
    <br />
    <div align="right">
      <button class="btn btn-primary">Download PDF</button>
    </div> -->

    <!--3 by 3 Card View-->
    <section class="store store_top">
      <div class="shop_container">
        <div class="shop_heading text-center">
          <h4>VISIT OUR STORE AND KEEP YOUR FEEDBACK</h4>
          <h1>CrossFitLanka Store</h1>
        </div>
        <div class="shop_content shop_grid">
          <div class="shop_box btn_shadow" v-for="i in filteredItems" :key="i._id">
            <div class="shop_img">
              <img :src="getImage(i)" alt="" />
            </div>
            <div class="shop_category d_flex">
              <span>{{ i.itemCode }}</span>
              <label>
                Rs.{{ i.itemPrice }}
                <i class="far fa-heart"></i>
              </label>
            </div>
            <h2 class="shop_title">{{ i.itemName }}</h2>
            <!-- <p>{{ i.description }}</p> -->
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
    </section>
    <br />

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
              <span class="badge bg-danger text-white">{{
                errors.itemCode
              }}</span>
              <!-- <small>{{ errors.itemCode }}</small> -->
            </div>
            <label for="fname">Item Category:</label>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Item Category"
              v-model="item.itemCode"
              required
            />
            <div class="error" v-if="errors.itemName">
              <span class="badge bg-danger text-white">{{
                errors.itemName
              }}</span>
              <!-- <small>{{ errors.itemName }}</small> -->
            </div>
            <label for="fname">Item Name:</label>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Item Name"
              v-model="item.itemName"
              required
            />
            <div class="error" v-if="errors.itemPrice">
              <span class="badge bg-danger text-white">{{
                errors.itemPrice
              }}</span>
              <!-- <small>{{ errors.itemPrice }}</small> -->
            </div>
            <label for="fname">Item Price:</label>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Item Price"
              required
              v-model="item.itemPrice"
            />
            <div class="error" v-if="errors.description">
              <span class="badge bg-danger text-white">{{
                errors.description
              }}</span>
              <!-- <small>{{ errors.description }}</small> -->
            </div>
            <label for="fname">Item Description:</label>
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Description"
              v-model="item.description"
              required
            />
            <div class="error" v-if="errors.imageSize">
              <span class="badge bg-danger text-white">{{
                errors.imageSize
              }}</span>
              <!-- <small>{{ errors.imageSize }}</small> -->
            </div>
            <div class="error" v-if="errors.imageType">
              <span class="badge bg-danger text-white">{{
                errors.imageType
              }}</span>
              <!-- <small>{{ errors.imageType }}</small> -->
            </div>
            <label for="fname">Item Image:</label>
            <form @submit.prevent="" enctype="multipart/form-data">
              <input
                type="file"
                accept="image/*"
                ref="file"
                @change="onSelect"
                required
              />
            </form>
            <img id="preview" :src="previewImage" width="100" /><br />
            <span class="badge bg-warning text-dark">
              Allowed JPEG/PNG/JPG Files Only! & Maximum Image Size 500kb!
            </span>
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
        this.errors.itemCode = "Item Category is required";
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

<style scoped>

@import url("../assets/css/ItemCardView.css");

.price {
  font-size: 20px;
  font-weight: bold;
}
/* .error {
  color: white;
} */

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

.imageValidation {
  color: black;
}
</style>
