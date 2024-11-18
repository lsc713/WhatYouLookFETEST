<template>
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">로고</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <RouterLink class="nav-link active" aria-current="page" to="/">Weather</RouterLink>
                </li>
                <li class="nav-item">
                <RouterLink class="nav-link" to="/list">Board</RouterLink>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li>
                <!-- <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> -->
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-info" type="submit">Search</button>
            </form>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import '@/assets/styles/main.scss'
</script>

<style >
/* 전역 스타일로 body에 대한 스타일을 정의 */
.navbar {
    --rg-gradient-a-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-a-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    --rg-gradient-b-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-b-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
    --rg-gradient-c-25: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .25) 7.63%, rgba(151, 138, 255, .25) 37.94%, rgba(0, 210, 229, .25) 65.23%, rgba(143, 255, 248, .25) 92.12%);
    --rg-gradient-c-pressed: linear-gradient(var(--rg-gradient-angle, 96deg), rgba(255, 148, 241, .5) 7.63%, rgba(151, 138, 255, .67) 37.94%, rgba(0, 210, 229, .83) 65.23%, #8ffff8 92.12%);
  background: 
  /* var(--rg-gradient-a-25), */
  /* var(--rg-gradient-b-25), */
  var(--rg-gradient-c-25)
  ;
}

</style>