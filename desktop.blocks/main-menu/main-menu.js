modules.define('main-menu', ['i-bem-dom', 'jquery'], function(provide, bemDom, $) {

provide(bemDom.declBlock(this.name, {
onSetMod : {
        'js' : {
            'inited' : function() {

            	var domElem = this.domElem;
            		this.open = this._elem('open'); 
            	    this.content = this._elem('content');
            	    this.close = this._elem('close');
                    this.state = this._elem('state');
            	    this._domEvents('open').on('click',this._onOpenMenu );
            	    this._domEvents('close').on('click',this._onCloseMenu );
            }
        }
    },
    _onOpenMenu: function(e) {
    	var domElem = this.domElem;
    	this.content.setMod('active');
    	this.close.setMod('active');
        $('.page').addClass('page_scroll_no');
        $('.content__inner').addClass('content__inner_menu_active');
        $('.header__logo').css({transform: 'matrix(0.85, 0, 0, 0.85, 0, 0)'})

    },
    _onCloseMenu: function(e) {
    	
    	this.content.delMod('active');
        $('.page').removeClass('page_scroll_no');
        $('.content__inner').removeClass('content__inner_menu_active');
        $('.header__logo').css({transform: 'matrix(1, 0, 0, 1, 0, 0)'})
        
    },


}));

});


