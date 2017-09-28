modules.define('price', ['i-bem-dom','jquery' ], function(provide, bemDom,$) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
            var domElem = this.domElem;
                this._current = this.findChildElems('nav-item','active', true);
                this._domEvents('nav-item').on('click',this._onCurrentItem);
                this._events('nav-item').on({ modName : 'active', modVal : true }, this._onCurSection);
            }
        }
    },
    _onCurrentItem: function(e) {
        this._current.setMod('active', false);
        e.bemTarget.setMod('active', true);
        
    },
    _onCurSection: function(e) {
       var curSection = e.bemTarget.params.type;
           this._elem('section-item').delMod('active');
           this._elems('section-item').forEach(function(elem) {
           elem.setMod('active', elem.params.type == curSection);
                 
        });
    }
}));

});