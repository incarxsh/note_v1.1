<template>
    <div class="layui-side layui-bg-black">

        <ul class="orderli" id="orderli" style="display: none;">
            <li v-for="item in orderLi" :data-order="item.order" :key="item.name">
                {{item.name}}
            </li>
        </ul>

        <ul class="tree">
            <li>
                <ul>
                    <li v-for="item1 in a.value" @mouseup="add($event)">
                        <p><i class="iconfont icon-wenjianjiashouqi"></i>{{item1.name}}</p>
                        <ul>
                            <li v-for="item2 in item1.value" @mouseup="add($event)">
                                <p><span class="span"></span><i class="iconfont icon-wenjianjiashouqi"></i>{{item2.name}}
                                </p>
                                <ul>
                                    <li v-for="item3 in item2.value" @mouseup="add($event)">
                                        <p><span class="span"></span><span class="span"></span><i
                                                class="iconfont icon-wenjianjiashouqi"></i>{{item3.name}}</p>
                                        <ul class="note">
                                            <li v-for="item4 in item3.value" @mouseup="add($event)">
                                                <router-link :to="{name:'cont',params:{id:item4.id,name:item4.name}}">
                                                    <p><span class="span"></span><span class="span"></span><span
                                                            class="span"></span><i class="iconfont icon-wenjianfile"></i>{{item4.name}}
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

        <div class="tip_1 tip">
            <dl class="layui-nav-child layui-anim layui-anim-upbit">
                <dd @mousedown="operNote"><a href="javascript:;">添加笔记本</a></dd>
                <dd @mousedown="operNote"><a href="javascript:;">修改笔记本</a></dd>
                <dd @mousedown="operNote"><a href="javascript:;">删除笔记本</a></dd>
                <dd @mousedown="operNote"><a href="javascript:;">排序笔记本</a></dd>
            </dl>
        </div>
        <div class="tip_2 tip">
            <dl class="layui-nav-child layui-anim layui-anim-upbit">
                <dd @mousedown="operNote"><a href="javascript:;">添加笔记</a></dd>
                <dd @mousedown="operNote"><a href="javascript:;">修改笔记本</a></dd>
                <dd @mousedown="operNote"><a href="javascript:;">删除笔记本</a></dd>
                <dd @mousedown="operNote"><a href="javascript:;">排序笔记</a></dd>
            </dl>
        </div>
        <div class="tip_3 tip">
            <dl class="layui-nav-child layui-anim layui-anim-upbit">
                <dd @mousedown="maniNote"><a href="javascript:;">修改笔记</a></dd>
                <dd @mousedown="maniNote"><a href="javascript:;">删除笔记</a></dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Left",
        data:function () {
            return {
                a: {},
                orderLi: []
            }
        },
        beforeCreate: function() {
            var _self = this;
            $.get("http://127.0.0.1/tree.php").success(function (data) {
                _self.a = JSON.parse(data.message[0].content);
            })
        },
        mounted: function () {
            var _self = this;
            // 阻止tree的默认事件
            $(".tree").bind("contextmenu", function () {
                return false;
            })
            $(".tip").bind("contextmenu", function () {
                return false;
            })
            $("html").on("mousedown", function () {
                $(".tip").css("display", "none");
            })


            Sortable.create($(".orderli").get(0), {
                onUpdate: function (el) {
                    _self.updataIndex(el);
                }
            })

        },
        methods: {
            updataIndex: function(el){
                var _self = this;
                var arrIndex = $(el.item).attr("data-order").split(",");
                var min = el.newIndex < el.oldIndex ? el.newIndex : el.oldIndex;
                var max = el.newIndex > el.oldIndex ? el.newIndex : el.oldIndex;
                if(arrIndex.length == 1){
                    var temp = _self.a.value[arrIndex[0]].value[min];
                    _self.a.value[arrIndex[0]].value.splice(min,1);
                    _self.a.value[arrIndex[0]].value.splice(max,0,temp);
                }
                if(arrIndex.length == 2){
                    var temp = _self.a.value[arrIndex[0]].value[arrIndex[1]].value[min];
                    _self.a.value[arrIndex[0]].value[arrIndex[1]].value.splice(min,1);
                    _self.a.value[arrIndex[0]].value[arrIndex[1]].value.splice(max,0,temp);
                }
                if(arrIndex.length == 3){
                    var temp = _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value[min];
                    _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value.splice(min,1);
                    _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value.splice(max,0,temp);
                }

                _self.change_tree();

            },
            add: function (event) {
                // 阻止冒泡
                event.stopPropagation();
                if (arguments.length == 2) return;

                // 右键点击
                if (event.which == 3) {
                    $(".tip").css("display", "none");
                    var tipJson = {left: event.pageX - 15, top: event.pageY - 60, display: "block"};
                    var m = [];
                    var l = $(event.currentTarget);
                    var text = l.children("p").text();
                    var index = l.index();
                    var noteText = l.find("p").text();
                    while (true) {
                        if (l.parents(".tree").length) {
                            m.unshift(l.index());
                            l = l.parent().parent();
                        } else {
                            break;
                        }
                    }

                    m.shift();
                    if ($(event.currentTarget).parents("ul").length <= 3) {
                        $(".tip_1").css(tipJson);
                        $(".tip_1").attr("data-info", m);
                        $(".tip_1").attr("data-text", $.trim(text));
                        $(".tip_1").attr("data-index", index);
                    }
                    if ($(event.currentTarget).parents("ul").length == 4) {
                        $(".tip_2").css(tipJson);
                        $(".tip_2").attr("data-info", m);
                        $(".tip_2").attr("data-text", $.trim(text));
                        $(".tip_2").attr("data-index", index);
                    }
                    if ($(event.currentTarget).parents("ul").length == 5) {
                        $(".tip_3").css(tipJson);
                        $(".tip_3").attr("data-info", m);
                        $(".tip_3").attr("data-text", $.trim(noteText));
                        $(".tip_3").attr("data-index", index);
                    }
                }

                // 左键隐藏
                if (event.which == 1) {
                    $(".tip").css("display", "none");
                    if ($(event.currentTarget).children("ul").is(":animated")) return;
                    if ($(event.currentTarget).children("p").children("i").is(".icon-wenjianjiashouqi")) {
                        $(event.currentTarget).children("p").children("i").removeClass("icon-wenjianjiashouqi").addClass("icon-wenjianjiazhankai");
                    } else {
                        $(event.currentTarget).children("p").children("i").removeClass("icon-wenjianjiazhankai").addClass("icon-wenjianjiashouqi");
                    }
                    $(event.currentTarget).children("ul").slideToggle(200);
                }
            },
            operNote: function (event) {
                var _self = this;
                // 转化为jquery对象
                var l = $(event.currentTarget);
                var strArr = l.parents(".tip").attr("data-info");
                var arrIndex = strArr.split(",");
                var text = l.parents(".tip").attr("data-text");

                if (l.index() == 0) {
                    // 增加操作
                    layer.prompt({title: '增加笔记本'}, function (value, index, elem) {
                        arrIndex.length == 0 && _self.a.value.push({name: value, value: []});
                        arrIndex.length == 1 && _self.a.value[arrIndex[0]].value.push({name: value, value: []});
                        arrIndex.length == 2 && _self.a.value[arrIndex[0]].value[arrIndex[1]].value.push({
                            name: value,
                            value: []
                        });
                        var _id = new Date().getTime();
                        arrIndex.length == 3 && _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value.push({
                            name: value,
                            id: _id
                        });
                        _self.change_tree();
                        _self.add_notes(_id);
                        layer.close(index);
                    });
                }
                if (l.index() == 1) {
                    // 修改操作
                    layer.prompt({title: '修改笔记本', value: text}, function (value, index, elem) {
                        if (arrIndex.length == 0) _self.a.name = value;
                        if (arrIndex.length == 1) _self.a.value[arrIndex[0]].name = value;
                        if (arrIndex.length == 2) _self.a.value[arrIndex[0]].value[arrIndex[1]].name = value;
                        if (arrIndex.length == 3) _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].name = value;
                        _self.change_tree();
                        layer.close(index);
                    });

                }
                if (l.index() == 2) {
                    var idx = l.parents(".tip").attr("data-index");
                    // 删除操作
                    var flag = false;
                    if (arrIndex.length == 0 && _self.a.value.length != 0) flag = true;
                    if (arrIndex.length == 1 && _self.a.value[arrIndex[0]].value.length != 0) flag = true;
                    if (arrIndex.length == 2 && _self.a.value[arrIndex[0]].value[arrIndex[1]].value.length != 0) flag = true;
                    if (arrIndex.length == 3 && _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value.length != 0) flag = true;
                    if (flag) {
                        layer.open({
                            title: '提示'
                            , content: '只能删除空笔记本'
                        });
                    } else {
                        arrIndex.length == 1 && _self.a.value.splice(idx, 1);
                        arrIndex.length == 2 && _self.a.value[arrIndex[0]].value.splice(idx, 1);
                        arrIndex.length == 3 && _self.a.value[arrIndex[0]].value[arrIndex[1]].value.splice(idx, 1);
                        arrIndex.length == 4 && _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value.splice(idx, 1);
                        _self.change_tree();
                    }

                }
                if (l.index() == 3) {
                    var m = [];
                    _self.orderLi = [];
                    // 排序操作
                    if(arrIndex.length == 0) m = _self.a.value;
                    if(arrIndex.length == 1) m = _self.a.value[arrIndex[0]].value;
                    if(arrIndex.length == 2) m = _self.a.value[arrIndex[0]].value[arrIndex[1]].value;
                    if(arrIndex.length == 3) m = _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value;
                    m.forEach(function (item,index) {
                        _self.orderLi.push({name:item.name,index:index,order:strArr});
                    })

                    layer.open({
                        type: 1,
                        content: $('#orderli'),
                        end:function () {
                            $('#orderli').css("display","none");
                        }
                    });
                }

            },
            maniNote: function (event) {
                var _self = this;
                // 转化为jquery对象
                var l = $(event.currentTarget);
                var strArr = l.parents(".tip").attr("data-info");
                var arrIndex = strArr.split(",");
                var text = l.parents(".tip").attr("data-text");

                if (l.index() == 0) {
                    // 修改操作
                    layer.prompt({title: '修改笔记本', value: text}, function (value, index, elem) {
                        _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value[arrIndex[3]].name = value;
                        _self.change_tree();
                        layer.close(index);
                    });

                }
                if (l.index() == 1) {
                    var idx = l.parents(".tip").attr("data-index");
                    // 删除操作
                    var id = _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value[idx].id;
                    arrIndex.length == 4 && _self.a.value[arrIndex[0]].value[arrIndex[1]].value[arrIndex[2]].value.splice(idx, 1);
                    _self.delete_notes(id);
                    _self.change_tree();

                }
            },
            change_tree:function () {
                var setJson = {tree:JSON.stringify(this.a)};
                $.post("http://127.0.0.1/tree_updata.php",setJson,function (data) {
                    if(data.status=="error"){
                        layer.open({
                            title: '提示'
                            ,content: '操作失败，请联系管理员'
                        });
                        return;
                    }
                })

            },
            add_notes:function (id) {
                $.post("http://127.0.0.1/notesadd.php",{id:id},function (data) {
                    if(data.status=="error"){
                        layer.open({
                            title: '提示'
                            ,content: '操作失败，请联系管理员'
                        });
                        return;
                    }
                })
            },
            delete_notes:function (id) {
                $.post("http://127.0.0.1/notesdelete.php",{id:id},function (data) {
                    if(data.status=="error"){
                        layer.open({
                            title: '提示'
                            ,content: '操作失败，请联系管理员'
                        });
                        return;
                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>