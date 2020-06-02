/**
 * mainView中的接口统一管理
 */
import {get,post,myPost,sendPost} from './mainHttp'

export const getData = function(url,params){
  return get(url,params);
}
// 获取行政区划
export const getRegion = function(url,params){
  return get(url,params);
}
// 获取验证码
export const getCaptcha = function(url,params){
  return get(url,params);
}
// 发送手机验证码
export const sendSms = function(url,params){
  return get(url,params);
}
// 注册
export const getRegist = function(url,params){
  return get(url,params);
}
// 忘记密码
export const updateUserPassword = function(url,params){
  return get(url,params);
}
// 登录
export const getLogin = function(url,params){
  return get(url,params);
}
// 登出
export const getLogout = function(url,params){
  return get(url,params);
}
// ------------------ 后台系统的方法 ----------------------------
// 获得用户列表
export const getUserList = function(url,params){
  return get(url,params);
}
// 批量激活或禁用
export const piLiang = function(url,params){
  return get(url,params);
}
// 修改密码
export const upPassword = function(url,params){
  return get(url,params);
}
// 修改用户信息
export const upUserConUrl = function(url,params){
  return get(url,params);
}
// 添加帮扶获取用户列表
export const getFarmerList = function(url,params){
  return get(url,params);
}
// 修改用户
export const upUserMsg = function(url,params){
  return get(url,params);
}
// 获得数据
export const getLoggerList = function(url,params){
  return get(url,params);
}
// 系统设置--档案照片类型设置
export const systemSetGet = function(url,params){
  return get(url,params);
}
// 系统设置--指标排查设置
export const surveySet = function(url,params){
  return get(url,params);
}
export const surveyGet = function(url,params){
  return get(url,params);
}
/*--------------------新闻接口---------------------------*/
//    拉取新闻列表
export const getJournalism = function (url,params) {
  return get(url,params);
}
//修改新闻内容状态
export const updateJournalism = function (url,params) {
  return get(url,params);
}
//删除新闻内容
export const deleteJournalism = function (url,params) {
  return get(url,params)
}
//新闻内容添加
export const insertJournalism = function (url,params) {
  return myPost(url,params)
}
//新闻内容编辑
export const updateNewJournalism = function (url,params) {
  return myPost(url,params)
}
//新闻类型栏回显添加通知
export const getShowNewInform = function (url,params) {
  return get(url,params)
}
//新闻类型删除
export const deleteNewCode = function (url,params) {
  return get(url,params)
}
//新增新闻类型
export const insertNewCode = function (url,params) {
  return get(url,params)
}
//新增单个新闻类型
export const insertNewCodeOne  = function (url,params) {
  return get(url,params)
}
//新闻类型栏回显
export const getShowNew = function (url,params){
  return get(url,params)
}
//新闻标题图片上传接口
export const insertFileUpload = function(url,params){
  return myPost(url,params)
}
//查询除通知以外的其他类型的新闻
export const getJournalismElseType = function (url,params) {
  return get(url,params)
}
//获取上传者的头像
export const getUserForObj = function (url,params) {
  return get(url,params)
}
//新增新闻列表操作
//-----------------------问卷设置--------------------------------

//1.查询问卷
export const getQuestionnaire = function (url,params) {
  return get(url,params)
}
//2问卷设置_删除
export const deleteQuestionnaireId = function (url,params) {
  return get(url,params)
}
//3问卷设置新增
export const insertQuestionnaire = function (url,params) {
  return myPost(url,params)
}
//4问卷设置修改
export const updateQuestionnaire = function (url,params) {
  return myPost(url,params)
}
//5查看状态是否可操作
export const getSetQuestionnaireQueryId = function (url,params) {
  return get(url,params)
}
export const getSetQuestionnaireJson = function (url,params) {
  return get(url,params)
}
//6问卷设置_点击发布问卷_生成表
export const insertReleaseUploadingQuestionnaire = function (url,params) {
  return myPost(url,params)
}
//7获取问卷的选项
export const getAnswerQuestionnaire = function (url,params) {
  return get(url,params)
}
//-----------------------其他---------------------
//上传文件
export const uploadDeptData = function(url,data){
  return post(url,data)
}
//获得数据更新的数据
export const getUpdateFun = function (url,params){
  return get(url,params)
}
// -----------------采集进度的方法----------------------------
//查询所有的乡镇
export const getVillageTown = function (url,params){
  return get(url,params)
}
//查询所有的村
export const getVillageVillage = function (url,params){
  return get(url,params)
}
//查询所有的排查指标问卷
export const getPczbCase = function (url,params) {
  return get(url,params)
}
//查询所有的自定义问卷
export const getQuestionnaireCase = function (url,params) {
  return get(url,params)
}
//采集进度村信息统计—-查询
export const getGatherVillage = function (url,params){
  return get(url,params)
}
//采集进度统一查询接口
export const getStatisticsGather = function (url,params) {
  return get(url,params)
}
//-----------------------任务跟踪的方法--------------------------
// 1.getRegion()
// 2.getUserList()
// 3.上传照片
export const uploadFileInfo = function (url,params) {
  return get(url,params)
}
// 4.新增任务，也既发布任务
export const insertTask = function (url,params) {
  return myPost(url,params)
}
// 5.获取用户的任务链列表
export const getUserPageList =  function (url,params) {
  return get(url,params)
}
// 6.获取我的任务链信息
export const getMyTaskInfo = function (url,params) {
  return get(url,params)
}
// 7.获取任务列表
export const getTaskPageList = function (url,params) {
  return get(url,params)
}
// 8.获取任务详情列表
export const getTaskItemList = function (url,params) {
  return get(url,params)
}
// 9.根据文件编号删除文件
export const deleteFileInfo = function (url,params) {
  return get(url,params)
}
//10.获取oss直传信息
export const getWebToken = function (url,params) {
  return get(url,params)
}
//11.获取任务总览数据
export const getTaskTreeMap= function(url,params){
  return get(url,params)
}
//12.上传照片flag
export const setFlag = function (url,params) {
  return get(url,params)
}
//13，获取照片flag
export const getFlag = function (url,params) {
  return get(url,params)
}
//14.获取户编号获取照片列表
export const getFileList = function (url,params){
  return get(url,params)
}
//-----------------------视频连线的方法--------------------------
//创建直播间，时间限制是一天
export const insertLiveRoom = function (url,params) {
  return get(url,params)
}
//拉取直播列表
export const getLiveRoomList = function (url,params) {
  return get(url,params)
}
//拉取录像列表
export const getRecordVdeoList = function (url,params) {
  return get(url,params)
}
//关闭房间的URL
export const getShutUrl = function (url,params){
  return get(url,params)
}
//修改下播时间 和状态
export const updateFinishTime = function (url,params) {
  return get(url,params)
}
//修改开播时间 和状态
export const updateBeginTime = function (url,params) {
  return get(url,params)
}
//传直播封面图片
export const insertLiveRoomPictureFileUploading = function (url,params) {
  return get(url,params)
}

// ------------------ 业务系统的方法 ----------------------------
// 获得排查指标的内容
export const indicatorsGet = function(url,params){
  return get(url,params);
}
// 系统设置--档案照片类型设置
export const postSendDazp = function(url,params){
  return sendPost(url,params);
}
// 得到点位的内容
export const getMapSpot = function(url,params){
  return get(url,params);
}
