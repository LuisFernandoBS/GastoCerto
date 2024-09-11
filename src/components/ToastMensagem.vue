<template>
    <div id="divToasts" class="toast-container position-fixed bottom-0 end-0 p-1"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
  import { Toast } from 'bootstrap'; // Importa especificamente o componente Toast do Bootstrap
  
  // Estrutura para mapear os tipos de mensagens e seus estilos
  const tipoMsg = {
    success: {
      icon: "fa-regular fa-circle-check",
      corTitle: "bg-success",
      corBody: "bg-success-subtle",
    },
    warning: {
      icon: "fa-solid fa-triangle-exclamation",
      corTitle: "bg-warning",
      corBody: "bg-warning-subtle",
    },
    info: {
      icon: "fa-solid fa-gamepad",
      corTitle: "bg-info",
      corBody: "bg-info-subtle",
    },
  };
  
  // Referência ao container de toasts
  const divToasts = ref<HTMLElement | null>(null);
  
  // Função que dispara a mensagem
  function dispararMsg(
    title: string, 
    msg: string, 
    tipo: keyof typeof tipoMsg = "success", 
    time: number = 5000
  ) {
    if (!divToasts.value) return;
  
    // Contagem de toasts existentes
    const num = divToasts.value.querySelectorAll('.toast').length;
  
    // Template do toast
    const toastTemplate = `
      <div id="liveToast${num}" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="true" data-bs-autohide="true" data-bs-delay="${time}">
        <div class="toast-header ${tipoMsg[tipo].corTitle}">
          <i class="${tipoMsg[tipo].icon} text-white me-2"></i>
          <strong class="me-auto text-white">${title}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body ${tipoMsg[tipo].corBody}">
          ${msg}
        </div>
      </div>`;
  
    // Inserindo o novo toast no container
    divToasts.value.insertAdjacentHTML('beforeend', toastTemplate);
  
    // Seleciona o novo toast
    const toastElement = divToasts.value.querySelector(`#liveToast${num}`) as HTMLElement;
    
    if (toastElement) {
      const bsToast = new Toast(toastElement); // Uso da classe Toast importada
      bsToast.show();
  
      // Remove o toast após o tempo configurado
      setTimeout(() => {
        if (toastElement) {
          divToasts.value?.removeChild(toastElement);
        }
      }, time);
    }
  }
  
  // Acessa o DOM após o componente ser montado
  onMounted(() => {
    divToasts.value = document.getElementById('divToasts');
  });
  </script>
  