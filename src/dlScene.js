/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var dlLayer = cc.Layer.extend({
    sprite:null,
    // bottomDisplayText:null,
    // ls:null,//昵称缓存
    userLable:null,
    ctor:function () {
        function jsonp(url, callback) {
            var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            window[callbackName] = function(data) {
                delete window[callbackName];
                document.body.removeChild(script);
                callback(data);
            };
            var script = document.createElement('script');
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            document.body.appendChild(script);
        };
        this._super();

        // 设置以及获取用户的昵称缓存
        // ls=cc.sys.localStorage;

        var layer = new cc.Layer();
        this.addChild(layer);

        console.log(layer.getPosition().x, layer.getPosition().y);

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();


        // 背景图
        var sprite = new cc.Sprite( res.trialBj );
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
        });

        layer.addChild( sprite );

        cc.loader.load([res.dl_plist,res.dl_png], function(err, results) {
            cc.spriteFrameCache.addSpriteFrames(res.dl_plist);
            // 标题
            var title=new cc.Sprite("#denglu.png");
            title.attr({
                x:visibleOrigin.x+91,
                y:visibleOrigin.y+visibleSize.height-24,
                scale:visibleSize.height/1080,
                anchorX:0,
                anchorY:1,
            });
            layer.addChild(title,10);


            // // 测试输入框
            // var textField = new ccui.TextField("PlaceHolder", "Marker Felt", 30);
            // textField.x = visibleSize.width / 2.0;
            // textField.y = visibleSize.height / 3;
            // textField.addEventListener(this.textFieldEvent, this);
            // layer.addChild(textField);


            // 昵称背景边框
            var nickNameFrame=new cc.Sprite("#biankuang.png");
            var nickNameFrameSize=nickNameFrame.getContentSize();
            nickNameFrame.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/9*6,
            });
            layer.addChild(nickNameFrame,10);


            // 您的昵称
            var titleLable=new cc.Sprite("#nickName.png");
            // var titleLable=new cc.EditBox(cc.size(nickNameFrameSize),new cc.Sprite("#biankuang.png"));
            titleLable.attr({
                x:visibleOrigin.x+visibleSize.width/2-nickNameFrameSize.width/2,
                y:visibleOrigin.y+visibleSize.height/9*6,
                anchorX:1,
                anchorY:0.5,
            });
            layer.addChild(titleLable,1);


            // 获取之前的缓存昵称
            // var r=ls.getItem("nickname");
            // 昵称输入框
            // if(r!=undefined){
            //     var textField = new ccui.TextField(r, "Marker Felt", 36);
            // }else{
            //     var textField = new ccui.TextField("您的昵称", "Marker Felt", 36);
            // }
            // var nickName = new ccui.TextField("您的昵称", "Marker Felt", 36);
            // nickName.setMaxLengthEnabled(true);
            // textField.setMaxLength(8);
            // nickName.setContentSize(cc.size(nickNameFrameSize.width,nickNameFrameSize.height));
            // nickName.setPlaceHolderColor(cc.color(104,99,128));
            // textField.setColor(cc.color(255,255,255,0.2));
            // nickName.attr({
            //     x:visibleSize.width/2-nickNameFrameSize.width/2+40,
            //     y:visibleOrigin.y+visibleSize.height/9*6,
            //     anchorX:0,
            //     anchorY:0.6
            // });
            // layer.addChild(nickName,1);



            userLable = new cc.EditBox(cc.size(360.00,40.00));

            userLable.attr({
                x:visibleSize.width/2-nickNameFrameSize.width/2+40,
                    y:visibleOrigin.y+visibleSize.height/9*6,
                    anchorX:0,
                    anchorY:0.5,
                fontSize:36
            });

            userLable.setDelegate(this);

            userLable.setMaxLength(20);

            userLable.setPlaceHolder("您的昵称");
            userLable.setPlaceholderFontSize(36);

            userLable.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文

            userLable.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);

            layer.addChild(userLable,1,10);




            // 密码背景边框
            var nickNameFrame=new cc.Sprite("#biankuang.png");
            var nickNameFrameSize=nickNameFrame.getContentSize();
            nickNameFrame.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/9*5,
            });
            layer.addChild(nickNameFrame,10);
            // 您的密码
            var passWordLable=new cc.Sprite("#nindemima.png");
            passWordLable.attr({
                x:visibleOrigin.x+visibleSize.width/2-nickNameFrameSize.width/2,
                y:visibleOrigin.y+visibleSize.height/9*5,
                anchorX:1,
                anchorY:0.5,
            });
            layer.addChild(passWordLable,1);



            var passWordBox = new cc.EditBox(cc.size(360.00,40.00));

            passWordBox.attr({
                x:visibleSize.width/2-nickNameFrameSize.width/2+40,
                y:visibleOrigin.y+visibleSize.height/9*5,
                anchorX:0,
                anchorY:0.6,
                fontSize:36
            });

            passWordBox.setDelegate(this);

            passWordBox.setMaxLength(20);

            passWordBox.setPlaceHolder("您的密码");
            passWordBox.setPlaceholderFontSize(36);

            // titleLable.setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE);//修改为不使用密文
            passWordBox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

            layer.addChild(passWordBox,1,10);


            // 获取之前的缓存昵称
            // var r=ls.getItem("nickname");
            // 昵称输入框
            // if(r!=undefined){
            //     var textField = new ccui.TextField(r, "Marker Felt", 36);
            // }else{
            //     var textField = new ccui.TextField("您的昵称", "Marker Felt", 36);
            // }
            // var pwd=new ccui.TextField();
            // pwd.setPasswordEnabled(true);
            // pwd.setPasswordStyleText("*");
            // pwd.setTouchEnabled(true);
            // pwd.fontName = "Marker Felt";
            // pwd.fontSize = 36;
            // pwd.placeHolder = "您的密码                                      ";
            // pwd.setMaxLengthEnabled(true);
            // pwd.setMaxLength(10);
            // pwd.setContentSize(nickNameFrameSize);
            // pwd.setPlaceHolderColor(cc.color(104,99,128));
            // pwd.attr({
            //     x:visibleSize.width/2-nickNameFrameSize.width/2+40,
            //     y:visibleOrigin.y+visibleSize.height/9*5,
            //     anchorX:0,
            //     anchorY:0.6
            // });
            // layer.addChild(pwd,1);

            // 或者
            var maybe=new cc.Sprite("#huozhe.png");
            maybe.attr({
                x:visibleOrigin.x+visibleSize.width/2-nickNameFrameSize.width/2,
                y:visibleOrigin.y+visibleSize.height/9*3.8,
                anchorX:1,
                anchorY:0.5,
            });
            // layer.addChild(maybe,1);
            // 微信
            var weixin=new cc.MenuItemImage(
                "#weixin.png",
                "#weixin.png",
                function(){

                },this
            );
            weixin.attr({
                x:visibleSize.width/2-nickNameFrameSize.width/2+25,
                y:visibleOrigin.y+visibleSize.height/9*3.8,
                anchorX:0
            });

            var mu=new cc.Menu(weixin);
            mu.x=0;
            mu.y=0;
            // layer.addChild(mu,100);

            // 开始游戏
            var startBtn=new cc.MenuItemImage(
                "#anniu.png",
                "#anniu.png",
                function(){
                    // 点击开始游戏时 获取用户昵称
                    // console.log(r);
                    // var name=textField.getString();
                    // if(r!=undefined){
                    //     console.log("!!!!!!");
                    //     name=r;
                    // }
                    // console.log(name);
                    // ls.setItem("nickname",name);
                    // console.log(ls.getItem("nickname"));
                    // cc.director.runScene( new mainGameScene( ) );
                    var userGameName=userLable.getString();
                    var userGamePwd=passWordBox.getString();
                    if(userGameName==""){
                        var errorImg=new cc.Sprite("res/error.png");
                        errorImg.attr({
                            x:visibleOrigin.x+visibleSize.width/2,
                            y:visibleOrigin.y+visibleSize.height/2
                        });
                        errorImg.setTag(1);
                        layer.addChild(errorImg,10);
                        var text = new ccui.Text("昵称不能为空", "Microsoft Yahei", 35);
                        text.attr({
                            x:visibleOrigin.x+visibleSize.width/2,
                            y:visibleOrigin.y+visibleSize.height/2
                        });
                        text.setTag(2);
                        layer.addChild(text,10);
                    }
                    console.log(userGameName,userGamePwd);
                    var BASE_URL="http://192.168.5.100:8080/gameUser/login.do";
                    var data="userName="+userGameName+"&userPwd="+userGamePwd+"&userType=1";
                    console.log(BASE_URL,data);
                    var xhr=cc.loader.getXMLHttpRequest();
                    xhr.open("POST",BASE_URL);
                    xhr.onreadystatechange=function(){
                        if(xhr.readyState==4&&xhr.status==200){
                            var response=xhr.responseText;
                            console.log("22222");
                            console.log(response);
                            console.log(typeof( response ));
                            var dataP=JSON.parse(response);
                            // var userId=dataP.data[0].gameUserId;
                            console.log(dataP["msg"]);
                            var userMsg=dataP["msg"];
                            // console.log(userMsg);
                            if(userMsg=="账号不存在"){
                                console.log("不   存   在");
                                var errorImg=new cc.Sprite("res/error.png");
                                errorImg.attr({
                                    x:visibleOrigin.x+visibleSize.width/2,
                                    y:visibleOrigin.y+visibleSize.height/2
                                });
                                errorImg.setTag(1);
                                layer.addChild(errorImg,10);
                                var text = new ccui.Text("账号不存在", "Microsoft Yahei", 35);
                                text.attr({
                                    x:visibleOrigin.x+visibleSize.width/2,
                                    y:visibleOrigin.y+visibleSize.height/2
                                });
                                text.setTag(2);
                                layer.addChild(text,10);



                            }else if(userMsg=="账号或密码不正确"){
                                var errorImg=new cc.Sprite("res/error.png");
                                errorImg.attr({
                                    x:visibleOrigin.x+visibleSize.width/2,
                                    y:visibleOrigin.y+visibleSize.height/2
                                });
                                errorImg.setTag(1);
                                layer.addChild(errorImg,10);
                                var text = new ccui.Text("登录名密码错误", "Microsoft Yahei", 35);
                                text.attr({
                                    x:visibleOrigin.x+visibleSize.width/2,
                                    y:visibleOrigin.y+visibleSize.height/2
                                });
                                text.setTag(2);
                                layer.addChild(text,10);

                            }else{

                                // var obj = JSON.parse(response.data).data;

                                localStorage.setItem( "userId", dataP.data[0].gameUserId);
                                console.log("defasdd");
                                cc.director.runScene( new gameScene( ) );
                            }
                        }
                    };
                    xhr.send(data);
                    jsonp( BASE_URL + "?" + data, function(data){
                        console.log("1111");
                        var userId=data.msg;
                        console.log(data);
                        if(userId=="账号不存在"){
                            var errorImg=new cc.Sprite("res/error.png");
                            errorImg.attr({
                                x:visibleOrigin.x+visibleSize.width/2,
                                y:visibleOrigin.y+visibleSize.height/2
                            });
                            errorImg.setTag(1);
                            layer.addChild(errorImg,10);
                            var text = new ccui.Text("账号不存在", "Microsoft Yahei", 35);
                            text.attr({
                                x:visibleOrigin.x+visibleSize.width/2,
                                y:visibleOrigin.y+visibleSize.height/2
                            });
                            text.setTag(2);
                            layer.addChild(text,10);



                        }else if(userId=="账号或密码不正确"){
                            var errorImg=new cc.Sprite("res/error.png");
                            errorImg.attr({
                                x:visibleOrigin.x+visibleSize.width/2,
                                y:visibleOrigin.y+visibleSize.height/2
                            });
                            errorImg.setTag(1);
                            layer.addChild(errorImg,10);
                            var text = new ccui.Text("登录名密码错误", "Microsoft Yahei", 35);
                            text.attr({
                                x:visibleOrigin.x+visibleSize.width/2,
                                y:visibleOrigin.y+visibleSize.height/2
                            });
                            text.setTag(2);
                            layer.addChild(text,10);

                        }else{
                            localStorage.setItem( "userId", data.data[0].gameUserId );
                            cc.director.runScene( new gameScene( ) );
                        }

                     })
                }
            );
            startBtn.attr({
                x:visibleOrigin.x+visibleSize.width-190,
                y:visibleOrigin.y+300,
                anchorX:1,
                anchorY:1,
            });

            // 返回
            var goback=new cc.MenuItemImage(
                "#fanhui.png",
                "#fanhui.png",
                function(){
                    cc.director.runScene( new registerScene( ) );
                },this
            );
            goback.attr({
                x:visibleOrigin.x,
                y:visibleOrigin.y+visibleSize.height/10*9,
                anchorX:0,
                anchorY:1,
                scale:visibleSize.height/1080,
            });

            var mu=new cc.Menu(startBtn,goback);
            mu.x=0;
            mu.y=0;
            layer.addChild(mu,100);
        });
        return true;
    },
    editBoxTextChanged: function (editBox, text) {

        console.log("editBox " + userLable.getName() + ", TextChanged, text: " + text);

    },
    textFieldEvent: function (textField, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                var widgetSize = this._widget.getContentSize();
                textField.runAction(cc.moveTo(0.225,
                    cc.p(widgetSize.width / 2, widgetSize.height / 2 + 30)));
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                var widgetSize = this._widget.getContentSize();
                textField.runAction(cc.moveTo(0.175, cc.p(widgetSize.width / 2.0, widgetSize.height / 2.0)));
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                break;
            default:
                break;
        }
    },
    menuItemgobackGameCallback:function(){
        cc.director.runScene( new HelloWorldScene( ) );
    },


});

var dlScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new dlLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }
});

