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
        cc.loader.load([res.grade_plist,res.grade_png,"res/gradeInfo01.png","res/gradeInfo02.png","res/gradeInfo03.png"], function(err, results){
            cc.spriteFrameCache.addSpriteFrames(res.grade_plist);
            // 标题
            var title=new cc.Sprite("#youxidengjiyuchenghao.png");
            var titleSize=title.getContentSize();
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
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/2-visibleSize.height/10,
                anchorX:0.5,
                anchorY:0.5,
                scale:visibleSize.height/1080,
            });
            layer.addChild(memberBk,10);
            // 游戏等级及称号
            var scrollView = new ccui.ScrollView();
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            scrollView.setTouchEnabled(true);
            scrollView.setInertiaScrollEnabled(true);
            scrollView.setBackGroundImageScale9Enabled(true);
            // scrollView.setBackGroundImage("res/beijingkuang.png");
            scrollView.setContentSize(cc.size(memberBkSize.width,memberBkSize.height*0.9));
            scrollView.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/2-visibleSize.height/10,
                anchorX:0.5,
                anchorY:0.5,
                scale:visibleSize.height/1080
            });
            var innerHeight = 6500*visibleSize.height/1080;

            scrollView.setInnerContainerSize(cc.size(memberBkSize.width, innerHeight));

            for(var i = 0; i < 3; i++){
                var num=i+1;
                var sprite = new cc.Sprite('res/gradeInfo0'+num+'.png');
                scrollView.addChild(sprite);
                if(i==0){
                    sprite.x = scrollView.width/2;
                    sprite.y = scrollView.getInnerContainerSize().height- visibleSize.height/1080*1000 -20 ;
                }else if(i==1){
                    sprite.x = scrollView.width/2;
                    sprite.y = scrollView.getInnerContainerSize().height- visibleSize.height/1080*3000 -20 ;
                }else{
                    sprite.x = scrollView.width/2;
                    sprite.y = scrollView.getInnerContainerSize().height- visibleSize.height/1080*5000 -20 ;
                }
                sprite.scale=visibleSize.height/1080;
                sprite.setAnchorPoint(cc.p(0.5,0.5));
            }
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

