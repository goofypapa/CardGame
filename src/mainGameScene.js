var mainGameLayer=cc.Layer.extend({
    ls:null,
    ws:null,

    startGame:function () {
        var playId = guid();
        var playName = "haha" + playId;
        var playScore = Math.floor( Math.random() * 1000 );
        ws.send( JSON.stringify({
            cmd: "Pair",
            id: playId,
            name: playName,
            score: playScore
        }) );

        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        // Generate a pseudo-GUID by concatenating random hexadecimal.
        function guid() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
    },


    ctor:function(){
        //获取玩家信息
        var that = this;
        function connectServer(){
            ws = new WebSocket("ws://192.168.5.100:8010");
        }

        connectServer();

        ws.onopen = function(e){
            console.log("connect success");
        };

        ws.onclose = function(){
            console.log("close");
            ws = null;
            connectServer();
        };

        ws.onerror = function(){
            console.log("error");
        };

        ws.onmessage = function(e){
            console.log("recv:" + e.data + " by:" + e.origin);
        };



        // 存储玩家信息方法
        function playInfo(name){
            ls=cc.sys.localStorage;
            var info=nickText.getString();
            console.log(info);
            ls.setItem(""+name+"",info);
        };
        this._super();
        // 整个背景层
        var layer = new cc.Layer();
        this.addChild(layer);

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();

        //创建背景层添加背景图
        var bgSprite = new cc.Sprite("res/beijing.png");
        var bgSize = bgSprite.getContentSize();
        console.log("------->" + JSON.stringify( bgSize ) )
        bgSprite.setScale(visibleSize.width / bgSize.width,  visibleSize.height / bgSize.height );
        bgSprite.setPosition( visibleOrigin.x + visibleSize.width / 2, visibleOrigin.y + visibleSize.height / 2 );

        layer.addChild(bgSprite);

        console.log( "------->" + JSON.stringify( visibleSize.width/bgSize.width) );
        console.log( "------->" + JSON.stringify( visibleSize.height ) );
        console.log( "------->" + JSON.stringify( visibleOrigin ) );

        // 左侧玩家展示区
        var leftLayer= new cc.LayerColor(cc.color(127, 251, 235, .1),visibleSize.width/6,visibleSize.height/30*29);
        var leftLayerSize=leftLayer.getContentSize();
        leftLayer.attr({
            x:visibleOrigin.x+visibleSize.height/30*0.85,
            y:visibleOrigin.y+visibleSize.height/30*0.5,
            anchorX:0,
            anchorY:0
        });
        console.log( "------->" + JSON.stringify( leftLayerSize ) );
        // 头像
        var headImg=new cc.Sprite("res/zuobiankuang1.png");
        var headImgSize= headImg.getContentSize();
        console.log( "------->" + JSON.stringify( headImgSize) );
        headImg.attr({
            x:visibleOrigin.x,
            y:leftLayerSize.height*.95,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        // headImg.setScale(visibleSize.height/headImgSize.width*500 ,  visibleSize.height/headImgSize.height*500 );

        leftLayer.addChild(headImg);
        // 昵称
        var nickname=new cc.LayerColor(cc.color(0, 0, 0, .1),visibleSize.width/6-2,50);
        nickname.attr({
            x:visibleOrigin.x+visibleSize.height/30*0.85,
            y:leftLayerSize.height/2*1.1,
            anchorX:0,
            anchorY:0,
        });

        var nicknameSprite =new cc.Sprite("res/zuobiankuang3.png");
        var nicknameSpriteSize=headImg.getContentSize();
        nicknameSprite.attr({
            x:50,
            y:leftLayerSize.height*.08,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        // nicknameSprite.setScale(2000/visibleSize.width,  1000/visibleSize.height );
        nickname.addChild(nicknameSprite);

        // 获取之前的缓存昵称
        // 获取之前的缓存昵称
        ls=cc.sys.localStorage;
        var r=ls.getItem("nickname");
        console.log(r);
        if(r!=null){
            var nickText=new ccui.Text(r,"AmericanTypewriter", 24);
        }else{
            var nickText=new ccui.Text("昵     称","AmericanTypewriter", 24);
        }

        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        })
        nickname.addChild(nickText);

        leftLayer.addChild(nickname,2);



        // 称号
        var name=new cc.LayerColor(cc.color(0, 0, 0, .1),visibleSize.width/6-2,50);
        name.attr({
            x:visibleOrigin.x+visibleSize.height/30*0.85,
            y:visibleSize.height/2.2,
            anchorX:0,
            anchorY:0,
        });
        var nickText=new ccui.Text("魔法学徒","AmericanTypewriter", 24);
        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        })
        name.addChild(nickText);

        var name_Sprite1 =new cc.Sprite("res/zuobiankuang3.png");
        var nicknameSpriteSize1=name_Sprite1.getContentSize();
        name_Sprite1.attr({
            x:50,
            y:leftLayerSize.height*.05,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        name.addChild(name_Sprite1);


        leftLayer.addChild(name,2);


        // 等级
        var grade=new cc.LayerColor(cc.color(0, 0, 0, .1),visibleSize.width/6-2,50);
        grade.attr({
            x:visibleOrigin.x+visibleSize.height/30*0.85,
            y:visibleSize.height/2.7,
            anchorX:0,
            anchorY:0,
        });
        var nickText=new ccui.Text("1级","AmericanTypewriter", 24);
        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        })
        grade.addChild(nickText);

        var grade_Sprite1 =new cc.Sprite("res/zuobiankuang3.png");
        var nicknameSpriteSize1=grade_Sprite1.getContentSize();
        grade_Sprite1.attr({
            x:50,
            y:leftLayerSize.height*.03,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        grade.addChild(grade_Sprite1);

        leftLayer.addChild(grade,2);


        // 得分
        var Leftscore=new cc.LayerColor(cc.color(0, 0, 0, 128),visibleSize.width/6-2,50);
        Leftscore.attr({
            x:visibleOrigin.x+visibleSize.height/30*0.85,
            y:visibleSize.height/4.5,
            anchorX:0,
            anchorY:0,
        });
        var nickText=new ccui.Text("0","AmericanTypewriter", 24);
        // 玩家分数Tag为1
        nickText.setTag(1);
        // 设置玩家的名字为当前分数值
        nickText.setName(0);
        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        })
        Leftscore.addChild(nickText);

        var Leftscore_Sprite =new cc.Sprite("res/zuobiankuang5.png");
        var Leftscore_SpriteSize=Leftscore_Sprite.getContentSize();
        Leftscore_Sprite.attr({
            x:-10,
            y:leftLayerSize.height*.08,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        Leftscore.addChild(Leftscore_Sprite);

        leftLayer.addChild(Leftscore,2);

        layer.addChild(leftLayer,10);


        // 右侧玩家展示区
        var leftLayer= new cc.LayerColor(cc.color(127, 251, 235, .1),visibleSize.width/6,visibleSize.height/30*29);
        var leftLayerSize=leftLayer.getContentSize();
        leftLayer.attr({
            x:visibleOrigin.x+visibleSize.width-visibleSize.height/30*9,
            y:visibleOrigin.y+visibleSize.height/30*0.5,
            anchorX:1,
            anchorY:0
        });
        console.log( "------->" + JSON.stringify( leftLayerSize ) );
        // 头像
        var headImg=new cc.Sprite("res/youbiankuang1.png");
        var headImgSize=headImg.getContentSize();
        headImg.attr({
            x:visibleOrigin.x,
            y:leftLayerSize.height*.95,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });

        // headImg.setPosition( visibleOrigin.x , visibleOrigin.y);
        // headImg.setScale(visibleSize.width / headImg.width,  visibleSize.height / headImg.height );


        leftLayer.addChild(headImg,1);
        // 昵称
        var nickname=new cc.LayerColor(cc.color(0, 0, 0, 128),visibleSize.width/6-2,50);
        nickname.attr({
            x:visibleOrigin.x,
            y:leftLayerSize.height/2*1.1,
            anchorX:0,
            anchorY:0,
        });
        var nickText=new ccui.Text("昵称","AmericanTypewriter", 24);
        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        })
        nickname.addChild(nickText);

        var rightnicknameSprite =new cc.Sprite("res/youbiankuang3.png");
        var rightnicknameSpriteSize=rightnicknameSprite.getContentSize();
        rightnicknameSprite.attr({
            x:30,
            y:leftLayerSize.height*.08,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        // nicknameSprite.setScale(2000/visibleSize.width,  1000/visibleSize.height );
        nickname.addChild(rightnicknameSprite);

        leftLayer.addChild(nickname,2);

        // 称号
        var name=new cc.LayerColor(cc.color(0, 0, 0, 128),visibleSize.width/6-2,50);
        name.attr({
            x:visibleOrigin.x,
            y:visibleSize.height/2.2,
            anchorX:0,
            anchorY:0,
        });
        var nickText=new ccui.Text("称     号","AmericanTypewriter", 24);
        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        })
        name.addChild(nickText);

        var rightnameSprite =new cc.Sprite("res/youbiankuang3.png");
        var rightnicknameSpriteSize=rightnameSprite.getContentSize();
        rightnameSprite.attr({
            x:30,
            y:leftLayerSize.height*.05,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        // nicknameSprite.setScale(2000/visibleSize.width,  1000/visibleSize.height );
        name.addChild(rightnameSprite);


        leftLayer.addChild(name,2);


        // 等级
        var grade=new cc.LayerColor(cc.color(0, 0, 0, 128),visibleSize.width/6-2,50);
        grade.attr({
            x:visibleOrigin.x,
            y:visibleSize.height/2.7,
            anchorX:0,
            anchorY:0,
        });
        var nickText=new ccui.Text("等     级","AmericanTypewriter", 24);
        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        })
        grade.addChild(nickText);

        var rightgradeSprite =new cc.Sprite("res/youbiankuang3.png");
        var rightnicknameSpriteSize=rightgradeSprite.getContentSize();
        rightgradeSprite.attr({
            x:30,
            y:leftLayerSize.height*.03,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        // nicknameSprite.setScale(2000/visibleSize.width,  1000/visibleSize.height );
        grade.addChild(rightgradeSprite);

        leftLayer.addChild(grade,2);


        // 得分
        var Rightscore=new cc.LayerColor(cc.color(0, 0, 0, 128),visibleSize.width/6-2,50);
        Rightscore.attr({
            x:visibleOrigin.x,
            y:visibleSize.height/4.5,
            anchorX:0,
            anchorY:0,
        });
        var nickText=new ccui.Text("0","AmericanTypewriter", 24);
        // 电脑分数Tag为1
        nickText.setTag(1);
        // 设置电脑的名字为当前分数值
        nickText.setName(0);
        nickText.attr({
            x:(visibleSize.width/6-2)/2,
            y:0,
            anchorX:0.5,
            anchorY:-0.2,
        });
        Rightscore.addChild(nickText);

        var rightscore_Sprite =new cc.Sprite("res/youbiankuang5.png");
        var Leftscore_SpriteSize=rightscore_Sprite.getContentSize();
        rightscore_Sprite.attr({
            x:10,
            y:leftLayerSize.height*.08,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.height/1080,
        });
        Rightscore.addChild(rightscore_Sprite);

        leftLayer.addChild(Rightscore,2);

        layer.addChild(leftLayer,10);



        // 中间游戏区
        var game=new cc.LayerColor(cc.color(127, 251, 235,.1),visibleSize.width/3*1.8,visibleSize.height/30*29);
        game.attr({
            x:visibleOrigin.x+visibleSize.width/3*0.5,
            y:visibleOrigin.y+visibleSize.height/30,
            anchorX:0,
            anchorY:0,
        });
        // 勋章区
        var medal=new cc.LayerColor(cc.color(255, 255, 255,.5),visibleSize.width/3*1.8,visibleSize.height/30*2);
        medal.attr({
            x:0,
            y:visibleSize.height/30*26.5,
            anchorX:0,
            anchorY:1,
        });
        var nickText =new ccui.Text("  勋章区","AmericanTypewriter", 24);
        nickText.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0,
        })
        medal.addChild(nickText);

        var medalSprite = new cc.Sprite("res/dingbiankuang.png");
        medalSprite.attr({
            x:visibleOrigin.x,
            y:visibleSize.height/30*28.5,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.width/1920,
        });

        game.addChild(medalSprite);


        // var beginSprite = cc.Sprite("res/kaishi.png");
        // beginSprite.attr({
        //     x:-50,
        //     y:visibleSize.height/7,
        //     anchorX:0,
        //     anchorY:1,
        //     scale:visibleSize.width/1920,
        // });
        //

        // game.addChild(beginSprite);

        var beginSprite=new ccui.Button(
            "res/kaishi.png",
            "res/kaishi.png"
        );

        beginSprite.attr({
            x:-50,
            y:visibleSize.height/7,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.width/1920,
        });

        game.addChild(beginSprite);

        beginSprite.addTouchEventListener(that.startGame);
        // cc.eventManager.addListener(that.startGame, beginSprite);
        var stopSprite = new cc.Sprite("res/zanting.png");
        stopSprite.attr({
            x:400,
            y:visibleSize.height/8.2,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.width/1920,
        });


        game.addChild(stopSprite);

        var jiluSprite = new cc.Sprite("res/youxijilu.png");
        jiluSprite.attr({
            x:720,
            y:visibleSize.height/8.2,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.width/1920,
        });


        game.addChild(jiluSprite);

        var xuanxiangSprite = new cc.Sprite("res/xuanxiang.png");
        xuanxiangSprite.attr({
            x:1050,
            y:visibleSize.height/8.2,
            anchorX:0,
            anchorY:1,
            scale:visibleSize.width/1920,
        });


        game.addChild(xuanxiangSprite);



        game.addChild(medal,2);
        layer.addChild(game,50);

        // 随机正面数组
        var arr=[];
        for(var i=0;i<12;i++){
            arr[i]=i;
        }
        arr.sort(function(){ return 0.5 - Math.random() });
        console.log( arr);
        var count=0;
        // 定义一个0-11数组用于翻牌之后的可选项
        var flopArr=[0,1,2,3,4,5,6,7,8,9,10,11,];
        // 定义一个数组放已经打开的卡牌
        var turnCard=[];
        // 总分数
        var scoreTotle=0;
        // 12张图片添加事件监听
        var listener=cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            cancelable:false,
            onTouchBegan:function(touch,event){
                var target=event.getCurrentTarget();
                var locationInNode=target.convertToNodeSpace(touch.getLocation());
                var s=target.getContentSize();
                var rect=cc.rect(0,0,s.width,s.height);
                if(cc.rectContainsPoint(rect,locationInNode)){
                    console.log("------->"+ JSON.stringify(target.tag));
                    console.log("------->"+ JSON.stringify(target.getName()));
                    console.log(target.getPosition());
                    console.log("------->"+ JSON.stringify( "spriteBegan...x="+locationInNode.x+",y="+locationInNode.y  ));
                    count+=1;
                    console.log(count);
                    flop(target);
                    // 翻牌效果
                    function flop(card){
                        target=card;
                        var actionBy = cc.rotateBy(0.5, 0, -180);
                        var delay = cc.delayTime(0.1);
                        target.runAction(cc.sequence(actionBy, delay.clone()));

                        setTimeout(function(){
                            game.removeChildByTag(target.tag,true);
                            var kapai=new cc.Sprite("res/"+target.getName()+".png");
                            kapai.setContentSize(s.width,s.height);
                            kapai.setTag(target.tag);
                            kapai.setName(target.getName());
                            kapai.attr({
                                x:target.getPosition().x,
                                y:target.getPosition().y,
                                anchorX:0.5,
                                anchorY:1,
                            });
                            // var actionBy2 = cc.scaleBy(1, 2);
                            // var actionBy = cc.moveBy(1,cc.p(40, 40));
                            // var actionByBack = actionBy.reverse();
                            // kapai.runAction(cc.sequence(actionBy2, cc.delayTime(0.2), actionBy2.reverse()));
                            // kapai.runAction(cc.sequence(actionBy, actionByBack));
                            game.addChild(kapai,100);
                        },500);
                    };

                    function scoring(card,role){
                        target=card;
                        // 获取上一次分数
                        var lastscore=role.getChildByTag(1).getName();
                        console.log("上一次分数"+lastscore);

                        console.log("目标Tag"+target.tag);
                        // 删除点过的卡牌Tag
                        var index = flopArr.indexOf(target.tag);
                        flopArr.splice(index,1);
                        turnCard.push(target.tag);
                        // // 当前的分数=上一次分数+加上点击的分数
                        // 判断如果是太阳分数*2
                        if(target.getName()==9){
                            alert("太阳--分数*2");
                            scoreTotle=lastscore*2;
                            changeScore(role);
                        // 判断小行星分数-6
                        }else if(target.getName()==11){
                            alert("小行星--分数-6");
                            scoreTotle=lastscore-6;
                            changeScore(role);
                        // 判断冥王星
                        }else if(target.getName()==0){
                            alert("冥王星--交换分数");
                            if(role==Leftscore){
                                Rightscore.removeChildByTag(1);
                                var nickText=new ccui.Text(""+lastscore+"","AmericanTypewriter", 24);
                                // 玩家分数Tag为1
                                nickText.setName(lastscore);
                                nickText.setTag(1);
                                nickText.attr({
                                    x:(visibleSize.width/6-2)/2,
                                    y:0,
                                    anchorX:0.5,
                                    anchorY:-0.2,
                                });
                                Rightscore.addChild(nickText);
                            }else{
                                Leftscore.removeChildByTag(1);
                                var nickText=new ccui.Text(""+lastscore+"","AmericanTypewriter", 24);
                                // 玩家分数Tag为1
                                nickText.setName(lastscore);
                                nickText.setTag(1);
                                nickText.attr({
                                    x:(visibleSize.width/6-2)/2,
                                    y:0,
                                    anchorX:0.5,
                                    anchorY:-0.2,
                                });
                                Leftscore.addChild(nickText);
                            }
                            changeScore(role);
                        // 判断月球
                        }else if(target.getName()===10){
                            alert("月球--选择一张卡牌进行复制");

                            for(var i=0;i<turnCard.length;i++){
                                var action1 = cc.blink(2, 10);
                                game.getChildByTag(turnCard[i]).runAction(action1);
                                var moon=cc.EventListener.create({
                                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                                    swallowTouches: true,
                                    cancelable:false,
                                    onTouchBegan: function (touch, event) {
                                        var target = event.getCurrentTarget();
                                        var locationInNode = target.convertToNodeSpace(touch.getLocation());
                                        var s = target.getContentSize();
                                        var rect = cc.rect(0, 0, s.width, s.height);
                                        if(cc.rectContainsPoint(rect,locationInNode)) {
                                            console.log(target.getName());
                                            if(target.getName()==9){
                                                scoreTotle=lastscore*2;
                                            }else{

                                                scoreTotle=target.getName()+scoreTotle;
                                            }
                                            console.log(scoreTotle);
                                            role.removeChildByTag(1);
                                            var nickText=new ccui.Text(""+scoreTotle+"","AmericanTypewriter", 24);
                                            // 玩家分数Tag为1
                                            nickText.setName(scoreTotle);
                                            nickText.setTag(1);
                                            nickText.attr({
                                                x:(visibleSize.width/6-2)/2,
                                                y:0,
                                                anchorX:0.5,
                                                anchorY:-0.2,
                                            });
                                            role.addChild(nickText);
                                        }
                                    }
                                });
                                cc.eventManager.addListener(moon,game.getChildByTag(turnCard[i]));

                            }
                        }else{
                            alert("此卡分数为"+target.getName());
                            cc.audioEngine.playMusic("res/a3.mp3", false);
                            scoreTotle=lastscore+target.getName();

                            changeScore(role);
                        }
                        console.log("当前分数"+scoreTotle);

                    }
                    function changeScore(role){
                        // 删除原有分数改成新的分数
                        role.removeChildByTag(1);
                        var nickText=new ccui.Text(""+scoreTotle+"","AmericanTypewriter", 24);
                        // 玩家分数Tag为1
                        nickText.setName(scoreTotle);
                        nickText.setTag(1);
                        nickText.attr({
                            x:(visibleSize.width/6-2)/2,
                            y:0,
                            anchorX:0.5,
                            anchorY:-0.2,
                        });
                        role.addChild(nickText);
                    }
                    // 区分玩家和电脑
                    if(count%2!=0){
                        console.log("玩家");
                        scoring(target,Leftscore);
                        setTimeout(function(){
                            count+=1;
                            // 在翻牌剩余的数组里随机抽取一个翻牌
                            console.log("翻牌剩余数组长度"+flopArr.length);
                            var rank=Math.floor(Math.random()*flopArr.length+0);
                            console.log("在翻牌剩余池里随机一个数"+rank);
                            flop(game.getChildByTag(flopArr[rank]));
                            console.log("电脑");
                            scoring(game.getChildByTag(flopArr[rank]),Rightscore);
                            // 判断flopArr为空时为翻牌完成
                            setTimeout(function(){
                                // 判断flopArr为空时为翻牌完成
                                if(flopArr.length==0){
                                    var left=Leftscore.getChildByTag(1).getName();
                                    var right=Rightscore.getChildByTag(1).getName();
                                    console.log(left,right);
                                    if(left>right){
                                        alert("玩家胜利！")
                                    }else{
                                        alert("电脑胜利！")
                                    }
                                }
                            },1000)
                        },5000)
                    }



                }

            }
        });
        for(var i=0;i<arr.length;i++){
            var imgSprite=new cc.Sprite("res/kapaibeimian.png");
            var imgSpriteSize=imgSprite.getContentSize();
            imgSprite.setTag(i);
            imgSprite.setName(arr[i]);

            if(i==0||i==1||i==2||i==3){
                imgSprite.attr({
                    x:150+i*325,
                    y:visibleSize.height/30*23.5,
                    anchorX:0.5,
                    anchorY:1,
                    scale:visibleSize.width/1920,
                });

            }
            if(i==4||i==5||i==6||i==7){
                imgSprite.attr({
                    x:150+(i-4)*325,
                    y:visibleSize.height/30*17,
                    anchorX:0.5,
                    anchorY:1,
                    scale:visibleSize.width/1920,
                });

            }
            if(i==8||i==9||i==10||i==11){
                imgSprite.attr({
                    x:150+(i-8)*325,
                    y:visibleSize.height/30*10.5,
                    anchorX:0.5,
                    anchorY:1,
                    scale:visibleSize.width/1920,
                });

            }

            // if(i==0||i==5||i==9){
            //     imgSprite.attr({
            //         x:150,
            //         y:visibleSize.height/30*26-i*60,
            //         anchorX:0.5,
            //         anchorY:1,
            //         scale:visibleSize.height/1080,
            //     });
            //
            // }
            //
            // if(i==1||i==5||i==9){
            //     imgSprite.attr({
            //         x:visibleSize.width/3*1.8/4+180,
            //         y:visibleSize.height/30*26-(i-1)*60,
            //         anchorX:0.5,
            //         anchorY:1,
            //         scale:visibleSize.height/1080,
            //     });
            // }
            // if(i==2||i==6||i==10){
            //     imgSprite.attr({
            //         x:visibleSize.width/3*1.8/2+210,
            //         y:visibleSize.height/30*26-(i-2)*60,
            //         anchorX:0.5,
            //         anchorY:1,
            //         scale:visibleSize.height/1080,
            //     });
            // }
            // if(i==3||i==7||i==11){
            //     imgSprite.attr({
            //         x:visibleSize.width/3*1.8-50,
            //         y:visibleSize.height/30*26-(i-3)*60,
            //         anchorX:0.5,
            //         anchorY:1,
            //         scale:visibleSize.height/1080,
            //     });
            // }
            game.addChild(imgSprite);
            cc.eventManager.addListener(listener.clone(),game.getChildByTag(i));
        };

    },




});
var mainGameScene=cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer=new mainGameLayer();
        this.addChild(layer);
    }
})