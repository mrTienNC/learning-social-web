<template>
  <div class="container mt-5 p-0">
    <div class="row">
      <div class="col-md-12 mb-3">
        <h4 class="text-primary font-weight-bold text-capitalize">Event history</h4>
      </div>
      <div class="col-md-4 mb-3" v-for="data in listEventHistory">
        <div class="card">
          <div class="card-header text-primary font-weight-bold text-uppercase">
            {{ data.title }}
          </div>
          <div class="card-body p-0 mt-2">
            <ul class="list-group-icons" style="padding:10px">
              <li class="group-icon-item">
                <i class="fa fa-user icon-item" aria-hidden="true"></i>
                <span class="list-group-text">Speaker : {{data.speaker}}
                </span>
              </li>
              <li class="group-icon-item">
                <i class="fa fa-star-o icon-item" aria-hidden="true"></i>
                <span class="list-group-text">Start date : {{data.start_time}} {{data.start}}
                </span>
              </li>
              <li class="group-icon-item">
                <i class="fa fa-calendar icon-item" aria-hidden="true"></i>
                <span class="list-group-text">Duration : {{data.duration}} min
                </span>
              </li>
              <li class="group-icon-item">
                <i class="fa fa-pencil icon-item" aria-hidden="true"></i>
                <span class="list-group-text">Documents : <a :href="data.documents">Click me</a>
                </span>
              </li>
            </ul>
          </div>
          <div class="card-footer group-content mt-2">
            {{data.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listEventHistory: [],
    };
  },
  methods: {
    getEventHistory(data) {
      this.listEventHistory = data;
    },
  },

};
</script>
<style scoped>
.group-icon-item {
  list-style: none;
  height: 30px;
  line-height: 30px;
}

.icon-item {
  width: 10%;
  float: left;
  line-height: 30px;
}

.list-group-text {
  width: 90%;
  float: left;
  font-size: 13px;
  font-style: italic;
  padding-left: 10px;
}
</style>
