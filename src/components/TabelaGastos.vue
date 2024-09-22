<template>
    <div class="div-tabela">
        <table class="table table-dark table-hover mb-0">
            <thead>
                <tr>
                    <th scope="col" class="ps-4">Data</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Forma de pagamento</th>
                    <th scope="col">Qtd. Parcelas</th>
                    <th scope="col">Valor Total</th>
                    <th scope="col">Status Pagamento</th>
                    <th scope="col">Categoria</th>
                    <th scope="col" class="text-center">Deletar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(gasto, index) in listaGastos" :key="index">
                    <td class="ps-4">{{gasto.data_gasto}}</td>
                    <td>{{gasto.descricao}}</td>
                    <td>{{retornaDescricaoFormaPagamento(gasto.forma_pagamento)}}</td>
                    <td>{{gasto.qtd_parcelas ??"-"}}</td>
                    <td>{{gasto.valorFormatado}}</td>
                    <td>{{gasto.status_pagamento}}</td>
                    <td>{{gasto.nome_categoria}}</td>
                    <td class="text-center"><BotaoDeletaGasto :cod-gasto="gasto.cod" :descricao-gasto="gasto.descricao" /></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import BotaoDeletaGasto from '../components/BotaoDeletaGasto.vue';
    import { storeToRefs } from 'pinia'
    import { useTabelaGastosStore } from '../stores/tabelaGastosStore';
    import { format } from 'v-money3';
    
    interface IGastos{
        cod:number
        data_cadastro?:string
        data_gasto?:string
        descricao:string
        forma_pagamento?:string
        qtd_parcelas?:number
        valor?:number
        cod_categoria?:number
        nome_categoria?:string
        status_pagamento?:string
        valorFormatado?:string
    }

    let listaGastos = ref<Array<IGastos>>([]);

    const tabelaGastosStore = useTabelaGastosStore();
    let { atualizarTabela } = storeToRefs(tabelaGastosStore);

    const moneyOptions = {
        precision: 2,
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        allowBlank: true,
        masked: true
    }

    onMounted(() => {
        requisicaoListaGastos();
    })

    function requisicaoListaGastos() {
        fetch('https://gasto-certo-ws.vercel.app/api/v1/gasto/')
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(result => {
            if(result.data.length){
                listaGastos.value = result.data.map((gasto:IGastos) => {
                    gasto.valorFormatado = format(gasto.valor,moneyOptions);
                    return gasto;
                });
            }
        })
        .catch(error => console.error('Erro ao listar gastos:', error))
        .finally(() => {
            tabelaGastosStore.atualizarTabelaGastos(false);
        });
        ;
    }

    function retornaDescricaoFormaPagamento(sigla?:string):string {
        let desc:string = "";
        switch (sigla) {
            case "C":
                desc = "Cartão Credito - À vista";
                break;
            case "CP":
                desc = "Cartão Parcelado";
                break;
            case "CD":
                desc = "Cartão Debito";
                break;
            case "D":
                desc = "Dinheiro";
                break;
            default:
                break;
            }
        return desc;
    }

    watch(atualizarTabela, async (newStatus) => {
        newStatus && requisicaoListaGastos();
    })

</script>
<style>
.table>:not(caption)>*>* {
    background-color: #302d2d;
}

.table th {
    color: #E1C005;
}

.table-hover>tbody>tr:hover>* {
    --bs-table-accent-bg: #e1c00522;
}

.div-tabela{
    border-radius: 10px;
    overflow: hidden;
}

</style>