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

var HelloWorldLayer = cc.Layer.extend({
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
        cc.loader.load(["res/kapai.plist","res/kapai.png"], function(err, results) {
            cc.spriteFrameCache.addSpriteFrames("res/kapai.plist");
            // 标题
            var title=new cc.Sprite("#biaoti.png");
            title.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height,
                scale:visibleSize.height/1080,
                anchorY:1,
            });
            layer.addChild(title,10);
            // 开 始 游 戏
            var startMenuItem=new cc.MenuItemImage(
                "#start.png",
                "#start.png",
                function(){
                    var userId = localStorage.getItem( "userId" );
                    if( typeof( userId ) == "string" && userId.length )
                    {
                        cc.director.runScene( new gameScene() );
                    }else{
                        cc.director.runScene( new registerScene( ) );
                    }
                },this
            );
            var startMenuItemSize=startMenuItem.getContentSize();
            startMenuItem.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/7+startMenuItemSize.height*3-60,
                scale:visibleSize.height/1080,
            });

            // 游戏说明
            var explainMenuItem=new cc.MenuItemImage(
                "#explain.png",
                "#explain.png",
                function(){
                    cc.director.runScene( new gameShowsScene( ) );
                },this
            );
            explainMenuItem.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/7+startMenuItemSize.height*2-40,
                scale:visibleSize.height/1080,
            });

            // 排行榜
            var rankMenuItem=new cc.MenuItemImage(
                "#medalBtn.png",
                "#medalBtn.png",
                function(){
                    cc.director.runScene( new topScene( ) );
                },this
            );
            rankMenuItem.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/7+startMenuItemSize.height-20,
                scale:visibleSize.height/1080,
            });

            // 退出游戏
            var exitMenuItem=new cc.MenuItemImage(
                "#tuichuyouxi.png",
                "#tuichuyouxi.png",
                function(){
                    cc.game.end();
                    // cc.director.runScene( new shareScene() );
                },this
            );
            exitMenuItem.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/7,
                scale:visibleSize.height/1080,
            });
            var mu=new cc.Menu(startMenuItem,explainMenuItem,rankMenuItem,exitMenuItem);
            mu.x=0;
            mu.y=0;
            layer.addChild(mu,100);

        })

        return true;
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new HelloWorldLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }

});

