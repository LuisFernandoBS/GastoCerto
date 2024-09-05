<template>
    <nav class="navbar navbar-expand-custom navbar-mainbg">
      <a class="navbar-brand navbar-logo ms-5" href="#">Gasto Certo</a>
      <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
        <i class="fas fa-bars text-white"></i>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: isNavbarCollapsed }" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto me-sm-0 me-md-5 mb-1 mb-md-0">
          <div class="hori-selector">
            <div class="left"></div>
            <div class="right"></div>
          </div>
          <li class="nav-item active" @click="atualizarHoriSelector">
            <router-link to="/" class="nav-link">
                <i class="fas fa-tachometer-alt"></i>Dashboard
            </router-link>
          </li>
          <li class="nav-item" @click="atualizarHoriSelector">
            <router-link to="/gastos" class="nav-link">
                <i class="fa-solid fa-cash-register"></i>Gastos
            </router-link>
          </li>
          <li class="nav-item" @click="atualizarHoriSelector">
            <router-link to="/" class="nav-link">
                <i class="fa-solid fa-chart-pie"></i>Graficos
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    
    const isNavbarCollapsed = ref(false);
    
    const toggleNavbar = () => {
        isNavbarCollapsed.value = !isNavbarCollapsed.value;
    };
    
    const atualizarHoriSelector = () => {
        const itens = document.querySelectorAll('#navbarSupportedContent .nav-item');
        const ativo = document.querySelector('#navbarSupportedContent .active');
        const horiSelector = document.querySelector('.hori-selector');
    
        if (ativo && horiSelector) {
            const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = ativo as HTMLElement;
            (horiSelector as HTMLElement).style.top = `${offsetTop}px`;
            (horiSelector as HTMLElement).style.left = `${offsetLeft}px`;
            (horiSelector as HTMLElement).style.height = `${offsetHeight}px`;
            (horiSelector as HTMLElement).style.width = `${offsetWidth}px`;
        }
    
        itens.forEach((item) => {
            item.addEventListener('click', () => {
                itens.forEach((i) => i.classList.remove('active'));
                item.classList.add('active');
                const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = item as HTMLElement;
                (horiSelector as HTMLElement).style.top = `${offsetTop}px`;
                (horiSelector as HTMLElement).style.left = `${offsetLeft}px`;
                (horiSelector as HTMLElement).style.height = `${offsetHeight}px`;
                (horiSelector as HTMLElement).style.width = `${offsetWidth}px`;
            });
        });
    };
    
    onMounted(() => {
        atualizarHoriSelector();
        window.addEventListener('resize', () => {
            setTimeout(atualizarHoriSelector, 500);
        });
    });
    
    watch(isNavbarCollapsed, () => {
        if (!isNavbarCollapsed.value) {
            atualizarHoriSelector();
        }
    });
  </script>
  
  <style scoped>
  /* Seu CSS já fornecido, sem alterações */
  @import url('https://fonts.googleapis.com/css?family=Roboto');

    i {
        margin-right: 10px;
    }
    /*----------bootstrap-navbar-css------------*/
    .navbar-logo{
        padding: 15px;
        color: #242222;
    }
    .navbar-mainbg{
        background-color: rgb(225, 192, 5);
        padding: 0px;
    }
    #navbarSupportedContent{
        overflow: hidden;
        position: relative;
    }
    #navbarSupportedContent ul{
        padding: 0px;
        margin: 0px;
    }
    #navbarSupportedContent ul li a i{
        margin-right: 10px;
    }
    #navbarSupportedContent li {
        list-style-type: none;
        float: left;
    }
    #navbarSupportedContent ul li a{
        color: #242222;
        text-decoration: none;
        font-weight: 400;
        font-size: 15px;
        display: block;
        padding: 20px 20px;
        transition-duration:0.6s;
        transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        position: relative;
    }
    #navbarSupportedContent>ul>li.active>a{
        color: rgb(225, 192, 5);
        background-color: transparent;
        transition: all 0.7s;
    }
    #navbarSupportedContent a:not(:only-child):after {
        content: "\f105";
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 14px;
        font-family: "Font Awesome 5 Free";
        display: inline-block;
        padding-right: 3px;
        vertical-align: middle;
        font-weight: 900;
        transition: 0.5s;
    }
    #navbarSupportedContent .active>a:not(:only-child):after {
        transform: rotate(90deg);
    }
    .hori-selector{
        display:inline-block;
        position:absolute;
        height: 100%;
        top: 0px;
        left: 0px;
        transition-duration:0.6s;
        transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        background-color: #242222;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        margin-top: 10px;
    }
    .hori-selector .right,
    .hori-selector .left{
        position: absolute;
        width: 25px;
        height: 25px;
        background-color: #242222;
        bottom: 10px;
    }
    .hori-selector .right{
        right: -25px;
    }
    .hori-selector .left{
        left: -25px;
    }
    .hori-selector .right:before,
    .hori-selector .left:before{
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(225, 192, 5);
    }
    .hori-selector .right:before{
        bottom: 0;
        right: -25px;
    }
    .hori-selector .left:before{
        bottom: 0;
        left: -25px;
    }


    @media(min-width: 992px){
        .navbar-expand-custom {
            -ms-flex-flow: row nowrap;
            flex-flow: row nowrap;
            -ms-flex-pack: start;
            justify-content: flex-start;
        }
        .navbar-expand-custom .navbar-nav {
            -ms-flex-direction: row;
            flex-direction: row;
        }
        .navbar-expand-custom .navbar-toggler {
            display: none;
        }
        .navbar-expand-custom .navbar-collapse {
            display: -ms-flexbox!important;
            display: flex!important;
            -ms-flex-preferred-size: auto;
            flex-basis: auto;
        }
    }


    @media (max-width: 991px){
        #navbarSupportedContent ul li a{
            padding: 12px 30px;
        }
        .hori-selector{
            margin-top: 0px;
            margin-left: 10px;
            border-radius: 0;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
        }
        .hori-selector .left,
        .hori-selector .right{
            right: 0px;
        }
        .hori-selector .left{
            top: -25px;
            left: auto;
        }
        .hori-selector .right{
            bottom: -25px;
        }
        .hori-selector .left:before{
            left: -25px;
            top: -25px;
        }
        .hori-selector .right:before{
            bottom: -25px;
            left: -25px;
        }
    }
  </style>
  