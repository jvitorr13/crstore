<template>
  <div>
    <v-row justify="center" align="center" class="signup-container">
      <v-col cols="12" sm="8" md="6">
        <h2 justify>bem vindo</h2>
        <v-card class="signup-card">
          <v-card-text>
            <h2 color:white class="">Crie sua conta</h2>
            <v-text-field
              v-model="users.username"
              outlined
              placeholder="Username"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="users.name"
              outlined
              label="Name"
              placeholder="Name"
            ></v-text-field>
            <v-text-field
              v-model="users.phone"
              label="Phone"
              outlined
              placeholder="Phone"
            ></v-text-field>
            <v-text-field
              v-model="users.password"
              label="Password"
              outlined
              placeholder="Password"
            ></v-text-field>
            <v-text-field
              v-model="users.cpf"
              label="CPF"
              outlined
              placeholder="CPF"
            ></v-text-field>
            <v-text-field
              v-model="users.email"
              label="Email"
              outlined
              placeholder="Email"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="criar()" color="#686A6C">Cadastrar</v-btn>
            <v-btn text color="red" class="signup-button" to="/user/cadastros/loginUser">Já tenho uma conta</v-btn>
          </v-card-actions>  
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Users',
  layout: 'user',
  data() {
    return {
      valid: false,
      users: {
        username: null,
        cpf: null,
        password: null,
        role: null,
        name: null,
        phone: null,
        email: null,
      },
      rule: [(v) => !!v || 'Esse campo é obrigatório'],
    }
  },
  methods: {
    async criar() {
      try {
        const request = {
          username: this.users.username,
          cpf: this.users.cpf,
          password: this.users.password,
          phone: this.users.phone,
          email: this.users.email,
          role: 'customer',
          name: this.users.name,
        };
        await this.$api.post('/users/register', request);
      } catch (error) {
        return this.$toast.error('Erro ao criar sua conta');
      }
    },
  },
}

</script>

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
