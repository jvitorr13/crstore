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
        <h1>Cadastro de Produtos</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn fab small  @click="dialog = true">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row style="padding-top: 20px" class="d-flex justify-center align-center">
      <v-card
        class="elevation-10"
        width="900"
        
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
            <v-icon medium @click="update(item)">
              mdi mdi-pencil-circle
            </v-icon>
            <v-icon medium  @click="destroy(item)">
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
                v-model="idCategory"
                :items="categories"
                item-text="name"
                item-value="id"
                label="Categoria"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="name"
                outlined
                background-color="blue-grey darken-3"
                placeholder="Nome do produto"
                label="Nome do produto"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="price"
                outlined
                background-color="blue-grey darken-3"
                placeholder="Preço"
                label="Preço"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="image"
                outlined
                background-color="blue-grey darken-3"
                placeholder="Imagem do produto"
                label="Imagem do produto"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="description"
                outlined
                background-color="blue-grey darken-3"
                placeholder="Descrição"
                label="Descrição"
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
      categories: [],
      id: null,
      name: null,
      price: null,
      image: null,
      description: null,
      dialog: false,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'Nome',
          value: 'name',
          align: 'center',
        },
        {
          text: 'Preço',
          value: 'price',
          align: 'center',
        },
        {
          text: 'Imagem',
          value: 'image',
          align: 'center',
        },
        {
          text: 'Descrição',
          value: 'description',
          align: 'center',
        },
        {
          text: 'ID da Categoria',
          value: 'idCategory',
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
    await this.getAllProducts()
    await this.getAllCategories()
  },

  methods: {
    update(item) {
      this.id = item.id
      this.name = item.name
      this.price = item.price
      this.image = item.image
      this.description = item.description
      this.idCategory = item.idCategory
      this.dialog = true
    },

    async persist() {
      try {
        const request = {
          name: this.name,
          price: this.price,
          image: this.image,
          description: this.description,
          idCategory: this.idCategory,
        }
        if (this.id) {
          await this.$api.patch(`/product/${this.id}`, request)
          this.$toast.success('Dado editado com êxito.')
        } else {
          await this.$api.post(`/product`, request)
          this.$toast.success('Dado adicionado com êxito.')
        }
        this.name = null
        this.price = null
        this.image = null
        this.idCategory = null
        this.description = null
        this.id = null
        this.dialog = false
        await this.getAllProducts()
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async destroy(item) {
      try {
        await this.$api.delete(`/products/deletar/${item.id}`)
        await this.getAllProducts()
        this.$toast.success('Dado excluído com êxito.')
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllProducts() {
      try {
        const response = await this.$api.get('/products')
        this.items = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllCategories() {
      try {
        const response = await this.$api.get('/category')
        this.categories = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
  },
}
</script>

<style></style>