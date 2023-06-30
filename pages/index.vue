
<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <img height="360" width="568" src="https://logo.criativoon.com/wp-content/uploads/2016/07/logomarca-lanchonete.png">
        <v-card-title class="headline">
          Bem-vindo à lanchonete
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.
          </p>
          <p>
            For more information on Vuetify, check out the <a href="https://vuetifyjs.com" target="_blank" rel="noopener noreferrer">documentation</a>.
          </p>
          <p>
            If you have questions, please join the official <a href="https://chat.vuetifyjs.com/" target="_blank" rel="noopener noreferrer" title="chat">discord</a>.
          </p>
          <p>
            Find a bug? Report it on the GitHub <a href="https://github.com/vuetifyjs/vuetify/issues" target="_blank" rel="noopener noreferrer" title="contribute">issue board</a>.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; João</small></em>
          </div>
          <hr class="my-3" />
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" class="mr-4" to="/login">Login</v-btn>
          <v-btn text color="red" to="/cadastro">Cadastro</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      sheet: false
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>
