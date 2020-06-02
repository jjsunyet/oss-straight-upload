<template>
<!-- 无人机上传全景的容器 -->
    <div id='operateLogSwitch'>
        <div class='operateLogSwitchFa'>
            <p> </p>
        </div>
        <div class='operateLogSwitchCon'>
            <!-- 查询容器 -->
            <router-view name="searchDiv"/>
            <!-- 分页容器 -->
            <router-view name="pageDiv"/>
            <!-- 列表容器 -->
            <router-view name="tableDiv"/>
        </div>
        <!-- 上传页面 -->
        <div class="uploadPage" v-if="uploadShow">
            <div class="toolUpload">
                <span class="returnPage" @click="backTo"></span>
                <div class="upToolEx">
                    <span class="a_upload" @click="uploadABtn">
                        添加文件
                        <input type="file" @change="addFileFun" class="addFile" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" multiple>
                    </span>
                    <span href="javascript:;" class="a_upload" @click="clickUpLoadImg">上传</span>
                </div>
                <span style="float:right;display:inline-block;line-height:32px;color: #3C3C3C;">点击添加文件并选择全景文件，点击上传按钮。</span>
            </div>
            <div class="contentUp">
                <vue-scroll :ops="ops">
                    <div class="panImg" v-for="(item,index) in yupLoadArr" :key="item.code">
                        <img :src="pointStr(item.filePath)">
                        <p v-if="item.fileStatus == '已上传'">状态：<span style="color:#6DD400;">{{item.fileStatus}}</span></p>
                        <p>上传人：{{item.username}}</p>
                        <p>上传时间：{{item.createDate}}</p>
                        <p>
                            <span style="width:48px;height:100%;float:left;">文件名：</span>
                            <span class="shengLue">{{item.fileName}}</span>
                        </p>
                        <div class="btnImgTool">
                            <span class="yuLan" @click="yuLImg(index,item.fileName,item.username,item.createDate,'http://queshan.oss-cn-beijing.aliyuncs.com/'+item.filePath)">预览</span>
                            <span class="del" @click="delImg(item,item.fileStatus,index)">删除</span>
                        </div>
                    </div>
                    <div class="panImg" v-for="(item,index) in upLoadArr" :key="index">
                        <img :src="item.url">
                        <p v-if="item.state == '未上传'">状态：<span style="color:#E02020;">{{item.state}}</span></p>
                        <p>上传人：{{item.upName}}</p>
                        <p>上传时间：{{item.time}}</p>
                        <p>
                            <span style="width:48px;height:100%;float:left;">文件名：</span>
                            <span class="shengLue">{{item.name}}</span>
                        </p>
                        <div class="btnImgTool">
                            <span class="yuLan" @click="yuLImg(index,item.name,item.upName,item.time,item.url)">预览</span>
                            <span class="del" @click="delImg(item,item.state,index)">删除</span>
                        </div>
                    </div>
                 </vue-scroll>
            </div>
            <!-- 预览图片 -->
            <div class="yuLDiv" v-if="yuLSHow">
                <div class="imgYuLDiv">
                    <div class="imgTitle">
                        <span class="fileName">文件名：{{imgFileName}}</span>
                        <span class="upName">上传人：{{imgFileUserName}}</span>
                        <span class="upTime">上传时间：{{imgFileTime}}</span>
                        <span class="upClose" @click="closeYuL"></span>
                    </div>
                    <div class="imgBottom" :id="div">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eventVue from '../userManage/eventVue'
import PhotoSphereViewer from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import QS from 'qs'
let Base64 = require('js-base64').Base64;
import {getLoggerList} from '../../../../../httpUrl/mainHttpUrl/mainUrl'
import axios from '../../../../../httpUrl/mainHttpUrl/mainHttp'
export default {
    name:'operateLogSwitch',
    data(){
        return{
            ops:{},
            uploadShow:false,//上传页面是否显示
            yuLSHow:false,//图片预览是否显示
            div:'imgBottoms',
            imgUrl:'../../../../../../static/qj.jpg',
            PSV:null,
            upLoadArr:[],//上传图片的数组
            userMessage:null,//登录用户信息
            authentication:null,//认证信息
            useRow:null,//点击上传的用户的信息
            yupLoadArr:[],//已经上传的图片
            imgUrlLook:'http://queshan.oss-cn-beijing.aliyuncs.com',
            imgFileName:'',
            imgFileUserName:'',
            imgFileTime:'',
        }
    },
    created(){
        this.userMessage = QS.parse(sessionStorage.getItem('userMsg'));
        this.uploadShowF();
    },
    mounted(){
        
    },
    computed:{
        pointStr(){
            return function(url){
                return this.imgUrlLook+'/'+url;
            }
        }
    },
    methods:{
        // 上传页面是否显示
        uploadShowF:function(){
            eventVue.$on('uploadShowFun',(obj)=>{
                eventVue.$emit('bottomRightLoading',true);
                this.upLoadArr = [];
                this.yupLoadArr = [];
                this.useRow = obj.row;
                this.uploadShow = obj.flg;
                this.getUpImgFun();
            })
        },
        // 获取已经上传的图片
        getUpImgFun(){
            let _this = this;
            getLoggerList('/getUavFileList.do',{
                villageId:_this.useRow.id
            }).then(res=>{
                if(res.data.code == '200'){
                    _this.yupLoadArr = res.data.data;
                }
                eventVue.$emit('bottomRightLoading',false);
            }).catch(err=>{
                eventVue.$emit('bottomRightLoading',false);
                console.error(err);
            });
        },
        // 返回
        backTo(){
            this.uploadShow = false;
            eventVue.$emit('clickSearchFun');
        },
        // 点击添加文件按钮
        uploadABtn(){
            $('.addFile').click();
        },
        // 删除图片
        delImg(item,state,index){
            let _this = this;
            if(state == '未上传'){
                _this.$confirm('是否删除该图片？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.upLoadArr.splice(index,1);
                });
            }else{
                _this.$confirm('是否删除该图片？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.delImgFun(item.code,index);
                });
            }
        },
        // 删除图片
        delImgFun(code,index){
            let _this = this;
            eventVue.$emit('bottomRightLoading',true);
            getLoggerList('/village/deleteFileInfo.do',{
                fileCode:code
            }).then(res=>{
                if(res.data.code == '200'){
                    _this.yupLoadArr.splice(index,1);
                }
                eventVue.$emit('bottomRightLoading',false);
            }).catch(err=>{
                eventVue.$emit('bottomRightLoading',false);
                console.error(err);
            });
        },
        // 关闭预览
        closeYuL(){
            this.yuLSHow = false;
            this.PSV.destroy();
        },
        // 预览图片
        yuLImg(index,fileName,username,createDate,url){
            this.imgFileName = fileName;
            this.imgFileUserName = username;
            this.imgFileTime = createDate;
            this.yuLSHow = true;
            let _this = this;
            _this.$nextTick(function(){
                _this.PSV = PhotoSphereViewer({
                    container:_this.div, //容器
                    panorama:url, //图片地址
                    time_anim:false, //不自动旋转
                    size:{
                        width:'100%',
                        height:'100%'
                    },
                    navbar:[
                        'autorotate', //旋转按钮
                    　　 'zoom', //放大缩小按钮
                        'download', //下载
                    　　 'caption', //标题
                        'fullscreen', //全屏
                    ]
                })
            });
        },
        // 属性放入对象中
        addFileFun(){
            let _this = this;
            var fileArr = $('.addFile').get(0).files;
            for(let i = 0;i<fileArr.length;i++){
                var obj = {};
                // 保存图片的名称
                obj.state = '未上传';
                obj.name = fileArr[i].name;
                obj.upName = _this.userMessage.username;
                obj.time = '未上传';
                obj.file = fileArr[i];
                _this.readerFileFun(fileArr[i],obj);
                console.log(obj);
            }
        },
        // 读取文件
        readerFileFun(fileCon,obj){
            let _this = this;
            //创建用来读取此文件的对象
            var reader = new FileReader();
            //使用该对象读取file文件
            reader.readAsDataURL(fileCon);
            //读取文件成功后执行的方法函数
            reader.onload=function(e){
            //读取成功后返回的一个参数e，整个的一个进度事件
                console.log(e);
            //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
                obj.url = e.target.result;
                _this.upLoadArr.push(obj);
            }
        },
        // 上传文件 首先获得认证信息
        clickUpLoadImg(){
            let _this = this;
            if(_this.upLoadArr.length > 0){
                getLoggerList('/getWebToken.do',{
                    phone:_this.userMessage.phone,
                    password:_this.userMessage.password
                }).then(res=>{
                    console.log(res);
                    if(res.data.code == 200){
                        // 保存认证信息
                        _this.authentication = res.data.data;
                        _this.directFun();
                    }
                }).catch(err=>{
                    console.error(err);
                });
            }else{
                _this.$alert('请添加需要上传的文件！', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                        
                    }
                });
            }
        },
        // 直传oss
        directFun(){
            let _this = this;
            eventVue.$emit('bottomRightLoading',true);
            var num =_this.upLoadArr.length;
            var ii = 1;
            _this.directFun03(num,0,ii);
        },
        directFun03(num,i,ii){
            let _this = this;
            let lastStr = _this.upLoadArr[i].name.split('.')[_this.upLoadArr[i].name.split('.').length - 1];
            let index = _this.upLoadArr[i].name.lastIndexOf('.');
            let startStr = _this.upLoadArr[i].name.substring(0,index);
            let fileNames = startStr + new Date().getTime() + "." + lastStr;
            let fileKey = "village/uav/"+_this.useRow.id+"/"+fileNames;
            var callback = {
                "callbackUrl":'http://118.190.55.201/queshan/uploadVillageFile.do',
                "callbackBodyType":'application/json',
                "callbackBody":"{\"villageId\":\""+_this.useRow.id+"\",\"villageModel\":\"无人机全景照片\",\"subTitleId\":\"uav\",\"fileCategory\":\"village\",\"fileType\":\"photo\",\"fileName\":\""+_this.upLoadArr[i].name
                                    +"\",\"filePath\":\""+fileKey+"\",\"username\":\""+_this.userMessage.username
                                    +"\",\"phone\":\""+_this.userMessage.phone+"\"}"
            }
            var formData = new FormData();
            formData.append('key',fileKey);
            formData.append('policy',_this.authentication.policy);
            formData.append('OSSAccessKeyId',_this.authentication.accessid);
            formData.append('success_action_status','200');
            formData.append('callback',Base64.encode(JSON.stringify(callback)));
            formData.append('signature',_this.authentication.signature);
            formData.append('file',_this.upLoadArr[i].file);
            $.ajax({
                url:_this.authentication.host,
                processData: false,
                cache: false,
                async: false, //同步
                contentType: false,
            　　 type: 'post',
                data:formData,
                success:function(res){
                    if(res.code == '200'){
                        // 放入已经上传的数组中
                        _this.yupLoadArr.push({
                            code:res.data,
                            username:_this.upLoadArr[i].upName,
                            createDate:_this.formatterDateTime(new Date()),
                            fileStatus:'已上传',
                            fileName:_this.upLoadArr[i].name,
                            filePath:fileKey
                        });
                        _this.upLoadArr.splice(0,1);
                        ii++;
                        if(ii<=num){
                            _this.directFun03(num,0,ii);
                        }else{
                            eventVue.$emit('bottomRightLoading',false);
                        }
                    }
                }
            });
        },
        // 时间转化
        formatterDateTime : function(date) {
            var datetime = date.getFullYear()
                    + "-"// "年"
                    + ((date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : "0"
                            + (date.getMonth() + 1))
                    + "-"// "月"
                    + (date.getDate() < 10 ? "0" + date.getDate() : date
                            .getDate())
                    + " "
                    + (date.getHours() < 10 ? "0" + date.getHours() : date
                            .getHours())
                    + ":"
                    + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                            .getMinutes())
                    + ":"
                    + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                            .getSeconds());
            return datetime;
        },
    },
    beforeDestroy(){
        eventVue.$off('uploadShowFun');
    }
}
</script>
<style scoped lang='less'>
#operateLogSwitch{
    width:100%;
    height:100%;
    margin:0;
    padding:0;
    position: relative;
    .operateLogSwitchFa{
        height: 60px;
        line-height: 60px;
        >p{
            font-size:18px;
            font-weight:bold;
            color:rgba(0,0,0,1);
            margin: 0 0 0 24px;
        }
    }
    .operateLogSwitchCon{
        width: 100%;
        height: calc(100% - 60px);
    }
    .uploadPage{
        position: absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background-color: #fff;
        .toolUpload{
            padding: 20px 43px 0 20px;
            .returnPage{
                display: inline-block;
                width: 120px;
                height: 29px;
                background: url('../../../../../assets/mainViewImgs/backstageImgs/backToPrevious.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .upToolEx{
                float: right;
                font-size: 14px;
                margin-left: 26px;
                height: 33px;
                .a_upload{
                    width: 121px;
                    height: 32px;
                    background-color: #33ABA0;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    line-height: 32px;
                    cursor: pointer;
                    overflow: hidden;
                    position: relative;
                    display: inline-block;
                    border-radius:3px;
                    text-decoration:none;
                    >input{
                        display: none;
                    }
                }
            }
        }
        .contentUp{
            width: 100%;
            height: calc(100% - 53px);
            .panImg{
                width: 210px;
                height: 240px;
                padding: 15px 14px 9px 14px;
                box-shadow:4px 5px 10px 0px rgba(194,206,220,1);
                margin-left: 30px;
                box-sizing: border-box;
                float: left;
                margin-top: 20px;
                position: relative;
                >img{
                    width: 182px;
                    height: 90px;
                }
                >p{
                    color: #4A4A4A;
                    font-size: 12px;
                    margin-top: 5px;
                    .shengLue{
                        width: calc(100% - 48px);
                        float: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        word-break: break-word;
                    }
                }
            }
            .btnImgTool{
                right:14px;
                font-weight: bolder;
                position: absolute;
                bottom: 9px;
                .yuLan{
                    color: #4A90E2;
                    font-size: 12px;
                    cursor: pointer;
                }
                .del{
                    color: #FA6400;
                    font-size: 12px;
                    cursor: pointer;
                    margin-left: 20px;
                }
            }
        }
        .yuLDiv{
            position: fixed;
            top:0;
            left: 0;
            bottom:0;
            right:0;
            background-color: rgba(0,0,0,.5);
            .imgYuLDiv{
                position: absolute;
                top:50%;
                left:50%;
                transform: translateX(-50%) translateY(-50%);
                height: 800px;
                width: 1400px;
                .imgTitle{
                    height: 30px;
                    background-color: #fff;
                    box-sizing: border-box;
                    padding: 0 20px;
                    position: relative;
                    span{
                        display: inline-block;
                        line-height: 30px;
                        color: #3C3C3C;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .fileName{
                        width: 50%;
                        height: 100%;
                    }
                    .upTime{
                        float: right;
                        margin-right: 200px;
                    }
                    .upClose{
                        float: right;
                        height: 10px;
                        width: 10px;
                        cursor: pointer;
                        position: absolute;
                        background: url('../../../../../assets/mainViewImgs/loginImgs/closeDiv.png') no-repeat;
                        background-size: 100% 100%;
                        right: 20px;
                        top:50%;
                        transform: translateY(-50%);
                    }
                }
                .imgBottom{
                    width: 100%;
                    height: calc(100% - 30px);
                    background-color: #fff;
                }
            }
        }
    }
}
</style>
