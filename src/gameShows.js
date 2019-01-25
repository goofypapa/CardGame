var GameShowsLayer=cc.Layer.extend({
    ctor:function(){
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        console.log( "------->" + JSON.stringify( visibleSize ) );
        console.log( "------->" + JSON.stringify( visibleOrigin ) );

        // 背景图
        var sprite = new cc.Sprite( res.trialBj );
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
            // scale:(visibleSize.width / spriteSize.width),
        });

        layer.addChild( sprite );

        //创建精灵帧缓存
        var frameCache=cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.kapai_plist,res.kapai_png);

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

        // 游戏方法
        var methodMenuItem=new cc.MenuItemImage(
            "#method.png",
            "#method.png",
            this.menuItemmethodGameCallback,this
        );
        var methodMenuItemSize=methodMenuItem.getContentSize();
        methodMenuItem.attr({
            x:visibleSize.width/2,
            y:visibleOrigin.y+visibleSize.height/2+methodMenuItemSize.height,
            scale:visibleSize.height/1080,
            anchorY:1
        });

        // 游戏等级及称号
        var gradeMenuItem=new cc.MenuItemImage(
            "#grade.png",
            "#grade.png",
            this.menuItemdesignationGameCallback,this
        );
       gradeMenuItem.attr({
            x:visibleSize.width/2,
            y:visibleOrigin.y+visibleSize.height/2,
           scale:visibleSize.height/1080,
            anchorY:1
        });

        // 游戏勋章
        var medalMenuItem=new cc.MenuItemImage(
            "#medal.png",
            "#medal.png",
            this.menuItemmedalGameCallback,this
        );
        medalMenuItem.attr({
            x:visibleSize.width/2,
            y:visibleOrigin.y+visibleSize.height/2-methodMenuItemSize.height,
            scale:visibleSize.height/1080,
            anchorY:1
        });


        var mu=new cc.Menu(methodMenuItem,gradeMenuItem,medalMenuItem);
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
        return true;
    },
    menuItemmethodGameCallback:function(){
        cc.director.runScene( new methodScene( ) );
    },
    menuItemgobackGameCallback:function(){
        cc.director.runScene( new HelloWorldScene( ) );
    },
    menuItemdesignationGameCallback:function(){
        cc.director.runScene( new gradeScene( ) );
    },
    menuItemmedalGameCallback:function(){
        cc.director.runScene( new medalScene( ) );
    }

});

var gameShowsScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
            var layer=new GameShowsLayer();
        this.addChild(layer);
    }
})