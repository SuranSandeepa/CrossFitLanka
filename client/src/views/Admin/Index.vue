<template>
  <div class="container">
    <br /><br />
    <div class="row">
      <div class="col-md-12 bg-light text-right">
        <div v-if="user.role == 1" class="container-fluid" alert="left">
          <button
            class="btn btn-success"
            @click="memberAdd()"
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
                <th scope="col">Address</th>
                <th scope="col">Description</th>
                <th scope="col">Schedule</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in members" :key="m._id">
                <td>image</td>
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
              placeholder="Member Name"
              v-model="member.memberName"
            />
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Mmber Address"
              v-model="member.memberAddress"
            />
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Member Contact"
              v-model="member.memberContact"
            />
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Description"
              v-model="member.description"
            />
            <input
              type="text"
              class="form-control form-control-sm mb-2"
              placeholder="Schedule"
              v-model="member.schedule"
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
import store from "../../store";
import { useStore } from "vuex";
export default {
  data() {
    return {
      store: useStore(),
      user: store.getters.getCurrentUser,
      isAdd: true,
      member: {
        memberName: "",
        memberAddress: "",
        memberContact: "",
        description: "",
        schedule: "",
      },
      members: [],
    };
  },
  methods: {
    getData: async function () {
      const response = await axios.get("http://localhost:8070/members");
      this.members = response.data.data;
      console.log(this.members);
    },
    memberAdd: function () {
      this.member = {
        memberName: "",
        memberAddress: "",
        memberContact: "",
        description: "",
        schedule: "",
      };
      $("#exampleModalLabel").text("ADD ITEM");
      this.isAdd = true;
    },
    memberEdit: function (m) {
      this.member = m;
      $("#exampleModalLabel").text("EDIT ITEM");
      this.isAdd = false;
      console.log(m);
    },
    save: async function () {
      if (this.isAdd) {
        const response = await axios.post(
          "http://localhost:8070/members",
          this.member
        );
        console.log(response.data);
      } else {
        console.log(this.member);
        console.log(this.isAdd);
      }
      location.reload();
    },
    // update: async function (item, i) {
    //   const response = await axios.put("/:id" + item._id, {
    //     itemCode: item.itemCode,
    //     itemName: item.itemName,
    //     itemPrice: item.itemPrice,
    //     description: item.description,
    //   });
    //   this.items[i] = response.data;
    // },
  },
  mounted: async function () {
    await this.getData();
  },
};
</script>
