<style scoped src="./login.scss"></style>

<template>
    <Dialog v-model:visible="visible" modal header="Sign into your account" class="login-container" :style="{ width: '25rem' }">
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="form">
            <div class="form-field">
                <label for="username" class="">Username</label>
                <InputText name="username" type="text" placeholder="Username" size="large"/>
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
            </div>
            <div class="form-field">
                <label for="password" class="">Password</label>
                <Password name="password" placeholder="Password" :feedback="false" toggleMask size="large"/>
                <template v-if="$form.password?.invalid">
                    <Message v-for="(error, index) of $form.password.errors" :key="index" severity="error" size="small" variant="simple">{{ error.message }}</Message>
                </template>
            </div>
            <Button type="submit" severity="primary" label="Submit" />
        </Form>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
import { Form, FormSubmitEvent } from '@primevue/forms';
import { reactive } from 'vue';
import { SignIn } from '../../models/sign-in.model';
import supabase from '@/supabase-client';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const { visible } = defineModel<{
    visible?: boolean;
}>();

const initialValues = reactive<SignIn>({
    username: '',
    password: ''
});

const resolver = zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        password: z
            .string()
            .min(6, { message: 'Minimum 3 characters.' })
    })
);

const onFormSubmit = async (e: FormSubmitEvent) => {
    if (e.valid) {
        supabase.auth.signInWithPassword({
            email: e.states['username'].value,
            password: e.states['password'].value
        });
    }
};
</script>