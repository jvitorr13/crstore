<template>
  <div>
    <v-row justify="center" align="center" class="signup-container">
      <v-col cols="12" sm="8" md="6">
        <h2 justify>bem vindo</h2>
        <v-card class="signup-card">
          <v-card-text>

            <h2 color:white class="">Crie sua conta</h2>
            <v-text-field v-model="name" label="Nome" class="signup-input"></v-text-field>
            <v-text-field v-model="email" label="E-mail" class="signup-input"></v-text-field>
            <v-text-field v-model="password" label="Senha" type="password" class="signup-input"></v-text-field>
            <v-text-field v-model="password" label="cpf" type="cpf" class="signup-input"></v-text-field>
            <v-text-field v-model="password" label="telefone" type="telefone" class="signup-input"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue" class="signup-button" @click="signup">Cadastrar</v-btn>
            <v-btn text color="red" class="signup-button" @click="goToLogin">Já tenho uma conta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.signup-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-card {
  background-color: #282a36;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 50px;
  text-align: center;
}

.headline {
  font-size: 24px;
  margin-bottom: 16px;
  color: #7159c1;
}

.signup-input {
  width: 100%;
  margin-bottom: 16px;
}

.signup-button {
  margin-left: auto;
  background-color: #7159c1;
  color: #fff;
}
</style>

<script>

</script>
