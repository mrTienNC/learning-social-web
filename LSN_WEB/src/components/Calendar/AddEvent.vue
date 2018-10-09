<template>
  <div class="modal" tabindex="-1" role="dialog"  id="addEvent">
    <div class="modal-dialog" role="document" style="width: 600px">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Event</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <form id="addEventDetail">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <input type="text" class="form-control col-md-12 " placeholder="Title"v-model="events.title" name="title" required >
                    <input type="text" class="form-control col-md-12 mt-3" placeholder="Something  about your event ..."
                    v-model="events.eventAbout" name="content" required>
                    <input type="text" class="form-control col-md-12 mt-3" placeholder="Document Link ..." name="document"
                    v-model="events.eventDocument" required>
                    <input type="text" class="form-control col-md-12 mt-3" placeholder="Speaker" name="speaker"
                    v-model="events.eventSpeaker" required>
                  </div>
                  <div class="row mt-3 mb-3">
                    <div class="col-md-6 pl-0">
                      <label for="inputStartTime" class="text-danger">Start Time</label>
                      <input type="time" v-model="events.eventTime" class="form-control" id="inputStartTime" name="startTime" required >
                    </div>
                    <div class="col-md-6 pl-0">
                      <label for="inputDuration" class="text-danger">Duration (min)</label>
                      <input type="number" class="form-control" id="inputDuration" step=10 value=10 min=0 v-model="events.eventDuration" name="duration" required >
                    </div>

                  </div>
                </div>
                <button class="btn btn-outline-danger mr-2" data-dismiss="modal">Cancel</button>
                <button class="btn btn-outline-primary " type="button" @click="addEvent">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '../../services/api';
import '../../../node_modules/jquery-validation/dist/jquery.validate';

export default {
  props: ['day', 'id'],
  data() {
    return {
      events: {},
    };
  },
  methods: {
    validate() {
      $('#addEventDetail').validate({
        rules: {
          document: {
            required: true,
            url: true,
          },
        },
      });
      if ($('#addEventDetail').valid()) {
        return true;
      }
    },
    addEvent() {
      if (this.validate()) {
        const params = {
          title: this.events.title,
          content: this.events.eventAbout,
          documents: this.events.eventDocument,
          speaker: this.events.eventSpeaker,
          duration: this.events.eventDuration,
          startTime: `${this.events.eventTime}:00`,
          start: this.day,
          courseId: this.id,
          authorId: localStorage.getItem('idUser'),
        };
        api
          .post(`/course/${this.id}/course-events`, params)
          .then((eventNew) => {
            this.$emit('showAdd');
            $('#addEvent').modal('hide');
            this.events = [];
          });
      }
    },
  },
};
</script>
