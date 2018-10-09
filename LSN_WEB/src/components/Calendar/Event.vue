 <template>
  <div class="modal fade" id="event" role="dialog" >
    <div class="modal-dialog" role="document" style="width: 600px">
      <div class="modal-content">
        <div class="modal-header">
          <div v-if="!action">
            <h5 class="modal-title font-weight-bold text-capitalize text-primary" id=   "exampleModalLabel">{{ event.title }}</h5>
          </div>
          <div v-else>
            <h5 class="modal-title font-weight-bold text-capitalize text-primary" id="exampleModalLabel">Edit Event</h5>
          </div>
          <button type="button" class="close" @click="action = false" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="!action">
            <ShowEvent :event = "event"></ShowEvent>
          </div>
          <div v-else>
            <form id="editEvent" class="pl-3">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label class="col-2 form-control-label"> Title </label>
                    <input maxlength="64" name="title" type="text" class="form-control col-9" id="title"  v-model="eventEdit.title" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-2 form-control-label"> About </label>
                    <input maxlength="255" name="content" type="text" class="form-control col-9" id="content"  v-model="eventEdit.content" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-2 form-control-label"> Document </label>
                    <input type="text" id="document" class="form-control col-9 " v-model="eventEdit.documents" name="document" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-2 form-control-label"> Speaker </label>
                    <input type="text" maxlength="32" class="form-control col-9 " v-model="eventEdit.speaker" id="speaker" required>
                  </div>
                  <div class="form-group row">
                    <label class="col-2 form-control-label">Start Time </label>
                    <input  type="time" class="form-control col-9" v-model="eventEdit.start_time"  >
                  </div>
                  <div class="form-group row">
                    <label class="col-2 form-control-label" >Duration (min)</label>
                    <input type="number" id="duration" class="form-control col-9" step="10"  v-model="eventEdit.duration" required>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer" v-if="role === isRole.Admin">
          <div v-if="!action">
            <button type="button" @click="action = !action" class="btn btn-primary">Edit</button>
            <button type="button" @click="deleteEvent" class="btn btn-danger">Delete</button>
          </div>
          <div v-else>
            <button type="button" @click="editEvent" class="btn btn-success">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ShowEvent from './ShowEvent';
import '../../../node_modules/jquery-validation/dist/jquery.validate';
import api from '../../services/api';

export default {
  props: ['id', 'role', 'isRole'],
  components: {
    ShowEvent,
  },
  data() {
    return {
      event: [],
      action: false,
      eventEdit: {
        title: '',
        content: '',
        documents: '',
        start: '',
        start_time: '',
        duration: '',
        speaker: '',
      },
    };
  },
  methods: {
    changeEvents(data) {
      this.event = data;
      this.eventEdit.title = data.title;
      this.eventEdit.content = data.content;
      this.eventEdit.documents = data.documents;
      this.eventEdit.start_time = data.start_time;
      this.eventEdit.duration = data.duration;
      this.eventEdit.speaker = data.speaker;
    },
    changeAction() {
      this.action = !this.action;
    },
    editEvent() {
      if (this.validate()) {
        const params = {
          title: this.eventEdit.title,
          thumnail: 'thumnail',
          content: this.eventEdit.content,
          documents: this.eventEdit.documents,
          start: this.event.start,
          startTime: this.eventEdit.start_time,
          duration: this.eventEdit.duration,
          speaker: this.eventEdit.speaker,
        };
        api
          .put(`/courses/${this.id}/editEvent/${this.event.event_id}`, params)
          .then((eventEdit) => {
            this.$emit('editSuccsess');
            this.action = false;
            $('#event').modal('hide');
          });
      }
    },
    validate() {
      $('#editEvent').validate({
        rules: {
          document: {
            required: true,
            url: true,
          },
        },
      });
      if ($('#editEvent').valid()) {
        return true;
      }

      return false;
    },
    deleteEvent() {
      api
        .delete(`/courses/${this.id}/event/${this.event.event_id}`)
        .then((status) => {
          this.$emit('deleteSuccsess', status);
          $('#event').modal('hide');
        });
    },
  },
};
</script>
