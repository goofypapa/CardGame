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

var topLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        // function jsonp(url, callback) {
        //     var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        //     window[callbackName] = function(data) {
        //         delete window[callbackName];
        //         document.body.removeChild(script);
        //         callback(data);
        //     };
        //     var script = document.createElement('script');
        //     script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        //     document.body.appendChild(script);
        // };

        this._super();

        var layer = new cc.Layer();
        this.addChild(layer);

        console.log(layer.getPosition().x, layer.getPosition().y)

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();


        // 背景图
        var sprite = new cc.Sprite( res.trialBj );
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
            // scale:(visibleSize.width / spriteSize.width),
        });

        layer.addChild( sprite );
        cc.loader.load([res.top_plist,res.top_png], function(err, results){
            cc.spriteFrameCache.addSpriteFrames(res.top_plist);
            // 标题
            var title=new cc.Sprite("#top.png");
            title.attr({
                x:visibleOrigin.x+91,
                y:visibleOrigin.y+visibleSize.height-24,
                scale:visibleSize.height/1080,
                anchorX:0,
                anchorY:1,
            });
            layer.addChild(title,10);
            // 边框
            var topBk=new cc.Sprite("#top-bk.png");
            var topBkSize=topBk.getContentSize();
            topBk.attr({
                x:visibleSize.width/2,
                y:visibleOrigin.y+visibleSize.height/2,
                scale:visibleSize.height/1080
            });
            layer.addChild(topBk,10);

            // 名次
            var rank=new cc.Sprite("#rank.png");
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            // 昵称
            var rank=new cc.Sprite("#nickName.png");
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*2,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            // 等级
            var rank=new cc.Sprite("#gradeDj.png");
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*3,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            // 称号
            var rank=new cc.Sprite("#designation.png");
            var rankSize=rank.getContentSize();
            rank.attr({
                x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*4,
                y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/3-20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(rank,40);

            var scrollView = new ccui.ScrollView();
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            scrollView.setContentSize(cc.size(topBkSize.width,topBkSize.height-rankSize.height*4));
            scrollView.attr({
                x:visibleSize.width/2-topBkSize.width/7.5,
                y:visibleOrigin.y+visibleSize.height/2-rankSize.height,
                scale:visibleSize.height/1080,
                anchorX:0.5,
                anchorY:0.5
            });

            var n = 20;
            var Texts = [];
            var start = new ccui.Text("---start---", "Microsoft Yahei", 40);
            var innerWidth = topBkSize.width;
            var innerHeight = n * start.height;
            scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

            start.x = innerWidth / 2;
            start.y = scrollView.getInnerContainerSize().height ;
            Texts[0] = start;
            // scrollView.addChild(start);

            // for (var i = 1; i < n; i++) {
            //     var text = new ccui.Text("This is a test label: " + i, "Thonburi", 40);
            //     text.x = innerWidth / 2;
            //     text.y = Texts[i - 1].getBottomBoundary() - text.height ;
            //     Texts[i] = text;
            //     scrollView.addChild(Texts[i]);
            // };
            var BASE_URL="http://192.168.5.100:8080/gameUser/getRank.do";
            var data="top=10";

            var xhr=cc.loader.getXMLHttpRequest();
            xhr.open("POST",BASE_URL);
            xhr.onreadystatechange=function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = xhr.responseText;
                    console.log("xhr后台返回数据",response);
                    var dataP=JSON.parse(response);
                    console.log("xhr第一个昵称",dataP.data[0].gameUserName);


                    var points=[400,50,20,958,274,75,5,985,23,205];
                    for(var i=0;i<dataP.data.length;i++){
                        console.log("xhr所有昵称",dataP.data[i].gameUserName);
                        var score=points[i]
                        console.log("xhr所有分数",score);
                        // 获取等级
                        console.log("xhr获取等级称号",getLevel(score));
                        // 用户名次
                        // var rankText=new ccui.Text(i+1,"Microsoft Yahei", 40);
                        var rankText=new cc.LabelTTF(i+1,"Poster",40);
                        var rankTextSize=100;
                        rankText.attr({
                            x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5,
                            y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
                            scale:visibleSize.height/1080,
                        });
                        scrollView.addChild(rankText,20);

                        // 用户昵称
                        var nickNameText=new ccui.Text(dataP.data[i].gameUserName,"Microsoft Yahei", 40);
                        // var nickNameText=new cc.LabelTTF(datas[i].gameUserName,"Poster",40);
                        nickNameText.attr({
                            x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*2,
                            y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
                            scale:visibleSize.height/1080,
                        });
                        scrollView.addChild(nickNameText,20);

                        // 用户等级
                        // var gradeText=new ccui.Text(getLevel(score)[1]+"级","Microsoft Yahei", 40);
                        var gradeText=new cc.LabelTTF(getLevel(score)[1]+"级","Poster",40);
                        gradeText.attr({
                            x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*3,
                            y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
                            scale:visibleSize.height/1080,
                        });
                        scrollView.addChild(gradeText,20);

                        // 用户称号

                        var nameText=new ccui.Text(getLevel(score)[2],"Microsoft Yahei", 40);
                        nameText.attr({
                            x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*4,
                            y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
                            scale:visibleSize.height/1080,
                        });
                        scrollView.addChild(nameText,20);
                    }

                }
            };
            xhr.send(data);


            // jsonp( BASE_URL + "?" + data, function(data) {
            //     var datas=data.data;
            //     console.log(datas);
            //     var points=[400,50,20,958,274,75,5,985,23,205];
            //     for(var i=0;i<datas.length;i++){
            //         console.log(datas[i].gameUserName);
            //         var score=points[i]
            //         console.log(score);
            //         // 获取等级
            //         console.log(getLevel(score));
            //         // 用户名次
            //         // var rankText=new ccui.Text(i+1,"Microsoft Yahei", 40);
            //         var rankText=new cc.LabelTTF(i+1,"Poster",40);
            //         var rankTextSize=100;
            //         rankText.attr({
            //             x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5,
            //             y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
            //             scale:visibleSize.height/1080,
            //         });
            //         scrollView.addChild(rankText,20);
            //
            //         // 用户昵称
            //         var nickNameText=new ccui.Text(datas[i].gameUserName,"Microsoft Yahei", 40);
            //         // var nickNameText=new cc.LabelTTF(datas[i].gameUserName,"Poster",40);
            //         nickNameText.attr({
            //             x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*2,
            //             y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
            //             scale:visibleSize.height/1080,
            //         });
            //         scrollView.addChild(nickNameText,20);
            //
            //         // 用户等级
            //         // var gradeText=new ccui.Text(getLevel(score)[1]+"级","Microsoft Yahei", 40);
            //         var gradeText=new cc.LabelTTF(getLevel(score)[1]+"级","Poster",40);
            //         gradeText.attr({
            //             x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*3,
            //             y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
            //             scale:visibleSize.height/1080,
            //         });
            //         scrollView.addChild(gradeText,20);
            //
            //         // 用户称号
            //
            //         var nameText=new ccui.Text(getLevel(score)[2],"Microsoft Yahei", 40);
            //         nameText.attr({
            //             x:visibleOrigin.x+visibleSize.width/2-topBkSize.width/2+topBkSize.width/5*4,
            //             y:visibleOrigin.y+visibleSize.height/2+topBkSize.height/1.5-i*rankTextSize,
            //             scale:visibleSize.height/1080,
            //         });
            //         scrollView.addChild(nameText,20);
            //     }
            // });
            layer.addChild(scrollView,10);

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
        });

        return true;
    },


});

var topScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new topLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }
});