<!-- eslint-disable vue/v-slot-style -->
<!-- eslint-disable vue/valid-v-slot -->
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
        <h1>Cadastro de Endereços</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row style="padding-top: 20px" class="d-flex justify-center align-center">
      <v-card class="elevation-10" width="1080">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search">
          // eslint-disable-next-line vue/valid-v-slot
          <template v-slot:item.actions="{ item }">
            <v-icon @click="update(item)">mdi mdi-pencil-circle</v-icon>
            <v-icon @click="destroy(item)">mdi mdi-delete-circle</v-icon>
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
            <v-col cols="4">
              <v-autocomplete
                v-model="idUser"
                :items="users"
                item-text="name"
                item-value="id"
                label="Usuário"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="street"
                outlined
                placeholder="Rua"
                label="Rua"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="numberForget"
                outlined
                placeholder="Número"
                label="Número"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="district"
                outlined
                placeholder="Bairro"
                label="Bairro"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="zipCode"
                outlined
                placeholder="CEP"
                label="CEP"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="city"
                outlined
                placeholder="Cidade"
                label="Cidade"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="state"
                outlined
                placeholder="Estado"
                label="Estado"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="persist">Salvar</v-btn>
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
      users: [],
      idUser: null,
      zipCode: null,
      state: null,
      city: null,
      street: null,
      district: null,
      numberForget: null,
      dialog: false,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'Rua',
          value: 'street',
          align: 'center',
        },
        {
          text: 'Número',
          value: 'numberForget',
          align: 'center',
        },
        {
          text: 'Bairro',
          value: 'district',
          align: 'center',
        },
        {
          text: 'CEP',
          value: 'zipCode',
          align: 'center',
        },
        {
          text: 'Cidade',
          value: 'city',
          align: 'center',
        },
        {
          text: 'Estado',
          value: 'state',
          align: 'center',
        },
        {
          text: 'ID do Usuário',
          value: 'idUser',
          align: 'center',
        },
        { text: 'Ações', value: 'actions', style: 'center', filterable: false },
      ],
    };
  },
  computed: {
    tituloDialog() {
      return this.id ? 'Editar Registro' : 'Criar Registro';
    },
  },
  async created() {
    await this.getAllAddress();
    await this.getAllUsers();
  },
  methods: {
    update(item) {
      this.id = item.id;
      this.zipCode = item.zipCode;
      this.state = item.state;
      this.city = item.city;
      this.street = item.street;
      this.district = item.district;
      this.numberForget = item.numberForget;
      this.idUser = item.idUser;
      this.dialog = true;
    },
    async persist() {
      try {
        const request = {
          zipCode: this.zipCode,
          state: this.state,
          city: this.city,
          street: this.street,
          district: this.district,
          numberForget: this.numberForget,
          idUser: this.idUser,
        };
        if (this.id) {
          await this.$api.patch(`/address/${this.id}`, request);
          this.$toast.success('Dado editado com êxito.');
        } else {
          await this.$api.post('/address/', request);
          this.$toast.success('Dado adicionado com êxito.');
        }
        this.zipCode = null;
        this.state = null;
        this.city = null;
        this.idUser = null;
        this.street = null;
        this.district = null;
        this.numberForget = null;
        this.id = null;
        this.dialog = false;
        await this.getAllAddress();
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.');
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/address/destroy/${item.id}`);
        await this.getAllAddress();
        this.$toast.success('Dado excluído com êxito.');
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.');
      }
    },
    async getAllAddress() {
      try {
        const response = await this.$api.get('/address/');
        this.items = response.data;
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.');
      }
    },
    async getAllUsers() {
      try {
        const response = await this.$api.get('/users/');
        this.users = response.data;
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.');
      }
    },
  },
};
</script>

<style>
</style>
