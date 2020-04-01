
<template>
    <div>
        <div id="login-box">
            <el-input v-model="username" placeholder="请输入用户名" class="row"></el-input>
            <el-input placeholder="请输入密码" v-model="password" show-password class="row"></el-input>
            <el-button type="primary" @click="login1" id="login-btn">登录</el-button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        ...mapActions([ "login" ]),
        login1() {
            this.login("yq");
            this.$router.push({ name: 'home' });
        }
    }
}
</script>

<style scoped lang="scss">
#login-box {
    width: 50%;
    margin: 0 auto;
    min-width: 300px;
    max-width: 500px;
    box-shadow: 0 0 5px #d6d6d6;
    border-radius: 5px;
    padding: 10px;
    .row {
        margin: 10px 0 10px 0;
    }
    #login-btn {
        margin: 0 0 0 auto;
        display: block;
    }
}
</style>