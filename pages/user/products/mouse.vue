<template>
  <v-container>
    <v-row hidden>
  
      <v-col>
        <v-conteiner >
          <v-card v-for="(product, j) in products" :key="j">
            <v-img class="white--text align-end" height="250px" :src="product.imageSrc"></v-img>
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
      </v-conteiner>
        
      
        <br>
        <v-card class="mx-auto" max-width="430">
          <v-img class="white--text align-end" height="250px" src=""></v-img>
          <v-bottom-navigation v-model="value2" active color="primary">
            <v-btn>
              <v-icon>mdi-history</v-icon>
              Recentes
            </v-btn>
            <v-btn>
              <v-icon>mdi-heart</v-icon>
              Favoritos
            </v-btn>
            <v-btn>
              <v-icon>mdi-cart</v-icon>
              <span >Adicionar ao carrinho</span>
            </v-btn>
          </v-bottom-navigation>
        </v-card>
        <br>
      </v-col>

      <v-col>   
        <v-card class="mx-auto" max-width="430">
          <v-img class="white--text align-end" height="250px" src=""></v-img>
          <v-bottom-navigation v-model="value3" active color="primary">
            <v-btn>
              <v-icon>mdi-history</v-icon>
              Recentes
            </v-btn>
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
        <br>
        <v-card class="mx-auto" max-width="430">
          <v-img class="white--text align-end" height="250px" src=""></v-img>
          <v-bottom-navigation v-model="value4" active color="primary">
            <v-btn>
              <v-icon>mdi-history</v-icon>
              Recentes
            </v-btn>
            <v-btn>
              <v-icon>mdi-heart</v-icon>
              Favoritos
            </v-btn>
            <v-btn>
              <v-icon>mdi-cart</v-icon>
              <span>Adicionar ao carrinho</span>
              <v-model></v-model>
            </v-btn>
          </v-bottom-navigation>
        </v-card>
      </v-col>
      <br>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
const value3 = ref(0)
const value4 = ref(0)
</script>

<script>
export default {
  name: 'Products',
  layout: 'user',
  data() {
    return {
      items: [],
      categories:[],
    }
  },
  async created() {
    await this.getAllProducts()
  },
  methods: {
    async getAllProducts() {
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
