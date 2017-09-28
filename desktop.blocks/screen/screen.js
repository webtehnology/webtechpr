modules.define('screen', ['i-bem-dom','jquery'], function(provide, bemDom,$) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
            console.log('инициализация блока screen');
            var domElem = this.domElem;
                united = this._elem('united');
                counter = 0;
                // scroll = 0;
                // delta = 0;
                this.browseHeight = document.body.clientHeight;
                var _this = this;
                this._elems('united').forEach(function(elem, index, arr) {
                counter++;
                if(index === 0){
                      elem.domElem.css({ 
                                        opacity: '1',
                                        display: 'block',
                                        height: _this.browseHeight +'px',
                                        'z-index' :'1'
                                    }
                                   );
                    };
                if(index != 0){
                      elem.domElem.css({ 
                                        opacity: '1',
                                        //transform: "translateY(100%) translateZ(0px)",
                                        display: 'block',
                                        //'min-height':_this.browseHeight/2 +'px',
                                        'z-index' :counter
                                    }
                                   );
                    }
                });
                
                //this._domEvents(bemDom.win).on('mousewheel',this._onWheel);
                this._domEvents(bemDom.win).on('scroll',this._onScroll);
                //this._events('united').on({ modName : 'active', modVal : true },this._onCurScreen);
            }
        }
    },
    getCurrentScreenIndex: function() {
            var active = this.findChildElem({ elem: 'united', modName: 'active', modVal: true });
            //console.log(active.)
            return active.domElem.index();
        },

    _onScroll: function(e) {
        var domElem = this.domElem;
        console.log('начали скролить');
        this.scroll = bemDom.win.scrollTop();
        this.offsetTop = domElem.offset().top;
        this.height = domElem.height();

        
        if(this.scroll <= this.browseHeight){
           this.positionFirst = Math.round((this.scroll/2))  +'px';
           this.positionFirstVal = this.scroll/2;

        };
        //console.log('this.positionFirst='+this.positionFirst+'  this.scroll='+this.scroll)

        this.opacity = this.scroll < 50 ? 1 : this.scroll * 4 / 1000;
        this.topDistance = this.scroll;
        this.positionNext = (Math.round((this.topDistance))) +'px';
       
         var _this = this;
                this._elems('united').forEach(function(elem, index, arr) {
                
                if(index != 0){
                counter++;
                positionTop = (elem.domElem.position().top - _this.browseHeight);
                screenHeight = elem.domElem.height();
                    //elem.setMod('active', _this.scroll > positionTop && (positionTop + screenHeight) > _this.scroll); 
                    //if(elem.hasMod('active')){
                        elem.domElem.css({ 
                                        opacity: 1,
                                        //transform: "translateY(-" + (_this.topDistance) + "px) translateZ(0px)",
                                        display: 'block',
                                    }
                                   );
                    //};
                    
                    
                    

                };
                if(index === 0){
                      elem.domElem.css({ 
                                        'transition-timing-function': 'cubic-bezier(0.1, 0.57, 0.1, 1)',
                                        'transition-duration': '0s',
                                        opacity: _this.opacity,
                                        //transform: "translateY(-" + (_this.positionFirst) + ") translateZ(0px)",
                                        display: 'block',
                                        height: _this.browseHeight +'px'
                                    }
                                   );
                    };
                });
                      
    },
    // _onWheel: function(e) {
    //     var evt = e.originalEvent ? e.originalEvent : e;
    //         delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;
    //         var info = document.getElementById('delta');
    //         if(info.innerHTML == this.browseHeight){
    //                 info.innerHTML = this.browseHeight
    //         }
    //         info.innerHTML = +info.innerHTML + delta;
            
    //         scroll = info.innerHTML

    //         if(scroll <= this.browseHeight){
    //         this.positionFirst = Math.round((scroll))  +'px';
    //         };
    //         if(scroll*(-1) >= '800'){
    //         this.positionFirst = '110%';
    //         };
    //         if(scroll > 0){
    //        this.positionFirst = '0'  +'px';
    //         };
    //         var _this = this;
    //             this._elems('united').forEach(function(elem, index, arr) {
    //             if(index === 0){
    //                   elem.domElem.css({ 
    //                                     'transition-timing-function': 'cubic-bezier(0.1, 0.57, 0.1, 1)',
    //                                     'transition-duration': '0s',
    //                                     opacity: _this.opacity,
    //                                     transform: "translateY(" + _this.positionFirst + ") translateZ(0px)",
    //                                     display: 'block',
    //                                     height: _this.browseHeight +'px'
    //                                 }
    //                                );
    //                 };
    //             });

    //     console.log('Скроллим ' + (delta > 0 ? 'вверх' : 'вниз')+ ' на значение='+delta+' newScroll='+info.innerHTML);
    // },


       
    
}));

});