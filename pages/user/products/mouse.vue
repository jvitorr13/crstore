<!-- eslint-disable vue/no-parsing-error -->
<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, i) in products" :key="i" max-width="100" :class="{'custom-col': i === 2}">
        <v-card v-if="item.idCategory === 2" height="300" width="250">
          <v-img
            class="product-image"
            :src="item.image"
            cover
            width="250"
            height="200"
          ></v-img>

          <v-card-subtitle class="pt-4">{{ item.name }}</v-card-subtitle>

          <v-card-text>
            <div>{{ item.price }}</div>
            <div>{{ item.desc }}</div>
          </v-card-text>

          <v-bottom-navigation v-model="value1" active color="primary">
            <v-btn>
              <v-icon>mdi-heart</v-icon>
              Favoritos
            </v-btn>
            <v-btn>
              <v-icon>mdi-cart</v-icon>
              <span>Adicionar ao carrinho</span>
            </v-btn>
          </v-bottom-navigation>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  name: 'Products',
  layout: 'user',

data() {
      return{
        model: null,
        products:[],
        drawer: null 
      }
    },

    // eslint-disable-next-line require-await
    async created(){
      this.getAll()
    },
    methods:{
      async getAll () {
        const response = await this.$api.get('/products-by-category/2')      
        response.data.forEach(element => {
          element.name = element.name.toUpperCase()
        });
        this.products = response.data
      },
    }
  }
  </script>

