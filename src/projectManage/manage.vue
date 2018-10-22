<template>
    <el-container style="height: 100%">
        <el-aside width="auto" :class="$style.leftAside">
            <el-menu
                    :default-active="navigationName"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :router="true"
                    :collapse="collapsed"
                    :unique-opened="true"
                    :class="$style.deleteBorder"
            >
                <div @click.prevent="collapse" :class="$style.collapseIcon">
                    <i :class="collapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
                </div>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>接口管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/manage/projectManage">项目管理</el-menu-item>
                        <el-menu-item index="/manage/modelManage">接口模块</el-menu-item>
                        <el-menu-item index="/manage/caseManage">接口信息</el-menu-item>
                        <el-menu-item index="/manage/sceneConfig">业务配置</el-menu-item>
                        <el-menu-item index="/manage/sceneManage">接口用例</el-menu-item>
                        <el-menu-item index="/manage/buildInFunc">内置函数</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-time"></i>
                        <span>报告管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/manage/reportManage">测试报告</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <el-menu-item index="/manage/taskManage">定时任务</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>其他程序</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/manage/testTool">小工具</el-menu-item>
                        <el-menu-item index="/manage/sqlCheck">数据库查询</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header>
                <router-view name="Header"></router-view>
            </el-header>

            <el-main>
                <router-view name="Manage"></router-view>
            </el-main>
        </el-container>

    </el-container>
</template>

<script>
    export default {
        name: 'manage',

        data() {
            return {
                navigationName: '/manage/projectManage',
                collapsed: false
            }
        },
        methods: {
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            closeNavigation() {
                this.navigationName = this.$route.path;
                if (this.$route.path === '/manage/reportShow') {
                    this.collapsed = true;
                }
            }
        },
        watch: {
            "$route": function (to, from) {

                if (to.path === '/manage/reportShow') {
                    this.collapsed = true
                }
                //from 对象中包含当前地址
                //to 对象中包含目标地址
                //其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
            }
        },
        mounted() {
            this.closeNavigation()
        },
    }
</script>

<style lang="scss" module>

    .collapseIcon {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        color: #fff;
        text-align: center;
    }

    .leftAside {
        background-color: #545c64;
    }

    /*删除一个一像素边框*/
    .deleteBorder {
        border-right-width: 0;
    }

</style>
