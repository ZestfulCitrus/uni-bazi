<template>
  <view v-if="false" class="result-page">
    <!--uv-loading-icon text="正在排盘中..." textSize="30rpx"></!--uv-loading-icon-->
  </view>
  <view v-if="true">
    <view class="space">
      <view class="stars">
        <view class="star"></view>
        <view class="star pink"></view>
        <view class="star blue"></view>
        <view class="star yellow"></view>
        <view class="info-card">
          <view>
            <view class="cw pl8">姓名：{{ userInfo.name || "*" }}</view>
            <view class="cw pl8">出生日期：{{ userInfo.birthdayDisplay }}</view>
            <view class="cw pl8">旺衰参考：{{analysisResult.data.ret_Info.isStrong?'身强':'身弱'}}</view>
          </view>
          <view class="result-qrcode">
            <uv-qrcode
              ref="qrcode"
              size="60px"
              :value="`${config.fronturl}2000年6月4日`"
            ></uv-qrcode>
          </view>
        </view>
      </view>
    </view>
    <view class="table-title bg-light">
      <uv-text align="center" type="primary" text="日期"></uv-text>
      <uv-text align="center" type="error" text="流年"></uv-text>
      <uv-text class="mh24" align="center" type="success" text="大运"></uv-text>
      <uv-text align="center" type="warning" text="年柱"></uv-text>
      <uv-text align="center" type="info" text="月柱"></uv-text>
      <uv-text align="center" type="info" text="日柱"></uv-text>
      <uv-text align="center" type="info" text="时柱"></uv-text>
    </view>
    <view class="table-column">
      <uv-text align="center" type="primary" text="主星"></uv-text>
      <uv-text align="center" type="error" text="食神"></uv-text>
      <uv-text
        class="br1 mh32"
        align="center"
        type="success"
        text="食神"
      ></uv-text>
      <uv-text
        v-for="item in analysisResult.data.ret_Info.gan_shens"
        align="center"
        type="warning"
        :text="item"
      ></uv-text>
    </view>
    <view class="table-column">
      <uv-text align="center" type="primary" text="天干"></uv-text>
      <uv-text size="24" align="center" type="error" text="癸"></uv-text>
      <uv-text
        size="24"
        class="br1"
        align="center"
        type="success"
        text="壬"
      ></uv-text>
      <uv-text
        v-for="item in analysisResult.data.bazi.TianGan"
        size="24"
        align="center"
        :type="heavenlyStemsColorMap[item]"
        :text="item"
      ></uv-text>
    </view>
    <view class="table-column">
      <uv-text align="center" type="primary" text="地支"></uv-text>
      <uv-text size="24" align="center" type="error" text="子"></uv-text>
      <uv-text
        size="24"
        class="br1"
        align="center"
        type="success"
        text="丑"
      ></uv-text>
      <uv-text
        v-for="item in analysisResult.data.bazi.DiZhi"
        size="24"
        align="center"
        :type="earthlyBranchesColorMap[item]"
        :text="item"
      ></uv-text>
    </view>
    <view class="table-title bg-light">
      <uv-text align="center" type="primary" text="副星"></uv-text>
      <uv-text align="center" type="error" text="*"></uv-text>
      <uv-text align="center" type="success" text="*"></uv-text>
      <uv-text
        v-for="item in analysisResult.data.ret_Info.zhi_shens"
        align="center"
        type="warning"
        :text="item"
      ></uv-text>
    </view>
  </view>
</template>

<script setup lang="ts">
import "./index.scss";
import { onBackPress, onLoad } from "@dcloudio/uni-app";
import config from "../../util/config";
import api from "../../api";
import { defineProps, onMounted, reactive } from "vue";

const heavenlyStemsColorMap = {
  甲: 'success',    // 木 - 绿色
  乙: 'success',    // 木 - 绿色
  丙: 'error',      // 火 - 红色
  丁: 'error',      // 火 - 红色
  戊: 'info',    // 土 - 黄色
  己: 'info',       // 土 - 灰色（特殊指定）
  庚: 'warning',    // 金 - 蓝色（传统为白色，适配现有颜色）
  辛: 'warning',    // 金 - 蓝色
  壬: 'primary',    // 水 - 蓝色
  癸: 'primary'     // 水 - 蓝色
};

const earthlyBranchesColorMap = {
  子: 'primary',    // 水 - 蓝色
  丑: 'info',    // 土 - 黄色（常规土行）
  寅: 'success',    // 木 - 绿色
  卯: 'success',    // 木 - 绿色
  辰: 'info',    // 土 - 黄色
  巳: 'error',      // 火 - 红色
  午: 'error',      // 火 - 红色
  未: 'info',    // 土 - 黄色
  申: 'warning',    // 金 - 蓝色
  酉: 'warning',    // 金 - 蓝色
  戌: 'info',    // 土 - 黄色
  亥: 'primary'     // 水 - 蓝色
};

interface UserInfo {
  name: "";
  sex: "";
  birthday: "";
  birthdayDisplay: "";
}

const analysisResult = reactive({
  data: {
    bazi: { TianGan: ["", "", "", ""], DiZhi: ["", "", "", ""] },
    ret_Info: {
      gan_shens: ["", "", "--", ""],
      zhi_shens: ["", "", "", ""],
      isStrong: false,
    },
  },
});

const props = defineProps({
  userInfo: {
    type: Object,
    default: {
      name: "",
      sex: "",
      birthday: "",
      birthdayDisplay: "",
    },
  },
});

onBackPress((e) => {
  return true;
});

onLoad(async (option) => {
  console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
  const res = await api.analysis({ timestamp: props.userInfo.birthday,sex:props.userInfo.sex });
  analysisResult.data = res;
});
</script>
