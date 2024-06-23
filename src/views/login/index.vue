<template>
  <div class="login-container">
    <el-form ref="ruleFormRef" :model="form" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <el-icon class="svg-container">
          <User />
        </el-icon>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-icon class="svg-container">
          <Lock />
        </el-icon>
        <el-input v-model="form.password" :type="passwordType" />
        <el-icon @click="changeType">
          <component :is="currentIcon" />
        </el-icon>
      </el-form-item>
      <el-button class="login-button" type="primary" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/api/login'
import { User, Lock, Hide, View } from '@element-plus/icons-vue'
import { useTokenStore } from '@/stores/tokenStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const tokenStore = useTokenStore()

const form = ref({
  username: '',
  password: ''
})
const rules = ref({
  // 登录用户表单校验规则
  username: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  //   登录密码表单校验规则
  password: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
})

// 提交表单
const ruleFormRef = ref(null)
const handleLogin = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await login(form.value)
      const token = res.token
      tokenStore.setAccessToken(token)
      router.push('/')
    } else {
      console.log('error submit!')
    }
  })
}
// 显示密码功能
// 给个初始值
const passwordType = ref('password')
const currentIcon = ref(Hide)

const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
    //
    currentIcon.value = currentIcon.value === Hide ? Hide : View
  } else {
    passwordType.value = 'password'
    currentIcon.value = currentIcon.value !== Hide ? Hide : View
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;

        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }
  ::v-deep .el-input__wrapper {
    background-color: transparent;
    box-shadow: none;
    width: auto;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
