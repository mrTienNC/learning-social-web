<template>
<div class="modal" id="notification">
  <div class="modal-dialog modal-sm" id="modal">
    <div class="modal-content">
      <div class="modal-body text-danger">
        {{message}}
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['message'],
  methods: {
    show() {
      $('#notification').modal('show').delay(3000).queue(function (next) {
        $(this).modal('hide');
        next();
      });
    },
  },
};
</script>
<style scoped>
#modal{
	max-width: 350px;
}

</style>
