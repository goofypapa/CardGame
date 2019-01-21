var methodLayer=cc.Layer.extend({
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
        var spriteSize=sprite.getContentSize();
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
            scale:(visibleSize.width / spriteSize.width),
        });

        layer.addChild( sprite );

        //创建精灵帧缓存
        var frameCache=cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.method_plist,res.method_png);

        // 标题
        var title=new cc.Sprite("#youxifangfa.png");
        var titleLableSize=title.getContentSize();
        title.attr({
            x:visibleOrigin.x+91,
            y:visibleOrigin.y+visibleSize.height-24,
            anchorX:0,
            anchorY:1,
        });
        layer.addChild(title,10);

        // 游戏方法文字背景
        var methodLeft=new cc.Sprite("#method-left.png");
        var methodLeftSize=methodLeft.getContentSize();
        methodLeft.attr({
            x:visibleOrigin.x+155,
            y:visibleOrigin.y+visibleSize.height/2*0.8,
            anchorX:0,
            anchorY:0.5,
        });
        layer.addChild(methodLeft,10);
        // 游戏方法文字内容
        var text = new ccui.Text("两人轮流翻牌，根据翻出的卡牌计分。每翻完一张卡牌，即时结算。翻完所有卡牌后，分数最多者获胜。 各卡牌的效果如右图。", "AmericanTypewriter", 45);
        text.ignoreContentAdaptWithSize(false);
        text.setContentSize(cc.size(methodLeftSize.width/1.2,methodLeftSize.height/1.2));
        text.setTextHorizontalAlignment(cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP);
        text.setTouchScaleChangeEnabled(true);
        text.setTouchEnabled(true);
        text.attr({
            x:visibleOrigin.x+210,
            y:visibleOrigin.y+visibleSize.height/2*0.75,
            anchorX:0,
            anchorY:0.5,

        });
         layer.addChild(text);

         // 游戏方法右侧背景
        var methodRight=new cc.Sprite("#method-right.png");
        var methodRightSize=methodRight.getContentSize();
        methodRight.attr({
            x:visibleOrigin.x+155+methodLeftSize.width,
            y:visibleOrigin.y+visibleSize.height/2*0.8,
            anchorX:0,
            anchorY:0.5,
        });
        layer.addChild(methodRight,10);

        // 游戏方法图片
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(methodRightSize.width/0.85,methodRightSize.height/1.2));
        scrollView.attr({
            x:visibleOrigin.x+visibleSize.width-20,
            y:visibleOrigin.y+visibleSize.height/2*0.8,
            anchorX:1,
            anchorY:0.5,
        });
        var imageView = new ccui.ImageView("res/method-explain.png");

        var innerWidth = scrollView.width;
        var innerHeight = imageView.height;

        scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        // scrollView.setInnerContainerSize(methodRightSize);
        imageView.x = innerWidth / 2;
        imageView.y = imageView.height / 2;
        imageView.anchorX=0.55;
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
            x:visibleOrigin.x+visibleSize.width-159,
            y:visibleOrigin.y+visibleSize.height-102,
        });

        var mu=new cc.Menu(goback);
        mu.x=0;
        mu.y=0;
        layer.addChild(mu,100);
        return true;
    },
    menuItemgobackGameCallback:function(){
        cc.director.runScene( new gameShowsScene( ) );
    }
});

var methodScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer=new methodLayer();
        this.addChild(layer);
    }
})