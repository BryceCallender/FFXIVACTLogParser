<style scoped src="./header.scss"></style>

<template>
    <header class="header-container">
        <nav class="group-container">
            <div class="group">
                <a class="logo-and-title" href="/">
                    <img src="@assets/logo.png" width="64" height="64"/>
                    <span class="title"> FFXIV ACT Log Parser</span>
                </a>
            </div>
            <div class="group">
                <template v-if="true">
                    <Button variant="text"> Sign Out </Button>
                    <Avatar label="BC" size="normal" />
                </template>
                <template v-else>
                    <Button variant="text" @click="showLoginModal"> Sign In </Button>
                </template>
            </div>
        </nav>
    </header>
    <LoginModal v-model:visible="showSignIn">
    </LoginModal>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import LoginModal from '../auth/components/login/login.vue';
import { storeToRefs } from 'pinia';


let showSignIn = $ref(false);

function showLoginModal() {
    showSignIn = true;
} 
</script>