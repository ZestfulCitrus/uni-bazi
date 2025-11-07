<template>
  <view v-if="loading" class="result-page">
    <uv-loading-icon text="正在分析中..." textSize="30rpx"></uv-loading-icon>
  </view>
  <view v-if="!loading">
    <view class="space">
      <view class="stars">
        <view class="star"></view>
        <view class="star pink"></view>
        <view class="star blue"></view>
        <view class="star yellow"></view>
        <view class="info-card">
          <view>
            <view class="cw pl8"
              >出生日期：{{ userInfo.birthdayDisplay }}
              {{ userInfo.sex }} 黄帝纪年
              {{
                all.Lunar.fromDate(
                  new Date(parseInt(userInfo.birthday))
                ).getYear() + 2697
              }}
              年出生</view
            >
            <view class="cw pl8"
              >旺衰参考：{{
                analysisResult.data.ret_Info.isStrong ? "身强" : "身弱"
              }}</view
            >
            <view class="cw pl8"
              >湿度：{{ analysisResult.data.yuanHaiZiping.shidu.judge }} ({{
                analysisResult.data.yuanHaiZiping.shidu.score
              }}) 正常范围[-6,6]</view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="table-title bg-light">
      <uv-text align="center" type="info" text="日期"></uv-text>
      <uv-text align="center" type="info" text="流年"></uv-text>
      <uv-text class="mh24" align="center" type="info" text="大运"></uv-text>
      <uv-text align="center" type="info" text="年柱"></uv-text>
      <uv-text align="center" type="info" text="月柱"></uv-text>
      <uv-text align="center" type="info" text="日柱"></uv-text>
      <uv-text align="center" type="info" text="时柱"></uv-text>
    </view>
    <view class="table-column">
      <uv-text align="center" type="info" text="主星"></uv-text>
      <uv-text
        align="center"
        type="info"
        :text="analysisResult.data.ret_Info?.currentYear?.liunianganshen"
      ></uv-text>
      <uv-text
        class="br1 mh32"
        align="center"
        type="info"
        :text="analysisResult.data.ret_Info?.currentYear?.dayunganshen"
      ></uv-text>
      <uv-text
        v-for="item in analysisResult.data.ret_Info.gan_shens"
        align="center"
        type="info"
        :text="item"
      ></uv-text>
    </view>
    <view class="table-column">
      <uv-text align="center" type="info" text="天干"></uv-text>
      <uv-text
        size="24"
        align="center"
        :type="
          heavenlyStemsColorMap[
            analysisResult.data.ret_Info?.currentYear?.liunian[0]
          ]
        "
        :text="analysisResult.data.ret_Info?.currentYear?.liunian[0]"
      ></uv-text>
      <uv-text
        size="24"
        class="br1"
        align="center"
        :type="
          heavenlyStemsColorMap[
            analysisResult.data.ret_Info?.currentYear?.dayun[0]
          ]
        "
        :text="analysisResult.data.ret_Info?.currentYear?.dayun[0]"
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
      <uv-text align="center" type="info" text="地支"></uv-text>
      <uv-text
        size="24"
        align="center"
        :type="
          earthlyBranchesColorMap[
            analysisResult.data.ret_Info?.currentYear?.liunian[1]
          ]
        "
        :text="analysisResult.data.ret_Info?.currentYear?.liunian[1]"
      ></uv-text>
      <uv-text
        size="24"
        class="br1"
        align="center"
        :type="
          earthlyBranchesColorMap[
            analysisResult.data.ret_Info?.currentYear?.dayun[1]
          ]
        "
        :text="analysisResult.data.ret_Info?.currentYear?.dayun[1]"
      ></uv-text>
      <uv-text
        v-for="item in analysisResult.data.bazi.DiZhi"
        size="24"
        align="center"
        :type="earthlyBranchesColorMap[item]"
        :text="item"
      ></uv-text>
    </view>
    <view class="bg-light" style="display: flex">
      <view style="flex: 1" size="13">
        <uv-text align="center" type="info" text="副星"></uv-text>
      </view>
      <view style="flex: 1">
        <view
          align="center"
          style="display: flex; justify-content: center"
          v-for="item in analysisResult.data.ret_Info?.currentYear
            ?.liunianzhishen"
        >
          <view style="margin-right: 4rpx">
            <uv-text
              align="center"
              size="13"
              :type="heavenlyStemsColorMap[item.gan]"
              :text="item.gan"
            ></uv-text>
          </view>
          <view>
            <uv-text
              size="13"
              align="center"
              type="info"
              :text="item.shiShen"
            ></uv-text>
          </view>
        </view>
      </view>
      <view style="flex: 1">
        <view
          align="center"
          style="display: flex; justify-content: center"
          v-for="item in analysisResult.data.ret_Info?.currentYear
            ?.dayunzhishen"
        >
          <view style="margin-right: 4rpx">
            <uv-text
              size="13"
              align="center"
              :type="heavenlyStemsColorMap[item.gan]"
              :text="item.gan"
            ></uv-text>
          </view>
          <view>
            <uv-text
              size="13"
              align="center"
              type="info"
              :text="item.shiShen"
            ></uv-text>
          </view>
        </view>
      </view>
      <view
        v-for="item in analysisResult.data.ret_Info.zhi_shens"
        style="flex: 1"
      >
        <view
          v-for="jtem in item"
          style="display: flex; justify-content: center"
          align="center"
          type="info"
        >
          <view style="margin-right: 4rpx">
            <uv-text
              size="13"
              align="center"
              :type="heavenlyStemsColorMap[jtem.gan]"
              :text="jtem.gan"
            ></uv-text>
          </view>
          <view>
            <uv-text
              size="13"
              align="center"
              type="info"
              :text="jtem.shiShen"
            ></uv-text
          ></view>
        </view>
      </view>
    </view>
    <view class="table-column">
      <uv-text align="center" type="info" text="空亡"></uv-text>
      <uv-text
        align="center"
        type="info"
        :text="analysisResult.data.ret_Info?.currentYear?.liunianXunkong"
      ></uv-text>
      <uv-text
        class="br1 mh32"
        align="center"
        type="info"
        :text="analysisResult.data.ret_Info?.currentYear?.dayunXunkong"
      ></uv-text>
      <uv-text
        v-for="item in analysisResult.data.ret_Info.xunkong"
        align="center"
        type="info"
        :text="item"
      ></uv-text>
    </view>
    <view style="display: flex">
      <view style="flex: 1">
        <uv-text
          align="center"
          style="margin-top: 8rpx"
          type="info"
          text="神煞"
        ></uv-text>
      </view>
      <view style="flex: 1" align="center" type="info">
        <uv-text
          align="center"
          type="info"
          v-for="item in analysisResult.data.shensha.current.liuNian"
          :text="item"
          size="6"
          style="margin-top: 4rpx"
        ></uv-text>
      </view>
      <view style="flex: 1" class="br1 mh32" align="center" type="info">
        <uv-text
          align="center"
          type="info"
          v-for="item in analysisResult.data.shensha.current.daYun"
          :text="item"
          size="6"
          style="margin-top: 4rpx"
        ></uv-text>
      </view>
      <view style="flex: 1" align="center" type="info">
        <uv-text
          align="center"
          type="info"
          v-for="item in analysisResult.data.shensha.nian"
          :text="item"
          size="6"
          style="margin-top: 4rpx"
        ></uv-text>
      </view>
      <view style="flex: 1" align="center" type="info">
        <uv-text
          align="center"
          type="info"
          v-for="item in analysisResult.data.shensha.yue"
          :text="item"
          size="6"
          style="margin-top: 4rpx"
        ></uv-text>
      </view>
      <view style="flex: 1" align="center" type="info">
        <uv-text
          align="center"
          type="info"
          v-for="item in analysisResult.data.shensha.ri"
          :text="item"
          size="6"
          style="margin-top: 4rpx"
        ></uv-text>
      </view>
      <view style="flex: 1" align="center" type="info">
        <uv-text
          align="center"
          type="info"
          v-for="item in analysisResult.data.shensha.shi"
          :text="item"
          size="6"
          style="margin-top: 4rpx"
        ></uv-text>
      </view>
    </view>
    <DayunView
      style="margin-top: 16rpx"
      :analysisResult="analysisResult"
      :dayunArr="analysisResult.data.ret_Info?.dayunArr"
      @applyResult="applyResult"
    />
    <view>
      <view
        style="
          margin-top: 8px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-around;
          flex-direction: row;
          flex-wrap: wrap;
        "
      >
        <uv-tags
          v-for="(item, index) in radios"
          :key="index"
          :text="item.label"
          :plain="select_tag !== index"
          :name="index"
          @click="radioClick"
        >
        </uv-tags>
      </view>
    </view>
    <uv-alert
      title=""
      style="margin: 8px 8px 0 8px"
      type="warning"
      description="软件参考《三命通会》、《渊海子平》、《子平真诠》等书籍使用程序量化计算，本软件仅供娱乐、学习用途，有问题可以直接在b站评论或者私信作者。"
    ></uv-alert>

    <view
      v-if="select_tag === 0"
      style="
        background-color: #f4f4f5;
        border-radius: 8px;
        border: 1px solid #f4f4f5;
        margin-top: 8px;
        margin-left: 8px;
        margin-right: 8px;
        padding: 8px;
      "
    >
      <uv-text type="info" text="命盘分析结果 beta"></uv-text>
      <uv-divider></uv-divider>
      <uv-text
        mode="info"
        :text="'家庭出身：' + analysisResult.data.ret_Info.family_background"
      ></uv-text>
      <uv-text
        mode="info"
        :text="analysisResult.data.ret_Info.wealth_level"
      ></uv-text>
      <uv-text
        mode="info"
        :text="
          '自身样貌特征：' +
          analysisResult.data.ret_Info.appearance.level +
          '(' +
          analysisResult.data.ret_Info.appearance.score +
          ')'
        "
      ></uv-text>
      <uv-text
        mode="info"
        :text="'配偶样貌：' + analysisResult.data.ret_Info.spouse_appearance"
      ></uv-text>
      <uv-text
        mode="info"
        :text="'学历资质：' + analysisResult.data.ret_Info.judge_education"
      ></uv-text>
    </view>

    <view
      v-if="select_tag === 1"
      style="
        background-color: #f4f4f5;
        border-radius: 8px;
        border: 1px solid #f4f4f5;
        margin-top: 8px;
        margin-left: 8px;
        margin-right: 8px;
        padding: 8px;
      "
    >
      <uv-text
        mode="info"
        :text="'身宫：' + analysisResult.data.ret_Info?.shengong"
      ></uv-text>
      <uv-text
        mode="info"
        :text="'胎元：' + analysisResult.data.ret_Info?.taiYuan"
      ></uv-text>
      <uv-text
        mode="info"
        :text="'五行力量：' + analysisResult.data.ret_Info?.wuxing"
      ></uv-text>
      <uv-text
        mode="info"
        :text="analysisResult.data.ret_Info.basic_analysis_2"
      ></uv-text>
      <uv-text
        mode="info"
        :text="'参考喜用神：' + analysisResult.data.ret_Info.use_god.useful_god"
      ></uv-text>
      <uv-text
        mode="info"
        :text="
          '逢喜用神特点：' + analysisResult.data.ret_Info.use_god.useful_god_min
        "
      ></uv-text>
      <uv-text
        mode="info"
        :text="analysisResult.data.ret_Info.main_personality"
      ></uv-text>
    </view>
    <view
      v-if="select_tag === 2"
      style="
        background-color: #f4f4f5;
        border-radius: 8px;
        border: 1px solid #f4f4f5;
        margin-top: 8px;
        margin-left: 8px;
        margin-right: 8px;
        padding: 8px;
      "
    >
      <uv-text
        type="info"
        :text="
          analysisResult.data.bazi.TianGan[2] +
          analysisResult.data.bazi.DiZhi[2] +
          '日柱三命通会精论'
        "
      ></uv-text>
      <uv-divider></uv-divider>
      <uv-text
        mode="info"
        v-for="item in analysisResult.data.ret_Info.SanMingTongHui"
        :text="item"
      ></uv-text>
    </view>
    <view
      v-if="select_tag === 3"
      style="
        background-color: #f4f4f5;
        border-radius: 8px;
        border: 1px solid #f4f4f5;
        margin-top: 8px;
        margin-left: 8px;
        margin-right: 8px;
        padding: 8px;
      "
    >
      <uv-text type="info" text="三命通会"></uv-text>
      <uv-divider></uv-divider>
      <uv-text
        mode="info"
        v-for="item in analysisResult.data.ret_Info.rishi"
        :text="item"
      ></uv-text>
    </view>
    <view
      v-if="select_tag === 4"
      style="
        background-color: #f4f4f5;
        border-radius: 8px;
        border: 1px solid #f4f4f5;
        margin-top: 8px;
        margin-left: 8px;
        margin-right: 8px;
        padding: 8px;
      "
    >
      <uv-text type="info" text="太岁"></uv-text>
      <uv-divider></uv-divider>
      <uv-text
        mode="info"
        :text="
          '太岁干支：' +
          analysisResult.data.taiSui.taiSui.gan +
          analysisResult.data.taiSui.taiSui.zhi
        "
      ></uv-text>
      <uv-text
        mode="info"
        :text="'太岁关系：' + analysisResult.data.taiSui.relation"
      ></uv-text>
      <uv-text
        mode="info"
        :text="'风险等级：' + analysisResult.data.taiSui.riskLevel"
      ></uv-text>
      <uv-text mode="info" :text="'详细描述：'"></uv-text>
      <uv-text
        mode="info"
        v-for="(item, index) in analysisResult.data.taiSui.details"
        :text="index + 1 + '.' + item"
      ></uv-text>
    </view>
    <!-- <view style="background-color: #f4f4f5;border-radius: 8px; border: 1px solid #f4f4f5;margin-top: 8px;margin-left: 8px;margin-right: 8px;padding: 8px;">
      <uv-text type="info" text="分析依据"></uv-text>
      <uv-divider></uv-divider>
      <uv-text v-for="item in analysisResult.data.ret_Info.data" mode="info" :text="item"></uv-text>
    </view> -->
  </view>
  <uv-popup ref="popups" :close-on-click-overlay="false" overlayOpacity="0.7">
    <uv-alert
      title="关注不迷路，查看B站主页简介获取验证码"
      type="warning"
      description="验证码可能在版本更新后替换，一次验证后可以无限次使用"
    ></uv-alert>
    <view
      style="
        width: 600rpx;
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <uv-code-input v-model="satoken" @finish="finish"></uv-code-input>
    </view>
  </uv-popup>
</template>

<script setup lang="ts">
import "./index.scss";
import { onBackPress, onLoad } from "@dcloudio/uni-app";
import config from "../../util/config";
import api from "../../api";
import { defineProps, onMounted, reactive, ref } from "vue";
import DayunView from "./DayunView.vue";
import all from "@/pages/pure-paipan/index.js";

const loading = ref(false);
const popups = ref();
const select_tag = ref(0);
const satoken = ref("");
const heavenlyStemsColorMap = {
  甲: "success", // 木 - 绿色
  乙: "success", // 木 - 绿色
  丙: "error", // 火 - 红色
  丁: "error", // 火 - 红色
  戊: "info", // 土 - 黄色
  己: "info", // 土 - 灰色（特殊指定）
  庚: "warning", // 金 - 蓝色（传统为白色，适配现有颜色）
  辛: "warning", // 金 - 蓝色
  壬: "primary", // 水 - 蓝色
  癸: "primary", // 水 - 蓝色
};

const earthlyBranchesColorMap = {
  子: "primary", // 水 - 蓝色
  丑: "info", // 土 - 黄色（常规土行）
  寅: "success", // 木 - 绿色
  卯: "success", // 木 - 绿色
  辰: "info", // 土 - 黄色
  巳: "error", // 火 - 红色
  午: "error", // 火 - 红色
  未: "info", // 土 - 黄色
  申: "warning", // 金 - 蓝色
  酉: "warning", // 金 - 蓝色
  戌: "info", // 土 - 黄色
  亥: "primary", // 水 - 蓝色
};

const radios = [
  { label: "命盘打分" },
  { label: "喜用分析" },
  { label: "日柱分析" },
  { label: "时柱分析" },
  { label: "流年太岁" },
];

const radioClick = (index: any) => {
  select_tag.value = index;
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
    shensha: {
      nian: [],
      yue: [],
      ri: [],
      shi: [],
      current: { liuNian: [], daYun: [], liuYue: [], liuRi: [] },
    },
    ret_Info: {
      SanMingTongHui: [""],
      rishi: [""],
      basic_analysis_1: "",
      basic_analysis_2: "",
      gan_shens: ["", "", "--", ""],
      xunkong: ["", "", "", ""],
      zhi_shens: [
        [{ shiShen: "", gan: "" }],
        [{ shiShen: "", gan: "" }],
        [{ shiShen: "", gan: "" }],
        [{ shiShen: "", gan: "" }],
      ],
      isStrong: false,
      wealth_level: "",
      currentYear: {
        dayun: ["", ""],
        dayunganshen: "",
        dayunzhishen: [{ shiShen: "", gan: "" }],
        liunian: ["", ""],
        liunianganshen: "",
        liunianzhishen: [{ shiShen: "", gan: "" }],
        dayunXunkong: "",
        liunianXunkong: "",
      },
      family_background: "",
      spouse_appearance: "",
      judge_education: "",
      data: [],
      appearance: {
        details: "",
        features: "",
        level: "",
        score: "",
      },
      xiYongShen: "",
      shengong: "",
      taiYuan: "",
      wuxing: "",
      sport_talent: "",
      game_talent: "",
      use_god: {
        useful_god: "",
        useful_god_min: "",
      },
      main_personality: "",
      dayunArr: [],
    },
    yuanHaiZiping: {
      shidu: {
        score: "",
        judge: "",
      },
    },
    taiSui: {
      taiSui: {
        gan: "庚",
        zhi: "辰",
      },
      relation: "岁克日",
      riskLevel: "中",
      rescue: {
        metal: true,
        fire: false,
        combineJiJia: false,
        metalFrame: true,
        fireFrame: false,
        hasAny: true,
      },
      details: ["日干乙(木) vs 太岁庚 辰(金) → 岁克日"],
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

function checkTokenExists() {
  try {
    // 使用uni.getStorageSync获取本地存储中的数据
    const token = uni.getStorageSync("sa-token");
    // 如果获取到的值不是undefined且不是null，则表示存在
    return token === "123456";
  } catch (e) {
    // 捕获可能的异常，如存储访问权限问题等
    console.error("检测token时发生错误:", e);
    return false;
  }
}

function setToken1234(tokenValue) {
  try {
    // 验证token值是否有效
    if (typeof tokenValue !== "string" || tokenValue.trim() === "") {
      console.error("token值必须是非空字符串");
      return false;
    }

    // 使用uni.setStorageSync存储token
    uni.setStorageSync("sa-token", tokenValue);

    // 存储后验证是否成功
    const storedToken = uni.getStorageSync("sa-token");
    const isSuccess = storedToken === tokenValue;

    if (isSuccess) {
      console.log("token已成功存储");
    } else {
      console.warn("token存储失败，验证不通过");
    }

    return isSuccess;
  } catch (e) {
    console.error("设置token时发生错误:", e);
    return false;
  }
}

function fillEmptyValues(target, source) {
  Object.keys(target).forEach((key) => {
    if (source[key] === null || source[key] === undefined) {
      target[key] = target[key]; // 保留原始默认值
    } else {
      target[key] = source[key];
    }
  });
}
const applyResult = (
  currentYear: number,
  currentMonth: number,
  currentDay: number
) => {
  const dateObj = new Date(Number(props.userInfo.birthday));
  console.log(props.userInfo.sex);
  const params = {
    year: dateObj.getUTCFullYear(),
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
    hour: dateObj.getHours(),
    minute: dateObj.getMinutes(),
    gender: props.userInfo.sex === "男" ? 1 : 0,
    currentYear: currentYear,
    currentMonth: currentMonth,
    currentDay: currentDay,
  };
  const res = all.getCurrentEightCharJSON(params);
  console.log(res);
  analysisResult.data = {
    bazi: {
      TianGan: [
        res.pillars.year.gan,
        res.pillars.month.gan,
        res.pillars.day.gan,
        res.pillars.time.gan,
      ],
      DiZhi: [
        res.pillars.year.zhi,
        res.pillars.month.zhi,
        res.pillars.day.zhi,
        res.pillars.time.zhi,
      ],
    },
    shensha: res.shensha,
    yuanHaiZiping: res.yuanHaiZiping,
    ret_Info: {
      SanMingTongHui: res.analysis.SanMingTongHui,
      rishi: res.analysis.rishi,
      basic_analysis_1: "",
      basic_analysis_2: "",
      gan_shens: [
        res.pillars.year.shiShenGan,
        res.pillars.month.shiShenGan,
        res.pillars.day.shiShenGan,
        res.pillars.time.shiShenGan,
      ],
      zhi_shens: [
        res.pillars.year.hideGanAttr,
        res.pillars.month.hideGanAttr,
        res.pillars.day.hideGanAttr,
        res.pillars.time.hideGanAttr,
      ],
      isStrong:
        res.yuanHaiZiping.shenQiang.score >=
        res.yuanHaiZiping.shenQiang.threshold,
      wealth_level: "",
      xunkong: [
        res.pillars.year.xunKong,
        res.pillars.month.xunKong,
        res.pillars.day.xunKong,
        res.pillars.time.xunKong,
      ],
      currentYear: {
        dayun: [
          res.currentYun.daYun?.ganZhi?.[0],
          res.currentYun.daYun?.ganZhi?.[1],
        ],
        dayunganshen: res.currentYun.daYun?.shiShen,
        dayunzhishen: res.currentYun.daYun?.zhiHideGanShiShen,
        liunian: [
          res.currentYun.liuNian.ganZhi[0],
          res.currentYun.liuNian.ganZhi[1],
        ],
        liunianganshen: res.currentYun.liuNian?.shiShen,
        liunianzhishen: res.currentYun.liuNian?.zhiHideGanShiShen,
        dayunXunkong: res.currentYun.daYun?.xunKong,
        liunianXunkong: res.currentYun.liuNian?.xunKong,
      },
      family_background: `${res.familyBackground.description} (${res.familyBackground.score})`,
      spouse_appearance:
        res.spouseAppearance.description +
        "(" +
        res.spouseAppearance.score +
        ")",
      judge_education: res.educationAndTalent.description,
      data: [],
      appearance: {
        details: res.selfAppearance.description,
        features: res.selfAppearance.description,
        level: res.selfAppearance.description,
        score: res.selfAppearance.appearanceScore,
      },
      xiYongShen: "*",
      shengong: res.shenGong + "(" + res.shenGongNaYin + ")",
      taiYuan: res.taiYuan + "(" + res.taiYuanNaYin + ")",
      wuxing: `金：${res.wuXingPower["金"]}，水：${res.wuXingPower["水"]}，木：${res.wuXingPower["木"]}，火：${res.wuXingPower["火"]}，土：${res.wuXingPower["土"]}`,
      sport_talent: "*",
      game_talent: "*",
      use_god: {
        useful_god: res.analysis.XiYongShen[0],
        useful_god_min: "*",
      },
      main_personality: "",
      dayunArr: res.dayunArr.map((e: any) => {
        return [
          e.startYear - dateObj.getUTCFullYear(),
          e.ganZhi[0],
          e.ganZhi[1],
          e.ganshen,
          "-" + e.zhishen,
          [
            ...e.liunianArr?.map((f: any) => {
              return [
                f?.year,
                f?.ganZhi[0],
                f?.ganZhi[1],
                f?.ganshen,
                [f?.zhishen],
              ];
            }),
          ],
        ];
      }),
    },
    taiSui: res.yuanHaiZiping.taiSui,
  };
};
const openPop = async () => {
  console.log(popups.value);
  if (popups.value) {
    console.log("组件已挂载");
    if (checkTokenExists()) {
      console.log('存在名为"1234"的token');
    } else {
      console.log('不存在名为"1234"的token');
      popups.value.open();
    }
  }
};

onLoad(async (option) => {
  loading.value = true;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  applyResult(currentYear, currentMonth, currentDay);
  loading.value = false;
  await openPop();
});

const finish = (e) => {
  console.log("输入结束，当前值为：" + e);
  if (e === "123456") {
    setToken1234("123456");
    popups.value.close();
  }
};

onMounted(async () => {
  await openPop();
  setTimeout(() => {
    openPop();
  }, 1000);
});
</script>
