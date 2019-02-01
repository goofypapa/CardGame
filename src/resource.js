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

var res = {
    indexBj:"res/shouye.png",//首页背景图,
    trialBj:"res/trial.jpg",//试玩页面背景图
    kapai_plist:"res/kapai.plist",//首页和试玩页面plist
    kapai_png:"res/kapai.png",
    methodJpg:"res/method.jpg",
    method_plist:"res/method.plist",//游戏方法页面plist
    method_png:"res/method.png",
    top_plist:"res/top.plist",//排行榜页面
    top_png:"res/top.png",//排行榜页面图片

    loading_plist:"res/loading.plist",
    loading_png:"res/loading.png",

    medal_plist:"res/medal.plist",
    medal_png:"res/medal.png",

    grade_plist:"res/grade.plist",
    grade_png:"res/grade.png",
    gradeInfo01:"res/gradeInfo01.png",
    gradeInfo02:"res/gradeInfo02.png",
    gradeInfo03:"res/gradeInfo03.png",

    share_plist:"res/share.plist",
    share_png:"res/share.png",

    register_plist:"res/register.plist",
    register_png:"res/register.png",

    dl_plist:"res/dl.plist",
    dl_png:"res/dl.png",


    gameResource: "res/GameResource.png",
    gameResourcePlist: "res/GameResource.plist",
    cardResource: "res/CardResource.png",
    cardResourcePlist: "res/CardResource.plist",
    skinResource: "res/SkinResource.png",
    skinResourcePlist: "res/SkinResource.plist",

};
var g_resources = [
    //fonts
    {
        type:"font",
        name:"poster",
        srcs:["res/fonts/poster.ttf"]
    }
];
for (var i in res) {
    g_resources.push(res[i]);
}
