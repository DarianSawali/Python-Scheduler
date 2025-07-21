<template>
  <div>
    <form @submit.prevent="addEvent" class="event-form">
      <input v-model="newEvent.title" type="text" placeholder="Title" required />
      <input v-model="newEvent.description" type="text" placeholder="Description" />
      <input v-model="newEvent.start_time" type="datetime-local" required />
      <input v-model="newEvent.end_time" type="datetime-local" required />
      <button type="submit">Add Event</button>
    </form>

    <h1>Upcoming Events</h1>
    <ul>
      <li v-for="event in events" :key="event.id">
        <strong>{{ event.title }}</strong><br />
        {{ event.description }}<br />
        Start: {{ formatDate(event.start_time) }}<br />
        End: {{ formatDate(event.end_time) }}
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: "HomePage",
  data() {
    return {
      events: [],
      newEvent: {
        title: "",
        description: "",
        start_time: "",
        end_time: "",
      },
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      fetch("http://127.0.0.1:8000/api/events/")
        .then((res) => res.json())
        .then((data) => {
          this.events = data;
        })
        .catch((err) => console.error("Failed to fetch events:", err));
    },
    formatDate(dateStr) {
      return dayjs(dateStr).format("MMM D, YYYY h:mm A");
    },
    addEvent() {
      fetch("http://127.0.0.1:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newEvent),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to add event");
          return res.json();
        })
        .then((data) => {
          this.events.push(data); // Update the list
          // Reset form
          this.newEvent = {
            title: "",
            description: "",
            start_time: "",
            end_time: "",
          };
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
.event-form {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.event-form input,
.event-form button {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
