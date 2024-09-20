export function formatarDataBR(stringData: Date):string {
    if(stringData){
        const data = new Date(stringData);
        return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        });
    }
    return "";
}

export function converteMoedaParaNumero(valor: string):string {
    // valor = valor.replace('R$', '').replace('.', '').replace(',', '.');
    valor = valor.replace('R$', '').trim();
    valor = valor.replace(/\./g, '').replace(',', '.');
    
    const valorNumeral = parseFloat(valor);
    return valorNumeral.toFixed(2);
}