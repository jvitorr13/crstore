<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->

<template>
  <v-container >
    <h1 style="text-align: center">Cadastro de produtos</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="ProductID"
              placeholder="codigo"
              label="codigo"
              color="red"
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="ProductName"
              placeholder="Nome"
              label="Nome"
              :rules="rule"
              color="red"
              required
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="ProductPrice"
              placeholder="Preço"
              label="Preço"
              color="red"
              :rules="rule"
              required
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="CategoryID"
              outlined
              label="categoria"
              color="red"
              :items="Category"
              item-text="name"
              item-value="id"
              clearable
              required
            >
            </v-text-field>
          </v-col>

          <v-col>
            <v-textarea
              v-model="ProductDescricao"
              placeholder="Descrição"
              label="Descrição"
              color="red"
              :rules="rule"
              outlined
            />
          </v-col>
        </v-row>
      </v-container>
      </v-form>
      
    <v-btn
      outlined
      to="/admin/product"
      color="red"
    >
      cancelar
    </v-btn>

    <v-btn
    outlined
    @click="persist"
      to="/admin/product"
      color="green"
    > 
      concluir
    </v-btn>
  </v-container>
</template>



<script>
export default {
  name: 'Index',
  data() {
    return {
      ProductID:null,
      CategoryID: [],
      ProductName:null,
      ProductPrice: null,
      ProductDescricao: null,
      headers: [
        { text: 'Produto', value: 'idProduct', align: 'center' },
        { text: 'id da categoria', value: 'idCategory', align: 'center' }, 
        { text: 'nome do produto', value: 'ProductName', align: 'center'},
        { text: 'preço do produto', value: 'ProductPrice', align: 'center'},
        { text: 'descrição do produto', value: 'productDescriao', align: 'center'},      
        { text: '', value: 'actions', filterable: false }
      ]
    }
  },
  async created() {
    await this.getAllProduct();
    await this.getAllCategory();
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    update(item) {
       this.idProduct = item.Product;
       this.idCategory = item.Category; 
       this.ProductName = item.Name;
       this.ProductPrice = item.Price;
       this.ProductDescricao =  item.Descricao;
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/Product/${item.ProductID}`);
        await this.getAllProduct();
        this.$toast.success('Deletado com sucesso');
      } catch (error) {
        this.$toast.error('Erro ao deletar');
      }
    },
    async getById (id) {
      const Product = await this.$api.$get(`/product/${id}`);
      this.Product = Product.data
    },
    async persist() {
      try {
        const request = {
          Product: this.IDProduct,
          Category: this.IDCategory,
          Name: this.ProductName,
          price: this.ProductPrice,
          Descricao: this.ProductDescricao,
        };
        if (this.idProduct) {
          await this.$api.patch(`/Product/${this.idProduct}`, request);
          this.$toast.success('Atualizado com sucesso');
        } else {
          await this.$api.post(`/Product`, request);
          this.$toast.success('Criado com sucesso');
        }
        this.IDProduct = null
        this.IDCategory = null;
        this.dialog = false;
        await this.getAllProduct();
      } catch (error) {
        this.$toast.error('Erro ao salvar');
      }
    },
    async getAllProduct() {
      try {
        const response = await this.$api.get('/Product');
        this.Product = response.data;
      } catch (error) {
        this.$toast.error('Erro ao obter categoria');
      }
    },
    async getAllCategory() {
      try {
        const response = await this.$api.get('/Product')
        this.Product = response.data
      } catch (error) {
        return this.$toast.error('F');
      }
    },
    
  }
}
</script>

<style>
</style>

