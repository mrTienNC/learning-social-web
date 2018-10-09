<template>
  <div class="pick-avatar">
    <input type="file" name="fileAvatar" id="fileAvatar" class="inputfile" @change ="avatarFileChange" />
    <label for="fileAvatar">
      <i class="fa fa-camera" aria-hidden="true"></i>
      Choose avatar
    </label>
  </div>
</template>
<script type="text/javascript">
import api from '../../services/api';
import updateImage from '../../services/update-image';

export default {
  props: ['id'],
  methods: {
    avatarFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      updateImage.createImage(files[0]).then((file) => {
        this.uploadAvatar(file);
      });
    },
    uploadAvatar(image) {
      api
        .put(`/courses/${this.id}/course-avatar`, {
          avatar: image,
        })
        .then((res) => {
          this.$emit('changeAvatar');
        });
    },
  },
};
</script>
