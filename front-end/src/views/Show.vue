<template>
  <div>
    <h1>Show Response</h1>
    
    <div class="ui labeled input fluid mt-3">
      <div class="ui label">
        <i class="barcode icon"></i> Issue Code
      </div>
      <input type="text" readonly :value="response.issueCode"/>
    </div>
    
    <div class="ui labeled input fluid mt-3">
      <div class="ui label">
        <i class="tags icon"></i> Category
      </div>
      <input type="text" readonly :value="response.category"/>
    </div>

    <div class="ui form mt-3">
      <div class="field">
        <label>Response Text</label>
        <textarea readonly :value="response.responseText"></textarea>
      </div>
    </div>
    
    <div class="actions">
      <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }">
        Edit Response
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'show',
  data() {
    return {
      response: {}
    };
  },
  async mounted() {
    this.response = await api.getResponse(this.$route.params.id);
  }
};
</script>

<style scoped>
.actions a {
  display: block;
  text-decoration: underline;
  margin: 20px 10px;
}
.mt-3 {
  margin-top: 1rem;
}
</style>
