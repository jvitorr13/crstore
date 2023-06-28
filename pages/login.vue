<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Cadastro de empréstimos</h1>
        <v-btn fab small color="green" @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small color="green" @click="update(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="destroy(item)">
              mdi-delete
            </v-icon>
            <v-icon small color="green" @click="fimEmprestimo(item)">
              mdi-check
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          
      <div class="data de emprestimo">
        <v-locale-provider locale="sv">     
          <div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="data de emprestimo"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-locale-provider>
      </div>       
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="idLivros"
                outlined
                color="green"
                item-text="nome"
                item-value="id"
                placeholder="nome do livro"
                :items="livros"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="idUsuario"
                outlined
                color="green"
                item-text="nome"
                item-value="id"
                placeholder="nome do usuário"
                :items="idUsuario"
              ></v-autocomplete>
              </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist">Salvar</v-btn>
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
      usuarios: [],
      emprestimos:[],
      search: null,
      activePicker: null,
      items: [],
      dialog: false,
      idEmprestimo: null,
      dateFormat: null,
      date: null,
      menu: false,   
      idUsuario: [],
      livros: [], 
      idLivros: null, 
      headers: [
        { text: 'Empréstimo', value: 'devolucao', align: 'center' },
        { text: 'nome usuario', value: 'idUsuario', align: 'center' },
        { text: 'nome livro', value: 'idLivro', align: 'center' },    
        { text: '', value: 'actions', filterable: false }
      ]
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
    date (evento) {
      this.dateFormat = this.$formatDate(evento)
    }
  },
  async created() {
    await this.getAllEmprestimos();
    await this.getAllLivros();
    await this.getAllUsuario();
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    update(item) {
      this.idEmprestimo = item.Emprestimo;
      this.Date = item.Date;
      this.dialog = true;
      this.idLivros = item.livros;
      this.idUsuario = item.usuario;
    },
    async destroy(item) {
      try {
        await this.$api.delete(`/emprestimo/${item.idEmprestimo}`);
        await this.getAllEmprestimos();
        this.$toast.success('Deletado com sucesso');
      } catch (error) {
        this.$toast.error('Erro ao deletar');
      }
    },
    async persist() {
      try {
        const request = {
          idEmprestimo: this.Emprestimo,
          devolucao: this.devolucao,         
          idCategoria: this.Categoria,
          idUsuario: this.Usuario
        };
        if (this.idEmprestimo) {
          await this.$api.patch(`/emprestimo/${this.idEmprestimo}`, request);
          this.$toast.success('Atualizado com sucesso');
        } else {
          await this.$api.post(`/emprestimo`, request);
          this.$toast.success('Criado com sucesso');
        }
        this.idEmprestimo = null;
        this.devolucao = null;       
        this.idCategoria = null;
        this.idUsuario = null;
        this.dialog = false;
        await this.getAllEmprestimos();
      } catch (error) {
        this.$toast.error('Erro ao salvar');
      }
    },
    async fimEmprestimos(status){
      const id = status.id;
      const statusJSON = {
        devolucao: new Date(Date.now()).toISOString().substring(0, 10),
      }
      try {
        if (confirm(`deseja confirmar o emprestimo de id ${id}`)){
          await this.$axios.$patch(
            `http://localhost:3000/admin/emprestimos/${id}`,
            statusJSON
          )
          this.$toast.success(
            `emprestimo finalizado data: de ${new Date(Date.now())
            .toISOString()
            .substring(0, 10)}`
          )
          this.getAllEmprestimos()
        }
      } catch (error) {
        
      }this.$toast.warning('ocorreu um erro')

    },
    async getAllEmprestimos() {
      try {
        const response = await this.$api.get('/emprestimo');
        this.emprestimos = response.data;
      } catch (error) {
        this.$toast.error('Erro ao obter empréstimos');
      }
    },
    async getAllLivros() {
      try {
        const response = await this.$api.get('/livros')
        this.livros = response.data
      } catch (error) {
        return this.$toast.error('F')
      }
    },
    async getAllUsuario() {
      try {
        const response = await this.$api.get('/usuario');
        this.usuarios = response.data;
      } catch (error) {
        this.$toast.error('Erro ao obter usuários');
      }
    }
  }
}
</script>

<style>
</style>

