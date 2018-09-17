<template>
    <div class="note_main">
        <div class="top">
            <p>程序员笔记</p>
        </div>
        <div class="left">
            <ul class="tree">
                <li>
                    <ul>
                        <li v-for="item1 in a.value">
                            <p @click="showli"><i class="iconfont icon-wenjianjiashouqi"></i>{{item1.name}}</p>
                            <ul>
                                <li v-for="item2 in item1.value">
                                    <p @click="showli"><span class="span"></span><i
                                            class="iconfont icon-wenjianjiashouqi"></i>{{item2.name}}
                                    </p>
                                    <ul>
                                        <li v-for="item3 in item2.value">
                                            <p @click="showli"><span class="span"></span><span class="span"></span><i
                                                    class="iconfont icon-wenjianjiashouqi"></i>{{item3.name}}</p>
                                            <ul class="note">
                                                <li v-for="item4 in item3.value">
                                                    <router-link :to="{name:'noteDetail',params:{id:item4.id}}">
                                                        <p><span class="span"></span><span class="span"></span><span
                                                                class="span"></span><i
                                                                class="iconfont icon-wenjianfile"></i>{{item4.name}}
                                                        </p>
                                                    </router-link>

                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "noteDetail",
        data: function () {
            return {
                a: {}
            }
        },
        beforeCreate: function () {
            var _self = this;
            $.get("http://127.0.0.1/tree.php").success(function (data) {
                if(data.status=="error"){
                    layer.open({
                        title: '提示'
                        ,content: '操作失败，请联系管理员'
                    });
                    return;
                }
                _self.a = JSON.parse(data.message[0].content);
            })
        },
        methods: {
            showli: function (event) {
                $(event.currentTarget).next("ul").slideToggle(200);
            }
        }
    }
</script>

<style scoped>

</style>