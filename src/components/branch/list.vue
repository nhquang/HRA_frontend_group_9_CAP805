<template>
  <div class="sm-page">
    <div class="sm-page-nav">
      <div class="row">
        <div class="col-6 px-2 my-auto">
          <p>Branch</p>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button class="btn" @click="addBranch()">
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
              <td style="min-width: 150px">City</td>
              <td style="min-width: 150px">Province</td>
              <td style="min-width: 150px">Country</td>
              <td style="min-width: 150px">Description</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td>Headquarter</td>
              <td>Toronto</td>
              <td>Ontario</td>
              <td>Canada</td>
              <td>HQ</td>
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editBranch()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>          
            <tr>
              <td class="text-center">2</td>
              <td>Branch 1</td>
              <td>Niagara Falls</td>
              <td>Ontario</td>
              <td>Canada</td>
              <td>branch 1</td>
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editBranch()">Edit</a>
                <span>|</span>                
                <a href="javascript:void(0)" class="px-2 text-danger">Delete</a>
              </td>
            </tr>          
            <tr>
              <td class="text-center">3</td>
              <td>Branch 2</td>
              <td>Wilkes Barre</td>
              <td>Pennsylvania</td>
              <td>United States</td>
              <td>branch 2</td>
              <td class="text-end">
                <a href="javascript:void(0)" class="px-2 text-success" @click="editBranch()">Edit</a>
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
    addBranch() {
      this.$router.push('/branch/add');
    },
    editBranch() {
      this.$router.push('/branch/edit');
    }
  }
}
</script>

