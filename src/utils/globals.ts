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

export function converteMoedaParaNumero(valor: string):number {
    valor = valor.replace('R$', '').replace('.', '').replace(',', '.');

    const valorNumeral = parseFloat(valor); 
    return valorNumeral;
}