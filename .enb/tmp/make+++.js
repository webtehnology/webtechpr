var fs = require('fs'),
    path = require('path'),
    techs = {
        // essential
        fileProvider: require('enb/techs/file-provider'),
        fileMerge: require('enb/techs/file-merge'),

        // optimization
        borschik: require('enb-borschik/techs/borschik'),
        //stylus
        stylus: require('enb-stylus/techs/stylus'),
        //css
        // postcss: require('enb-postcss/techs/enb-postcss'),
        // postcssPlugins: [
        //     require('postcss-import')(),
        //     require('postcss-each'),
        //     require('postcss-for'),
        //     require('postcss-simple-vars')(),
        //     require('postcss-calc')(),
        //     require("postcss-color-hex-alpha")(),
        //     require('postcss-color-hexa')(),
        //     require('postcss-nested'),
        //     require('rebem-css'),
        //     require('postcss-url')({ url: 'inline' }),
        //     require('autoprefixer')(),
        //     require('postcss-reporter')()
        // ],

        // js
        browserJs: require('enb-js/techs/browser-js'),

        // bemtree
        bemtree: require('enb-bemxjst/techs/bemtree'),

        // bemhtml
        bemhtml: require('enb-bemxjst/techs/bemhtml'),
        bemjsonToHtml: require('enb-bemxjst/techs/bemjson-to-html')
    },
    enbBemTechs = require('enb-bem-techs'),
    merged = require('./techs/merged'),
    levels = [
        { path: 'node_modules/bem-core/common.blocks', check: false },
        { path: 'node_modules/bem-core/desktop.blocks', check: false },
        { path: 'node_modules/bem-components/common.blocks', check: false },
        { path: 'node_modules/bem-components/desktop.blocks', check: false },
        { path: 'node_modules/bem-components/design/common.blocks', check: false },
        { path: 'node_modules/bem-components/design/desktop.blocks', check: false },
        'common.blocks',
        'touch-phone.blocks',
        'desktop.blocks'
    ];

module.exports = function(config) {
    var isProd = process.env.YENV === 'production',
        mergedBundleName = 'merged',
        pathToMargedBundle = path.join('desktop.bundles', mergedBundleName);

    fs.existsSync(pathToMargedBundle) || fs.mkdirSync(pathToMargedBundle);

    merged(config, pathToMargedBundle);

    config.nodes('*.bundles/*', function(nodeConfig) {
        var isMergedNode = path.basename(nodeConfig.getPath()) === mergedBundleName;

        isMergedNode || nodeConfig.addTechs([
            [techs.fileProvider, { target: '?.bemjson.js' }],
            [enbBemTechs.bemjsonToBemdecl]
        ]);

        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: levels }],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            //css
            [techs.stylus, {
                target: '?.css',
                oneOfSourceSuffixes: ['.styl', '.css'],
                //compress: true
            }],
            // [techs.postcss, {
            //     target: '?.css',
            //     oneOfSourceSuffixes: ['post.css', 'styl','css'],
            //     plugins: techs.postcssPlugins
            // }],

            // bemtree
            [techs.bemtree, { sourceSuffixes: ['bemtree', 'bemtree.js'] }],

            // bemhtml
            [techs.bemhtml, {
                sourceSuffixes: ['bemhtml', 'bemhtml.js'],
                forceBaseTemplates: true,
                engineOptions : { elemJsInstances : true }
            }],

            // html
            [techs.bemjsonToHtml],

            // client bemhtml
            // [enbBemTechs.depsByTechToBemdecl, {
            //     target: '?.bemhtml.bemdecl.js',
            //     sourceTech: 'js',
            //     destTech: 'bemhtml'
            // }],
            // [enbBemTechs.deps, {
            //     target: '?.bemhtml.deps.js',
            //     bemdeclFile: '?.bemhtml.bemdecl.js'
            // }],
            // [enbBemTechs.files, {
            //     depsFile: '?.bemhtml.deps.js',
            //     filesTarget: '?.bemhtml.files',
            //     dirsTarget: '?.bemhtml.dirs'
            // }],
            // [techs.bemhtml, {
            //     target: '?.browser.bemhtml.js',
            //     filesTarget: '?.bemhtml.files',
            //     sourceSuffixes: ['bemhtml', 'bemhtml.js'],
            //     engineOptions : { elemJsInstances : true }
            // }],
            // client bemhtml
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [enbBemTechs.deps, {
                target: '?.bemhtml.deps.js',
                bemdeclFile: '?.bemhtml.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [techs.bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                sourceSuffixes: ['bemhtml', 'bemhtml.js'],
                engineOptions : { elemJsInstances : true }
            }],


            // js
            [techs.browserJs, { includeYM: true }],
            [techs.fileMerge, {
                target: '?.js',
                sources: ['?.browser.js', '?.browser.bemhtml.js']
            }],

            // borschik
            [techs.borschik, { source: '?.js', target: '?.min.js', minify: isProd }],
            [techs.borschik, { source: '?.css', target: '?.min.css', minify: isProd }]
        ]);

        nodeConfig.addTargets([/* '?.bemtree.js', */ '?.min.css', '?.min.js']);
        isMergedNode || nodeConfig.addTargets(['?.html']);
    });
};