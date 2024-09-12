<template>
    <div>
        <button class="btn btn-primary w-100 rounded-4 py-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#modalCadastroCompra" aria-controls="modalCadastroCompra" @click="limparCampos">
            <i class="fa-solid fa-cart-plus me-1"></i>
            Cadastro Gasto
        </button>
        <div class="offcanvas offcanvas-start text-bg-dark rounded-end-5" data-bs-backdrop="static" data-bs-theme="dark" tabindex="-1" id="modalCadastroCompra" aria-labelledby="modalCadastroCompraLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="modalCadastroCompraLabel">Cadastro Gasto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <form id="formCadastroGasto" @submit.prevent class="row g-3">
                    <div class="col-12">
                        <label for="descricaoGasto" class="form-label">Descrição</label>
                        <input type="text" class="form-control" id="descricaoGasto" v-model="descricao" required>
                    </div>
                    <div class="col-sm-12 col-md-8">
                        <label for="formaPagamento" class="form-label">Forma do pagamento</label>
                        <select class="form-select" id="formaPagamento" v-model="formaPagamento" required>
                            <option selected disabled value="">Selecione uma forma de pagamento...</option>
                            <option v-for="(forma, index) in opcoesPagamento" :key="index" :value="forma.valor">{{forma.nome}}</option>
                        </select>
                    </div>
                    <div class="col-sm-12 col-md-4" v-if="formaPagamento === 'CP'">
                        <label for="qtdParcelas" class="form-label">Qtd. Parcelas</label>
                        <input type="number" class="form-control" id="qtdParcelas" v-model="qtdParcelas" required>
                    </div>
                    <div class="col-sm-12 col-md-8">
                        <label for="statusPagamento" class="form-label">Status atual do pagamento</label>
                        <select class="form-select" id="statusPagamento" v-model="statusPagamento" required>
                            <option selected disabled value="">Selecione o status atual do pagamento...</option>
                            <option v-for="(forma, index) in opcoesStatusPagamento" :key="index" :value="forma.valor">{{forma.nome}}</option>
                        </select>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <label for="dataGasto" class="form-label">Data</label>
                        <VDatePicker v-model="data" is-dark="true" color="yellow" borderless locale="pt-BR">
                            <template #default="{ inputValue, inputEvents }">
                                <input id="dataGasto" class="form-control" :value="inputValue" v-on="inputEvents" />
                            </template>
                        </VDatePicker>
                    </div>                    
                    <div class="col-sm-12 col-md-6">
                        <label for="valorTotal" class="form-label">Valor Total</label>
                        <input v-model="valor" v-money="moneyOptions" class="form-control" id="valorTotal" required>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-primary" @click="salvarGasto">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, getCurrentInstance, onMounted } from "vue";
    import { Offcanvas } from 'bootstrap';
    import { useToastStore } from '../stores/toastStore';

    const toastStore = useToastStore();

    let globals: any = null;
    let instanciaModal: any = null;
    let form: any = null;
    let valorTotalInput: any = null;

    
    onMounted(() => {
        const instance = getCurrentInstance()!;
        globals = instance.proxy?.$globals;
        
        form = document.querySelector('#formCadastroGasto');
        valorTotalInput = document.getElementById('valorTotal') ;


        const offcanvasElement = document.getElementById('modalCadastroCompra');
        if (offcanvasElement) {
            instanciaModal = new Offcanvas(offcanvasElement);
        } 
    });


    const descricao = ref('');
    const formaPagamento = ref('');
    const qtdParcelas = ref(2);
    const statusPagamento = ref('');
    const valor = ref('');
    const data = ref(new Date());

    const opcoesPagamento = ref([
        {nome:"Cartão Credito - À vista", valor:"C"},
        {nome:"Cartão Parcelado", valor:"CP"},
        {nome:"Cartão Debito", valor:"CD"},
        {nome:"Dinheiro", valor:"D"},
    ]);

    const opcoesStatusPagamento = ref([
        {nome:"Pago", valor:"Pago"},
        {nome:"Pendete", valor:"Pendete"},
        {nome:"Em andamento", valor:"Em andamento"},
    ]);

    const moneyOptions = {
        precision: 2,
        decimal: ',',
        thousands: '.',
        prefix: 'R$',
        suffix: '',
        allowBlank: true,
        masked: false
    }


    async function salvarGasto(){
        if (!globals) {
            console.error("Funções Globais não disponível");
            return;
        }
        toastStore.dispararMsg('Gasto cadastrado', `Gasto "${descricao.value}" cadastrado com Sucesso!`, 'success', 50000);
        

        if (validarCamposModal()) {
            return;
        }
        
        const dataFormatada = globals.formatarDataBR(data.value);
        const valorFormatado = globals.converteMoedaParaNumero(valor.value);

        const dados = {
            descricao: descricao.value,
            valor: valorFormatado,
            data_gasto: dataFormatada,
            forma_pagamento: formaPagamento.value,
            qtd_parcelas: formaPagamento.value === 'CP' ? qtdParcelas.value : null,
            status_pagamento: statusPagamento.value,
        };

        fetch('http://localhost:3000/gastos', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(dados),
        })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(result => {
            limparCampos();
            console.log('Gasto cadastrado:', result);
            instanciaModal.hide();
            toastStore.dispararMsg('Gasto cadastrado', `Gasto "${descricao.value}" cadastrado com Sucesso!`, 'success', 5000);
        })
        .catch(error => console.error('Erro ao cadastrar gasto:', error));
    }

    function validarCamposModal(){
        let campoInvalido = false;

        campoInvalido = descricao.value.trim() ? false : true;
        campoInvalido = data.value ? campoInvalido : true;
        campoInvalido = formaPagamento.value.trim() ? campoInvalido : true;
        campoInvalido = statusPagamento.value.trim() ? campoInvalido : true;
        campoInvalido = valor.value.trim() ? campoInvalido : true;

        if(formaPagamento.value === 'CP'){
            campoInvalido = qtdParcelas.value ? campoInvalido : true;
        }

        form && form.classList.add('was-validated');        

        return campoInvalido
    }

    function limparCampos(){
        descricao.value = '';
        formaPagamento.value = '';
        qtdParcelas.value = 2;
        statusPagamento.value = '';
        valor.value = '';
        data.value = new Date();
        if (form) {
            form.reset();
            form.classList.remove('was-validated');
        }
    }

</script>