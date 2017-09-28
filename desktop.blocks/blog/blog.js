modules.define('blog', ['i-bem-dom','jquery' ], function(provide, bemDom,$) {

provide(bemDom.declBlock(this.name, {
    onSetMod: {
        'js': {
            'inited': function() {
            var domElem = this.domElem;
                filterItem = this._elem('filter-item');
                currentFilterItem = this.findChildElems('filter-item','active', true);
                this._domEvents('filter-item').on('click',this._onCurrentNavItem);
            }
        }
    },
    _onCurrentNavItem: function(e) {
        currentFilterItem.setMod('active', false);
        e.bemTarget.setMod('active', true);
        curTagFilter = e.bemTarget.params.tag;
        this._elems('item').forEach(function(elem) {
            elemTag = elem.params.tag;
            //elem.delMod('active');
            elem.delMod('noactive');
            if(elemTag != curTagFilter){

               elem.setMod('noactive');
            }
            if(curTagFilter === 'all'){ 
               //elem.setMod('active');
               elem.delMod('noactive');
            }
        });
        
    },
    
}));

});