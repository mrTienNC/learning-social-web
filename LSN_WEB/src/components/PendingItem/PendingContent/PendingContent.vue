<template>
  <b-container>
    <b-row class="pt-1 pb-1" v-for="(item,key) in dataPedingContents" :key="key">
      <b-col class="p-0" v-show="item.checkView">
        <b-card class="p-0">
          <b-media :no-body = "item.checkView">
            <b-media-aside vertical-align="center" class="b-media-aside">
              <img slot="aside" :src="url" alt="Media Aside" id="imgFormat" />
              <div id="imformation">
                <b-media tag="li" class="pt-5">
                  <img slot="aside" :src="item.author.avatar" id="userAvatar" alt="placeholder" />
                    <div class="mt-0 mb-1" >
                      <b>{{item.author.fullName}}</b>
                    </div>
                  <h6 class="mt-1 mb-1">Start: {{new Date(item.startDate).toDateString()}}</h6>
                  <h6 class="mt-0 mb-1">End: {{new Date(item.endDate).toDateString()}}</h6>
                  <h6 class="mt-0 mb-1">Level: {{item.level}}</h6>
                </b-media>
              </div>
            </b-media-aside>
            <b-media-body class="ml-3">
              <h3 class="mt-0 " id="formatH3">
                <div>{{item.title}}</div>
                <div v-show="role === isRole.Admin">
                  <i @click="acceptContent(key,item.id)" class="fas fa-check-circle"></i>
                  <i @click="removeContent(key,item.id)" class="fas fa-minus-circle"></i>
                </div>
              </h3>
              <div id="clearBoth"></div>
              <p class="pt-3" v-if="item.content.length >= 300">
                <span>{{item.content.slice(0, 300) + ' . . . '}}</span>
              </p>
              <p class="pt-3" v-else v-html="item.content">
                {{item.content}}
              </p>
              <h4 class="pt-4 mt-5" id="ViewAll" v-if="item.content.length >= 300" @click="item.checkView = false">View All ...</h4>
            </b-media-body>
          </b-media>
        </b-card>
      </b-col>
      <!-- Style II -->
      <b-col class="p-0" v-show="!item.checkView">
        <b-card class="p-0">
          <b-media :no-body = "item.checkView" >
            <b-media-aside vertical-align="center" class="b-media-aside">
              <img slot="aside" :src="url" alt="Media Aside" id="imgFormat-2" />
              <div id="imformation">
                <b-media tag="li" class="pt-5">
                  <img slot="aside" :src="item.thumbnail" id="userAvatar" alt="placeholder" />
                    <div class="mt-0 mb-1" >
                      <b>{{item.author.fullName}}</b>
                    </div>
                  <h6 class="mt-1 mb-1">Start: {{new Date(item.startDate).toDateString()}}</h6>
                  <h6 class="mt-0 mb-1">End: {{new Date(item.endDate).toDateString()}}</h6>
                  <h6 class="mt-0 mb-1">Level: {{item.level}}</h6>
                  </b-media>
              </div>
            </b-media-aside>
            <b-media-body class="ml-3">
              <h3 class="mt-0 " id="formatH3">
                <div>{{item.title}}</div>
                <div v-show="role === isRole.Admin">
                  <i @click="acceptContent(key,item.id)" class="fas fa-check-circle"></i>
                  <i @click="removeContent(key,item.id)" class="fas fa-minus-circle"></i>
                </div>
              </h3>
              <div id="clearBoth"></div>
              <p class="pt-3" v-if="item.content.length >= 300" v-html="item.content">
                <span>{{item.content}}</span>
              </p>
              <h4 class="pt-4 mt-5" id="ReduceText" @click="item.checkView = true">... Reduce text </h4>
            </b-media-body>
          </b-media>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import api from '../../../services/api';
import EventBus from '../../EventBus/EventBus';

export default {
  props: ['id', 'role', 'isRole'],
  data() {
    return {
      url: 'https://2.bp.blogspot.com/-1G90tBcfM_s/VcLiY2ISdmI/AAAAAAAAHTA/jev99sZOZbA/s1600/Hinh-nen-mua-he%2B%252818%2529.jpg',
      dataPedingContents: [],
    };
  },
  created() {
    this.getContentsPending();
  },
  methods: {
    getContentsPending() {
      const approved = { isApprove: false };
      api
        .get(`/course/${this.id}/course-content`, approved)
        .then((e) => {
          for (let index = 0; index < e.length; index++) {
            e[index].checkView = true;
          }
          this.dataPedingContents = e;
          EventBus.$emit('numberContentPending', e.length);
        });
    },
    removeContent(index, id) {
      api
        .delete(`/course/${this.id}/course-content/${id}`)
        .then(() => this.getContentsPending());
    },
    acceptContent(index, id) {
      api
        .put(`/course/${this.id}/course-content-pending/${id}`)
        .then(() => this.getContentsPending());
    },
  },
};
</script>
<style scoped>
@import './stylePendingContent.css';
</style>

