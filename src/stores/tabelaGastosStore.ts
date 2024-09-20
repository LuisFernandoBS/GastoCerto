import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTabelaGastosStore = defineStore('tabelaGastos', () => {
    let atualizarTabela = ref<Boolean>(false);
  
    function atualizarTabelaGastos(status: Boolean = true) {
      atualizarTabela.value = status;
    }
  
    return { atualizarTabela, atualizarTabelaGastos };
});