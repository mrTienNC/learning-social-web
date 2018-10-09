<template>
<div>
  <div v-for = "document in documents">
    <div>
      <a :href="document.url" target="_blank">{{document.description}}</a>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import api from '../../services/api';
import EventBus from '../EventBus/EventBus';

export default {
  props: ['id'],
  data() {
    return {
      documents: [],
    };
  },
  methods: {
    getDocuments() {
      api
        .get(`/courses/${this.id}/course-documents`)
        .then((documents) => {
          this.documents = documents;
        });
    },
  },
  created() {
    this.getDocuments();
    EventBus.$on('changeDocument', () => this.getDocuments());
  },
};
</script>
