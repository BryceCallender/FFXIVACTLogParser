<style scoped src="./upload-logs.scss"></style>

<template>
    <div class="upload-logs-container">
        <template v-if="uploadComplete">
            <div class="upload-complete">
                <h3>Upload Complete!</h3>
                <Button label="View Report" @click="viewReport"></Button>
            </div>
        </template>
        <template v-else>
            <div class="file-select-container">
                <div class="file-label">
                    Select a file to upload!
                </div>
                <FileUpload ref="fileupload" mode="basic" name="logUpload" accept=".log" chooseLabel="Browse"/>
            </div>
            <InputText type="text" v-model="reportName" placeholder="Report Name"/>
            <Button label="Go!" @click="processFile" :disabled="disabled"></Button>
            <ProgressBar v-if="progress > 0" :value="progress"></ProgressBar>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import FileUpload, { FileUploadState }  from 'primevue/fileupload';
import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import InputText from 'primevue/inputtext';
import { useParserUploadStore } from './store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { RouteNames } from '@/app.routes';

const parserStore$ = useParserUploadStore();
const { progress, uploadReportKey } = $(storeToRefs(parserStore$));

const router = useRouter();

const fileupload = useTemplateRef<FileUploadState>('fileupload');
const canProcessFile = $computed(() => fileupload.value?.files?.length > 0);

let reportName = $ref<string>();
let uploadComplete = $ref(false);
let isProcessing = $ref(false);
const disabled = $computed(() => !canProcessFile || isProcessing);

function processFile () {
    const file = fileupload.value.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        const fileContent = e.target?.result as string;
        const fileLines = fileContent?.split('\n');

        isProcessing = true;
        try {
            // await parserStore$.createReport(reportName);
            await parserStore$.parseLogAsync(fileLines);
        } finally {
            isProcessing = false;
            uploadComplete = true;
        }
    };

    reader.readAsText(file);
}

function viewReport() {
    router.push({ name: RouteNames.Report, params: { key: uploadReportKey }});
}
</script>