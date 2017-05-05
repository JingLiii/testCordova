/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    // 初始化函数, 页面加载时执行
    initialize: function() {
        // 添加监听事件, 当设备加载完成后,执行app对象的完成后的方法, 并更改其中的this指向, 
        // 最后一个参数,指定在捕获阶段执行该函数.
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    // 设备桥接完成执行的方法.
    onDeviceReady: function() {
        // 更新首页上的DOM样式
        this.receivedEvent('deviceready');
        // DOM注册事件
        this.registerEvent();
    },

    // Update DOM on a Received Event
    // 更新DOM样式,以表示设备准备完成
    receivedEvent: function(id) {

        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // 注册事件
    registerEvent: function() {
        // 相机事件
        this.btnCamera();
        // 播放音频文件
        this.playMusic();
        // 调用浏览器
        this.useAppBrowser();
        // 录音播放
        this.audioCapture();
    },

    // 录制音频文件并播放
    audioCapture: function() {
        var _this = this;
        var btnCapAudio = document.getElementById('btnCapAudio');
        btnCapAudio.onclick = function() {
            // console.log('开始录制音频文件')
            _this.startRecord();
        };
        var btnPalyAudio = document.getElementById('btnPalyAudio');
        btnPalyAudio.onclick = function() {
            // console.log('播放录制的音频文件')
            //调用函数, 将得到的音频文件传入
            _this.playAudio(_this.nowAudioPath);
        }
    },

    startRecord: function() {
        // 缓存this, 将得到的音频文件路径放到this的一个属性上
        var _this = this;
        // 调用插件开始录音
        navigator.device.capture.captureAudio(captureSuccess, captureError);

        // 录音成功后,执行该函数
        function captureSuccess(mediaFiles) {
            _this.nowAudioPath = mediaFiles[0].fullPath;
        }
        // 录音失败弹出提示
        function captureError(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };
    },

    useAppBrowser: function() {
        var btnOurWeb = document.getElementById('btnOurWeb');
        btnOurWeb.onclick = function() {
            //按照指定格式跳转到指定网站
            cordova.InAppBrowser.open('http://yitihua.org', '_blank', 'location=no');
        };
        var btnShowPDF = document.getElementById('btnShowPDF');
        btnShowPDF.onclick = function() {
            cordova.InAppBrowser.open('http://192.168.140.74/MyPDFJS/', '_system', 'location=no');
        };
    },

    //播放音乐事件
    playMusic: function() {
        var _this = this;
        var btn = document.getElementById('btnPlayMusic');
        btn.onclick = function() {
            var url = '/android_asset/www/media/music.mp3';
            _this.playAudio(url)
        };
    },


    //播放音频文件
    playAudio: function(audioURL) {
        //新建了一个媒体对象
        var media = new Media(audioURL, onSuccess, onError, onStatus);

        function onSuccess() {
            console.log("Media: Success");
        }

        function onError(error) {
            alert('Media Error: ' + error.code + ': ' + error.message);
        }

        function onStatus(statCode) {
            console.log("Media status: " + statCode);
        }

        media.play();
    },


    //相机事件
    btnCamera: function() {
        // 缓存this
        var _this = this;
        // 相机按钮
        var btnCamera = document.getElementById('btnCamera');
        btnCamera.onclick = function() {
            // console.log('获取相机按钮成功');
            // 执行调用相机的函数
            _this.useCamera(_this.showImage);
        };
    },

    //调用相机, 获取拍照的地址
    useCamera: function(callback) {
        navigator.camera.getPicture(onSuccess, onFail);
        //注册成功函数
        function onSuccess(imageURL) {
            //调用相机成功执行回调函数, 并把获取到的图像地址作为参数传入
            callback(imageURL);
        }

        function onFail(err) {
            //弹出错误信息
            alert('调用相机失败: ' + err)
        }
    },
    //展示图片
    showImage: function(imageURL) {
        //获取img标签
        var showImg = document.getElementById('showImage');
        showImg.src = imageURL;
    }
};

app.initialize();