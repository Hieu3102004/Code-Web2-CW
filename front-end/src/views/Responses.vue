<template>
  <div>
    <h1>Helpdesk Responses Library</h1>
    <div class="ui fluid icon input" style="margin-bottom: 20px;">
      <input type="text" v-model="searchQuery" placeholder="Search by Issue Code, Category or Response Text...">
      <i class="search icon"></i>
    </div>
    <table id="responses" class="ui celled compact table">
      <thead>
        <tr>
          <th>Issue Code</th>
          <th>Category</th>
          <th>Response Text</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tr v-for="(response, i) in filteredResponses" :key="i">
        <td class="bold">{{ response.issueCode }}</td>
        <td><div class="ui label">{{ response.category }}</div></td>
        <td>
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span style="white-space: pre-wrap; margin-right: 10px;">{{ response.responseText }}</span>
            <i class="copy outline icon copy-btn" @click.prevent="copyText(response.responseText)" title="Copy to clipboard"></i>
          </div>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'show', params: { id: response._id } }">Show</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'edit', params: { id: response._id } }">Edit</router-link>
        </td>
        <td width="75" class="center aligned">
          <a href="#" @click.prevent="onDestroy(response._id)">Destroy</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'ResponsesList',
  data() {
    return {
      responses: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredResponses() {
      if (!this.searchQuery) return this.responses;
      const query = this.searchQuery.toLowerCase();
      return this.responses.filter(r => 
        r.issueCode.toLowerCase().includes(query) || 
        r.category.toLowerCase().includes(query) ||
        r.responseText.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async onDestroy(id) {
      const sure = window.confirm('Are you sure you want to delete this response?');
      if (!sure) return;
      await api.deleteResponse(id);
      this.flash('Response deleted successfully!', 'success', {
        timeout: 3000
      });
      this.responses = this.responses.filter(r => r._id !== id);
    },
    copyText(text) {
      navigator.clipboard.writeText(text);
      this.flash('Copied to clipboard!', 'success', {
        timeout: 2000
      });
    }
  },
  async mounted() {
    this.responses = await api.getResponses();
  }
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
.copy-btn {
  cursor: pointer;
  color: #555;
  transition: color 0.2s;
}
.copy-btn:hover {
  color: #000;
}
</style>
