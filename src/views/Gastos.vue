<template>
    <div class="container-fluid px-5">
      <div class="row justify-content-end mt-3">
        <div class="col-sm-12 col-md-2 text-right">
          <FormCadastroCompra/>
        </div>
      </div>
      <div class="row justify-content-end mt-3">
        <div class="col-12">
          <TabelaGastos/>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import FormCadastroCompra from '../components/FormCadastroCompra.vue';
import TabelaGastos from '../components/TabelaGastos.vue';
</script>
  