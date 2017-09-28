modules.define('process', ['jquery', 'i-bem-dom'], function(provide, $, bemDom) {

    provide(bemDom.declBlock(this.name, {
        onSetMod: {
            js: {
                inited: function() {
                    this._events('content').on({ modName : 'visible', modVal : true },this._onVisible);
                    var isVertical = this.hasMod('orientation', 'vertical');
                        domElem = this.domElem;
                        this.slidesHeight = screen.height ; 
                        this.browseHeight = document.body.clientHeight;
                        this.offsetTop = this.domElem.offset().top;
                        this.shift = this._elem('shift');
                        if(this.browseHeight <= 750  ){
                        domElem.css({ height: this.browseHeight+150});
                        this._elem('media').domElem.css({ height: this.browseHeight+150});
                        }
                        if(this.browseHeight >= 750  ){
                        domElem.css({ height: this.browseHeight}); 
                        }
                    this._direction = {
                        next: isVertical ? 'top' : 'left',
                        prev: isVertical ? 'bottom' : 'right',
                    };
                    this._elem('play').domElem.css({display:'none'});
                    // if (this.params.to) {
                    //     this.to(this.params.to);
                    // } else if (this.params.action) {
                    //     this[this.params.action]();
                    // } else if (this.params.interval) this.cycle(); 
                    //this.params.pause == 'hover' 
                    //&&
                     // this._domEvents()
                     //    .on('mouseenter', this.pause)
                     //    .on('mouseleave', this.cycle);
                    this._domEvents()
                            .on('mouseenter', this.cycle)
                            .on('mouseleave', this.pause);
                    this._domEvents(bemDom.win).on('scroll',this._onScroll);
                    this._events('item').on({ modName : 'state', modVal : 'active' },this._onCurSlide);
                    
                    this._domEvents('nav-item').on('click',this._onCurSection );
                    var _this = this;
                    this._elems('thesis-item').forEach(function(elem,index, arr) {

                    elem.domElem.css({ 
                                        opacity: '0',
                                        transform: "translateY(110%) translateZ(0px)",
                                    });      
                    });
                    this._elems('nav-item').forEach(function(elem, index, arr) {
                        elemOffsetWidth = elem.domElem.outerWidth();
                        elemPositionLeft = elem.domElem.position().left;
                        if(elem.hasMod('active')){
                            _this.shift.domElem.css({ 
                                        width : elemOffsetWidth +'px',
                                        left: elemPositionLeft +'px',
                                });
                        }


                    });



                    

                },
            },
        },
        _onScroll: function(e) {
          this.scroll = bemDom.win.scrollTop();
          //console.log(this.scroll +'    '+this.offsetTop);
          if(this.scroll > this.offsetTop){
            this._elems('content').setMod('visible');             
            };
          if(this.scroll < this.offsetTop){
            this._elems('content').delMod('visible');             
            };

        },
        _onVisible:function(e) {
           this._elems('thesis-item').forEach(function(elem,index, arr) {

                    if(index === 0){    
                    elem.domElem.css({ 
                                        opacity: '1',
                                        transform: "translateY(0px) translateZ(0px)",
                                        'transition-duration': '.5s',
                                    });       
                    };   
                    });
           this._elem('play').domElem.css({display:'block'});
           var video = document.getElementById('video');
                video.play();

                    
        },

        getCurrentSlideIndex: function() {
            var active = this.findChildElem({ elem: 'item', modName: 'state', modVal: 'active' });
            return active.domElem.index();
        },

        cycle: function(e) {
            if (!e) this.paused = false;

            // TODO: use channels here
            // note: don't drop current implementation support
            this.params.interval &&
            !this.paused &&
            (this.interval = setInterval($.proxy(this.next, this), this.params.interval));

            return this;
        },

        to: function(pos) {
            var _this = this,
                children = this._elems('item'),
                activePos = this.getCurrentSlideIndex();

            if (pos > (children.size() - 1) || pos < 0) return;

            if (this.sliding) {
                return this._events().on('slid', function() {
                    _this.to(pos);
                    // TODO: check, originally was `one` binding
                    _this._events().un('slid');
                });
            }

            if (activePos == pos) {
                return this.pause().cycle();
            }

            return this.slide(pos > activePos ? 'next' : 'prev', children.get(pos));
        },

        pause: function(e) {
            if (!e) this.paused = true;

            if ((this._elem('item').hasMod('type', 'next') || this._elem('item').hasMod('type', 'prev')) && $.support.transition.end) {
                this.domElem.trigger($.support.transition.end);
                this.cycle();
            }

            clearInterval(this.interval);
            this.interval = null;
            return this;
        },

        next: function() {
            if (this.sliding) return;
            return this.slide('next');
        },

        prev: function() {
            if (this.sliding) return;
            return this.slide('prev');
        },

        slide: function(type, next) {
            var _this     = this,
                fallback  = type == 'next' ? 0 : this._elems('item').size() - 1,
                active    = this.findChildElem({ elem: 'item', modName: 'state', modVal: 'active' }),
                next      = next || this._elems('item').get(active.domElem[type]().index()) || this._elems('item').get(fallback),
                isCycling = this.interval,
                direction = this._direction[type];

            this.sliding = true;

            isCycling && this.pause();

            if (next.hasMod('state', 'active')) return;

            var nextIdx = next.domElem.index();

            // TODO: check if mod name slide is ok

            if ($.support.transition && this.hasMod('animate')) {
                this._emit('slide', { relatedTarget: next.domElem.get(0) }); // TODO: check why we need relatedTarget
                // if (e.isDefaultPrevented()) return;
                next.setMod('type', type);
                next.domElem.get(0).offsetWidth; // force reflow

                active.setMod('dir', direction);
                next.setMod('dir', direction);

                this._domEvents().on($.support.transition.end, function() {

                    _this._domEvents().un($.support.transition.end);

                    next
                        .delMod('type')
                        .delMod('dir')
                        .setMod('state', 'active');

                    active
                        .delMod('state')
                        .delMod('dir');

                    _this.sliding = false;

                    setTimeout(function() {
                        _this._emit('slid', { currentSlideIndex: nextIdx });
                    }, 0);
                });

            } else {

                this._emit('slide', {
                    relatedTarget: next.domElem.get(0),
                });

                // if (e.isDefaultPrevented()) return;

                active.delMod('state');
                next.setMod('state', 'active');

                this
                    ._emit('slid', { currentSlideIndex: nextIdx })
                    .sliding = false;
            }

            isCycling && this.cycle();

            return this;
        },

        _getDefaultParams: function() {
            return {
                interval: 5000,
                pause: 'hover',
            };
        },
        _onCurSlide: function(e) {
            var curSlide = e.bemTarget.params.slide;
            this._elem('thesis-item').delMod('active');
            this._elem('nav-item').delMod('active');
            this._elems('thesis-item').forEach(function(elem) {
           elem.setMod('active', elem.params.slide == curSlide)          
            });
            var _this = this;
            this._elems('nav-item').forEach(function(elem) {
            elem.delMod('active');
            elemOffsetWidth = elem.domElem.outerWidth();
            elemPositionLeft = elem.domElem.position().left;
            elem.setMod('active', elem.params.slide == curSlide);
                if(elem.hasMod('active')){
                            _this.shift.domElem.css({ 
                                        width : elemOffsetWidth +'px',
                                        left: elemPositionLeft +'px',
                                });
                }        
            });
            this._elems('thesis-item').forEach(function(elem) {
                if(elem.hasMod('active')) {    
                    elem.domElem.css({ 
                                        opacity: '1',
                                        transform: "translateY(0px) translateZ(0px)",
                                        'transition-duration': '1s',
                                    });       
                };
                if(!elem.hasMod('active')) {    
                    elem.domElem.css({ 
                                        opacity: '1',
                                        transform: "translateY(110%) translateZ(0px)",
                                        'transition-duration': '.5s',
                                    });       
                };
                
                });

            
                    

        },
        

        _onCurSection: function(e) {
       var curSection = e.bemTarget.params.slide;
           //console.log(curSection);
           this._elem('thesis-item').delMod('active');
           this._elem('nav-item').delMod('active');
           this._elems('item').delMod('state');
           this._elems('thesis-item').forEach(function(elem) {
           elem.setMod('active', elem.params.slide == curSection)          
            });
           this._elems('nav-item').forEach(function(elem) {
           elem.setMod('active', elem.params.slide == curSection)          
        });
           this._elems('item').forEach(function(elem) {
                if( elem.params.slide == curSection ) 
                {
                    elem.setMod('state', 'active');          
                }
        });
    }

    }));

});
