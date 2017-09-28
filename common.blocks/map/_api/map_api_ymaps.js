//modules.define('map', ['i-bem__dom', 'loader_type_js', 'jquery' ], function(provide, BEMDOM,loader, $) {
	modules.define('map', ['i-bem-dom', 'jquery' ], function(provide, BEMDOM, $) {



provide(

	//BEMDOM.decl({ block: this.name, modName: 'api', modVal: 'ymaps' },  {
	BEMDOM.declBlock( this.name,  {	
    onSetMod: {
        'js' : {
            
            'inited' : function() {
            	this.loadMapsApi();
                    
            }
        }
    },
    // Описываем модули, которые будем загружать.
        mapsPackages: [
            [
                'package.full'
            ]
        ],
        /**
         * Загрузчик API.
         */
        loadMapsApi: function () {
            if (!window.ymaps) {
            	var apiScript = document.createElement('script');
                //var apiScript = {},
                    apiCallback = 'ymapsloaded';

                window[apiCallback] = $.proxy(function () {
                    this.onAPILoaded();
                }, this);
                apiScript.src = [
                    'http://api-maps.yandex.ru/2.1/?',
                    '&load=' + this.mapsPackages[0].join(','),
                    '&lang=' + this.params.lang,
                    '&onload=' + apiCallback
                ].join('');
                document.body.appendChild(apiScript);

            } else {
                console.log(window.ymaps);
                this.onAPILoaded();
            }
        },
 	onAPILoaded: function () {
        this.initMap();
 
    },
    initMap: function () {
     	console.log(window);
     	var center = this.params.center || [55.74438877721849,37.563853499999986],
            zoom = this.params.zoom;
        this._map = new ymaps.Map(this.domElem[0], {
            center: center,
            zoom: zoom,
            behaviors: ['drag', 'dblClickZoom'],
            controls: ['zoomControl']
        });
        this._map.behaviors.disable('scrollZoom');
        // Если есть метки, то добавляем метки на карту.
        if (this.params.geoObjects && this.params.geoObjects.length > 0) {
            this.params.geoObjects.forEach(function (item) {
                // Проверяем, является ли элемент коллекцией / группой.
                var geoObject;
                if (item.collection) {
                    geoObject = new ymaps.GeoObjectArray({
                        properties: item.properties
                    }, item.options);

                    // Теперь добавим элементы, описанные в bemjson в коллецию.
                    item.data.forEach(function (placemark) {
                        placemark.options = placemark.options || {};
                        geoObject.add(new ymaps.Placemark(placemark.coords, placemark.properties, placemark.options));
                    }, this);
                } else {
                    item.options = item.options || {};
                    geoObject = new ymaps.Placemark(item.coords, item.properties, item.options);
                }
                // После можно добавлять географический объект на карту.
                this._map.geoObjects.add(geoObject);
            }, this);
        }       
    },
    
}));
});






