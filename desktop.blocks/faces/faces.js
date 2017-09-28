modules.define('faces', ['i-bem-dom','jquery',  'BEMHTML' ], function(provide, bemDom,$, BEMHTML) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
            console.log('block faces initet');
            var  domElem = this.domElem;
                 item = this._elem('control-item');
            //Кликаем по слайду
                 this._domEvents('control-item').on('click',this._onCurSlide);
            //Определяем первый активный элемент
                 this._events('control-item').on({ modName : 'active', modVal : true },this._onCurFaces);
                 item.setMod('active');
                 



                
                
            }
        },
        },
         _onCurSlide: function(e) {
                var   oneSrc = e.bemTarget.params.src;
                      oneId = e.bemTarget.params.id;
                      name = e.bemTarget.params.name;
                      post = e.bemTarget.params.post;
                      social = e.bemTarget.params.social;
                      idea = e.bemTarget.params.idea;
                      this._elems('control-item').forEach(function(elem, index, arr) {
                        elemId = elem.params.id
                        console.log(elemId);
                        elem.delMod('active');
                        if(elemId === oneId){
                            elem.setMod('active');
                        }
                      });
                            
                            //console.log('Номер первого слайдера='+oneId+'   Адрес изображения='+oneSrc );
                        var facesSubDefault =  {
                                                       block:'face-data',
                                                       js:{src:oneSrc},
                                                       content:[
                                                                {
                                                                    elem:'foto',
                                                                    tag:'img',
                                                                    attrs:{src:oneSrc},
                                                                },
                                                       ]
                                                    };
                            contentSubDefault =  {
                                                       block:'faces-data',
                                                       content:[
                                                                {
                                                                    elem:'title',
                                                                    tag:'h4',
                                                                    content:name
                                                                },
                                                                {
                                                                    elem:'post',
                                                                    content:post
                                                                },
                                                                {
                                                                    elem:'social',
                                                                    content:[
                                                                                {
                                                                                    elem:'fb',
                                                                                    attrs:{href:social, target:'_blank'},
                                                                                    tag:'a',
                                                                                    content:''
                                                                                },
                                                                    ]
                                                                },
                                                                {
                                                                    elem:'idea',
                                                                    content:[
                                                                                // {
                                                                                //     elem:'idea-heading',
                                                                                //     tag:'h5',
                                                                                //     content:'Умные мысли'
                                                                                // },
                                                                                {
                                                                                    elem:'idea-text',
                                                                                    tag:'p',
                                                                                    content:idea,
                                                                                }
                                                                    ]
                                                                }
                                                       ]
                                                    };
                            subfoto = BEMHTML.apply(facesSubDefault);
                            subcontent = BEMHTML.apply(contentSubDefault);
                            bemDom.update(this._elem('image').domElem, subfoto);
                            bemDom.update(this._elem('content').domElem, subcontent);
     },
    _onCurFaces: function(e) {
        var   oneSrc = e.bemTarget.params.src;
              oneId = e.bemTarget.params.id;
              name = e.bemTarget.params.name;
              post = e.bemTarget.params.post;
              social = e.bemTarget.params.social;
              idea = e.bemTarget.params.idea;
            
            //console.log('Номер первого слайдера='+oneId+'   Адрес изображения='+oneSrc );
        var facesMainDefault =  {
                                       block:'face-data',
                                       js:{src:oneSrc},
                                       content:[
                                                {
                                                    elem:'foto',
                                                    tag:'img',
                                                    attrs:{src:oneSrc},
                                                },
                                       ]
                                    };
            contentMainDefault =  {
                                       block:'faces-data',
                                       content:[
                                                {
                                                    elem:'title',
                                                    tag:'h4',
                                                    content:name
                                                },
                                                {
                                                    elem:'post',
                                                    content:post
                                                },
                                                {
                                                    elem:'social',
                                                    content:[
                                                                {
                                                                    elem:'fb',
                                                                    attrs:{href:social, target:'_blank'},
                                                                    tag:'a',
                                                                    content:''
                                                                },
                                                    ]
                                                },
                                                {
                                                    elem:'idea',
                                                    content:[
                                                                // {
                                                                //     elem:'idea-heading',
                                                                //     tag:'h5',
                                                                //     content:'Умные мысли'
                                                                // },
                                                                {
                                                                    elem:'idea-text',
                                                                    tag:'p',
                                                                    content:idea,
                                                                }
                                                    ]
                                                }
                                       ]
                                    };
            foto = BEMHTML.apply(facesMainDefault);
            content = BEMHTML.apply(contentMainDefault);
            bemDom.update(this._elem('image').domElem, foto);
            bemDom.update(this._elem('content').domElem, content);
    },
    

       
    
}));

});