<template>
    <div>
       <!-- <ul class="ul">
            <li @click="setLocalStorage('default')">代码样式1</li>
            <li @click="setLocalStorage('dark')">代码样式2</li>
            <li @click="setLocalStorage('funky')">代码样式3</li>
            <li @click="setLocalStorage('okaidia')">代码样式4</li>
            <li @click="setLocalStorage('twilight')">代码样式5</li>
            <li @click="setLocalStorage('coy')">代码样式6</li>
            <li @click="setLocalStorage('solarized')">代码样式7</li>
            <li @click="setLocalStorage('tomorrow')">代码样式8</li>
        </ul>-->
        <div id="content">
            {{$route.params.id}}
        </div>
    </div>

</template>

<script>
    export default {
        name: "noteMain",
        updated:function () {
            this.getData();
        },
        mounted:function () {
            this.getData();
        },
        props:['content'],
        methods:{
            getData:function () {
                var self = this;
                $.get("http://127.0.0.1/notes.php?id="+this.$route.params.id,function (data) {
                    if(data.status=="error"){
                        layer.open({
                            title: '提示'
                            ,content: '操作失败，请联系管理员'
                        });
                        return;
                    }
                    $("#content").html(data.message[0].main);
                    self.codeColor();
                    prisminit();
                })
            },
            codeColor:function () {
                var doc_pre = $("#content pre");
                doc_pre.each(function(){
                    var class_val = $(this).attr('class');
                    var class_arr = new Array();
                    if(!class_val){
                        return;
                    }
                    class_arr = class_val.split(';');
                    class_arr = class_arr['0'].split(':');
                    var lan_class = 'language-'+class_arr['1'];
                    var pre_content = '<code class="'+lan_class+'">'+$(this).html()+'</code>';
                    $(this).html(pre_content);
                    $(this).attr("class",'line-numbers '+lan_class);
                });
            },
            setLocalStorage:function (v) {
                localStorage.setItem("v_color",v);
            }
        }
    }
</script>

<style scoped>

</style>