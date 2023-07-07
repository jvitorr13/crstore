<template>
  <div  >
    <v-row justify="center" align="center" class="login-container">
    <v-col cols="12" sm="8" md="6">
      <v-card class="login-card">
        <v-card-text >
          <v-icon class="mdi-hamburger-check">mdi-menu</v-icon>
          <h2 class="headline">Faça o seu login</h2>
          <v-text-field v-model="email" label="E-mail" class="login-input"></v-text-field>
          <v-text-field v-model="password" label="Senha" type="password" class="login-input"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="blue" h-ref="usuario" class="login-button" @click="login">Entrar</v-btn>
          <v-btn text color="red" class="login-button" @click="forgotPassword">Esqueci a senha</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-card-actions>
</v-card-actions>

</div>

</template>

<style scoped>
.login-container {
  
  height: 0vh;
  width: 100vh;
  display: flex;
  align-items: center;
}

.login-card {
  background-color: #282a36;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 100px;
  text-align: center;
  align-items: center;
}

.logo {
  width: 100px;
  margin-bottom: 16px;
}

.headline {
  font-size: 24px;
  margin-bottom: 16px;
  color: #7159c1; 
  align-items: center;
}

.login-input {
  width: 100%;
  margin-bottom: 16px;
}

.login-button {
  margin-left: auto;
  background-color: #7159c1; 
  color: #fff;
}
</style>

<script>
export default {
  methods: {
    forgotPassword() {
      
      
    },
   
  },
};
</script>
