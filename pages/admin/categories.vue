<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <h1>Cadastro de Categorias</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn fab small @click="dialog = true">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row style="padding-top: 20px" class="d-flex justify-center align-center">
      <v-card class="elevation-10" width="900">
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
          <template v-slot:item.actions="{ item }">
            <v-icon medium @click="update(item)"> mdi mdi-pencil-circle </v-icon>
            <v-icon medium @click="destroy(item)"> mdi mdi-delete-circle </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card style="padding: 15px" color="blue-grey darken-2">
        <v-card-title>{{ tituloDialog }}</v-card-title>
        <v-card-content style="padding: 15px">
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="id" outlined disabled placeholder="ID da Categoria" label="ID da Categoria"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="name" outlined placeholder="Nome da Categoria" label="Nome da Categoria"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="caminho" outlined placeholder="Nome do caminho" label="Nome do Caminho"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="icone" outlined placeholder="Icone" label="Icone"></v-text-field>
            </v-col>
          </v-row>
        </v-card-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="persist"> Salvar </v-btn>
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
      name: null,
      id: null,
      icone: null,
      caminho: null,
      headers: [
        { text: 'ID', value: 'id', align: 'center' },
        { text: 'Categoria', value: 'name', align: 'center' },
        { text: 'Caminho', value: 'caminho', align: 'center' },
        { text: 'Icone', value: 'icone', align: 'center' },
        { text: 'Ações', value: 'actions', align: 'center', filterable: false },
      ],
    };
  },
  computed: {
    tituloDialog() {
      return this.id ? 'Editar Registro' : 'Criar Registro';
    },
  },
  async created() {
    await this.getAllCategories();
  },
  methods: {
    update(item) {
      this.name = item.name;
      this.caminho = item.caminho;
      this.icone = item.icone;
      this.id = item.id;
      this.dialog = true;
    },
    async persist() {
      try {
        const request = {
          name: this.name,
          caminho: this.caminho,
          icone: this.icone,
        };
        if (this.id) {
          await this.$api.patch(`/categories/${this.id}`, request);
          this.$toast.success('Dado editado com êxito.');
        } else {
          await this.$api.post(`/categories/`, request);
          this.$toast.success('Dado adicionado com êxito.');
        }
        this.name = null;
        this.caminho = null;
        this.icone = null;
        this.id = null;
        this.dialog = false;
        await this.getAllCategories();
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.');
      }
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/categories/destroy/${item.id}`);
        await this.getAllCategories();
        this.$toast.success('Dado excluído com êxito.');
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.');
      }
    },
    async getAllCategories() {
      try {
        const response = await this.$api.get('/categories/');
        this.items = response.data;
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.');
      }
    },
  },
};
</script>

<style></style>
