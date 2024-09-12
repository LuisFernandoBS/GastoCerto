import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  type TipoMensagem = 'success' | 'warning' | 'info';

  const messages = ref<Array<{ title: string; msg: string; tipo: TipoMensagem; time: number }>>([]);

  function dispararMsg(title: string, msg: string, tipoTexto: string = "success", time: number = 5000) {
    let tipo = tipoTexto as TipoMensagem;
    messages.value.push({ title, msg, tipo, time });
  }

  function removeMsg(index: number) {
    messages.value.splice(index, 1);
  }

  return { messages, dispararMsg, removeMsg };
});