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
            <view class="cw pl8">姓名：{{ userInfo.name || "*" }}</view>
            <view class="cw pl8">出生日期：{{ userInfo.birthdayDisplay }}</view>
            <view class="cw pl8">旺衰参考：{{ analysisResult.data.ret_Info.isStrong ? '身强' : '身弱' }}</view>
          </view>
          <view class="result-qrcode">
            <uv-qrcode ref="qrcode" size="60px" :value="`https://space.bilibili.com/3546581452196143`"></uv-qrcode>
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
      <uv-text align="center" type="info" :text="analysisResult.data.ret_Info.currentYear.liunianganshen"></uv-text>
      <uv-text class="br1 mh32" align="center" type="info"
        :text="analysisResult.data.ret_Info.currentYear.dayunganshen"></uv-text>
      <uv-text v-for="item in analysisResult.data.ret_Info.gan_shens" align="center" type="info" :text="item"></uv-text>
    </view>
    <view class="table-column">
      <uv-text align="center" type="info" text="天干"></uv-text>
      <uv-text size="24" align="center"
        :type="heavenlyStemsColorMap[analysisResult.data.ret_Info.currentYear.liunian[0]]"
        :text="analysisResult.data.ret_Info.currentYear.liunian[0]"></uv-text>
      <uv-text size="24" class="br1" align="center"
        :type="heavenlyStemsColorMap[analysisResult.data.ret_Info.currentYear.dayun[0]]"
        :text="analysisResult.data.ret_Info.currentYear.dayun[0]"></uv-text>
      <uv-text v-for="item in analysisResult.data.bazi.TianGan" size="24" align="center"
        :type="heavenlyStemsColorMap[item]" :text="item"></uv-text>
    </view>
    <view class="table-column">
      <uv-text align="center" type="info" text="地支"></uv-text>
      <uv-text size="24" align="center"
        :type="earthlyBranchesColorMap[analysisResult.data.ret_Info.currentYear.liunian[1]]"
        :text="analysisResult.data.ret_Info.currentYear.liunian[1]"></uv-text>
      <uv-text size="24" class="br1" align="center"
        :type="earthlyBranchesColorMap[analysisResult.data.ret_Info.currentYear.dayun[1]]"
        :text="analysisResult.data.ret_Info.currentYear.dayun[1]"></uv-text>
      <uv-text v-for="item in analysisResult.data.bazi.DiZhi" size="24" align="center"
        :type="earthlyBranchesColorMap[item]" :text="item"></uv-text>
    </view>
    <view class="table-title bg-light">
      <uv-text align="center" type="info" text="副星"></uv-text>
      <uv-text align="center" type="info"
        :text="analysisResult.data.ret_Info.currentYear.liunianzhishen[0][1]"></uv-text>
      <uv-text align="center" type="info" :text="analysisResult.data.ret_Info.currentYear.dayunzhishen[0][1]"></uv-text>
      <uv-text v-for="item in analysisResult.data.ret_Info.zhi_shens" align="center" type="info" :text="item"></uv-text>
    </view>
    <uv-alert title="" style="margin: 8px 8px 0 8px;" type="warning"
      description="以下程序函数仅属于测试阶段，我将长期优化下去!大家千万图一乐，预测结果仅供娱乐！有问题可以直接在b站评论, 分值如果过低，可以直接把盘发给我！" closable></uv-alert>
    <view>
      <view
        style="margin-top: 8px; margin-bottom: 8px; display:flex;justify-content: space-around; flex-direction: row;flex-wrap: wrap">
        <uv-tags v-for="(item, index) in radios" :key="index" :text="item.label" :plain="select_tag !== index"
          :name="index" @click="radioClick">
        </uv-tags>
      </view>
    </view>

    <view v-if="select_tag === 0"
      style="background-color: #f4f4f5;border-radius: 8px; border: 1px solid #f4f4f5;margin-top: 8px;margin-left: 8px;margin-right: 8px;padding: 8px;">
      <uv-text type="info" text="常用基础分析"></uv-text>
      <uv-divider></uv-divider>
      <uv-text mode="info" :text="'调候用神：' + analysisResult.data.ret_Info.xiYongShen"></uv-text>
      <uv-text mode="info" :text="'大运喜忌：' + analysisResult.data.ret_Info.dayunxiji"></uv-text>
      <uv-text mode="info" :text="'参考喜用神：' + analysisResult.data.ret_Info.use_god.useful_god"></uv-text>
      <uv-text mode="info" :text="'逢喜用神特点：' + analysisResult.data.ret_Info.use_god.useful_god_min"></uv-text>
      <uv-text mode="info" :text="analysisResult.data.ret_Info.main_personality"></uv-text>
    </view>

    <view v-if="select_tag === 1"
      style="background-color: #f4f4f5;border-radius: 8px; border: 1px solid #f4f4f5;margin-top: 8px;margin-left: 8px;margin-right: 8px;padding: 8px;">
      <uv-text type="info" text="命盘分析结果 beta"></uv-text>
      <uv-divider></uv-divider>
      <uv-text mode="info" :text="'家庭出身：' + analysisResult.data.ret_Info.family_background"></uv-text>
      <uv-text mode="info" :text="analysisResult.data.ret_Info.wealth_level"></uv-text>
      <uv-text mode="info"
        :text="'自身样貌特征：' + analysisResult.data.ret_Info.appearance.level + '(' + analysisResult.data.ret_Info.appearance.score + ')'"></uv-text>
      <uv-text mode="info" :text="'配偶样貌：' + analysisResult.data.ret_Info.spouse_appearance"></uv-text>
      <uv-text mode="info" :text="'学历资质：' + analysisResult.data.ret_Info.judge_education"></uv-text>
    </view>
    <view v-if="select_tag === 2"
      style="background-color: #f4f4f5;border-radius: 8px; border: 1px solid #f4f4f5;margin-top: 8px;margin-left: 8px;margin-right: 8px;padding: 8px;">
      <uv-text type="info" text="游戏天赋分析"></uv-text>
      <uv-divider></uv-divider>
      <uv-text mode="info" :text="analysisResult.data.ret_Info.game_talent"></uv-text>
    </view>
    <view v-if="select_tag === 3"
      style="background-color: #f4f4f5;border-radius: 8px; border: 1px solid #f4f4f5;margin-top: 8px;margin-left: 8px;margin-right: 8px;padding: 8px;">
      <uv-text type="info" text="运动天赋分析"></uv-text>
      <uv-divider></uv-divider>
      <uv-text mode="info" :text="analysisResult.data.ret_Info.sport_talent"></uv-text>
    </view>
    <!-- <view style="background-color: #f4f4f5;border-radius: 8px; border: 1px solid #f4f4f5;margin-top: 8px;margin-left: 8px;margin-right: 8px;padding: 8px;">
      <uv-text type="info" text="分析依据"></uv-text>
      <uv-divider></uv-divider>
      <uv-text v-for="item in analysisResult.data.ret_Info.data" mode="info" :text="item"></uv-text>
    </view> -->
  </view>
  <uv-popup ref="popups" :close-on-click-overlay="false" overlayOpacity="0.7">
    <uv-alert title="拒绝白嫖" type="warning" description="关注UP后,查看主页获取验证码即可继续查看~"></uv-alert>
    <view style="width: 600rpx;padding: 16px; display: flex; justify-content: center;align-items: center;">
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

const loading = ref(false);
const popups = ref()
const select_tag = ref(0);
const satoken = ref('')
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

const radios = [{ label: '基础命盘分析' }, { label: '测试分析' }, { label: '游戏天赋' }, { label: '运动天赋' }]



const radioClick = (index: any) => {
  select_tag.value = index;
}

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
      wealth_level: "",
      currentYear: {
        dayun: [
          "",
          ""
        ],
        dayunganshen: "",
        dayunzhishen: [
          "",
          "",
          ""
        ],
        liunian: [
          "",
          ""
        ],
        liunianganshen: "",
        liunianzhishen: [
          "",
          "",
          ""
        ]
      },
      family_background: "",
      spouse_appearance: '',
      judge_education: '',
      data: [],
      appearance: {
        details: '',
        features: '',
        level: '',
        score: ''
      },
      xiYongShen: '',
      dayunxiji: '',
      sport_talent: '',
      game_talent: '',
      use_god: {
        useful_god: "官杀",
        useful_god_min: "贵人提扶，公职升官，考试中榜，选举当选，得名位扬，威扬权显等。"
      },
      main_personality: ""
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
    const token = uni.getStorageSync('sa-token');
    // 如果获取到的值不是undefined且不是null，则表示存在
    return token === '123456';
  } catch (e) {
    // 捕获可能的异常，如存储访问权限问题等
    console.error('检测token时发生错误:', e);
    return false;
  }
}

function setToken1234(tokenValue) {
  try {
    // 验证token值是否有效
    if (typeof tokenValue !== 'string' || tokenValue.trim() === '') {
      console.error('token值必须是非空字符串');
      return false;
    }

    // 使用uni.setStorageSync存储token
    uni.setStorageSync('sa-token', tokenValue);

    // 存储后验证是否成功
    const storedToken = uni.getStorageSync('sa-token');
    const isSuccess = storedToken === tokenValue;

    if (isSuccess) {
      console.log('token已成功存储');
    } else {
      console.warn('token存储失败，验证不通过');
    }

    return isSuccess;
  } catch (e) {
    console.error('设置token时发生错误:', e);
    return false;
  }
}

onLoad(async (option) => {
  loading.value = true
  const res = await api.analysis({ timestamp: props.userInfo.birthday, sex: props.userInfo.sex });
  analysisResult.data = res;
  loading.value = false
  await openPop();
});

const openPop = async () => {
  console.log(popups.value)
  if (popups.value) {
    console.log('组件已挂载')
    if (checkTokenExists()) {
      console.log('存在名为"1234"的token');
    } else {
      console.log('不存在名为"1234"的token');
      popups.value.open();
    }
  }
}

const finish = (e) => {
  console.log('输入结束，当前值为：' + e);
  if (e === '123456') {
    setToken1234('123456')
    popups.value.close();

  }
}

// onMounted(async () => {
//   await openPop();
//   setTimeout(() => { openPop() }, 1000)
// })

</script>
