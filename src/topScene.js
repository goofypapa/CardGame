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

var topLayer = cc.Layer.extend({
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
        cc.loader.load(["res/top.plist","res/top.png"], function(err, results){
            cc.spriteFrameCache.addSpriteFrames("res/top.plist");
            // 标题
            var title=new cc.Sprite("#top.png");
            title.attr({
                x:visibleOrigin.x+91,
                y:visibleOrigin.y+visibleSize.height-24,
                scale:visibleSize.height/1080,
                anchorX:0,
                anchorY:1,
            });
            layer.addChild(title,10);
            // 边框
            var topBk=new cc.Sprite("#top-bk.png");
            var topBkSize=topBk.getContentSize();
            topBk.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/2,
                scale:visibleSize.height/1080
            });
            layer.addChild(topBk,10);

            // 名次
            var rank=new cc.Sprite("#rank.png");
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            // 昵称
            var rank=new cc.Sprite("#nickName.png");
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*2,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            // 等级
            var rank=new cc.Sprite("#grade.png");
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*3,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            // 称号
            var rank=new cc.Sprite("#designation.png");
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*4,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            var scrollView = new ccui.ScrollView();
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            scrollView.setContentSize(topBkSize);
            scrollView.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/2,
                scale:visibleSize.height/1080
            });

            var n = 20;
            var Texts = [];
            var start = new ccui.Text("---start---", "Microsoft Yahei", 10);
            var innerWidth = scrollView.width;
            var innerHeight = n * start.height;
            scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

            start.x = innerWidth / 2;
            start.y = scrollView.getInnerContainerSize().height - start.height / 2;
            Texts[0] = start;
            scrollView.addChild(start);

            for (var i = 1; i < n; i++) {
                var text = new ccui.Text("This is a test label: " + i, "Thonburi", 10);
                text.x = innerWidth / 2;
                text.y = Texts[i - 1].getBottomBoundary() - text.height / 2;
                Texts[i] = text;
                scrollView.addChild(Texts[i]);
            }
            layer.addChild(scrollView,10)

            // 返回
            var goback=new cc.MenuItemImage(
                "#fanhui.png",
                "#fanhui.png",
                function(){
                    cc.director.runScene( new HelloWorldScene( ) );
                },this
            );
            goback.attr({
                x:visibleOrigin.x+visibleSize.width-159,
                y:visibleOrigin.y+visibleSize.height-102,
            });

            var mu=new cc.Menu(goback);
            mu.x=0;
            mu.y=0;
            layer.addChild(mu,100);
        });

        return true;
    },


});

var topScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new topLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }
});

