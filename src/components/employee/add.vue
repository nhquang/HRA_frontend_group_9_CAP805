<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Add Employee</p>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn" @click="back()">
            <i class="fa fa-chevron-left"></i>
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
    <div class="sm-page-body">
      <div class="row mx-2">
        <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
          <div class="row sm-page-block mx-2">
            <div class="title">General Information</div>
            <div class="col-12 mb-2">
              <label class="req">Activation Code</label>
              <input type="text" readonly="true" disabled="true" />
            </div>
            <div class="col-6 mb-2 pr-2">
              <label class="req">First Name</label>
              <input type="text" id="fname" v-model="fname" />
            </div>
            <div class="col-6 mb-2 pl-1">
              <label class="req">Last Name</label>
              <input type="text" id="lname" v-model="lname" />
            </div>
            <!-- <div class="col-12 mb-2">
              <label class="req">User Name</label>
              <input type="text" id="username" v-model="username" />
            </div> -->
            <div class="col-6 mb-2 pr-2">
              <label class="req">Email</label>
              <input type="email" id="email" v-model="email" />
            </div>
            <div class="col-6 mb-2 pl-1">
              <label class="req">Phone No.</label>
              <input type="text" id="phone" v-model="phone" />
            </div>
            <div class="col-6 mb-2 pr-1">
              <label class="req">Branch</label>
              <select
                v-model="branchId"
                id="branchId"
                @change="getDepartment()"
              >
                <option value="">--Select--</option>
                <option
                  v-for="(item, index) in master_branches"
                  :key="index"
                  :value="item._id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>

            <div class="col-6 mb-2 pl-1">
              <label class="req">Department</label>
              <select v-model="deparmentId" id="deparmentId">
                <option value="">--Select--</option>
                <option
                  v-for="(item, index) in master_departments"
                  :key="index"
                  :value="item._id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="col-6 mb-2 pr-1">
              <label class="req">Role</label>
              <select id="role" v-model="role">
                <option value="" selected>--Select--</option>
                <option value="admin" v-if="current_user_role == 'admin'">Admin</option>
                <option value="hr_manager" v-if="current_user_role == 'admin'">
                  HR Manager
                </option>
                <option value="hr_staff" v-if="current_user_role != 'hr_staff'">
                  HR Staff
                </option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div class="col-6 mb-2 pl-1">
              <label class="req">Gender</label>
              <select id="gender" v-model="gender">
                <option value="">--Select--</option>
                <option value="male" selected>Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div class="col-6 mb-2 pr-1">
              <label class="req">Hire Date</label>
              <input type="date" id="hireDate" v-model="hireDate" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
          <div class="row sm-page-block mx-2">
            <div class="title">Address</div>
            <div class="col-12 mb-2 px-2">
              <label class="req">Street Address</label>
              <textarea
                cols="30"
                rows="1"
                id="streetAddress"
                v-model="streetAddress"
              ></textarea>
            </div>
            <div class="col-12 mb-2 px-2">
              <label class="req">City</label>
              <input type="text" id="city" v-model="city" />
            </div>
            <div class="col-12 mb-2 px-2">
              <label class="req">Province</label>
              <input type="text" id="province" v-model="province" />
            </div>
            <div class="col-12 mb-2 px-2">
              <label class="req">Country</label>
              <input type="text" id="country" v-model="country" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12 p-0">
          <div class="row sm-page-block mx-2">
            <div class="title">Pay Info</div>
            <div class="w-100"></div>
            <div class="col-6 mb-2 px-2">
              <label class="req">Frequency</label>
              <select id="payInfo_frequency" v-model="payInfo.frequency">
                <option value="">--Select--</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div class="col-12 mb-2 px-2">
              <label class="req">A/C No.</label>
              <input
                type="text"
                id="payInfo_bankAccountNumber"
                v-model="payInfo.bankAccountNumber"
              />
            </div>
            <div class="col-6 mb-2 px-2">
              <label class="req">Salary</label>
              <input type="text" id="payInfo_salary" v-model="payInfo.salary" />
            </div>
            <div class="col-6 mb-2 px-2">
              <label class="req">Gross Amount</label>
              <input
                type="text"
                id="payInfo_grossAmount"
                v-model="payInfo.grossAmount"
              />
            </div>
            <div class="col-6 mb-2 px-2">
              <label class="req">First Pay Date</label>
              <input
                type="date"
                id="payInfo_firstPayDate"
                v-model="payInfo.firstPayDate"
              />
            </div>
            <div class="col-12 mb-2 px-2">
              <div class="d-flex">
                <input
                  type="checkbox"
                  id="stillEmployed"
                  class="w-auto my-auto mr-2"
                  v-model="stillEmployed"
                />
                <label for="stillEmployed" class="my-auto">
                  Still Employee</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm-page-footer">
      <div class="row">
        <div class="col-12 my-auto">
          <button class="btn save-btn" @click="save()">
            <i class="fa fa-check"></i>
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { formValidation } from "@/helper/form_validation";
export default {
  mixins: [formValidation],
  data() {
    return {
      fname: "",
      lname: "",
      gender: "",
      //username: "",
      role: "",
      hireDate: "",
      email: "",
      streetAddress: "",
      city: "",
      province: "",
      country: "",
      phone: "",
      stillEmployed: "",
      branchId: "",
      deparmentId: "",
      payInfo: {
        frequency: "",
        bankAccountNumber: "",
        firstPayDate: "",
        salary: "",
        grossAmount: "",
      },
      role: "",
      current_user_role: "",

      master_branches: [],
      master_departments: [],
    };
  },
  validators: {
    fname(value) {
      return this.validator.value(value).required(this.required("First Name"));
    },
    lname(value) {
      return this.validator.value(value).required(this.required("Last Name"));
    },
    // username(value) {
    //   return this.validator.value(value).required(this.required("User Name"));
    // },
    gender(value) {
      return this.validator.value(value).required(this.required("Gender"));
    },
    role(value) {
      return this.validator.value(value).required(this.required("Role"));
    },
    hireDate(value) {
      return this.validator.value(value).required(this.required("HireDate"));
    },
    email(value) {
      return this.validator.value(value).required(this.required("Email"));
    },
    streetAddress(value) {
      return this.validator
        .value(value)
        .required(this.required("Street Address"));
    },
    city(value) {
      return this.validator.value(value).required(this.required("City"));
    },
    province(value) {
      return this.validator.value(value).required(this.required("Province"));
    },
    country(value) {
      return this.validator.value(value).required(this.required("Country"));
    },
    phone(value) {
      return this.validator.value(value).required(this.required("Phone"));
    },
    stillEmployed(value) {
      return this.validator
        .value(value)
        .required(this.required("Still Employed"));
    },
    deparmentId(value) {
      return this.validator.value(value).required(this.required("DeparmentId"));
    },
    payInfo(value) {
      this.validate(
        "payInfo_frequency",
        this.validator
          .value(value.frequency)
          .required(this.required("frequency"))
      );
      this.validate(
        "payInfo_bankAccountNumber",
        this.validator
          .value(value.bankAccountNumber)
          .required("Bank Account Number")
      );
      this.validate(
        "payInfo_salary",
        this.validator.value(value.salary).required(this.required("Salary"))
      );
      this.validate(
        "payInfo_firstPayDate",
        this.validator
          .value(value.firstPayDate)
          .required(this.required("first Pay Date"))
      );
      this.validate(
        "payInfo_grossAmount",
        this.validator
          .value(value.grossAmount)
          .required(this.required("Gross Amount"))
      );
    },
  },
  methods: {
    back() {
      this.$router.push("/employee");
    },
    async save() {
      this.resetFormError();
      var confirm = await this.$confirm("Are you sure to save?");
      if (confirm) {
        this.$validate();
        if (this.validation.errors.length == 0) {
          try {
            this.$store.state.loading = true;
            var data = {
              fname: this.fname,
              lname: this.lname,
              gender: this.gender,
              //username: this.username,
              role: this.role,
              hireDate: this.hireDate,
              email: this.email,
              streetAddress: this.streetAddress,
              city: this.city,
              province: this.province,
              country: this.country,
              phone: this.phone,
              stillEmployed: this.stillEmployed,
              branchId: this.branchId,
              deparmentId: this.deparmentId,
              payInfo: {
                frequency: this.payInfo.frequency,
                bankAccountNumber: this.payInfo.bankAccountNumber,
                firstPayDate: this.payInfo.firstPayDate,
                salary: this.payInfo.salary,
                grossAmount: this.payInfo.grossAmount,
              },
            };
            var response = await axios.post(
              this.$store.state.apiUrl + "/employees/add_employee",
              data,
              {
                headers: {
                  Authorization: "Bearer " + this.$cookies.get("_t_hrm"),
                },
              }
            );
            if (response.hasOwnProperty("data")) {
              // this.activationCode = "";
              // this.fname = "";
              // this.lname = "";
              // this.gender = "";
              // this.username = "";
              // this.role = "";
              // this.hireDate = "";
              // this.email = "";
              // this.streetAddress = "";
              // this.city = "";
              // this.province = "";
              // this.country = "";
              // this.phone = "";
              // this.stillEmployed = "";
              // this.deparmentId = "";
              // this.branchId = "";
              // this.payInfo.frequency = "";
              // this.payInfo.bankAccountNumber = "";
              // this.payInfo.firstPayDate = "";
              // this.payInfo.salary = "";
              // this.payInfo.grossAmount = "";
              this.back();
            }
            this.$store.state.loading = false;
          } catch (error) {
            this.$errorHandling(error);
          }
        } else {
          this.tooltipError();
        }
      }
    },
    async getDepartment() {
      this.deparmentId = "";
      var response = await axios.get(
        this.$store.state.apiUrl + "/departments?branchId=" + this.branchId,
        {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("_t_hrm"),
          },
        }
      );
      if (response.hasOwnProperty("data")) {
        this.master_departments = response.data;
      }
    },
  },
  async created() {
    this.current_user_role = this.$cookies.get("_r_hrm");
    var response = await axios.get(this.$store.state.apiUrl + "/branches", {
      headers: {
        Authorization: "Bearer " + this.$cookies.get("_t_hrm"),
      },
    });
    if (response.hasOwnProperty("data")) {
      this.master_branches = response.data;
    }
  },
};
</script>
