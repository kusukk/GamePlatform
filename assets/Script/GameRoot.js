// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        maskPanel: cc.Node,
        message : cc.Label,
        btn1: cc.Button,
        btn2 : cc.Button,
        tipPanel : cc.Node,
        tip : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},



    start () {

    },

    showMaskMessage(message, btn1, btn2) {
        this.message.string = message;
        if(!this.maskPanel.active){
            this.maskPanel.active = true;
        }
        if(btn1){
            this.btn1.active = true;
            this.btn1.getComponent(cc.Label).string = btn1.label;
            this.btn1.once(cc.Node.EventType.TOUCH_END, function(){
                this.hideMaskMessage();
                if(btn1.cb){
                    btn1.cb();
                }
            },btn1.target);
        }
        else {
            this.btn1.active = false;
        }
        if(btn2){
            this.btn2.active = true;
            this.btn2.getComponent(cc.Label).string = btn2.label;
            this.btn2.once(cc.Node.EventType.TOUCH_END, function(){
                this.hideMaskMessage();
                if(btn2.cb){
                    btn2.cb();
                }
            },btn2.target);
        }
        else {
            this.btn2.active = false;
        }
    },

    hideMaskMessage() {
        this.maskPanel.active = false;
    },

    showTip(tip){
        this.tip.string = tip;
        this.tipPanel.getComponent(cc.Animation).play();
    },
    // update (dt) {},
});
