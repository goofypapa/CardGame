var gameSceneLayer = cc.Layer.extend({
    

    global:{
        userId: "",
        pairingLayer: null,
        gameClient: null,
        connectServerNum: 0,
        pairingLabdel: null,
        pleaseSelect: false,
        self: {
            headSprite: null,
            nameLabel: null,
            titleLabel: null,
            levelLabel: null,
            scoreLabel: null,
            timeLabel: null,
        },
    
        opponent: {
            headSprite: null,
            nameLabel: null,
            titleLabel: null,
            levelLabel: null,
            scoreLabel: null,
            timeLabel: null,
        },
        cardList:[

        ]
    },


    ctor:function(){

        this._super();
        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        var sceneCenter = {
            x: visibleOrigin.x + visibleSize.width * 0.5, 
            y: visibleOrigin.y + visibleSize.height * 0.5 
        };


        var localStorageUserId = localStorage.getItem( "userId" );
        if( typeof( localStorageUserId ) == "string" )
        {
            this.global.userId = localStorageUserId;
        }else{
            cc.director.runScene( new loginScene() );
            return;
        }

        var layer = this;
        cc.loader.load(["res/GameResource.plist","res/GameResource.png", 
        "SkinResource.plist", "SkinResource.png", 
        "CardResource.plist", "CardResource.png"], function(err, results) {

            cc.spriteFrameCache.addSpriteFrames( "res/GameResource.plist" );
            cc.spriteFrameCache.addSpriteFrames( "res/SkinResource.plist" );
            cc.spriteFrameCache.addSpriteFrames( "res/CardResource.plist" );

            //背景
            var bgSprite =new cc.Sprite("#beijing.png");
            var bgSize = bgSprite.getContentSize();

            bgSprite.setScale( visibleSize.width / bgSize.width, visibleSize.height / bgSize.height );
            bgSprite.setPosition( sceneCenter.x, sceneCenter.y );

            layer.addChild( bgSprite );


            //玩家信息
            var selfHeadBorder = new cc.Sprite("#zuobiankuang1.png");
            selfHeadBorder.setScale( adaptation() );

            var selfHeadBorderSize = selfHeadBorder.getBoundingBox();

            selfHeadBorder.setPosition( visibleOrigin.x + visibleSize.width * 0.02 + selfHeadBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.93 - selfHeadBorderSize.height * 0.5 );

            layer.addChild( selfHeadBorder );

            layer.global.self.headSprite = new cc.Sprite( "#mofaxuetu.png" );
            var selfHeadSpriteSize = layer.global.self.headSprite.getContentSize();
            layer.global.self.headSprite.setPosition( selfHeadBorder.getPosition() );

            layer.global.self.headSprite.setScale( Math.min( selfHeadBorderSize.width * 0.9 / selfHeadSpriteSize.width, selfHeadBorderSize.height * 0.9 / selfHeadSpriteSize.height ) );

            layer.addChild( layer.global.self.headSprite );

            var selfNameBorder = new cc.Sprite("#zuobiankuan2.png");
            selfNameBorder.setScale( adaptation() );
            var selfNameBorderSize = selfNameBorder.getBoundingBox();
            var selfNameBorderPosition = {
                x: visibleOrigin.x + visibleSize.width * 0.03 + selfNameBorderSize.width * 0.5,
                y: visibleOrigin.y + visibleSize.height * 0.63 - selfNameBorderSize.height * 0.5
            }
            selfNameBorder.setPosition( selfNameBorderPosition  );

            layer.addChild( selfNameBorder );

            layer.global.self.nameLabel = new cc.LabelTTF( "我方", "", 33 );
            layer.global.self.nameLabel.setPosition( {
                x: selfNameBorderPosition.x,
                y: selfNameBorderPosition.y - 5
            } );
            layer.addChild( layer.global.self.nameLabel );

            var selfTitleBorder = new cc.Sprite("#zuobiankuang3.png");
            selfTitleBorder.setScale( adaptation() );
            var selfTitleBorderSize = selfTitleBorder.getBoundingBox();
            var selfTitleBorderPosition = {
                x: visibleOrigin.x + visibleSize.width * 0.03 + selfTitleBorderSize.width * 0.5,
                y: visibleOrigin.y + visibleSize.height * 0.515 - selfTitleBorderSize.height * 0.5
            };
            selfTitleBorder.setPosition( selfTitleBorderPosition );

            layer.addChild( selfTitleBorder );

            layer.global.self.titleLabel = new cc.LabelTTF( "称号", "", 33 );
            layer.global.self.titleLabel.setPosition( selfTitleBorderPosition.x, selfTitleBorderPosition.y - 5 );
            layer.addChild( layer.global.self.titleLabel );

            var selfLevelBorder = new cc.Sprite("#zuobiankuang4.png");
            selfLevelBorder.setScale( adaptation() );
            var selfLevelBorderSize = selfLevelBorder.getBoundingBox();
            var selfLevelBorderPosition = {
                x: visibleOrigin.x + visibleSize.width * 0.03 + selfLevelBorderSize.width * 0.5,
                y: visibleOrigin.y + visibleSize.height * 0.4 - selfLevelBorderSize.height * 0.5
            };
            selfLevelBorder.setPosition( selfLevelBorderPosition );

            layer.addChild( selfLevelBorder );

            layer.global.self.levelLabel = new cc.LabelTTF( "等级", "", 33 );
            layer.global.self.levelLabel.setPosition( selfLevelBorderPosition.x, selfLevelBorderPosition.y - 5 );
            layer.addChild( layer.global.self.levelLabel );

            var selfScoreBorder = new cc.Sprite( "#zuobiankuang5.png" );
            selfScoreBorder.setScale( adaptation() );
            var selfScoreBorderSize = selfScoreBorder.getBoundingBox();
            var selfScoreBorderPosition =  cc.p( visibleOrigin.x + visibleSize.width * 0.022 + selfScoreBorderSize.width * 0.5, 
                visibleOrigin.y + visibleSize.height * 0.29 - selfScoreBorderSize.height * 0.5 );
            selfScoreBorder.setPosition( selfScoreBorderPosition );

            layer.addChild( selfScoreBorder );

            layer.global.self.scoreLabel = new cc.LabelTTF( "本局积分", "", 50 );
            layer.global.self.scoreLabel.setPosition( selfScoreBorderPosition.x, selfScoreBorderPosition.y -10 );
            layer.addChild( layer.global.self.scoreLabel );
            

            var selfTimeBorder = new cc.Sprite( "#zuobiankuang6.png" );
            selfTimeBorder.setScale( adaptation() );
            var selfTimeBorderSize = selfTimeBorder.getBoundingBox();
            var selfTimeBorderPosition = cc.p( visibleOrigin.x + visibleSize.width * 0.022 + selfTimeBorderSize.width * 0.5,
                visibleOrigin.y + visibleSize.height * 0.12 - selfTimeBorderSize.height * 0.5 );
            selfTimeBorder.setPosition( selfTimeBorderPosition );
            layer.addChild( selfTimeBorder );

            layer.global.self.timeLabel = new cc.LabelTTF( "00:00", "", 33 );
            layer.global.self.timeLabel.setPosition( selfTimeBorderPosition.x, selfTimeBorderPosition.y - 5 );
            layer.addChild( layer.global.self.timeLabel );

            //对手信息
            var opponentHeadBoder = new cc.Sprite("#youbiankuang1.png");
            opponentHeadBoder.setScale( adaptation() );

            var opponentHeadBoderSize = opponentHeadBoder.getBoundingBox();

            opponentHeadBoder.setPosition( visibleOrigin.x + visibleSize.width * 0.98 - opponentHeadBoderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.93 - opponentHeadBoderSize.height * 0.5 );

            layer.addChild( opponentHeadBoder );

            layer.global.opponent.headSprite = new cc.Sprite( "#gaojimofashi.png" );
            var opponentHeadSpriteSize = layer.global.opponent.headSprite .getContentSize();
            layer.global.opponent.headSprite .setPosition( opponentHeadBoder.getPosition() );

            layer.global.opponent.headSprite .setScale( Math.min( opponentHeadBoderSize.width * 0.9 / opponentHeadSpriteSize.width, opponentHeadBoderSize.height * 0.9 / opponentHeadSpriteSize.height ) );

            layer.addChild( layer.global.opponent.headSprite  );

            var opponentNameBorder = new cc.Sprite("#youbiankuang2.png");
            opponentNameBorder.setScale( adaptation() );
            var opponentNameBorderSize = opponentNameBorder.getBoundingBox();
            var opponentNameBorderPosition = {
                x: visibleOrigin.x + visibleSize.width * 0.97 - opponentNameBorderSize.width * 0.5,
                y: visibleOrigin.y + visibleSize.height * 0.63 - opponentNameBorderSize.height * 0.5
            };
            opponentNameBorder.setPosition( opponentNameBorderPosition );

            layer.addChild( opponentNameBorder );

            layer.global.opponent.nameLabel = new cc.LabelTTF( "敌方", "", 33 );
            layer.global.opponent.nameLabel.setPosition( {
                x: opponentNameBorderPosition.x,
                y: opponentNameBorderPosition.y - 5
            } );
            layer.addChild( layer.global.opponent.nameLabel );

            var opponentTitleBorder = new cc.Sprite("#youbiankuang3.png");
            opponentTitleBorder.setScale( adaptation() );
            var opponentTitleBorderSize = opponentTitleBorder.getBoundingBox();
            var opponentTitleBorderPosition = {
                x: visibleOrigin.x + visibleSize.width * 0.97 - opponentTitleBorderSize.width * 0.5,
                y: visibleOrigin.y + visibleSize.height * 0.515 - opponentTitleBorderSize.height * 0.5
            };
            opponentTitleBorder.setPosition( opponentTitleBorderPosition );

            layer.addChild( opponentTitleBorder );

            layer.global.opponent.titleLabel = new cc.LabelTTF( "称号", "", 33 );
            layer.global.opponent.titleLabel.setPosition( opponentTitleBorderPosition.x, opponentTitleBorderPosition.y - 5 );
            layer.addChild( layer.global.opponent.titleLabel );


            var opponentLevelBorder = new cc.Sprite("#youbiankuang4.png");
            opponentLevelBorder.setScale( adaptation() );
            var opponentLevelBorderSize = opponentLevelBorder.getBoundingBox();
            var opponentLevelBorderPosition = cc.p( visibleOrigin.x + visibleSize.width * 0.97 - opponentLevelBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.4 - opponentLevelBorderSize.height * 0.5 );
            opponentLevelBorder.setPosition( opponentLevelBorderPosition );

            layer.addChild( opponentLevelBorder );

            layer.global.opponent.levelLabel = new cc.LabelTTF( "等级", "", 33 );
            layer.global.opponent.levelLabel.setPosition( opponentLevelBorderPosition.x, opponentLevelBorderPosition.y - 5 );
            layer.addChild( layer.global.opponent.levelLabel );

            var opponentScoreBorder = new cc.Sprite( "#youbiankuang5.png" );
            opponentScoreBorder.setScale( adaptation() );
            var opponentScoreBorderSize = opponentScoreBorder.getBoundingBox();
            var opponentScoreBorderPosition = cc.p( visibleOrigin.x + visibleSize.width * 0.978 - opponentScoreBorderSize.width * 0.5, visibleOrigin.y + visibleSize.height * 0.29 - opponentScoreBorderSize.height * 0.5 );
            opponentScoreBorder.setPosition( opponentScoreBorderPosition );

            layer.addChild( opponentScoreBorder );

            layer.global.opponent.scoreLabel = new cc.LabelTTF( "本局积分", "", 50 );
            layer.global.opponent.scoreLabel.setPosition( opponentScoreBorderPosition.x, opponentScoreBorderPosition.y -10 );
            layer.addChild( layer.global.opponent.scoreLabel );

            var opponentTimeBorder = new cc.Sprite( "#youbiankaung6.png" );
            opponentTimeBorder.setScale( adaptation() );
            var opponentTimeBorderSize = opponentTimeBorder.getBoundingBox();
            var opponentTimeBorderPosition = cc.p( visibleOrigin.x + visibleSize.width * 0.978 - opponentTimeBorderSize.width * 0.5, 
                visibleOrigin.y + visibleSize.height * 0.12 - opponentTimeBorderSize.height * 0.5 );
            opponentTimeBorder.setPosition( opponentTimeBorderPosition );
            layer.addChild( opponentTimeBorder );

            layer.global.opponent.timeLabel = new cc.LabelTTF( "00:00", "", 33 );
            layer.global.opponent.timeLabel.setPosition( opponentTimeBorderPosition.x, opponentTimeBorderPosition.y - 5 );
            layer.addChild( layer.global.opponent.timeLabel );

            //玩家勋章
            var medalBorder = new cc.Sprite("#dingbiankuang.png");
            var medalBorderSize = medalBorder.getContentSize();
            medalBorder.setScale( ( visibleSize.width * 0.94 - selfHeadBorderSize.width - opponentHeadBoderSize.width ) / medalBorderSize.width );
            medalBorderSize = medalBorder.getBoundingBox();
            medalBorder.setPosition( sceneCenter.x, sceneCenter.y + visibleSize.height * 0.45 - medalBorderSize.height * 0.5 );
            layer.addChild( medalBorder );


            var paddingLeft = visibleOrigin.x + visibleSize.width * 0.02 + selfHeadBorderSize.width;
            var paddingTop = visibleSize.height * 0.05 + medalBorderSize.height + 10;

            //
            var btnStart = new cc.MenuItemImage( "#kaishi.png", "#kaishi.png", layer.onBtnStartTouchCallBack, layer );
            btnStart.setTag( 0 );
            btnStart.setScale( adaptation() );
            var btnStartSize = btnStart.getContentSize();

            //
            var btnPause = new cc.MenuItemImage( "#zanting.png", "#zanting.png", layer.onBtnStartTouchCallBack, layer );
            btnPause.setTag( 1 );
            btnPause.setScale( adaptation() );

            //
            var btnGamehistory = new cc.MenuItemImage( "#youxijilu.png", "#youxijilu.png", layer.onBtnStartTouchCallBack, layer );
            btnGamehistory.setTag( 2 );
            btnGamehistory.setScale( adaptation() );

            //
            var btnOption = new cc.MenuItemImage( "#xuanxiang.png", "#xuanxiang.png", layer.onBtnStartTouchCallBack, layer );
            btnOption.setTag( 3 );
            btnOption.setScale( adaptation() );
            
            var menu = new cc.Menu( btnStart, btnPause, btnGamehistory, btnOption );
            menu.alignItemsHorizontally();
            menu.setPosition( sceneCenter.x, visibleOrigin.y + btnStartSize.height * 0.5 + 10 );
            layer.addChild(menu);

            var paddingBottom = btnStartSize.height + 10;

            var cardTableSize = {
                width: visibleSize.width - paddingLeft * 2,
                height: visibleSize.height - paddingTop - paddingBottom
            };

            var columns = 4;
            var rows = Math.ceil( 12 / columns );

            var cardItemSize = {
                width: cardTableSize.width / columns,
                height: cardTableSize.height / rows
            };

            var cardScaleX = 0;
            var cardScaleY = 0;
            for( var i = 0; i < 12; ++i )
            {
                var row = Math.floor( i / columns ) + 0.5;
                var column = i % columns + 0.5;
                var card = new cc.Sprite( "#kapaibeimian.png" );
                card.setPosition( 
                    visibleOrigin.x + paddingLeft + cardItemSize.width * column , 
                    visibleOrigin.y + visibleSize.height - paddingTop - cardItemSize.height * row );

                if( cardScaleX == 0 || cardScaleY == 0 ){
                    var cardSize = card.getContentSize();
                    cardScaleX =  ( cardItemSize.width - 5 ) / cardSize.width;
                    cardScaleY =  ( cardItemSize.height - 5) / cardSize.height;
                }
                card.setScaleX( cardScaleX );
                card.setScaleY( cardScaleY );
                layer.addChild( card );

                layer.global.cardList.push( card );
            }

            cc.eventManager.addListener( cc.EventListener.create({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches:true,
                onTouchBegan: function(touch,event){

                    for( var i = 0; i < layer.global.cardList.length; ++i )
                    {
                        var cardSize = layer.global.cardList[i].getBoundingBox();
                        var locationInNode = layer.global.cardList[i].convertToNodeSpace(touch.getLocation() );
                        
                        if ( !cc.rectContainsPoint(cc.rect( 0, 0, cardSize.width, cardSize.height ), locationInNode)) {
                            continue;
                        }

                        layer.selectCard( i );
                    }

                },
                onTouchMoved: function(touch,event){
                    console.log( "--------> onTouchMoved" );
                },
                onTouchEnded: function(touch,event){
                    console.log( "--------> onTouchEnded" );
                }
            }),layer);


            layer.global.pairingLayer = new cc.Layer();

            layer.addChild( layer.global.pairingLayer );

            var mask = new cc.DrawNode();

            layer.global.pairingLayer.addChild( mask );

            mask.drawRect( cc.p( 0, 0 ), cc.p( visibleSize.width, visibleSize.height ), cc.color( 0, 0, 0, 180 ), 2, null );

            layer.global.pairingLabdel = new cc.LabelTTF( "正在匹配对手", "", 50 );
            layer.global.pairingLayer.addChild( layer.global.pairingLabdel );
            layer.global.pairingLabdel.setAnchorPoint(0,1);
            var pairingLabdelSize = layer.global.pairingLabdel.getContentSize();
            layer.global.pairingLabdel.setPosition( sceneCenter.x - pairingLabdelSize.width * 0.5, sceneCenter.y );
            layer.global.pairingLayer.visible = false;

            layer.connectServer()

            //获取个人信息
            jsonp( DATA_SERVER_HOST + "gameUser/getUser.do?userId=" + layer.global.userId, function( res ){
                console.log( "userInfo:", res );
                if( !res.success ){
                    console.log( "error:", res.msg );
                    return;
                }
    
                var userInfo = res.data[0];
    
                if( !userInfo ){
                    return;
                }
    
    
                var globalSelf = layer.global.self;
                var selfLevelInfo = getLevel( userInfo.gameUserPoints == null ? 0 : userInfo.gameUserPoints );
    
                globalSelf.headSprite.setSpriteFrame( selfLevelInfo[3] + ".png" );
    
                globalSelf.nameLabel.setString( userInfo.gameUserName );
                globalSelf.titleLabel.setString( selfLevelInfo[2] );
                globalSelf.levelLabel.setString( "L" + selfLevelInfo[1] );
                globalSelf.scoreLabel.setString( "0" );
            } );
        });
    },

    connectServer: function(){
        var layer = this;
        layer.global.gameClient = new GameClient();

        layer.global.gameClient.clientListener = function( e ){

            console.log( "--------> ", e.state );

            switch( e.state )
            {
                case "connected":
                    layer.onConnected();
                    layer.global.connectServerNum = 0;
                break;
                case "closed":
                    layer.global.gameClient = null;
                    if( layer.global.connectServerNum++ < 3 )
                    {
                        layer.connectServer();
                    }
                break;
                case "onmessage":
                    layer.onMessage( e );
                break;
            }
        }
    },
    pair: function(){
        var layer = this;

        if( layer.global.gameClient == null )
        {
            console.log( "not connect server" );
            return;
        }

        layer.global.gameClient.pair( layer.global.userId );

        var pairNum = 0;
        layer.global.pairingLabdel.runAction( cc.repeatForever( cc.sequence( cc.callFunc( function(){

            var str = "正在匹配对手";
            ++pairNum;
            for( var i = 0; i < pairNum % 4; ++i )
            {
                str += ".";
            }
            layer.global.pairingLabdel.setString( str );
        }, this ), cc.delayTime( 0.5 ) ) ) );

        layer.global.pairingLayer.setOpacity( 0 );
        layer.global.pairingLayer.visible = true;
        var opacity = 0;

        layer.global.pairingLayer.runAction( cc.repeat( cc.sequence( cc.callFunc( function(){
            layer.global.pairingLayer.setOpacity( ++opacity );
        } ), cc.delayTime( 2 / 255 ) ), 255 ) );
    },

    selectCard: function( index ){
        var layer = this;

        var global = layer.global;
        if( !global.pleaseSelect )
        {
            return;
        }

        if( layer.global.gameClient == null )
        {
            console.log( "not connect server" );
            return;
        }

        layer.global.gameClient.selectCard( index );
    },
    onBtnStartTouchCallBack: function( sender ){
        var tag = sender.getTag();

        switch( tag )
        {
            case 0:
                this.pair();
            break;
        }
    },
    onConnected: function(){

        // var layer = this;
    },
    onMessage: function( e ){

        var layer = this;
        console.log( "onMessage: ", e );
        var res = JSON.parse( e.data );

        switch( res.cmd )
        {
            case "Paired":
                layer.onPaired( res );
            break;
            case "PleaseSelectCard":
                layer.onPleaseSelectCard(res);
            break;
            case "SelectedCard":
                layer.onSelectedCard(res);
            break;
        }
    },
    onPaired: function( e ){
        var layer = this;

        var global = layer.global;
        var globalSelf = global.self;
        var globalOpponent = global.opponent;

        global.pairingLabdel.stopAllActions();
        global.pairingLayer.visible = false;

        var opacity = 255;
        global.pairingLayer.runAction( cc.repeat( cc.sequence( cc.callFunc( function(){
            global.pairingLayer.setOpacity( opacity-- );
        } ), cc.delayTime( 0.2 / 255 ) ), 253 ) );


        var selfLevelInfo = getLevel( e.player.self.userScore );
        var opponentLevelInfo = getLevel( e.player.opponent.userScore );

        globalSelf.headSprite.setSpriteFrame( selfLevelInfo[3] + ".png" );

        globalSelf.nameLabel.setString( e.player.self.userName );
        globalSelf.titleLabel.setString( selfLevelInfo[2] );
        globalSelf.levelLabel.setString( "L" + selfLevelInfo[1] );
        globalSelf.scoreLabel.setString( e.player.self.userCurrScore );
        
        globalOpponent.headSprite.setSpriteFrame( opponentLevelInfo[3] + ".png" );

        globalOpponent.nameLabel.setString( e.player.opponent.userName );
        globalOpponent.titleLabel.setString( opponentLevelInfo[2] );
        globalOpponent.levelLabel.setString( "L" + opponentLevelInfo[1] );
        globalOpponent.scoreLabel.setString( e.player.opponent.userCurrScore );

    },
    onPleaseSelectCard: function(e){
        var layer = this;
        var global = layer.global;
        global.pleaseSelect = true;
        var time = 20;


        var selfTimeLabel = global.self.timeLabel;
        var opponentTimeLabel = global.opponent.timeLabel;
        selfTimeLabel.stopAllActions();
        opponentTimeLabel.stopAllActions();

        if( e.player == "Self" ){
            selfTimeLabel.runAction( cc.sequence( cc.repeat( cc.sequence( cc.callFunc( function(){
                time--;
                var min = Math.floor( time / 60 );
                selfTimeLabel.setString( zeroFill( min, 2 ) + ":" + zeroFill( time % 60, 2 ) );
            } ), cc.delayTime(1) ), time ), cc.callFunc( function(){
                global.pleaseSelect = false;
            } ) ) );
            opponentTimeLabel.setString( "00:00" );
        }else{
            opponentTimeLabel.runAction( cc.sequence( cc.repeat( cc.sequence( cc.callFunc( function(){
                time--;
                var min = Math.floor( time / 60 );
                opponentTimeLabel.setString( zeroFill( min, 2 ) + ":" + zeroFill( time % 60, 2 ) );
            } ), cc.delayTime(1) ), time ), cc.callFunc( function(){
                global.pleaseSelect = false;
            } ) ) );
            selfTimeLabel.setString( "00:00" );
        }
        
    },
    onSelectedCard: function(e){
        console.log( "----> onSelectedCard", e );

        var layer = this;

        layer.global.cardList[ e.cardIndex ].setSpriteFrame( e.card + ".png" );

        layer.global.self.scoreLabel.setString( e.self.userScore );
        layer.global.opponent.scoreLabel.setString( e.opponent.userScore );

    }
});

var gameScene = cc.Scene.extend({
    onEnter: function(){
        this._super();
        var layer = new gameSceneLayer();
        this.addChild( layer );
    },
    onExit:function(){
        this._super();

        cc.spriteFrameCache.removeSpriteFrames();
    }
});