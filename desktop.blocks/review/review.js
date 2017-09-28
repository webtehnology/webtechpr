modules.define('review', ['i-bem-dom','jquery',  'BEMHTML' ], function(provide, bemDom,$, BEMHTML) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {

            console.log('видеоблок инициализирован');
            var  domElem = this.domElem;
                 media = this._elem('media');
                 mediaAll = this._elems('media');
                 this._domEvents('media').on('click',this._onCurReview);
            }
        },
        },
        _onCurReview: function(e) {
            var curSrc = e.bemTarget.params.src;
                curReview = e.bemTarget.params.review;
                mediaAll.delMod('active');
                e.bemTarget.setMod('active');
                videoOpen = {
                                block:'review-video',
                                content:[
                                            {
                                                elem:'video',
                                                tag:'video',
                                                attrs:{autoplay:'',controls:'', loop:'', width:'100%', height:'auto'},
                                                content:[
                                                            {
                                                                tag:'source',
                                                                attrs:{type:'video/mp4', src:curSrc}
                                                            },                                                                                                
                                                        ]
                                            }
                                ]
                            };
                            video = BEMHTML.apply(videoOpen);
                            this._elems('media').forEach(function(elem, index, arr) {
                            if(curReview != elem.params.review){
                                bemDom.destruct(elem.domElem, video);
                            }
                            });
                            
                            bemDom.append(e.bemTarget.domElem, video);
        },

    

       
    
}));

});