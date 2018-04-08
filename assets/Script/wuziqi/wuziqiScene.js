// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var wuziqiBoard = require("wuziqiBoard");
// var Helper = require("../Helper");
var Helper = require("../Helper").Helper;
var wuziqiConstants = require("wuziqiConstants");

var wuziqiAI = require("wuziqiAI");

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
        board: wuziqiBoard,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        this.board.init(this);
        this.ai = new wuziqiAI.GobangAI(this.board);
        this.startGame();
    },

    startGame() {
        this.state = wuziqiConstants.BLACK;
        this.board.reset();
        Helper.gameRoot.showTip("你是黑棋你先走");
    },

    onBoardTouched(coor) {
        switch (this.state) {
            case wuziqiConstants.NONE:
            
            break;
            case wuziqiConstants.BLACK:
                let piece = this.board.getPieceByCoor(coor);
                
                if (piece.color !== wuziqiConstants.NONE) {
                    Helper.gameRoot.showTip("这里有子了，你是不是傻");
                    return;
                }
                this.board.placeBlack(coor);
                if (this.board.judgeWin()) {
                    this.overGame();
                } 
                else {
                    this.state = wuziqiConstants.WHITE;
                    this.scheduleOnce(() => {
                        this.board.placeWhite(this.ai.getNextCoor());
                        if (this.board.judgeWin()) {
                            this.overGame();
                        } else {
                            this.state = wuziqiConstants.BLACK;
                        }
                    }, 1);
                }
                break;
            case wuziqiConstants.WHITE:
                // this.board.placeWhite(coor);
                // if(this.board.judgeWin()) {
                //     cc.log("白棋胜");
                // }else {
                //     this.state = BLACK;
                // }
                break;
            default: break;
        }
    },

    overGame() {
        if(this.state === wuziqiConstants.BLACK) {
            cc.log("黑棋胜");
            this.state = wuziqiConstants.NONE;
            Helper.gameRoot.showMaskMessage("你赢了阿尔法二狗！",
            { label: "朕知道了", cb: function () { }, target: this }
            );
        }else if(this.state === wuziqiConstants.WHITE) {
            cc.log("白旗胜");
            Helper.gameRoot.showMaskMessage("你输给了阿尔法二狗！",
            { label: "服了", cb: function () { }, target: this }, { label: "不服", cb: function () { }, target: this });
            this.state = wuziqiConstants.NONE;
        }
    },

    onBtnReturn() {
        Helper.enterHall();
    },

    onBtnRestart() {
        this.startGame();
    },
    // update (dt) {},
});
