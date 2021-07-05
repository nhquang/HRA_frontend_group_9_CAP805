<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Department</p>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn" @click="addDepartment()">
            <i class="fa fa-plus-circle"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
    <div class="sm-page-body b-0">
      <div class="table-grid">
        <table class="table">
          <thead>
            <tr>
              <td class="text-center" style="width: 30px; min-width: 30px">
                #
              </td>
              <td style="min-width: 150px">Name</td>
              <td style="min-width: 150px">Branch</td>
              <td style="min-width: 150px">Description</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td>Human Resources</td>
              <td>Headquarter</td>
              <td>HQ</td>              
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editDepartment()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>
            <tr>
              <td class="text-center">2</td>
              <td>Legal</td>
              <td>Headquarter</td>
              <td>legal</td>              
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editDepartment()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>
            <tr>
              <td class="text-center">3</td>
              <td>Human Resources</td>
              <td>Branch 1</td>
              <td>HR Branch 1</td>
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editDepartment()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>
            <tr>
              <td class="text-center">4</td>
              <td>Human Resources</td>
              <td>Branch 2</td>
              <td>HR Branch 2</td>
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editDepartment()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    addDepartment() {
      this.$router.push('/department/add');
    },
    editDepartment() {
      this.$router.push('/department/edit');
    }
  }
}
</script>

