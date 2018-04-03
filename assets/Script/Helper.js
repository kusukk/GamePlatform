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

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setLoadingDisplay(){
        if(cc.sys.isNative){
            return;
        }
        var splash = document.getElementById('splash');
        var progressBar = splash.querySelector('.progress-bar span');
        cc.loader.onProgress = function(comCount, totalCount, item){
            var percent = 100* comCount/totalCount;
            if(progressBar){
                progressBar.style.width = percent.toFixed(2) + '%';
            }
        };
        splash.style.display = 'block';
        progressBar.style.width = '0%';
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none';
        });
    },

    loadSceneWithProgress(sceneName,callback){
        this.setLoadingDisplay();
        cc.director.preloadScene(sceneName, function(){
            setTimeout(function() {
                cc.director.loadScene(sceneName,callback);
            }, 1);
        });
    },
    // update (dt) {},
    enterHall(){
        cc.director.loadScene("hall");
    },
    enterTest(){
        this.loadSceneWithProgress("test");
    },
});
