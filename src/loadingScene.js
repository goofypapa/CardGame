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

var loadingLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        // var size = cc.winSize;

        var layer = new cc.Layer();
        this.addChild(layer);
        console.log(layer.getPosition().x, layer.getPosition().y)

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        console.log( "------->" + JSON.stringify( visibleSize ) );
        console.log( "------->" + JSON.stringify( visibleOrigin ) );

        // 背景图
        var sprite = new cc.Sprite( res.indexBj );
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
        });

        layer.addChild( sprite );


        //创建精灵帧缓存
        // var frameCache=cc.spriteFrameCache;
        // frameCache.addSpriteFrames(res.kapai_plist,res.kapai_png);
        cc.loader.load(["res/loading.plist","res/loading.png"], function(err, results) {
            cc.spriteFrameCache.addSpriteFrames("res/loading.plist");
            // 标题
            var title=new cc.Sprite("#biaoti.png");
            title.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/3*2,
                scale:visibleSize.height/1080,
                anchorY:1,
            });
            layer.addChild(title,10);

            // 进度条1
            var loading1=new cc.Sprite("#jindutiao1.png");
            loading1.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/5,
                scale:visibleSize.height/1080,
                anchorY:1,
            });
            layer.addChild(loading1,10);

            var loadingBar = new ccui.LoadingBar();
            loadingBar.setName("LoadingBar");
            loadingBar.setScale9Enabled(true);
            loadingBar.loadTexture("#jindutiao2.png");
            loadingBar.setCapInsets(cc.rect(0, 0, 0, 0));
            loadingBar.setContentSize(cc.size(300, 30));
            loadingBar.setPercent(0);
            loadingBar.x = visibleSize.width / 2;
            loadingBar.y = visibleOrigin.y+visibleSize.height/5;
            layer.addChild(loadingBar);

        });

        return true;
    },


});

var loadingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new loadingLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }

});

