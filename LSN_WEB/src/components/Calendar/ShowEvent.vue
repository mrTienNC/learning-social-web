<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item border-0">
        <span>Speaker : {{ event.speaker }}</span>
      </li>
      <li class="list-group-item border-0">
        <span>About : {{ event.content }}</span>
      </li>
      <li class="list-group-item border-0">
        <span>Start Date : {{ event.start }}</span>
      </li>
      <li class="list-group-item border-0">
        <span>Start time : {{ event.start_time }}</span>
      </li>
      <li class="list-group-item border-0">
        <span>Duration : {{ event.duration }} min</span>
      </li>
      <li class="list-group-item border-0">
        <span>Document : <a :href="event.documents"> Documents </a></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['event'],
};
</script>
