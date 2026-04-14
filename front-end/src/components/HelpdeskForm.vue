<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="barcode icon"></i> Issue Code
      </div>
      <input type="text" placeholder="Enter issue code (e.g. PWD_RESET)..." v-model="response.issueCode" />
    </div>

    <div class="ui form mt-3">
      <div class="field">
        <label><i class="comment alternate outline icon"></i> Response Text</label>
        <textarea placeholder="Enter standard response..." v-model="response.responseText" rows="3"></textarea>
      </div>
    </div>

    <div class="ui labeled input fluid mt-3">
      <div class="ui label">
        <i class="tags icon"></i> Category
      </div>
      <select class="ui form dropdown" v-model="response.category">
        <option value="" disabled>Select a Category...</option>
        <option value="Technical">Technical</option>
        <option value="Billing">Billing</option>
        <option value="Account">Account</option>
        <option value="General">General</option>
      </select>
    </div>

    <button class="positive ui button mt-3">Submit</button>
  </form>
</template>
<script>
export default {
  name: 'helpdesk-form',
  props: {
    response: {
      type: Object,
      required: false,
      default: () => {
        return {
          issueCode: '',
          responseText: '',
          category: ''
        };
      }
    }
  },
  data() {
    return {
      errorsPresent: false
    };
  },
  methods: {
    onSubmit: function() {
      if (this.response.issueCode === '' || this.response.responseText === '' || this.response.category === '') {
        this.errorsPresent = true;
      } else {
        this.errorsPresent = false;
        this.$emit('createOrUpdate', this.response);
      }
    }
  }
};
</script>
<style scoped>
.mt-3 {
  margin-top: 1rem;
}
.error {
  color: red;
}
</style>
