<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Produto</div>
      <div class="col col-9">
        <button class="btn btn-success" @click="ProcessForm">Salvar</button>
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
            <input type="text" v-model="form.street"  />
          </div>
          <div class="col col-3">
            <label for>Complemento</label>
            <input type="text" v-model="form.building_complement"  />
          </div>
          <div class="col col-6">
            <label for>Numero</label>
            <input type="text" v-model="form.number" id />
          </div>
          <div class="col col-6">
            <label for>Cep</label>
            <input type="text" v-model="form.cep"/>
          </div>
        </div>
        <div class="row">
          <div class="col col-3">
            <label for>Bairro</label>
            <input type="text" v-model="form.neighborhood" />
          </div>
          <div class="col col-3">
            <label for>Cidade</label>
            <input type="text" v-model="form.city"  />
          </div>
          <div class="col col-3">
            <label for>Estado</label>
            <input type="text" v-model="form.state" id />
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
            <input type="text" v-model="form.mom_name"/>
          </div>
          <div class="col col-3">
            <label for>CPF da Mãe</label>
            <input type="text" v-model="form.cpf" />
          </div>
          <div class="col col-3">
            <label for>Data de Pagamento</label>
            <input type="text" v-model="form.payment_date" placeholder="24/05/2021" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: { },
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
      return result ? this.RegistStudent() : result
    },
    /*
    *
    *  RegistStudent: This method will make requistion to store a product.
    */
    async RegistStudent () {
      this.isRequesting = true
      var d = this.convertData(this.form.birthday)
      var ds = this.convertData(this.form.payment_date)

      this.form.birthday = d
      this.form.payment_date = ds

      try {
        await this.axios.post(`auth/student`, this.form)
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
  }
}
</script>
<style style="scss" scoped></style>
