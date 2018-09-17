<template>
    <div>
        <div class="layui-body">
            <div style="padding: 15px;">
                <blockquote class="layui-elem-quote">
                    {{$route.params.name}}
                </blockquote>
                <a class="layui-btn layui-btn-normal" style="margin-bottom: 10px;" @click="add">保存</a>
                <div name="editor" id="editor" class="editor"></div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data:function () {
            return {
                rtnData:{},
                ue:null
            }
        },
        name: "Content",
        updated:function () {
            this.getData();
        },
        mounted:function () {
            this.ue = UE.getEditor('editor');
            this.getData();
        },
        methods:{
            add:function () {
                var sendJson = {
                    id:this.$route.params.id,
                    main:this.ue.getContent()
                }
                $.post("http://127.0.0.1/notesupdate.php",sendJson,function (data) {
                    if(data.status=="error"){
                        layer.open({
                            title: '提示'
                            ,content: '操作失败，请联系管理员'
                        });
                        return;
                    }
                })
            },
            getData:function () {
                var _self = this;
                $.get("http://127.0.0.1/notes.php?id="+this.$route.params.id,function (data) {
                    if(data.status=="error"){
                        layer.open({
                            title: '提示'
                            ,content: '操作失败，请联系管理员'
                        });
                        return;
                    }
                    _self.rtnData = data.message[0].main;
                    _self.createUeditor();
                })

            },
            createUeditor:function () {
                var _self = this;
                _self.ue.ready(function() {
                    _self.ue.setContent(_self.rtnData);
                })

            }
        }
    }


</script>

<style scoped>

</style>