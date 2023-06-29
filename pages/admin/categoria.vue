<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Cadastro de Categorias</h1>
        <v-btn fab small color="green" @click="dialog = true">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      {{ search }}
      <v-card width="900">
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
          <template #[`item.actions`]="{ item }">
            <v-icon small color="green" @click="update(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="destroy(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="2">
              <v-text-field
                v-model="CategoryID"
                outlined               
                color="green"
                placeholder="ID Da Categoria"
                label="ID da categoria"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="CategoryName"
                outlined
                color="green"
                placeholder="Nome Da Categoria"
                label="Nome da categoria"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist"> Salvar </v-btn>
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
      CategoryID:null,
      dialog: false,
      CategoryName: null,
      headers: [
        { text: 'nome', value: 'categoryName', align: 'center' },
        { text: 'id da categoria', value: 'idCategory', align: 'center' }, 
        { text: '', value: 'actions'}
      ]
    }
  },
  async created() {
    await this.getAllCategory();
  },
  methods: {
    update(item) {
       this.CategoryID = item.Category;
       this.CategoryName = item.Name;
       this.dialog = true;
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/Category/${item.IDCategory}`);
        await this.getAllCategory();
        this.$toast.success('Deletado com sucesso');
      } catch (error) {
        this.$toast.error('Erro ao deletar');
      }
    },
    async getById (id) {
      const Category = await this.$api.$get(`/Category/${id}`);
      this.Category = Category.data
    },
    async persist() {
      try {
        const request = {
          Category: this.CategoryID,
          Name: this.CategoryName,
        };
        if (this.IDCategory) {
          await this.$api.patch(`/Category/${this.IDCategory}`, request);
          this.$toast.success('Atualizado com sucesso');
        } else {
          await this.$api.post(`/Category`, request);
          this.$toast.success('Criado com sucesso');
        }
        this.IDCategory = null
        this.IDCategory = null;
        this.dialog = false;
        await this.getAllCategory();
      } catch (error) {
        this.$toast.error('Erro ao salvar');
      }
    },
    async getAllCategory() {
      try {
        const response = await this.$api.get('/category')
        this.items = response.data
        await this.getAllCategory()
      } catch (error) {
        this.$toast.error('Erro ao obter categoria');
      }
    },
    
  }
}


  </script>
