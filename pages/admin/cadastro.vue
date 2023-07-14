<template>
  <div>
    <v-row justify="center" align="center" class="signup-container">
      <v-col cols="12" sm="8" md="6">
        <h2 justify>bem vindo</h2>
        <v-card class="signup-card">
          <v-card-text>

            <h2 color:white class="">Crie sua conta</h2>
            <v-text-field
              v-model="username"
              outlined               
              placeholder="ursename"
              label="usename"
              >
            </v-text-field>
            <v-text-field
             v-model="name"
             outlined
             label="name"
             placeholder="name"
              >
            </v-text-field>
            <v-text-field
              v-model="phone"
              label="phone"
              outlined
              placeholder="phone"
              >
            </v-text-field>
            <v-text-field
             v-model="password"
             label="password"
             outlined
             placeholder="password"
             >
            </v-text-field>
            <v-text-field
             v-model="role"
             label="role"
             outlined
             placeholder="role"
             >
            </v-text-field>
            <v-text-field
             v-model="cpf"
             label="cpf"
             outlined  
             placeholder="cpf">
            </v-text-field>
            <v-text-field 
            v-model="email" 
            label="email" 
            outlined 
            placeholder="email">
          </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="blue" @click="criar()">Cadastrar</v-btn>
            <v-btn text color="red" href="admin/login"  @click="login">Já tenho uma conta</v-btn>
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

  async criar() {
  try {
    const request = {
      username: this.users.name,
      cpf: this.users.cpf,
      password: this.users.password,
      phone: this.users.phone,
      email: this.users.email,
      role: this.user.role,
      name: this.users.name,
    };
    const response = await this.$api.$post('/users/',request);
    if (response.type === "success") {
      this.$toast.success(response.message);    
    } else {
      this.$toast.error(response.message);
    }
  } catch (error) {
    return this.$toast.error('Erro ao criar sua conta')
  }
}
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