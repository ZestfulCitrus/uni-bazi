<template>
  <view>
    <uv-transition class="content" :show="step === 1">
      <uv-alert
        title=""
        type="warning"
        description="作者：B站账户：玄烛解八字。计算器的计算结果可以满足大多数场景，使用本工具的人默认您已经把预测结果当作娱乐。"
        closable
      ></uv-alert>

      <uv-form labelPosition="left" :model="userInfo" :rules="rules" ref="form">
        <uv-form-item
          label="性别"
          prop="sex"
          borderBottom
          @click="showSexSelect"
        >
          <uv-input
            v-model="userInfo.sex"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择性别"
            border="none"
          >
          </uv-input>
          <template v-slot:right>
            <uv-icon name="arrow-right"></uv-icon>
          </template>
        </uv-form-item>
        <uv-form-item
          label="出生"
          prop="birthday"
          borderBottom
          @click="showDatetimePicker"
        >
          <uv-input
            v-model="userInfo.birthdayDisplay"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择出生日期"
            border="none"
          >
          </uv-input>
          <template v-slot:right>
            <uv-icon name="arrow-right"></uv-icon>
          </template>
        </uv-form-item>
        <uv-button
          type="primary"
          text="开始排盘"
          customStyle="margin-top: 10px"
          @click="submit"
        ></uv-button>
        <uv-button
          type="error"
          text="重置"
          customStyle="margin-top: 10px"
          @click="reset"
        ></uv-button>

        <!-- 用户信息列表卡片 -->
        <view v-if="alluserInfoList.length > 0" class="user-info-cards">
          <view class="card-title">排盘记录（最多缓存3条）</view>
          <view
            v-for="(item, index) in alluserInfoList"
            :key="index"
            class="info-card"
            @click="handleCardClick(item)"
          >
            <view class="card-content">
              <text class="birthday">{{ item.birthdayDisplay }}--{{ item.sex }}</text>
            </view>
            <uv-icon name="arrow-right" size="16"></uv-icon>
          </view>
        </view>
      </uv-form>
    </uv-transition>
    <uv-transition :show="step === 2">
      <ResultPage :userInfo="userInfo" />
      <uv-button
        type="primary"
        text="重新排盘"
        customStyle="margin-top: 10px"
        @click="reCall"
      ></uv-button>
    </uv-transition>

    <uv-action-sheet
      ref="sexSelect"
      :actions="actions"
      title="请选择性别"
      description=""
      @select="setSexSelect"
    />
    <uv-datetime-picker
      :minDate="-5364691543000"
      :maxDate="4102416000000"
      ref="datetimePicker"
      v-model="datepickerTime"
      mode="datetime"
      @confirm="pickerConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { formatTimestamp, formatTimestampDisplay } from "@/pages/util/index";
import ResultPage from "./result/index.vue";
import "./index.scss";
import { onLoad } from "@dcloudio/uni-app";

const sexSelect = ref(null);
const form = ref(null);
const datetimePicker = ref(null);
const step = ref(1);
const userInfo = reactive({
  name: "",
  sex: "",
  birthday: "",
  birthdayDisplay: "",
});
const datepickerTime = ref(952506366000);

const alluserInfoList = ref([{ sex: "男", birthdayDisplay: "2000-01-01" }]);

const actions = [
  {
    name: "男",
  },
  {
    name: "女",
  },
];

const showSexSelect = () => {
  sexSelect.value.open();
};
const showDatetimePicker = () => {
  datetimePicker.value.open();
};

const setSexSelect = (e) => {
  userInfo.sex = e.name;
};

const submit = async () => {
  await form.value.validate();
  // 保存userInfo到localStorage列表，最多保存三个
  const userInfoList = uni.getStorageSync("userInfoList") || [];

  // 检查是否已存在相同记录，避免重复
  const existingIndex = userInfoList.findIndex(
    (item) => item.sex === userInfo.sex && item.birthday === userInfo.birthday
  );

  if (existingIndex !== -1) {
    // 如果已存在，移到最前面
    userInfoList.splice(existingIndex, 1);
  }

  // 添加到列表开头
  userInfoList.unshift({
    ...userInfo,
    timestamp: Date.now(),
  });

  // 限制列表最多三个记录
  if (userInfoList.length > 3) {
    userInfoList.splice(3);
  }

  uni.setStorageSync("userInfoList", userInfoList);
  alluserInfoList.value = userInfoList;
  step.value = 2;
};

const reset = () => {
  form.value.resetFields();
  form.value.clearValidate();
  userInfo.name = "";
  userInfo.sex = "";
  userInfo.birthday = "";
  userInfo.birthdayDisplay = "";
};

const pickerConfirm = (e: any) => {
  userInfo.birthday = `${e.value}`;
  userInfo.birthdayDisplay = formatTimestampDisplay(e.value);
};

const reCall = () => {
  step.value = 1;
};

const rules = {
  sex: {
    type: "string",
    required: true,
    message: "请填写姓名",
    trigger: ["blur", "change"],
  },
  birthday: {
    type: "string",
    required: true,
    message: "请填写出生日期",
    trigger: ["blur", "change"],
  },
};

// 加载用户信息列表
onMounted(() => {
  const list = uni.getStorageSync("userInfoList") || [];
  alluserInfoList.value = list;
});

// 处理卡片点击，直接跳转到下一步
const handleCardClick = (item) => {
  // 将选中的用户信息填充到当前表单
  Object.assign(userInfo, item);
  step.value = 2;
};

onLoad((option) => {
  console.log(option?.step);
  step.value = option?.step ? parseInt(option?.step) : 1;
});
</script>
