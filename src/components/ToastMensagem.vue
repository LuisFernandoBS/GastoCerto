<template>
  <div id="divToasts" class="toast-container position-fixed bottom-0 end-0 p-1">
    <div
      v-for="(message, index) in toastStore.messages"
      :key="index"
      :id="`liveToast${index}`"
      class="toast mb-1"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-autohide="true"
      :data-bs-delay="message.time"
    >
      <div class="toast-header" :class="getTipo(message.tipo).corTitle">
        <i :class="getTipo(message.tipo).icon" class="text-white me-2"></i>
        <strong class="me-auto text-white">{{ message.title }}</strong>
        <button type="button" class="btn-close" @click="removeToast(index)"></button>
      </div>
      <div class="toast-body" :class="getTipo(message.tipo).corBody">
        {{ message.msg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '../stores/toastStore';
import { onUpdated } from 'vue';
import { Toast } from 'bootstrap';

const toastStore = useToastStore();

type TipoMensagem = 'success' | 'warning' | 'info';

const tipoMsg: Record<TipoMensagem, { icon: string; corTitle: string; corBody: string }> = {
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

function getTipo(tipo: TipoMensagem) {
  return tipoMsg[tipo] || tipoMsg.success;
}

function removeToast(index: number) {
  toastStore.removeMsg(index);
}

onUpdated(() => {
  toastStore.messages.forEach((message, index) => {
    const toastElement = document.querySelector(`#liveToast${index}`) as HTMLElement;
    if (toastElement) {
      const bsToast = new Toast(toastElement);
      bsToast.show();
      setTimeout(() => {
        toastStore.removeMsg(index);
      }, message.time);
    }
  });
});
</script>

<style>

.toast{
  border-radius: 10px;
}

.toast-container .toast-body{
  border-radius: 10px 10px 10px 10px;
}

.toast-container .toast-header{
  border-radius: 10px 10px 0px 0px;
}

.toast{
  transition: height 5000ms ease 0s;
  animation: animacaoEntradaToast 1s ease 0s 1 normal forwards;
}

@keyframes animacaoEntradaToast {
	0% {
		opacity: 0;
		transform: translateY(250px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>