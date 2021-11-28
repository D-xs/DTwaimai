// 统一封装接口请求函数
// 返回值：promise对象
// 引入ajax发送请求模块
import ajax from "./ajax"
const BASE_URL = '/api'
// [1、根据经纬度获取位置详情]
const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// [2、获取食品分类列表]
const reqFoodCategoryList = () => ajax(`${BASE_URL}/index_category`)
// [3、根据经纬度获取商铺列表]
const reqShopList = ({latitude, longitude}) => ajax(`${BASE_URL}/shops`,{latitude, longitude})
// [4、根据经纬度和关键字搜索商铺列表]
const reqSearchShopList = (keyword, geohash) => ajax(`${BASE_URL}/search_shops`,{keyword, geohash})
// [5、获取一次性验证码]
const reqOnetimeVerificationCode = () => ajax(`${BASE_URL}/captcha`)
// [6、用户名密码登陆]
const reqLoginByUsername = (name, pwd, captcha) => ajax(`${BASE_URL}/login_pwd`,{name, pwd, captcha},'POST')
// [7、发送短信验证码]
const reqSMSVerificationCode = (phone) => ajax(`${BASE_URL}/sendcode`,{phone})
// [8、手机号验证码登陆]
const reqLoginByPhoneVerificationCode = (phone, code) => ajax(`${BASE_URL}/login_sms`,{phone, code},'POST')
// [9、根据会话获取用户信息]
const reqUserInfoBySession = () => ajax(`${BASE_URL}/userinfo`)
// [10、用户登出]
const reqLogout = () => ajax(`${BASE_URL}/logout`)
// [11. 获取商家信息]
const reqShopInfo = () => ajax('/info')
// [12. 获取商家商品数组]
const reqShopGoods = () => ajax('/goods')
// [13. 获取商家评价数组]
const reqShopRatings = () => ajax('/ratings')
// 对外暴露接口请求函数
export {
  reqAddress,
  reqFoodCategoryList,
  reqShopList,
  reqSearchShopList,
  reqOnetimeVerificationCode,
  reqLoginByUsername,
  reqSMSVerificationCode,
  reqLoginByPhoneVerificationCode,
  reqUserInfoBySession,
  reqLogout,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings
}
