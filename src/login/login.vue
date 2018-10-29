<template>
    <div :class="$style.loginPane">

        <el-form :model="userInfo" :rules="rules" ref="loginForm" v-if="isLogin">
            <div :class="$style.title">美味测试平台</div>
            <el-form-item prop="username">
                <el-input v-model="userInfo.username" placeholder="账号" size="medium"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="userInfo.password" type="password" placeholder="密码" size="medium"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click.native="submitForm()" size="small" style="width: 45%">登录</el-button>
                <el-button type="primary" @click="isLogin = false" size="small" style="width: 45%">注册
                </el-button>
            </el-form-item>
        </el-form>

        <el-form :model="userInfo" v-else :rules="rules" ref="regForm">
            <div :class="$style.title">注册</div>
            <el-form-item label="名字" prop="name">
                <el-input v-model="userInfo.name" auto-complete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input v-model="userInfo.username" auto-complete="off">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userInfo.password" auto-complete="off">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="isLogin = true" size="small" style="width: 45%">取 消</el-button>
                <el-button type="primary" @click.native="submitReg()" size="small" style="width: 45%">确 定</el-button>
            </el-form-item>
        </el-form>


    </div>

</template>

<script>
    import * as types from "../store/types";

    export default {
        name: "test",
        data() {
            return {
                isLogin: true,
                userInfo: {
                    name: "",
                    username: "",
                    password: "",
                },
                rules: {
                    username: [{required: true, message: "请输入账号", trigger: "blur"}],
                    name: [{required: true, message: "请输入名字", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}]
                }
            };
        },
        mounted() {
            this.$store.commit(types.TITLE, "Login");
        },
        methods: {
            submitForm() {
                this.$refs["loginForm"].validate(valid => {
                    if (valid) {
                        this.login();
                    } else {
                        return false;
                    }
                });
            },

            submitReg() {
                this.$refs["regForm"].validate(valid => {
                    if (valid) {
                        this.register();
                    } else {
                        return false;
                    }
                });
            },

            register() {
                this.$axios
                    .post("api/api/register", {
                        name: this.userInfo.name,
                        username: this.userInfo.username,
                        password: this.userInfo.password
                    })
                    .then(response => {
                        if (response.data["status"] === 0) {
                            this.$message({
                                showClose: true,
                                message: response.data["msg"],
                                type: "warning"
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: response.data["msg"],
                                type: "success"
                            });
                            this.isLogin = false;
                        }
                    });
            },
            login() {
                this.$axios
                    .post("api/api/login", {
                        username: this.userInfo.username,
                        password: this.userInfo.password
                    })
                    .then(response => {
                        if (response.data["status"] === 0) {
                            this.$message({
                                showClose: true,
                                message: response.data["msg"],
                                type: "warning"
                            });
                        } else {
                            this.token = response.data["token"];
                            if (this.token) {
                                this.$store.commit(types.LOGIN, this.token);
                                this.$store.commit(types.USERNAME, response.data["name"]);
                                this.$store.commit("userName", response.data["name"]);

                                let redirect = decodeURIComponent(
                                    this.$route.query.redirect || "/manage"
                                );
                                this.$router.push({path: redirect});
                            }
                        }
                    });
            }
        }
    };
</script>

<style lang="scss" module>
    .loginPane {
        .title {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
            width: 100%;
            line-height: 1.5;
            color: rgba(0, 0, 0, 0.65);
            font-family: Monospaced Number, Chinese Quote, -apple-system,
            BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
            Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
        }
        width: 300px;
        height: 250px;
        border: 1px solid transparent;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        .regPane {
            position: fixed;
        }
    }
</style>
