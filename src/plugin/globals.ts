import { App } from "vue";

export interface IGlobalModule {
    formatarDataBR: (stringData: Date) => string;
}

export default {
  install: (app: App) => {
    const globalModule: IGlobalModule = {
        formatarDataBR: function(stringData: Date) {
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
    }; 

    app.config.globalProperties.$globals = globalModule;
  }
}

declare module "@vue/runtime-core" {
  //Bind to `this` keyword
  interface ComponentCustomProperties {
    $globals: IGlobalModule;
  }
}