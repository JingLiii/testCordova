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
        //相机事件
        this.btnCamera();
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