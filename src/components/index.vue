<script setup lang="ts">
import {useRouter} from 'vue-router'

const router = useRouter()

const openJava = () => {
    router.push("/java")
}

const openBedrock = () => {
    router.push("/openBedrock")
}
</script>

<template>
    <h1>服务端下载</h1>
    <el-button type="primary" @click="openJava">Java版</el-button>
    <el-button type="primary" @click="openBedrock">基岩版</el-button>
</template>

<style scoped>

</style>