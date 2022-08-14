<template>
  <div class="container">
    <br /><br />
    <div class="row">
      <div class="col-md-12 bg-light text-right">
        <div v-if="user.role == 1" class="container-fluid" alert="left">
          <button
            class="btn btn-success"
            @click="itemAdd()"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <i className="fa fa-check-square"></i>&nbsp; ADD ITEM
          </button>
        </div>
      </div>
    </div>
    <br /><br />
    <!--Search Bar-->
    <form class="form-inline">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search Item in here..."
        aria-label="Search"
        v-model="search"
      />
    </form>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in filteredItems" :key="i._id">
                <td>image</td>
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
              placeholder="Item Code"
              v-model="item.itemCode"
            />
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Item Name"
              v-model="item.itemName"
            />
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Item Price"
              v-model="item.itemPrice"
            />
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Description"
              v-model="item.description"
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
export default {
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
      isAdd: true,
      isEditing: false,
      item: { itemCode: "", itemName: "", itemPrice: "", description: "" },
      items: [],
      filteredItems: [],
      search: ""
    };
  },
  watch: {
    search: function () {
      this.filteredItems = this.items.filter((i) => (i.itemName.toLowerCase().includes(this.search.toLowerCase()) || i.itemCode.toLowerCase().includes(this.search.toLowerCase())));
    },
  },
  methods: {
    getData: async function () {
      const response = await axios.get("http://localhost:8070/store");
      this.items = response.data.data;
      this.filteredItems = response.data.data
    },
    itemAdd: function () {
      this.item = {
        itemCode: "",
        itemName: "",
        itemPrice: "",
        description: "",
      };
      $("#exampleModalLabel").text("ADD ITEM");
      this.isAdd = true;
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
      $('#deleteModalBody').text(`Are you sure you want to remove ${i.itemName}`)
    },
    save: async function () {
      if (this.isAdd) {
        const response = await axios.post(
          "http://localhost:8070/store",
          this.item
        );
        console.log(response.data);
      } else {
        const response = await axios.put(
          `http://localhost:8070/store/${this.item._id}`,
          this.item
        );
        console.log(response.data);
      }
      location.reload();
    },
    remove: async function(){
      const response = await axios.delete(`http://localhost:8070/store/${this.item._id}`);
      console.log(response.data);
      location.reload();
    }
  },
  mounted: async function () {
    await this.getData();
  },
};
</script>
