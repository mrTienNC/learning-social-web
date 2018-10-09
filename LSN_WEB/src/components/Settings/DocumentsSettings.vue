<template>
  <div class="row">
    <div class="col-md-12 m-auto">
      <form id="documentsSettings">
        <li class="list-group-item">
          <div class="row input-group">
            <div class="col-3">
              <label class="document-left text-danger">Important Documents: </label>
            </div>
            <div class="col-9">
              <div class="document-right">
                <span @mouseenter="document.icon = !document.icon" @mouseleave="document.icon = !document.icon"  v-for="(document,key) in documents">
                  <a :href="document.url" target="_blank">{{document.description}}</a>
                  <i class="fa fa-pencil icon ml-2"
                  aria-hidden="true" @click="document.edit = !document.edit" v-if="document.icon && role === isRole.Admin"
                >
                </i><br>
                <div  v-if="document.edit">
                  <div class="col-md-12 mt-2">
                    <input type="text" class="col-md-7 form-control mb-2" placeholder="Description" v-model="document.description" required>
                    <input type="text" class="col-md-7 form-control" placeholder="Url" v-model="document.url" required >
                  </div>
                  <div class="input-group-append col-md-12 mt-3 mb-2">
                    <button  type="button" class="btn btn-outline-secondary" @click="editDocuments(document.id,key)">Save</button>
                    <button  type="button" class="btn btn-outline-secondary" @click="document.edit = !document.edit">Cancle</button>
                    <button type="button" class="btn btn-outline-secondary" @click="deleteDocuments(document.id) ">Delete</button>
                  </div>
                </div>
              </span>
              <span class="icon" v-if = "role === isRole.Admin">
                <div @click="checkDocuments=!checkDocuments">
                  <i class="fa fa-plus" aria-hidden="true" ></i>
                  <span>Add Documents</span>
                </div>
              </span>
              <div class="" v-if="checkDocuments">
                <div class="col-12 float-left mt-3 mb-2">
                  <input type="text" class="col-md-12 form-control  mb-2" placeholder="Description" v-model="documents.description"
                  required>
                  <input type="text" class="col-md-12 form-control" placeholder="Url" v-model="documents.url" name="url" required
                  >
                </div>
                <div class="input-group-append col-md-12 mt-3">
                  <button type="button" class="btn btn-outline-secondary" @click="addDocuments">Save</button>
                  <button type="button" class="btn btn-outline-secondary" @click="checkDocuments = !checkDocuments">Cancle</button>
                </div>
              </div>
              </div>
            </div>
        </div>
      </li>
    </form>
  </div>
</div>
</template>
<script type="text/javascript">
import api from '../../services/api.js';
import '../../../node_modules/jquery-validation/dist/jquery.validate';
import Eventbus from '../EventBus/EventBus';

export default {
  props: ['id', 'role', 'isRole'],
  data() {
    return {
      documents: [],
      message: '',
      editUrl: '',
      editDescription: '',
      checkDocuments: false,
      checkEditDocuments: false,
      checkIcon: false,

    };
  },
  methods: {
    validate() {
      $('#documentsSettings').validate({
        rules: {
          url: {
            required: true,
            url: true,
          },
        },
      });
      return $('#documentsSettings').valid();
    },
    cancleDocuments() {
      this.checkDocuments = !checkDocuments;
      this.getDocuments();
    },
    addDocuments() {
      if (this.validate()) {
        const params = {
          description: this.documents.description,
          url: this.documents.url,
          authorId: localStorage.getItem('idUser'),
          courseId: this.id,
        };
        api
          .post(`/courses/${this.id}/course-documents`, params)
          .then((documents) => {
            this.checkDocuments = false;
            this.getDocuments();
            Eventbus.$emit('changeDocument');
          });
      }
    },
    editDocuments(idDocument, key) {
      const params = {
        description: this.documents[key].description,
        url: this.documents[key].url,
        authorId: localStorage.getItem('idUser'),
        courseId: this.id,
      };
      api.put(`/courses/${this.id}/course-documents/${idDocument}`, params)
        .then((documents) => {
          this.documents[key].edit = false;
          this.getDocuments();
          Eventbus.$emit('changeDocument');
        });
    },
    deleteDocuments(id) {
      api
        .delete(`/courses/${this.id}/course-documents/${id}`)
        .then((documents) => {
          this.getDocuments();
          Eventbus.$emit('changeDocument');
        });
    },
    getDocuments() {
      api
        .get(`/courses/${this.id}/course-documents`)
        .then((documents) => {
          documents.forEach((content) => {
            content.edit = false;
            content.icon = false;
          });
          this.documents = documents;
        });
    },
  },
  created() {
    this.getDocuments();
  },
};
</script>
<style type="text/css" scoped>
.icon:hover , .showIconCourse:hover {
  color: red;
}
.icon {
  cursor: pointer;
  color: #c30909;
  font-size: 14px;
}
.document-left {
  width: 20%;
  float: left;
  padding-left: 15px;
   color: #c30909;
}
.document-right {
  width: 75%;
  float: right;
  text-align: left;
  padding-left: 15px;
}
</style>
