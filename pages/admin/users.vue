<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container
    style="
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    "
  >
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <h1 >Cadastro de Usuários</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn  @click="dialog = true">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row style="padding-top: 20px" class="d-flex justify-center align-center">
      <v-card
        class="elevation-10"
        width="1080"
       
      >
        <v-card-title >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
         
          :headers="headers"
          :items="items"
          :search="search"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon  @click="update(item)">
              mdi mdi-pencil-circle
            </v-icon>
            <v-icon  @click="destroy(item)">
              mdi mdi-delete-circle
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card style="padding: 15px" color="blue-grey darken-2">
        <v-card-title>
          {{ tituloDialog }}
        </v-card-title>
        <v-card-content style="padding: 15px">
          <v-row>
            <v-col>
              <v-text-field
                v-model="username"
                outlined
                
                placeholder="Username"
                label="Username"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="passwordHash"
                outlined
                
                placeholder="Password Hash"
                label="Password Hash"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="token"
                outlined
               
                placeholder="Token"
                label="Token"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="recuperation"
                outlined
               
                placeholder="Recuperation"
                label="Recuperation"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                outlined
               
                placeholder="Nome do Usuário"
                label="Nome do Usuário"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                outlined
               
                placeholder="Email do Usuário"
                label="Email do Usuário"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpf"
               
                outlined
                
                placeholder="CPF"
                label="CPF"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="phone"
                
                outlined
               
                placeholder="Telefone para contato"
                label="Telefone para contato"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="role"
                outlined
               
                placeholder="Acesso"
                label="Acesso"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cart"
                outlined
               
                placeholder="Carrinho"
                label="Carrinho"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  @click="persist"> Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      search: null,
      items: [],
      dialog: false,
      id: null,
      username: null,
      cpf: null,
      name: null,
      phone: null,
      passwordHash: null,
      token: null,
      role: null,
      cart: null,
      recuperation: null,
      email: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'Username',
          value: 'nome',
          align: 'center',
        },
        {
          text: 'Nome completo',
          value: 'name',
          align: 'center',
        },
        {
          text: 'CPF',
          value: 'cpf',
          align: 'center',
        },
        {
          text: 'Email',
          value: 'email',
          align: 'center',
        },
        {
          text: 'Telefone',
          value: 'phone',
          align: 'center',
        },
        { text: 'Ações', value: 'actions', style: 'center', filterable: false },
      ],
    }
  },

  computed: {
    tituloDialog() {
      return this.id ? 'Editar Registro' : 'Criar Registro'
    },
  },

  async created() {
    await this.getAllUsers()
  },

  methods: {
    update(item) {
      this.id = item.id
      this.username = item.username
      this.cpf = item.cpf
      this.name = item.name
      this.phone = item.phone
      this.passwordHash = item.passwordHash
      this.token = item.token
      this.role = item.role
      this.cart = item.cart
      this.email = item.email
      this.recuperation = item.recuperation
      this.dialog = true
    },

    async persist() {
  try {
    const request = {
      username: this.username,
      cpf: this.cpf,
      name: this.name,
      phone: this.phone,
      passwordHash: this.passwordHash,
      token: this.token,
      role: this.role,
      cart: this.cart,
      email: this.email,
      recuperation: this.recuperation,
    };
    if (this.id) {
      await this.$api.patch(`/users/${this.id}`, request);
      this.$toast.success('Dado editado com êxito.');
    } else {
      await this.$api.post(`/users/`, request);
      this.$toast.success('Dado adicionado com êxito.');
    }
    this.username = null;
    this.cpf = null;
    this.name = null;
    this.phone = null;
    this.passwordHash = null;
    this.token = null;
    this.role = null;
    this.cart = null;
    this.email = null;
    this.recuperation = null;
    this.id = null;
    this.dialog = false;
    await this.getAllUsers(); 
  } catch (error) {
    return this.$toast.warning('Ocorreu um erro.');
  }
},

    async destroy(item) {
      try {
        await this.$api.delete(`/users/destroy/${item.id}`)
        await this.getAllUsers()
        this.$toast.success('Dado excluído com êxito.')
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get('/users')
        this.items = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
  },
}
</script>

<style></style>