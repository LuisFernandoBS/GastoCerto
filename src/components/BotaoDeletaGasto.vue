<template>
    <i class="fa-solid fa-trash-can" role="button" @click="abrirModalDelete"></i>

    <div v-if="modalAberto" class="modal fade" id="modalDeletarGasto" data-bs-theme="dark" tabindex="-1" aria-labelledby="modalDeletarGastoLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-padrao rounded-4 border-0">
            <div class="modal-header border-0">
                <h1 class="modal-title fs-5 text-amarelo-padrao" id="modalDeletarGastoLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="fecharModalDelete"></button>
            </div>
            <div class="modal-body">
                <p class="text-center text-amarelo-padrao">Deseja deletar "{{ props.descricaoGasto }}"?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="fecharModalDelete">Não</button>
                <button type="button" class="btn btn-primary" @click="deletar">Sim</button>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useToastStore } from '../stores/toastStore';
    import { useTabelaGastosStore } from '../stores/tabelaGastosStore';
    import * as bootstrap from 'bootstrap';
    import { nextTick, ref } from "vue";

    const props = defineProps<{ codGasto: number, descricaoGasto: string }>();
    let modalAberto = ref<Boolean>(false);

    const toastStore = useToastStore();
    const tabelaGastosStore = useTabelaGastosStore();
    
    async function abrirModalDelete() {
        modalAberto.value = true;
        await nextTick();   
        const modalDeletarGasto = new bootstrap.Modal('#modalDeletarGasto',{backdrop: "static"})
        modalDeletarGasto.show();  
    }

    function fecharModalDelete() {
        modalAberto.value = false;
    }

    function deletar() {
        fetch('https://gasto-certo-ws.vercel.app/api/v1/gasto/' + props.codGasto, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(result => {
            tabelaGastosStore.atualizarTabelaGastos();
            const modalDeletarGasto = new bootstrap.Modal('#modalDeletarGasto')
            modalDeletarGasto.hide();
            modalAberto.value = false;
            toastStore.dispararMsg('Gasto deletado', `Gasto deletado com Sucesso!`, 'success', 5000);
        })
        .catch(error => console.error('Erro ao deletar gasto:', error));
    }
</script>