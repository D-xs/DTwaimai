// 统一封装接口请求函数
// 返回值：promise对象
// [1、根据经纬度获取位置详情]
// [2、获取食品分类列表]
// [3、根据经纬度获取商铺列表]
// [4、根据经纬度和关键字搜索商铺列表]
// [5、获取一次性验证码]
// [6、用户名密码登陆]
// [7、发送短信验证码]
// [8、手机号验证码登陆]
// [9、根据会话获取用户信息]
// [10、用户登出]
// 引入ajax发送请求模块
import ajax from "./ajax"
// [1、根据经纬度获取位置详情]
const reqAddress = (geohash) => ajax(`/position/${geohash}`)
// [2、获取食品分类列表]
const reqFoodCategoryList = () => ajax('/index_category')
// [3、根据经纬度获取商铺列表]
const reqShopList = ({latitude, longitude}) => ajax(`/shops`,{latitude, longitude})
// [4、根据经纬度和关键字搜索商铺列表]
const reqSearchShopList = (keyword, geohash) => ajax(`/search_shops`,{keyword, geohash})
// [5、获取一次性验证码]
const reqOnetimeVerificationCode = () => ajax(`/captcha`)
// [6、用户名密码登陆]
const reqLoginByUsername = (name, pwd, captcha) => ajax(`/login_pwd`,{name, pwd, captcha},'POST')
// [7、发送短信验证码]
const reqSMSVerificationCode = (phone) => ajax(`/sendcode`,{phone})
// [8、手机号验证码登陆]
const reqLoginByPhoneVerificationCode = (phone, code) => ajax(`/login_sms`,{phone, code},'POST')
// [9、根据会话获取用户信息]
const reqUserInfoBySession = () => ajax(`/userinfo`)
// [10、用户登出]
const reqLogout = () => ajax(`/logout`)

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
  reqLogout
}
