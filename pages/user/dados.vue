<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-10 rounded-xl" color="#6A1B9A">
            <v-container fluid>
              <h2 class="text-center">Meus Dados</h2>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="users.username"
                    label="Username"
                    placeholder="Username"
                    filled
                    rounded
                    dense
                    required
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="users.cpf"
                    label="CPF"
                    placeholder="CPF"
                    filled
                    rounded
                    dense
                    required
                    prepend-inner-icon="mdi-account-card-details"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="users.email"
                    label="Email"
                    placeholder="Email"
                    filled
                    rounded
                    dense
                    required
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="users.passwordHash"
                    label="Senha"
                    placeholder="Senha"
                    filled
                    rounded
                    dense
                    required
                    prepend-inner-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="users.name"
                    label="Nome"
                    placeholder="Nome"
                    filled
                    rounded
                    dense
                    required
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="users.lastName"
                    label="Sobrenome"
                    placeholder="Sobrenome"
                    filled
                    rounded
                    dense
                    required
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <a href="/public/login/forget" class="forgot-password-link">Esqueci minha senha</a>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn block color="#4A148C" dark>Entrar</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Users',
  layout: 'Login',
  data() {
    return {
      valid: false,
      users: {
        username: null,
        cpf: null,
        passwordHash: null,
        role: null,
        name: null,
        lastName: null,
        email: null,
      },
      rule: [(v) => !!v || 'Esse campo é obrigatório'],
    }
  },
  methods:{
      async getAll () {
        const response = await this.$api.get('/adress-by-users/2')      
        response.data.forEach(element => {
          element.name = element.name.toUpperCase()
        });
        this.products = response.data
      },
    }
  }



</script>

<style>
.text-input-blue .v-text-field__slot input {
  color: #ffffff !important;
}
</style>
