<template>
    <div class="layui-layout layui-layout-admin">
        <left></left>
        <top></top>
        <router-view></router-view>
    </div>
</template>

<script>
    import left from "./Left.vue";
    import top from "./Top.vue";
    export default {
        name: "App",
        components:{
            left,
            top
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    header{
        width: 100%;
        height: 60px;
        background-color: #333;
    }
    body{
        height: 9999px;
    }
</style>