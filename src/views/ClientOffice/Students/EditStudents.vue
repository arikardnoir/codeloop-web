<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Editar Aluno</div>
      <div class="col col-9">
        <button class="btn btn-success" @click="ProcessForm">Atualizar</button>
        <div class="float-btn">
          <i class="fas fa-save"></i>
        </div>
      </div>
    </div>
<div class="container">
      <div class="form-container">
        <div class="row"><span>Aluno</span></div>
        <div class="row">
          <div class="col col-3">
            <label for>Nome</label>
            <input type="text" v-model="form.name" placeholder="Testando" />
          </div>
          <div class="col col-3">
            <label for>Data de Nascimento</label>
            <input type="text" v-model="form.birthday" placeholder="30/05/1994" />
          </div>
          <div class="col col-3">
            <label for>Serie de Ingresso</label>
            <input type="text" v-model="form.class" id />
          </div>
        </div>
      </div>
    </div>

     <div class="container">
      <div class="form-container">
        <div class="row"><span>Endereço</span></div>
        <div class="row">
          <div class="col col-3">
            <label for>Rua</label>
            <input type="text" v-model="form.address.street"  />
          </div>
          <div class="col col-3">
            <label for>Complemento</label>
            <input type="text" v-model="form.address.building_complement"  />
          </div>
          <div class="col col-6">
            <label for>Numero</label>
            <input type="text" v-model="form.address.number" id />
          </div>
          <div class="col col-6">
            <label for>Cep</label>
            <input type="text" v-model="form.address.cep"/>
          </div>
        </div>
        <div class="row">
          <div class="col col-3">
            <label for>Bairro</label>
            <input type="text" v-model="form.address.neighborhood" />
          </div>
          <div class="col col-3">
            <label for>Cidade</label>
            <input type="text" v-model="form.address.city"  />
          </div>
          <div class="col col-3">
            <label for>Estado</label>
            <input type="text" v-model="form.address.state" id />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="form-container">
        <div class="row"><span>Informações da Mãe</span></div>
        <div class="row">
          <div class="col col-3">
            <label for>Nome da Mãe</label>
            <input type="text" v-model="form.mom_info.mom_name"/>
          </div>
          <div class="col col-3">
            <label for>CPF da Mãe</label>
            <input type="text" v-model="form.mom_info.cpf" />
          </div>
          <div class="col col-3">
            <label for>Data de Pagamento</label>
            <input type="text" v-model="form.mom_info.payment_date" placeholder="24/05/2021" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: { },
  props: {
    id: {
      type: Number
    }
  },
  data () {
    return {
      form: {}
    }
  },
  methods: {
    /*
     * ProcessForm: This method will validate the RegistProduct() method
     */
    async ProcessForm () {
      const result = await this.$validator.validateAll()
      return result ? this.UpdateStudent() : result
    },
    /**
     * GetStudent: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetStudent () {
      try {
        const result = await this.axios.get(
          `auth/student/${this.id}`
        )
        const res = result.data
        this.form = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    /*
    *
    *  UpdateStudent: This method will make requistion to store a product.
    */
    async UpdateStudent () {
      this.isRequesting = true
      try {
        await this.axios.post(`/auth/student/${this.id}`, { name: this.form.name, birthday: this.form.birthday, class: this.form.class, ...this.form.address, ...this.form.mom_info })
        this.$router.push({ name: 'ListStudents' })
      } catch (e) {
        console.error(e)
      }
    },
    convertData (d) {
      var dt = d.split('/')
      var date = new Date(dt[2], dt[0] - 1, dt[1])
      return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    }
  },
  created () {
    this.GetStudent()
  }
}
</script>
<style style="scss" scoped></style>
