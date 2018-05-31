<template>
  <div>
    <div id="myModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">

          <div class="modal-header" slot="header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div class="modal-body" slot="body">
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </div>
          <div class="modal-footer" slot="footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="close">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in"></div>
  </div>
</template>

<script>
export default {
  name: 'mymodal',
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$store.commit('isModalVisible');
    },
  },
};
</script>

<style scoped>
</style>