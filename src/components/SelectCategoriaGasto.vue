    <template>
        <div>
            <label for="categoriaGasto" class="form-label">Categoria</label>
            <select id="categoriaGasto" class="form-select" :disabled="selectDesabilitado" @change="(event)=>emit('setar-valor-select', (event.target as HTMLSelectElement).value)" required>
                <option value="" selected disabled>Selecione uma categoria...</option>        
                <option v-for="categoria in listaCategoria" :value="categoria.cod">{{ categoria.nome }}</option>       
            </select>
        </div>
    </template>
    <script setup lang="ts">
        import { ref, onMounted } from "vue";

        const emit = defineEmits(['setar-valor-select']);

        interface ICategoriaGasto {
            cod:number,
            nome:string
        }

        const listaCategoria = ref<Array<ICategoriaGasto>>([]);
        const selectDesabilitado = ref(true);

        onMounted(() => {
            requisicaoListaCategoriaGastos();
        });

        function requisicaoListaCategoriaGastos() {
            fetch('https://gasto-certo-ws.vercel.app/api/v1/categoria/')
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(result => {
                if(result.data.length){
                    listaCategoria.value = result.data;
                }
            })
            .catch(error => console.error('Erro ao listar categoria dos gastos:', error))
            .finally(() => {
                selectDesabilitado.value = false;
            });
            ;
        }
    </script>