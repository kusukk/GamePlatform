// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var HttpNet = require("./HttpNet");
// var Helper = require("../Helper");
var Helper = require("../Helper").Helper;

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onBtn1 () {
        // cc.director.loadScene("test");
        Helper.enterTest();
    },
    onBtn2 () {
        var fn = function(ret){

        }
        console.log("bbbbbbbbb");
        HttpNet.sendRequest("c=settings&m=get_url",{},fn);
    },
    onBtn3 () {
        console.log("cccccccc");
        var fn = function(ret){
            
        }
        HttpNet.sendRequest("c=settings&m=static_table_info",{table_name:"_basic_art"},fn);
    },
        
    // update (dt) {},
});
