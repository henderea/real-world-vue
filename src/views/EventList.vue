<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page > 1"
        >
        &#60; Prev Page
      </router-link>
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >
        Next Page &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService';

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(2, parseInt(routeTo.query.page, 10) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data;
          comp.totalEvents = response.headers['x-total-count'];
        });
      })
      .catch(() => {
        next({ name: 'network-error' });
      });
  },
  beforeRouteUpdate(routeTo) {
    return EventService.getEvents(2, parseInt(routeTo.query.page, 10) || 1)
      .then((response) => {
        this.events = response.data;
        this.totalEvents = response.headers['x-total-count'];
      })
      .catch(() => ({ name: 'network-error' }));
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalEvents / 2);
    },
    hasNextPage() {
      return this.page < this.pageCount;
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
