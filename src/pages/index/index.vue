<template>
  <view>
    <uv-transition class="content" :show="step === 1">
      <uv-alert title="" type="warning" description="如果对测试结果有不解请联系作者" closable></uv-alert>

      <uv-form labelPosition="left" :model="userInfo" :rules="rules" ref="form">
        <uv-form-item label="姓名" prop="name" borderBottom>
          <uv-input v-model="userInfo.name" border="none">
          </uv-input>
        </uv-form-item>
        <uv-form-item label="性别" prop="sex" borderBottom @click="showSexSelect">
          <uv-input v-model="userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none">
          </uv-input>
          <template v-slot:right>
            <uv-icon name="arrow-right"></uv-icon>
          </template>
        </uv-form-item>
        <uv-form-item label="出生" prop="birthday" borderBottom @click="showDatetimePicker">
          <uv-input v-model="userInfo.birthdayDisplay" disabled disabledColor="#ffffff" placeholder="请选择出生日期"
            border="none">
          </uv-input>
          <template v-slot:right>
            <uv-icon name="arrow-right"></uv-icon>
          </template>
        </uv-form-item>
        <uv-button type="primary" text="开始排盘" customStyle="margin-top: 10px" @click="submit"></uv-button>
        <uv-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></uv-button>
      </uv-form>
    </uv-transition>
    <uv-transition :show="step === 2">

      <ResultPage />
      <uv-button type="primary" text="重新排盘" customStyle="margin-top: 10px" @click="reCall"></uv-button>

    </uv-transition>
    <uv-action-sheet ref="sexSelect" :actions="actions" title="请选择性别" description="" @select="setSexSelect" />
    <uv-datetime-picker :minDate="-5364691543000" :maxDate="4102416000000" ref="datetimePicker" v-model="datepickerTime"
      mode="datetime" @confirm="pickerConfirm" />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { formatTimestamp, formatTimestampDisplay } from '@/pages/util/index'
import ResultPage from './result/index.vue'
import './index.scss'
const sexSelect = ref(null);
const form = ref(null)
const datetimePicker = ref(null)
const step = ref(2)
const datepickerTime = 952506366000;
const userInfo = reactive({
  name: '',
  sex: '',
  birthday: '',
  birthdayDisplay: ''
})

const actions = [{
  name: '男',
}, {
  name: '女',
}]

const showSexSelect = () => {
  sexSelect.value.open();
}
const showDatetimePicker = () => {
  datetimePicker.value.open();
}


const setSexSelect = (e) => {
  userInfo.sex = e.name
}

const submit = async () => {
  await form.value.validate();
  step.value = 2;
}

const reset = () => {
  form.value.resetFields();
  form.value.clearValidate();
}

const pickerConfirm = (e: any) => {
  userInfo.birthday = formatTimestamp(e.value);
  userInfo.birthdayDisplay = formatTimestampDisplay(e.value)
}

const reCall = () => {
  step.value = 1;
}

const rules = {
  'sex': {
    type: 'string',
    required: true,
    message: '请填写姓名',
    trigger: ['blur', 'change']
  },
  'birthday': {
    type: 'string',
    required: true,
    message: '请填写出生日期',
    trigger: ['blur', 'change']
  },
}

</script>