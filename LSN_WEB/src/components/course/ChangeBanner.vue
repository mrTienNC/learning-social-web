<template>
  <div class="btn btn-outline-secondary">
    <input type="file"  name="fileBanner" id="fileBanner"   class="inputfile"  @change= "bannerFileChange" />
    <label for="fileBanner">
      <i class="fa fa-camera" aria-hidden="true"></i> Change background
    </label>
  </div>
</template>
<script type="text/javascript">
import api from '../../services/api';
import updateImage from '../../services/update-image';

export default {
  props: ['id'],
  methods: {
    bannerFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      updateImage.createImage(files[0]).then((file) => {
        this.upload(file);
      });
    },
    upload(image) {
      api
        .put(`/courses/${this.id}/course-thumbnail`, {
          thumbnail: image,
        })
        .then((res) => {
          this.$emit('changeBanner');
        });
    },
  },
};
</script>
