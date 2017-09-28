modules.define('philosophy', ['i-bem-dom','jquery',  'BEMHTML' ], function(provide, bemDom,$, BEMHTML) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
            //console.log('Слайдер инициализирован')
            var  domElem = this.domElem;
                 counter = 0;
                 slidesWrap = this._elem('list');
                 slide = this._elem('item');
                 step = 3;
                 position = 0;
                 //console.log('Шаг слайдера', step);
           
            //Ширина каждого слайда
                 this.slideWidth = slide.domElem.outerWidth(true); 
                 this.slideWidthInner = slide.domElem.width();
                 this.sledeMargin = this.slideWidth - this.slideWidthInner;
                 //console.log(this.sledesMargin);
            //Видимая ширина слайдбара
                 slidesWidth = this.slideWidth * step; 
                 //console.log('Видимая ширина слайдбара', innerWidth);
                 //slidesWrap.domElem.css({ width: slidesWidth}); 
            //Определяем ширину всех элементов
            var _this = this;
                 this._elems('item').forEach(function(elem) {
                          counter++;    
                      });
                 //console.log('Число элементов', counter);
                 slidesWidthFull = (this.slideWidth * counter);
                 this.domElem.css({ width: slidesWidthFull}); 
                 //console.log('Общая ширина слайдбара', slidesWidthFull);
                 slidesWrap.domElem.css({transform: 'translate3d(0px, 0px, 0px)', transition: '0s', width: slidesWidthFull}); 


            //Сдвигаем слайды влево
                 this._domEvents('control-right').on('click', function(e) {
                 //console.log('клик по gравому контролу');
                 position = Math.min(position + (this.slideWidth+this.sledeMargin) * step, 0);
                 shift = 'translate3d('+position+'px, 0px, 0px)';
                 //console.log('Определяем на сколько сдвинуть', position);
                 this._elem('list').domElem.css({transform: shift, transition: '250ms', width: slidesWidthFull});

                 }); 
            //Сдвигаем слайды вправо 
                 this._domEvents('control-left').on('click', function(e) {
                 //console.log('клик по левому контролу');
                 val1 = position - (this.slideWidth+this.sledeMargin) * step;
                 val2 = -this.slideWidth * (counter - step) 
                 position = Math.max(val1, val2);
                 shift = 'translate3d('+position+'px, 0px, 0px)';
                 //console.log(test);
                 this._elem('list').domElem.css({transform: shift, transition: '250ms', width: slidesWidthFull});
                 this._elem('list').setMod('active');
                 }); 
           



                
                
            }
        },
        },
        
    
    

       
    
}));

});