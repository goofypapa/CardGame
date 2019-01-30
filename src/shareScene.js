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

var shareLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var layer = new cc.Layer();
        this.addChild(layer);

        console.log(layer.getPosition().x, layer.getPosition().y)

        var visibleSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        console.log(visibleSize);
        console.log("bili"+visibleSize.height/visibleSize.width);

        // 背景图
        var sprite = new cc.Sprite( res.trialBj );
        sprite.attr({
            x:visibleOrigin.x + visibleSize.width /2,
            y:visibleOrigin.y + visibleSize.height/ 2,
            // scale:(visibleSize.width / spriteSize.width),
        });

        layer.addChild( sprite );
        cc.loader.load([res.share_plist,res.share_png], function(err, results){
            cc.spriteFrameCache.addSpriteFrames(res.share_plist);
            // 头像边框
            var pictureFrame=new cc.Sprite("#pictureFrame.png");
            var pictureFrameSize=pictureFrame.getContentSize();
            // pictureFrame.setContentSize(pictureFrameSize.width*bili,pictureFrameSize.height*bili);
            pictureFrame.attr({
                x:visibleOrigin.x+visibleSize.width/5,
                y:visibleOrigin.y+visibleSize.height-visibleSize.height/10,
                scale:visibleSize.height/1080,
                anchorY:1
            });

            layer.addChild(pictureFrame,10);
            // 昵称边框
            var nickFrame=new cc.Sprite("#shareFrame.png");
            var nickFrameSize=nickFrame.getContentSize();
            nickFrame.attr({
                x:visibleOrigin.x+visibleSize.width/5,
                y:visibleOrigin.y+visibleSize.height/8+nickFrameSize.height*2+20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(nickFrame,10);
            var nickName=new cc.LabelTTF("用户昵称","poster",38);
            nickName.attr({
                x:visibleOrigin.x+visibleSize.width/5,
                y:visibleOrigin.y+visibleSize.height/8+nickFrameSize.height*2+20,
                scale:visibleSize.height/1080,
            });
            layer.addChild(nickName,10);
            // 称号边框
            var designationFrame=new cc.Sprite("#shareFrame.png");
            designationFrame.attr({
                x:visibleOrigin.x+visibleSize.width/5,
                y:visibleOrigin.y+visibleSize.height/8+nickFrameSize.height+10,
                scale:visibleSize.height/1080,
            });
            layer.addChild(designationFrame,10);
            var designation=new cc.LabelTTF("用户称号","poster",38);
            designation.attr({
                x:visibleOrigin.x+visibleSize.width/5,
                y:visibleOrigin.y+visibleSize.height/8+nickFrameSize.height+10,
                scale:visibleSize.height/1080,
            });
            layer.addChild(designation,10);
            // 等级边框
            var gradeFrame=new cc.Sprite("#shareFrame.png");
            gradeFrame.attr({
                x:visibleOrigin.x+visibleSize.width/5,
                y:visibleOrigin.y+visibleSize.height/8,
                scale:visibleSize.height/1080,
            });
            layer.addChild(gradeFrame,10);
            var grade=new cc.LabelTTF("等级","poster",38);
            grade.attr({
                x:visibleOrigin.x+visibleSize.width/5,
                y:visibleOrigin.y+visibleSize.height/8,
                scale:visibleSize.height/1080,
            });
            layer.addChild(grade,10);
            // 分享内容的边框
            var shareInfo=new cc.Sprite("#shareInfo.png");
            var shareInfoSize=shareInfo.getContentSize();
            console.log(shareInfoSize);
            shareInfo.attr({
                x:visibleOrigin.x+visibleSize.width-visibleSize.width/10,
                y:visibleOrigin.y+visibleSize.height-visibleSize.height/10,
                scale:visibleSize.height/1080,
                anchorX:1,
                anchorY:1
            });
            layer.addChild(shareInfo,10);

            // var text=new cc.LabelTTF("普天同庆“用户昵称”在“太阳系大作战”小游戏中，升到“用户等级”，成为“用户称号”","poster.ttf",50);
            var text = new ccui.Text("普天同庆“用户昵称”在“太阳系大作战”小游戏中，升到“用户等级”，成为“用户称号”","poster",50);
            text.ignoreContentAdaptWithSize(false);
            text.setContentSize(cc.size(shareInfoSize.width/4*3*visibleSize.height/1080,shareInfoSize.height/2*visibleSize.height/1080));
            text.setTextHorizontalAlignment(cc.TEXTURE_ATLAS_USE_TRIANGLE_STRIP);
            text.setTouchScaleChangeEnabled(true);
            text.attr({
                x:visibleOrigin.x+visibleSize.width-visibleSize.width/10-shareInfoSize.width/8,
                y:visibleOrigin.y+visibleSize.height-visibleSize.height/10-shareInfoSize.height/2*visibleSize.height/1080,
                scale:visibleSize.height/1080,
                anchorX:1,
                anchorY:0.5
            });
            layer.addChild(text,10);

            // 我也要玩
            var playToo=new cc.Sprite("#playToo.png");
            playToo.attr({
                x:visibleOrigin.x+visibleSize.width-visibleSize.width/10-shareInfoSize.width/2*visibleSize.height/1080,
                y:visibleOrigin.y+visibleSize.height/8,
                scale:visibleSize.height/1080,
                anchorX:0.5,
            });
            layer.addChild(playToo,10);
        });

        return true;
    },


});

var shareScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new shareLayer();
        this.addChild(layer);
    },
    onExit:function(){
        this._super();
        cc.spriteFrameCache.removeSpriteFrames();
    }
});

