
var gameSceneLayer = cc.Layer.extend({
    ctor:function(){

        this._super();
        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        var sceneCenter = {
            x: visibleOrigin.x + visibleSize.width * 0.5, 
            y: visibleOrigin.y + visibleSize.height * 0.5 
        };


        var layer = this;
        cc.loader.load(["res/GameResource.plist","res/GameResource.png"], function(err, results) {

            cc.spriteFrameCache.addSpriteFrames( "res/GameResource.plist" );

            //背景
            var bgSprite =new cc.Sprite("#beijing.png");
            var bgSize = bgSprite.getContentSize();

            console.log(  bgSize.width,  bgSize.height )

            bgSprite.setScale( visibleSize.width / bgSize.width, visibleSize.height / bgSize.height );
            bgSprite.setPosition( sceneCenter.x, sceneCenter.y );

            layer.addChild( bgSprite );


            //玩家信息
            var selfHeadBorder = new cc.Sprite("#zuobiankuang1.png");
            selfHeadBorder.setScale( adaptation() );

            var selfHeadBorderSize = selfHeadBorder.getBoundingBox();

            selfHeadBorder.setPosition( visibleOrigin.x + visibleSize.width * 0.02 + selfHeadBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.93 - selfHeadBorderSize.height * 0.5 );

            layer.addChild( selfHeadBorder );

            var selfNameBorder = new cc.Sprite("#zuobiankuan2.png");
            selfNameBorder.setScale( adaptation() );
            var selfNameBorderSize = selfNameBorder.getBoundingBox();

            selfNameBorder.setPosition( visibleOrigin.x + visibleSize.width * 0.03 + selfNameBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.63 - selfNameBorderSize.height * 0.5 );

            layer.addChild( selfNameBorder );

            var selfTitleBorder = new cc.Sprite("#zuobiankuang3.png");
            selfTitleBorder.setScale( adaptation() );
            var selfTitleBorderSize = selfTitleBorder.getBoundingBox();

            selfTitleBorder.setPosition( visibleOrigin.x + visibleSize.width * 0.03 + selfTitleBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.515 - selfTitleBorderSize.height * 0.5 );

            layer.addChild( selfTitleBorder );


            var selfLevelBorder = new cc.Sprite("#zuobiankuang4.png");
            selfLevelBorder.setScale( adaptation() );
            var selfLevelBorderSize = selfLevelBorder.getBoundingBox();

            selfLevelBorder.setPosition( visibleOrigin.x + visibleSize.width * 0.03 + selfLevelBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.4 - selfLevelBorderSize.height * 0.5 );

            layer.addChild( selfLevelBorder );

            var selfScoreBorder = new cc.Sprite( "#zuobiankuang5.png" );
            selfScoreBorder.setScale( adaptation() );
            var selfScoreBorderSize = selfScoreBorder.getBoundingBox();

            selfScoreBorder.setPosition( visibleOrigin.x + visibleSize.width * 0.022 + selfScoreBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.28 - selfScoreBorderSize.height * 0.5 );

            layer.addChild( selfScoreBorder );



            //对手信息
            var opponentHeadBoder = new cc.Sprite("#youbiankuang1.png");
            opponentHeadBoder.setScale( adaptation() );

            var opponentHeadBoderSize = opponentHeadBoder.getBoundingBox();

            opponentHeadBoder.setPosition( visibleOrigin.x + visibleSize.width * 0.98 - opponentHeadBoderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.93 - opponentHeadBoderSize.height * 0.5 );

            layer.addChild( opponentHeadBoder );


            //玩家勋章
            var medalBorder = new cc.Sprite("#dingbiankuang.png");
            var medalBorderSize = medalBorder.getContentSize();
            medalBorder.setScale( ( visibleSize.width * 0.94 - selfHeadBorderSize.width - opponentHeadBoderSize.width ) / medalBorderSize.width );
            medalBorderSize = medalBorder.getBoundingBox();
            medalBorder.setPosition( sceneCenter.x, sceneCenter.y + visibleSize.height * 0.45 - medalBorderSize.height * 0.5 );
            layer.addChild( medalBorder );
            
        });
        return true;
    }
});

var gameScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new gameSceneLayer();
        console.log(layer);
        this.addChild( layer );
    },
    onExit:function(){
        this._super();

        cc.spriteFrameCache.removeSpriteFrames();
    }
});