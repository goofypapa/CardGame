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

var registerLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var layer = new cc.Layer();
        this.addChild(layer);

        console.log(layer.getPosition().x, layer.getPosition().y)

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();


        // 背景图
        var sprite = new cc.Sprite( res.trialBj );
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
            // scale:(visibleSize.width / spriteSize.width),
        });

        layer.addChild( sprite );
        cc.loader.load(["res/register.plist","res/register.png"], function(err, results){
            cc.spriteFrameCache.addSpriteFrames("res/register.plist");
            // 标题
            var title=new cc.Sprite("#biaoti.png");
            title.attr({
                x:visibleOrigin.x+91,
                y:visibleOrigin.y+visibleSize.height-24,
                scale:visibleSize.height/1080,
                anchorX:0,
                anchorY:1,
            });
            layer.addChild(title,10);


            // 边框
            var memberBk=new cc.Sprite("#member-bk.png");
            var memberBkSize=memberBk.getContentSize();
            memberBk.attr({
                x:visibleSize.width/2,
                y:visibleSize.height/2,
                anchorY:0.4
            });
            layer.addChild(memberBk,10);

            // 文字内容
            var text = new ccui.Text("您是想登陆注册还是试玩？", "Microsoft Yahei", 35);
            text.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleSize.height/2+100,
            });
            layer.addChild(text,10);
            var text = new ccui.Text("如果要保持进度或者分享，则需要注册", "Microsoft Yahei", 35);
            text.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleSize.height/2,
            });
            layer.addChild(text,10);


            // 登录
            var registerMenuItem=new cc.MenuItemImage(
                "#register.png",
                "#register.png",
                function(){
                    cc.director.runScene( new dlScene( ) );
                },this
            );
            registerMenuItem.attr({
                x:visibleSize.width/7,
                y:visibleOrigin.y+visibleSize.height/9,
                anchorX:0
            });

            // 注册
            var loginMenuItem=new cc.MenuItemImage(
                "#login.png",
                "#login.png",
                function(){
                    cc.director.runScene( new loginScene( ) );
                },this
            );
            loginMenuItem.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/9,
            });

            // 试玩
            var trialMenuItem=new cc.MenuItemImage(
                "#trialPlay.png",
                "#trialPlay.png",
                function(){
                    cc.director.runScene( new playGameScene( ) );
                },this
            );
            trialMenuItem.attr({
                x:visibleSize.width-visibleSize.width/7,
                y:visibleOrigin.y+visibleSize.height/9,
                anchorX:1
            });


            var mu=new cc.Menu(registerMenuItem,loginMenuItem,trialMenuItem);
            mu.x=0;
            mu.y=0;
            layer.addChild(mu,100);
            // 返回
            var goback=new cc.MenuItemImage(
                "#fanhui.png",
                "#fanhui.png",
                function(){
                    cc.director.runScene( new HelloWorldScene( ) );
                },this
            );
            goback.attr({
                x:visibleOrigin.x,
                y:visibleOrigin.y+visibleSize.height/10*9,
                anchorX:0,
                anchorY:1,
                scale:visibleSize.height/1080,
            });

            var mu=new cc.Menu(goback);
            mu.x=0;
            mu.y=0;
            layer.addChild(mu,100);
        });

        return true;
    },


});

var registerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new registerLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }
});

