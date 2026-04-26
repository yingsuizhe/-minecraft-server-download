<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import type {TableColumnCtx} from "element-plus";
import type {version} from "../ts/entity/VersionEntity.ts"

// Java版服务端版本清单URL
const javaVersionManifestURL = "https://launchermeta.mojang.com/mc/game/version_manifest.json"
// 浏览器高度
const windowHeight = window.innerHeight

const javaVersionManifestInfo = ref<version[]>([])
/**
 * 组件加载完成之后, 获取服务端下载路径
 */
onMounted(async () => {
        // 获取初始数据
        const tem = await axios.get(javaVersionManifestURL);
        // 获取版本信息,赋值
        javaVersionManifestInfo.value = tem.data.versions;
    }
)

/**
 * 下载服务端
 *
 * @param row 当行数据
 */
const download = async (row: version) => {
    // 获取版本信息
    const versionInfo = await axios.get(row.url)
    // 服务器jar包下载地址
    const serverJarUrl = versionInfo.data.downloads.server.url
    // 打开新窗口进行下载
    window.open(serverJarUrl, "_blank");
}

/**
 * 版本类型筛选器
 *
 * @param value 需要筛选的版本类型
 * @param row 当行数据
 * @param column 列名
 */
const typeFilter = (
    value: string,
    row: any,
    column: TableColumnCtx<version>
) => {
    // 获取这一列的列名
    const property = column['property'];
    // 判断这一行的type是否为要筛选的字段,返回一个boolean类型
    return row[property] === value;
}
</script>

<template>
    <h1>java版服务端下载</h1>
    <el-table :data="javaVersionManifestInfo" stripe border :max-height="windowHeight">
        <el-table-column label="版本" prop="id"/>
        <el-table-column
            :filters="[
                {text:'正式版',value:'release'},
                {text:'快照版',value:'snapshot'}
            ]"
            :filter-method="typeFilter"
            label="版本类型" prop="type"/>
        <el-table-column label="下载按钮">
            <template #default="scope">
                <el-button-group
                    v-if="!(scope.row.type === 'old_alpha' || scope.row.type === 'old_beta' || scope.row.id === '1.0' || scope.row.id === '1.1' || scope.row.id === '1.2.1' || scope.row.id === '1.2.2' || scope.row.id === '1.2.3' || scope.row.id === '1.2.4')">
                    <el-button @click="download(scope.row)">下载</el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped>

</style>