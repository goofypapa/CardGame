var designationLayer=cc.Layer.extend({
    ctor:function(){
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        console.log( "------->" + JSON.stringify( visibleSize ) );
        console.log( "------->" + JSON.stringify( visibleOrigin ) );

        // 背景图
        var sprite = new cc.Sprite( res.indexBj );
        var spriteSize = sprite.getContentSize();
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
            scale:(visibleSize.width / spriteSize.width),
        });

        layer.addChild( sprite );

        // 标题
        var titleLable=new cc.LabelTTF("游戏等级及称号","Arial","30");
        var titleLableSize=titleLable.getContentSize();
        console.log( "------->" + JSON.stringify( titleLableSize.width ) );
        titleLable.attr({
            x:visibleOrigin.x +20+visibleSize.width/2/2,
            y:visibleOrigin.y +visibleSize.height/ 4*3.7,
            anchorX:0.5,
            anchorY:1
        });

        layer.addChild(titleLable,1);


        // 游戏方法图片
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(visibleSize.width/2, visibleOrigin.y+visibleSize.height/7*4));
        scrollView.attr({
            x:visibleOrigin.x+20,
            y:visibleOrigin.y+visibleSize.height/7,
            anchorX:0,
            anchorY:0,
        });
        var imageView = new ccui.ImageView("res/designation.jpg");

        var innerWidth = scrollView.width;
        var innerHeight = imageView.height;

        scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));
        imageView.x = innerWidth / 2;
        imageView.y = imageView.height / 2;
        scrollView.addChild(imageView);
        layer.addChild(scrollView,20);
        // 返回
        var goback=new cc.MenuItemFont("返 回",this.menuItemgobackGameCallback,this);
        goback.attr({
            x:40+titleLableSize.width/2,
            y:visibleOrigin.y+visibleSize.height/7,
            anchorX:0.5,
            anchorY:1
        });
        var backmn=new cc.Menu(goback);
        backmn.alignItemsVertically();
        backmn.attr({
            x:visibleOrigin.x+visibleSize.width-100,
            y:visibleOrigin.y+visibleSize.height/7,
            anchorX:1,
            anchorY:0.5
        });
        layer.addChild(backmn,20);
        return true;
    },
    menuItemgobackGameCallback:function(){
        cc.director.runScene( new gameShowsScene( ) );
    }
});

var designationScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer=new designationLayer();
        this.addChild(layer);
    }
})