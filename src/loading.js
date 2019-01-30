var LoadingLayer = cc.LayerColor.extend({//继承LayerColor，初始化的时候可以直接改背景颜色
    a:0,//记录当前加载了多少个文件
    ctor : function() {
        this._super();
        // this._super(cc.color(100, 0, 0, 255));

        var layer = new cc.Layer();
        this.addChild(layer);
        console.log(layer.getPosition().x, layer.getPosition().y)
        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        cc.loader.load([res.loading_plist,res.loading_png], function(err, results) {
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

            var spriteImg=new cc.Sprite("#loadingGif.gif");
            spriteImg.attr({
                x:visibleOrigin.x+visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/3,
                scale:visibleSize.height/1080,
                anchorX:0.5,
                anchorY:0.5
            });
            layer.addChild(spriteImg,30);
            cc.loader.load(g_resources,function(err, results) {
                cc.director.runScene( new HelloWorldScene() );
            });
        });
        // var size = cc.winSize;
        // //添加一个文本框显示
        // var l = new cc.LabelTTF("Loading : 0%", "Arial", 38);
        // //居中
        // l.x = size.width * 0.5;
        // l.y = size.height * 0.2;
        // this.addChild(l, 11, 12);
    }
    
    // ,

    // loadCall : function() {
    //     //每次调用进行计数
    //     this.a ++;
    //     //以tag的形式获取文本框对象
    //     var subTile = this.getChildByTag(12);
    //     //toFixed(2)意思是取小数点后两位，小数点后第三位为四舍五入
    //     // subTile.setString("Loading :" + (this.a / 3).toFixed(2) *100 + "%");
    //     //加载完毕，貌似好多教程都是用百分比判断( >= 1 )
    //     if (this.a == 3) {
    //         var trans = new HelloScene();
    //         cc.director.runScene(trans);
    //     }
    // },
});

var LoadingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //加载app.js的layer
        var layer = new LoadingLayer();
        this.addChild(layer);
    }
});