import config from "../util/config";

interface analysis{
    timestamp: Number;
}

export default {
  analysis: (params : any) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${config.baseurl}/analysis/${params.timestamp}`,
        method: 'GET', // 或 'POST'
        data: {
          sex: params.sex==='男'?1:0,
        },
        success: (res) => {
          resolve(res.data); // 成功时返回数据
        },
        fail: (err) => {
          reject(err); // 失败时返回错误
        }
      });
    });
  }
};
