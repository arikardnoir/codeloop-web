<template>
  <div>
    <div class="main-header">
      <div class="main-header__heading">Alunos</div>
      <div class="col col-9">
          <router-link :to="{name: 'RegistStudents'}" tag="span">
                <button class="btn btn-primary">Novo Aluno</button>
          </router-link>
        <div class="float-btn plus"><i class="fas fa-plus"></i></div>
      </div>
    </div>
    <div class="container">
      <Table
          :cols="cols"
          :data="students"
          title="students"
          :searchMethod="GetStudents"
          :paginationMethod="GetStudents"
          :sortMethod="GetStudents"
          :pagination="pagination"
          :changePage="changePage"
          resource="Students"
          editRoute="EditStudents"
        ></Table>
    </div>
  </div>
</template>
<script>
import Table from '@/components/ClientOffice/Layouts/Table.vue'

export default {
  components: {
    Table
  },
  data () {
    return {
      students: [],
      hadError: '',
      isRequesting: false,
      cols: [
        { name: 'name', label: 'Nome' },
        { name: 'birthday', label: 'Data de Nascimento' },
        { name: 'class', label: 'Serie de Ingresso' }
      ],
      pagination: {
        perPage: 12,
        pageable: { pageNumber: 0 }
      }
    }
  },
  methods: {
    SelectImage (file) {
      this.form.file = file
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    /*
     *  GetOperators: This method will fire a GET request
     *  to fetch the Students and the will store the result
     *  into the orders local state property
     */
    async GetStudents () {
      this.isRequesting = true

      try {
        const result = await this.axios.get(`/auth/student`)
        const res = result.data
        this.totalElements = res.items_count
        this.students = res.data
      } catch (e) {
        this.hadError =
          'Não foi possível carregar os Alunos. Actualize a página.'
      }
      this.isRequesting = false
    }
  },
  created () {
    this.GetStudents()
  }
}
</script>
<style style="scss" scoped></style>
