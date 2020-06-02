<template>
  <div class="upload-page-wrapper">
    <div class="upload-tool-box">
      <span class="a_upload" @click="uploadABtn">ADD+
         <input type="file" @change="addFileFun" class="add-file-btn" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" multiple>
      </span>
    </div>
  </div>
</template>

<script>
  import PhotoSphereViewer from 'photo-sphere-viewer';
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
  import QS from 'qs'
  let Base64 = require('js-base64').Base64;
  import {getLoggerList} from '../httpUrl/mainHttpUrl/mainUrl'
  import axios from '../httpUrl/mainHttpUrl/mainHttp'
  export default {
  name: 'MainPage',
  data(){
    return {
      msg: 'the page which for test oss straight upload',
      upLoadArr:[],
      userMessage:{},

    }
  },
  methods:{
    // 点击添加文件按钮
    uploadABtn(){
      //input标签自带的函数click()
      $('.add-file-btn').click();
    },
    // 属性放入对象中
    addFileFun(){
      let _this = this;
      var fileArr = $('.add-file-btn').get(0).files;
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
  },
  components:{},
  computed:{},
  watch:{},
  mounted(){},
  created(){},
  beforeDestroy(){},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
