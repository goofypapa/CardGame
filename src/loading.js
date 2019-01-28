var loadindLayer = cc.LayerColor.extend({//继承LayerColor，初始化的时候可以直接改背景颜色
    a:0,//记录当前加载了多少个文件
    ctor : function() {
        this._super();
        // this._super(cc.color(100, 0, 0, 255));

        var layer = new cc.Layer();
        this.addChild(layer);
        console.log(layer.getPosition().x, layer.getPosition().y)
        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        // 背景图
        var sprite = new cc.Sprite( res.indexBj );
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
        });

        this.addChild( sprite );

        // 标题
        var title=new cc.Sprite("res/loadingTit.png");
        title.attr({
            x:visibleSize.width/2,
            y:visibleOrigin.y+visibleSize.height/3*2,
            scale:visibleSize.height/1080,
            anchorY:1,
        });
        this.addChild(title,10);


        var text = new ccui.Text("北京笨爸爸科技有限公司出品","Arial", 38);
        text.attr({
            x:visibleSize.width/2,
            y:visibleSize.height/3,
        });
        this.addChild(text);
        var size = cc.winSize;
        var spriteImg=new cc.Sprite("res/loadingGif.gif");
        spriteImg.attr({
            x:size.width*0.5,
            y:size.height*0.2,
            scale:visibleSize.height/1080
        });
        this.addChild(spriteImg,20);

        // var loadingBar = new ccui.LoadingBar();
        // loadingBar.setName("LoadingBar");
        // // loadingBar.loadTexture("res/loading1.png");
        // loadingBar.setCapInsets(cc.rect(0, 0, 0, 0));
        // loadingBar.setContentSize(cc.size(300, 30));
        // loadingBar.setPercent(0);
        // loadingBar.x = visibleSize.width / 2;
        // loadingBar.y = visibleOrigin.y+visibleSize.height/5*4;
        // this.addChild(loadingBar,20);


        //添加一个文本框显示
        var l = new cc.LabelTTF("Loading : 0%", "Arial", 38);
        //居中
        l.x = size.width * 0.5;
        l.y = size.height * 0.2;
        // this.addChild(l, 11, 12);
        //加载文件的几种方式，特别是在cc.loader里面，还有好多种加载的函数，记得把加载的资源路径和文件名改掉
        ccs.armatureDataManager.addArmatureFileInfoAsync("res/shouye.png",this.loadCall,this);
        cc.textureCache.addImage("res/shouye.png",this.loadCall,this);
        cc.loader.load("res/shouye.png", this.loadCall,this);
    },

    loadCall : function() {
        //每次调用进行计数
        this.a ++;
        //以tag的形式获取文本框对象
        var subTile = this.getChildByTag(12);
        //toFixed(2)意思是取小数点后两位，小数点后第三位为四舍五入
        // subTile.setString("Loading :" + (this.a / 3).toFixed(2) *100 + "%");
        //加载完毕，貌似好多教程都是用百分比判断( >= 1 )
        if (this.a == 3) {
            //带翻页动画的场景跳转，第一个参数为动画的执行时间，第二个为跳到的场景，第三个为false时从右下角往左边翻页，true时左边往右边翻页
            // var trans = new cc.TransitionPageTurn(0.5, new HelloScene(), false);
            var trans = new HelloScene();
            cc.director.runScene(trans);
        }
    },
});

var HelloScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        //加载app.js的layer
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});