<template>
  <div>
    <v-row justify="center"  class="login-container">
      <v-col cols="10" sm="8" md="8">
        <v-card class="login-card">
          <v-card-text>
            <v-icon class="mdi-hamburger-check">mdi-menu</v-icon>
            <h2 class="headline">Faça o seu login</h2>
            <v-text-field v-model="login.username" label="E-mail" class="login-input"></v-text-field>
            <v-text-field v-model="login.password" label="Senha" type="password" class="login-input"></v-text-field>
          </v-card-text>
          <v-col class="text-center">
            <a  href="/user/cadastros/cadstroUser/" class="forgot-password-link">Não tem login? Cadastre-se</a>
          </v-col>
          <v-card-actions>
            <v-btn height="40px" hidden="20px" block color="#512fc0" @click="efetuarLogin">Entrar</v-btn> 
            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions></v-card-actions>
  </div>
</template>


<script>
export default {
  name: 'Users',
  layout: 'Login',

  data() {
    return {
      valid: false,
      login: {
        username: null,
        passwordHash: null,
      },
      rule: [(v) => !!v || 'Esse campo é obrigatório'],
    };
  },

  methods: {
    async efetuarLogin() {
      const log = {
        username: this.login.username,
        password: this.login.passwordHash,
      };

      try {
        const response = await this.$api.post('/users/login', log);
        if (response.type === 'success') {
          localStorage.setItem('crstore-api-token', response.data.token);
          this.$toast.success('Você está logado!');
          return this.$router.push('/user/home/home');
        }
        this.$toast.error(response.message);
      } catch (error) {
        this.$toast.error('');
      }
    },
  },
}
</script>



<style>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
}

.login-card {
  background-color: #282a36;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 40px;
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


