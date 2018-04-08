var wuziqiConstants = require("wuziqiConstants");

var GobangAI =  (function () {
    function GobangAI(board) {
        this.board = board;
        this.fiveGroup = []; //五元组
        this.fiveGroupScore = []; //五元组分数
        //添加五元数组
        //横向
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 11; x++) {
                this.fiveGroup.push([cc.v2(x, y), cc.v2(x + 1, y), cc.v2(x + 2, y), cc.v2(x + 3, y), cc.v2(x + 4, y)]);
            }
        }
        //纵向
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 11; y++) {
                this.fiveGroup.push([cc.v2(x, y), cc.v2(x, y + 1), cc.v2(x, y + 2), cc.v2(x, y + 3), cc.v2(x, y + 4)]);
            }
        }
        //右上斜向
        for (var b = -10; b <= 10; b++) {
            for (var x = 0; x < 11; x++) {
                if (b + x < 0 || b + x > 10) {
                    continue;
                }
                else {
                    this.fiveGroup.push([cc.v2(x, b + x), cc.v2(x + 1, b + x + 1), cc.v2(x + 2, b + x + 2), cc.v2(x + 3, b + x + 3), cc.v2(x + 4, b + x + 4)]);
                }
            }
        }
        //右下斜向
        for (var b = 4; b <= 24; b++) {
            for (var y = 0; y < 11; y++) {
                if (b - y < 4 || b - y > 14) {
                    continue;
                }
                else {
                    this.fiveGroup.push([cc.v2(b - y, y), cc.v2(b - y - 1, y + 1), cc.v2(b - y - 2, y + 2), cc.v2(b - y - 3, y + 3), cc.v2(b - y - 4, y + 4)]);
                }
            }
        }
    }
    GobangAI.prototype.getNextCoor = function () {
        var pieceMap = this.board.pieceMap;
        //评分
        for (var i = 0; i < this.fiveGroup.length; i++) {
            var b = 0; //五元组里黑棋的个数
            var w = 0; //五元组里白棋的个数
            for (var j = 0; j < 5; j++) {
                if (this.board.getPieceByCoor(this.fiveGroup[i][j]).color === wuziqiConstants.BLACK) {
                    b++;
                }
                else if (this.board.getPieceByCoor(this.fiveGroup[i][j]).color === wuziqiConstants.WHITE) {
                    w++;
                }
            }
            if (b + w == 0) {
                this.fiveGroupScore[i] = 7;
            }
            else if (b > 0 && w > 0) {
                this.fiveGroupScore[i] = 0;
            }
            else if (b == 0 && w == 1) {
                this.fiveGroupScore[i] = 35;
            }
            else if (b == 0 && w == 2) {
                this.fiveGroupScore[i] = 800;
            }
            else if (b == 0 && w == 3) {
                this.fiveGroupScore[i] = 15000;
            }
            else if (b == 0 && w == 4) {
                this.fiveGroupScore[i] = 800000;
            }
            else if (w == 0 && b == 1) {
                this.fiveGroupScore[i] = 15;
            }
            else if (w == 0 && b == 2) {
                this.fiveGroupScore[i] = 400;
            }
            else if (w == 0 && b == 3) {
                this.fiveGroupScore[i] = 1800;
            }
            else if (w == 0 && b == 4) {
                this.fiveGroupScore[i] = 100000;
            }
        }
        //找最高分的五元组
        var hScore = 0;
        var mPosition = 0;
        for (var i = 0; i < this.fiveGroupScore.length; i++) {
            if (this.fiveGroupScore[i] > hScore) {
                hScore = this.fiveGroupScore[i];
                mPosition = i;
            }
        }
        //在最高分的五元组里找到最优下子位置
        var flag1 = false; //无子
        var flag2 = false; //有子
        var nPosition = 0;
        for (var i = 0; i < 5; i++) {
            if (!flag1 && this.board.getPieceByCoor(this.fiveGroup[mPosition][i]).color === wuziqiConstants.NONE) {
                nPosition = i;
            }
            if (!flag2 && this.board.getPieceByCoor(this.fiveGroup[mPosition][i]).color !== wuziqiConstants.NONE) {
                flag1 = true;
                flag2 = true;
            }
            if (flag2 && this.board.getPieceByCoor(this.fiveGroup[mPosition][i]).color === wuziqiConstants.NONE) {
                nPosition = i;
                break;
            }
        }
        //在最最优位置下子
        return this.fiveGroup[mPosition][nPosition];
    };
    return GobangAI;
}());

exports.GobangAI = GobangAI;