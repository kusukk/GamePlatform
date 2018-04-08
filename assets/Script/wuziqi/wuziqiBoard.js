// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var wuziqiConstants = require("wuziqiConstants");
// var wuziqiPiece = require("wuziqiPiece");

// var wuziqiPiece =  function(x, y, color){
//     this.x = x;
//     this.y = y;
//     this.color = color;
// }

var wuziqiPiece = require("wuziqiPiece").wuziqiPiece;

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        colsNum: 15,
        rowsNum: 15,
        graphics: cc.Graphics, 
        graphics2: cc.Graphics,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {

    },

    init(scene){
        this.wuziqiScene = scene;
        this.tileWidth =  this.node.width / this.colsNum;
        this.startX = this.tileWidth / 2;
        this.startY = this.tileWidth / 2;

        this.boardWidth = this.tileWidth * (this.colsNum - 1);
        this.boardHeight = this.tileWidth * (this.colsNum - 1);

        this.reset();

        this.addListeners();
        
    },

    reset(){
        this.graphics.clear();
        this.graphics2.clear();
       // 画棋盘
        this.graphics.strokeColor = cc.Color.BLACK;
        
        for (let x = 0; x < this.colsNum; x++) {
           this.graphics.moveTo(this.startX + x *this.tileWidth, this.startY);
           this.graphics.lineTo(this.startX + x *this.tileWidth, this.startY + this.boardHeight); 
           this.graphics.stroke();
        }

        for (let y = 0; y < this.rowsNum; y++) {
            this.graphics.moveTo(this.startX, this.startY + y * this.tileWidth);
            this.graphics.lineTo(this.startX + this.boardWidth, this.startY + y * this.tileWidth);
            this.graphics.stroke();
        }

            // 中心点
        this.graphics.strokeColor = cc.Color.RED;
        this.graphics.fillColor = cc.Color.RED;
        let centerCol = Math.floor(this.colsNum / 2);
        let centerRow = Math.floor(this.rowsNum / 2);
        this.graphics.circle(this.startX + centerCol * this.tileWidth, this.startY + centerRow * this.tileWidth, 5);
        this.graphics.fill();

        this.pieceMap = [];
        for (let y = 0; y < this.rowsNum; y++) {
            this.pieceMap[y] = [];
            for (let x = 0; x < this.colsNum; x++) {
                this.pieceMap[y][x] = new wuziqiPiece(x, y, wuziqiConstants.NONE);
            }
        }
        
    },
    
    getCoorByPos(pos){
        let touchCol = Math.round((pos.x - this.startX) / this.tileWidth);
        let touchRow = Math.round((pos.y - this.startY) / this.tileWidth);
        return cc.v2(touchCol, touchRow);
    },
    getPieceByCoor(coor) {
        return this.pieceMap[coor.x][coor.y];
    },

    onTouched(event) {
        let localPos = this.node.convertToNodeSpaceAR(event.getLocation());
        let coor = this.getCoorByPos(localPos);
        this.wuziqiScene.onBoardTouched(coor);
    },

    addListeners() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouched, this);
    },
    placeBlack(coor) {
        
        this.graphics.strokeColor = cc.Color.BLACK;
        this.graphics.fillColor = cc.Color.BLACK;
        this.graphics.circle(this.startX + coor.x * this.tileWidth, this.startY + coor.y * this.tileWidth, this.tileWidth * 0.45);
        this.graphics.fill();
        this.pieceMap[coor.x][coor.y] = new wuziqiPiece(coor.x, coor.y, wuziqiConstants.BLACK);
        this.lastPiece = this.pieceMap[coor.x][coor.y];
        this.drawLastPieceRect();
    },

    placeWhite(coor) {
        this.graphics.strokeColor = cc.Color.WHITE;
        this.graphics.fillColor = cc.Color.WHITE;
        this.graphics.circle(this.startX + coor.x * this.tileWidth, this.startY + coor.y * this.tileWidth, this.tileWidth * 0.45);
        this.graphics.fill();
        this.pieceMap[coor.x][coor.y] = new wuziqiPiece(coor.x, coor.y, wuziqiConstants.WHITE);
        this.lastPiece = this.pieceMap[coor.x][coor.y];
        this.drawLastPieceRect();
    },


    drawLastPieceRect() {
        this.graphics2.clear();
        if (this.lastPiece) {
            this.graphics2.strokeColor = cc.Color.RED;
            this.graphics2.rect(this.startX + this.tileWidth * this.lastPiece.x - this.tileWidth / 2,
                this.startY + this.tileWidth * this.lastPiece.y - this.tileWidth / 2,
                this.tileWidth, this.tileWidth);
            this.graphics2.stroke();
        }
    },

    judgeWin() {
        //判断横向
        let fiveCount = 0;
        for (let x = 0; x < this.colsNum; x++) {
            if (this.pieceMap[x][this.lastPiece.y].color === this.lastPiece.color) {
                fiveCount++;
                if (fiveCount === 5) {
                    return true;
                }
            } else {
                fiveCount = 0;
            }
        }
        //判断纵向
        fiveCount = 0;
        for (let y = 0; y < this.rowsNum; y++) {
            if (this.pieceMap[this.lastPiece.x][y].color === this.lastPiece.color) {
                fiveCount++;
                if (fiveCount == 5) {
                    return true;
                }
            } else {
                fiveCount = 0;
            }
        }
        //判断右上斜向
        let f = this.lastPiece.y - this.lastPiece.x;
        fiveCount = 0;
        for (let x = 0; x < this.colsNum; x++) {
            if (f + x < 0 || f + x >= this.rowsNum) {
                continue;
            }
            if (this.pieceMap[x][f + x].color === this.lastPiece.color) {
                fiveCount++;
                if (fiveCount == 5) {
                    return true;
                }
            } else {
                fiveCount = 0;
            }
        }
        //判断右下斜向
        f = this.lastPiece.y + this.lastPiece.x;
        fiveCount = 0;
        for (let x = 0; x < 15; x++) {
            if (f - x < 0 || f - x >= this.rowsNum) {
                continue;
            }
            if (this.pieceMap[x][f - x].color === this.lastPiece.color) {
                fiveCount++;
                if (fiveCount == 5) {
                    return true;
                }
            } else {
                fiveCount = 0;
            }
        }
        return false;
    },


    // update (dt) {},
});
