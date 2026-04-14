<template>
  <div>
    <h1>Edit Response</h1>
    <helpdesk-form @createOrUpdate="createOrUpdate" :response="response"></helpdesk-form>
  </div>
</template>

<script>
import HelpdeskForm from '../components/HelpdeskForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'helpdesk-form': HelpdeskForm
  },
  data() {
    return {
      response: {}
    };
  },
  async mounted() {
    this.response = await api.getResponse(this.$route.params.id);
  },
  methods: {
    createOrUpdate: async function(response) {
      await api.updateResponse(response);
      this.flash('Response updated successfully!', 'success', {
        timeout: 3000
      });
      this.$router.push(`/responses/${response._id}`);
    }
  }
};
</script>
