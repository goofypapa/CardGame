var LoadingLayer = cc.LayerColor.extend({//继承LayerColor，初始化的时候可以直接改背景颜色
    a:0,//记录当前加载了多少个文件
    loadingBar:null,

    ctor : function() {
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);
        console.log(layer.getPosition().x, layer.getPosition().y)
        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        cc.loader.load([res.loading_plist,res.loading_png,"res/loading2.png"], function(err, results) {
            cc.spriteFrameCache.addSpriteFrames(res.loading_plist);
            // 背景图

            var sprite = new cc.Sprite( "#shouye.png" );
            sprite.attr({
                x:visibleOrigin.x + visibleSize.width /2,
                y:visibleOrigin.y + visibleSize.height/ 2,
            });

            layer.addChild( sprite );


            // 标题
            var title=new cc.Sprite("#loadingTit.png");
            title.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleOrigin.y+visibleSize.height/3*2,
                scale:visibleSize.height/1080,
                anchorY:1,
            });
            layer.addChild(title,10);

            var text = new ccui.Text("北京笨爸爸科技有限公司出品","Arial", 38);
            text.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/6,
                scale:visibleSize.height/1080,
                anchorX:0.5,
                anchorY:0.5
            });
            layer.addChild(text,20);

            var spriteImg=new cc.Sprite("#loading1.png");
            spriteImg.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/3,
                scale:visibleSize.height/1080,
                anchorX:0.5,
                anchorY:0.5
            });
            layer.addChild(spriteImg,30);

            var loadingBar = new ccui.LoadingBar();
            loadingBar.setName("LoadingBar");
            loadingBar.setScale9Enabled(true);
            loadingBar.loadTexture("res/loading2.png");
            loadingBar.setCapInsets(cc.rect(0, 0, 0, 0));
            loadingBar.setContentSize(cc.size(1135, 14));
            loadingBar.setPercent(0);
            loadingBar.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/3,
                scale:visibleSize.height/1080,
                anchorX:0.5,
                anchorY:0.5
            });
            var count=0;
            loadingBar.schedule(function(){
                count++;
                if (count > 100) {
                    count = 0;
                }
                loadingBar.setPercent(count);
            },0.1);
            layer.addChild(loadingBar,500);
            cc.loader.load(g_resources,function(err, results) {
                cc.director.runScene( new HelloWorldScene() );
            });
        });
    },
});


var LoadingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //加载app.js的layer
        var layer = new LoadingLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();

        cc.spriteFrameCache.removeSpriteFrames();
    }
});