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

var gradeLayer = cc.Layer.extend({
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
        cc.loader.load(["res/grade.plist","res/grade.png","res/gradeInfo.png"], function(err, results){
            cc.spriteFrameCache.addSpriteFrames("res/grade.plist");
            // 标题
            var title=new cc.Sprite("#youxidengjiyuchenghao.png");
            title.attr({
                x:visibleOrigin.x+91,
                y:visibleOrigin.y+visibleSize.height-24,
                scale:visibleSize.height/1080,
                anchorX:0,
                anchorY:1,
            });
            layer.addChild(title,10);
            // 边框
            var memberBk=new cc.Sprite("#beijingkuang.png");
            var memberBkSize=memberBk.getContentSize();
            memberBk.attr({
                x:visibleSize.width/2,
                y:visibleSize.height/2,
            });
            layer.addChild(memberBk,10);
            // 游戏等级及称号
            var scrollView = new ccui.ScrollView();
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            scrollView.setTouchEnabled(true);
            scrollView.setContentSize(cc.size(memberBkSize.width/0.85,memberBkSize.height*0.9));
            scrollView.attr({
                x:visibleSize.width/2,
                y:visibleSize.height/2,
                anchorX:0.5,
                anchorY:0.5
            });
            // var imageView = new ccui.ImageView("res/gradeInfo.png");
            var imageView = new cc.Sprite("res/gradeInfo.png");
            var innerWidth = scrollView.width;
            var innerHeight = 3500;

            scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));
            imageView.x = innerWidth / 2;
            imageView.y = imageView.height / 2*0.8;
            scrollView.addChild(imageView);
            layer.addChild(scrollView,20);

            // 返回
            var goback=new cc.MenuItemImage(
                "#fanhui.png",
                "#fanhui.png",
                function(){
                    cc.director.runScene( new gameShowsScene( ) );
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

var gradeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gradeLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }
});

