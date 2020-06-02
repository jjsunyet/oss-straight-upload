import ajax from './http'

// const BASE = 'http://192.168.1.30:8082/api/user/login';

//请求登录的接口（搞cookie）
let BASE_URL = '/agent';
if (process.env.NODE_ENV != 'development') {
  BASE_URL = '';
}else{
  // BASE_URL = 'http://192.168.1.65:8000';
   BASE_URL = '/agent';
}
// const BASE_URL = '';

export const reqLoginCookie  = (mobile,password) => ajax.post(BASE_URL+'/api/user/login',{mobile,password});

//请求获取审核视频列表的接口
// export const reqVideoList = (title_key,name_key,user_id,channel_id,is_pass,source,video_id,page,_cookie)=>ajax.get(BASE_URL+'/api/video/list',{title_key,name_key,user_id,channel_id,is_pass,source,video_id,page},{headers:{'token':_cookie}})

//  请求获取跟读视频列表（筛选）
// export const reqVideoImitateList = (title_key,name_key,user_id,channel_id,is_pass,source,page,_cookie) => ajax.get(BASE_URL+'/api/video/imitateList',{title_key,name_key,user_id,channel_id,is_pass,source,page,_cookie},{headers:{'token':_cookie}});

// 提交审核结果
export const reqVideoReview = (video_id,is_pass,origin_pass,title,channel_id,tag_ids,is_flow,_cookie)=>ajax.post(BASE_URL+'/api/video/review',{video_id,is_pass,origin_pass,title,channel_id,tag_ids,is_flow},{headers:{'token':_cookie}});

// 获取视频标签词
export const reqVideoTags = (_cookie)=> ajax.get(BASE_URL+'/api/video/tags',{},{headers:{'token':_cookie}});

//提交新增视频标签
export const reqVideoTag = (tag_name,_cookie)=> ajax.post(BASE_URL+'/api/video/tag',{tag_name},{headers:{'token':_cookie}});

//获取视频频道列表
export const reqVideoChannels = (_cookie)=> ajax.get(BASE_URL+'/api/video/channels',{},{headers:{'token': _cookie}});

//提交新增视频频道
export const reqVideoChannel = (channel_name,_cookie)=> ajax.post(BASE_URL+'/api/video/channel',{channel_name},{headers:{'token':_cookie}});

//更新跟读视频文本
export const reqImitateText = (video_id,video_text,_cookie) => ajax.post(BASE_URL+'/api/video/imitateText',{video_id,video_text},{headers:{'token':_cookie}});

//重置跟读文本的请求接口
export const reqVideoImitateList  = (search_keyword,search_type,channel_id,is_pass,source,page,_cookie) => ajax.get(BASE_URL+'/api/video/imitateList',{search_keyword,search_type,channel_id,is_pass,source,page},{headers:{'token':_cookie}});

//重置审核视频的请求接口
export const reqVideoList = (search_keyword,search_type,channel_id,is_pass,source,video_id,page,_cookie) => ajax.get(BASE_URL+'/api/video/list',{search_keyword,search_type,channel_id,is_pass,source,video_id,page,},{headers:{'token':_cookie}})

//请求审核视频数量统计接口
export const reqReviewStatistics =(_cookie) => ajax.get(BASE_URL+'/api/user/reviewStatistics',{},{headers:{'token':_cookie}});
