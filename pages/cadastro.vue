<template>
  <div class="container">
    <div class="signup-form">
      <h1>Cadastro</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nome:</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmar Senha:</label>
          <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    submitForm() {
      
      console.log(this.formData);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #121214;;
}

.signup-form {
  max-width: 4700px;
  padding: 80px;
  border-radius: 8px;
  background-color: #09090A;;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 70px;
  font-size: 50px;
  text-align: center;
}

.form-group {
  margin-bottom: 28px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 21px;
  border: 1px solid #202024;
  border-radius: 4px;
  font-size: 16px;
}

button[type="submit"] {
  width: 100%;
  padding: 20px;
  background-color: #7159c1;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
</style>
