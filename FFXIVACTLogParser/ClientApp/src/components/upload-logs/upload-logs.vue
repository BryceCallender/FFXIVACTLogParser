<style scoped src="./upload-logs.scss"></style>

<template>
    <div class="upload-logs">
        <FileUpload ref="fileupload" mode="basic" name="logUpload" @select="onFileSelect" :auto="true" chooseLabel="Browse"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FileUpload, FileUploadSelectEvent } from 'primevue';
import { useParserUploadStore } from '@/store';

const parserStore$ = useParserUploadStore();

const fileupload = ref();

function onFileSelect (e: FileUploadSelectEvent) {
    const file = e.files[0];
    
    const reader = new FileReader();

    reader.onload = async (e) => {
        const fileContent = e.target?.result as string;
        const fileLines = fileContent?.split('\n');

        parserStore$.parseLog(fileLines);
    };

    reader.readAsText(file);
}
</script>