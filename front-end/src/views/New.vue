<template>
  <div>
    <h1>New Response</h1>
    <helpdesk-form @createOrUpdate="createOrUpdate" :response="response"></helpdesk-form>
  </div>
</template>

<script>
import HelpdeskForm from '../components/HelpdeskForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'new-response',
  components: {
    'helpdesk-form': HelpdeskForm
  },
  data() {
    return {
      response: {
        issueCode: '',
        responseText: '',
        category: ''
      }
    };
  },
  methods: {
    createOrUpdate: async function(response) {
      const res = await api.createResponse(response);
      this.flash('Response created successfully!', 'success', {
        timeout: 3000
      });
      this.$router.push(`/responses/${res._id || ''}`);
    }
  }
};
</script>
