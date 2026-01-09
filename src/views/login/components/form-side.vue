<template>
  <div class="dark:bg-[#16181c] dark:text-white tablet:px-12 phone:px-[5vw] phone:pt-6">
    <!-- 主题切换按钮 -->
    <div class="tablet:float-none phone:float-right flex items-center justify-end">
      <div
        class="phone:px-[16px] phone:py-[8px] tablet:mt-0 phone:mt-[4vh] tablet:px-8 tablet:py-3 rounded-full flex items-center bg-slate-100 dark:bg-gray-700"
      >
        <theme-checkout />
      </div>
    </div>
    <!-- 文字提示 -->
    <div class="flex items-center gap-4 tablet:mt-8 phone:mt-[4vh] select-none">
      <h1 class="tablet:text-5xl phone:text-[24px] font-bold">欢迎回来</h1>
      <img class="tablet:w-16 phone:w-[36px]" :src="DogIcon" />
    </div>
    <div class="mt-6 tablet:text-xl phone:text-[14px] dark:text-slate-200 select-none">
      输入您的账号密码登录系统
    </div>
    <!-- 表单 -->
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="tablet:mt-8 phone:mt-[3vh]"
    >
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" class="mt-8" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          class="mt-8"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-form-item prop="status">
        <slider-verify v-model:status="loginForm.status" width="100%" class="mt-8" />
      </el-form-item>
    </el-form>
    <el-button
      @click="loginHandler"
      size="large"
      :loading="loginLoading"
      class="w-full mt-8"
      type="primary"
    >
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import SliderVerify from '@/components/slider-verify'
import { useUserStore } from '@/stores'
import type { FormInstance, FormRules } from 'element-plus'
import DogIcon from '@/assets/images/login/dog.png'
import ThemeCheckout from '@/components/theme-checkout/index.vue'
const router = useRouter()
const { login } = useUserStore()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: 'admin',
  password: 'admin',
  status: false,
})

const loginLoading = ref(false)
const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  status: [
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error('请拖动滑块验证'))
        } else {
          callback()
        }
      },
    },
  ],
})

/** 点击登录按钮 */
const loginHandler = () => {
  if (!loginFormRef.value) return
  loginFormRef.value.validate((valid) => {
    if (valid) {
      const { username, password } = loginForm
      loginLoading.value = true
      setTimeout(async () => {
        await login({ username, password })
          .then(() => {
            router.push('/')
          })
          .finally(() => {
            loginLoading.value = false
          })
      }, 1000)
    }
  })
}
</script>

<style lang="less" scoped>
:deep(.el-input__wrapper) {
  padding: 8px 16px;
  border-radius: 8px;
}
:deep(.el-form-item__error) {
  margin-top: 7px;
  user-select: none;
}
</style>
