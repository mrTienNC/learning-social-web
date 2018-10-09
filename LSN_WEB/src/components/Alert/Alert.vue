<template>
  <div id="alert">
    <div class="modal">
      <div class="modal-dialog modal-sm" style="max-width: 400px">
        <div class="modal-content">
          <div class="modal-body text-danger">
            <span> {{message}} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['message'],
  methods: {
    showAlert() {
      $('#alert .modal').modal('show').delay(3000).queue(function (next) {
        $(this).modal('hide');
        next();
      });
    },
  },

};
</script>
