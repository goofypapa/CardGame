
var _titleList = [
    ["奴隶", "nuli"],
    ["奴仆", "nupu"],
    ["佣人", "yongren"],
    ["长工", "changgong"],
    ["魔法学徒", "mofaxuetu"],
    ["初级魔法师", "chujimofashi"],
    ["中级魔法师", "zhongjimofashi"],
    ["高级魔法师", "gaojimofashi"],
    ["大级魔法师", "damofashi"],
    ["初级魔导师", "chujimodaoshi"],
    ["中级魔导师", "zhongjimodaoshi"],
    ["高级魔导师", "gaojimodaoshi"],
    ["大魔导师", "damodaoshi"],
    ["圣魔导师", "shengmodaoshi"],
    ["天使", "tianshi"],
    ["大天使", "datianshi"],
    ["炽天使", "zhitianshi"],
    ["主天使", "zhutianshi"],
    ["水之神", "shuizhishen"],
    ["木之神", "muzhishen"],
    ["火之神", "huozhishen"],
    ["智慧主神", "zhihuizhushen"],
    ["创造主神", "chuangzaozhushen"],
    ["永恒主神", "yonghengzhushen"],
    ["至高神", "zhigaoshen"]
];


var _levelScoreList = [ 
    [-200, -10, _titleList[0][0], _titleList[0][1]],
    [-180, -9, _titleList[1][0], _titleList[1][1]], [-160, -8, _titleList[1][0], _titleList[1][1]], [-140, -7, _titleList[1][0], _titleList[1][1]], 
    [-120, -6, _titleList[2][0], _titleList[2][1]], [-100, -5, _titleList[2][0], _titleList[2][1]], [-80, -4, _titleList[2][0], _titleList[2][1]],
    [-60, -3, _titleList[3][0], _titleList[3][1]], [-40, -2, _titleList[3][0], _titleList[3][1]], [-20, -1, _titleList[3][0], _titleList[3][1]],

    [0, 0, _titleList[4][0], _titleList[4][1]], [20, 1, _titleList[4][0], _titleList[4][1]], [40, 2, _titleList[4][0], _titleList[4][1]], [60, 3, _titleList[4][0], _titleList[4][1]],
    [80, 4, _titleList[5][0], _titleList[5][1]], [100, 5, _titleList[5][0], _titleList[5][1]], [120, 6, _titleList[5][0], _titleList[5][1]],
    [140, 7, _titleList[6][0], _titleList[6][1]], [160, 8, _titleList[6][0], _titleList[6][1]], [180, 9, _titleList[6][0], _titleList[6][1]],
    [200, 10, _titleList[7][0], _titleList[7][1]], [220, 11, _titleList[7][0], _titleList[7][1]], [240, 12, _titleList[7][0], _titleList[7][1]], 
    [260, 13, _titleList[8][0], _titleList[8][1]],  [280, 14, _titleList[8][0], _titleList[8][1]],  [300, 15, _titleList[8][0], _titleList[8][1]], 

    [330, 16, _titleList[9][0], _titleList[9][1]], [360, 17, _titleList[9][0], _titleList[9][1]], [390, 18, _titleList[9][0], _titleList[9][1]], 
    [420, 19, _titleList[10][0], _titleList[10][1]], [450, 20, _titleList[10][0], _titleList[10][1]], [480, 21, _titleList[10][0], _titleList[10][1]], 
    [510, 22, _titleList[11][0], _titleList[11][1]],  [540, 23, _titleList[11][0], _titleList[11][1]],  [570, 24, _titleList[11][0], _titleList[11][1]],  
    [600, 25, _titleList[12][0], _titleList[12][1]], [630, 26, _titleList[12][0], _titleList[12][1]], [660, 27, _titleList[12][0], _titleList[12][1]],  
    [690, 28, _titleList[13][0], _titleList[13][1]], [720, 29, _titleList[13][0], _titleList[13][1]], [750, 30, _titleList[13][0], _titleList[13][1]], 

    [800, 31, _titleList[14][0], _titleList[14][1]], [850, 32, _titleList[14][0], _titleList[14][1]], [900, 33, _titleList[14][0], _titleList[14][1]], 
    [950, 34, _titleList[15][0], _titleList[15][1]], [1000, 35, _titleList[15][0], _titleList[15][1]], [1050, 36, _titleList[15][0], _titleList[15][1]], 
    [1100, 37, _titleList[16][0], _titleList[16][1]], [1150, 38, _titleList[16][0], _titleList[16][1]], [1200, 39, _titleList[16][0], _titleList[16][1]], 
    [1250, 40, _titleList[17][0], _titleList[17][1]], [1300, 41, _titleList[17][0], _titleList[17][1]], [1350, 42, _titleList[17][0], _titleList[17][1]], 

    [1500, 43, _titleList[18][0], _titleList[18][1]], [1600, 44, _titleList[18][0], _titleList[18][1]], [1700, 45, _titleList[18][0], _titleList[18][1]], 
    [1800, 46, _titleList[19][0], _titleList[19][1]], [1900, 47, _titleList[19][0], _titleList[19][1]], [2000, 48, _titleList[19][0], _titleList[19][1]], 
    [2100, 49, _titleList[20][0], _titleList[20][1]], [2200, 50, _titleList[20][0], _titleList[20][1]], [2300, 51, _titleList[20][0], _titleList[20][1]], 
    [2400, 52, _titleList[21][0], _titleList[21][1]], [2500, 53, _titleList[21][0], _titleList[21][1]], [2600, 54, _titleList[21][0], _titleList[21][1]], 
    [2700, 55, _titleList[22][0], _titleList[22][1]], [2800, 56, _titleList[22][0], _titleList[22][1]], [2900, 57, _titleList[22][0], _titleList[22][1]], 
    [3000, 58, _titleList[23][0], _titleList[23][1]], [3100, 59, _titleList[23][0], _titleList[23][1]], [3200, 60, _titleList[23][0], _titleList[23][1]], 
    [3300, 60, _titleList[24][0], _titleList[24][1]], [3400, 61, _titleList[24][0], _titleList[24][1]], [3500, 62, _titleList[24][0], _titleList[24][1]]
 ];



function getLevel( score ){


    for( var i = 0; i < _levelScoreList.length - 1; ++i ){
        if( score >= _levelScoreList[i][0] &&  score < _levelScoreList[i + 1][0] ){
            return _levelScoreList[i];
        }
    }

    return _levelScoreList[ i ];

}

function adaptation( resourcePixel ){

    if( typeof(resourcePixel) == "undefined" ){
        resourcePixel = { width: 1920, height: 1080 }
    }

    var scalex = cc.director.getVisibleSize().width / resourcePixel.width;
    var scaley = cc.director.getVisibleSize().height / resourcePixel.height;

    return scalex > scaley ? scaley : scalex;
}

function zeroFill( num, count ){
    var result = "" + num;

    while( result.length < count )
    {
        result = "0" + result;
    } 

    return result;
}