asset.manager = function(ctx) {
    return {
        create: function(options) {
            var ref = require('utils').time;
            //Check if the options object has a createdtime attribute and populate it 
            if ((options.attributes) && (options.attributes.hasOwnProperty('overview_createdtime'))) {
                options.attributes.overview_createdtime = ref.getCurrentTime();
            }
            this._super.create.call(this, options);
        },
        search: function(query, paging) {
            var assets = this._super.search.call(this, query, paging);
            return assets;
        },
        list: function(paging) {
            var assets = this._super.list.call(this, paging);
            return assets;
        },
        get: function(id) {
            var asset = this._super.get.call(this, id);
            return asset;
        }
    };
};
asset.server = function(ctx) {
    var type = ctx.type;
    return {
        onUserLoggedIn: function() {},
        endpoints: {
            apis: [{
                url: 'assets',
                path: 'assets.jag'
            }],
            pages: [{
                title: 'Asset: ' + type,
                url: 'asset',
                path: 'asset.jag'
            }, {
                title: 'Assets ' + type,
                url: 'assets',
                path: 'assets.jag'
            }, {
                title: 'Create ' + type,
                url: 'create',
                path: 'create.jag'
            }, {
                title: 'Update ' + type,
                url: 'update',
                path: 'update.jag'
            }, {
                title: 'Details ' + type,
                url: 'details',
                path: 'details.jag'
            }, {
                title: 'List ' + type,
                url: 'list',
                path: 'list.jag'
            }, {
                title: 'Lifecycle',
                url: 'lifecycle',
                path: 'lifecycle.jag'
            }, {
                title: 'Prepare Ingredients',
                url: 'set_ingredients',
                path: 'set_ingredients.jag'
            }, {
                title: 'Prepare Results',
                url: 'set_results',
                path: 'set_results.jag'
            }, {
                title: 'Set Method',
                url: 'set_process',
                path: 'set_process.jag'
            }, {
                title: 'Deploy',
                url: 'deploy',
                path: 'deploy.jag'
            },{
                title: 'Create Dish',
                url: 'create_dish',
                path: 'create_dish.jag'
            }]
        }
    };
};
asset.configure = function() {
    return {
        table: {
            overview: {
                fields: {
                    provider:{
                        readonly:true
                    },
                    name: {
                        name: {
                            name: 'name',
                            label: 'Name'
                        },
                        validation: function() {}
                    },
                    version: {
                        name: {
                            label: 'Version'
                        }
                    }
                }
            },
            images: {
                fields: {
                    thumbnail: {
                        type: 'file'
                    },
                    banner: {
                        type: 'file'
                    }
                }
            }
        },
        meta: {
            lifecycle: {
                name: 'SampleLifeCycle2',
                commentRequired: true,
                defaultAction: 'Promote'
            },
            ui: {
                icon: 'icon-cog'
            },
            thumbnail: 'images_thumbnail'
        }
    };
};
asset.renderer = function(ctx) {
    var type = ctx.assetType;
    var buildListLeftNav = function(page, util) {
        var log = new Log();
        return [/*{
            name: 'Add ',
            iconClass: 'icon-plus-sign-alt',
            url: util.buildUrl('create')
        }, {
            name: 'Statistics',
            iconClass: 'icon-dashboard',
            url: '/assets/statistics/' + type + '/'
        }*/];
    };
    var buildDefaultLeftNav = function(page, util) {
        var id = page.assets.id;
        return [{
            name: 'Step1 - Overview',
            iconClass: 'icon-list-alt',
            url: util.buildUrl('details') + '/' + id
        }, {
            name: 'Step2 - Prepare Ingredients',
            iconClass: 'icon-cog',
            url: util.buildUrl('set_ingredients') + '/' + id
        }, {
            name: 'Step3 - Prepare Results',
            iconClass: 'icon-cog',
            url: util.buildUrl('set_results') + '/' + id
        }, {
            name: 'Step4 - Set Method',
            iconClass: 'icon-repeat',
            url: util.buildUrl('set_process') + '/' + id
        }, {
            name: 'Step5 - Deploy',
            iconClass: 'icon-download-alt',
            url: util.buildUrl('deploy') + '/' + id
        }/*, {
             name: 'Edit',
             iconClass: 'icon-edit',
             url: util.buildUrl('update') + '/' + id
         }, {
             name: 'Life Cycle',
             iconClass: 'icon-retweet',
             url: util.buildUrl('lifecycle') + '/' + id
         }*/];
    };
    var buildAddLeftNav = function(page, util) {
        return [];
    };
    var isActivatedAsset = function(assetType) {
        var activatedAssets = ctx.tenantConfigs.assets;
        return true;
        if (!activatedAssets) {
            throw 'Unable to load all activated assets for current tenant: ' + ctx.tenatId + '.Make sure that the assets property is present in the tenant config';
        }
        for (var index in activatedAssets) {
            if (activatedAssets[index] == assetType) {
                return true;
            }
        }
        return false;
    };
    return {
        create: function(page) {},
        update: function(page) {},
        list: function(page) {
            var assets = page.assets;
            for (var index in assets) {
                var asset = assets[index];
                if (asset.attributes.overview_createdtime) {
                    var value = asset.attributes.overview_createdtime;
                    var date = new Date();
                    date.setTime(value);
                    asset.attributes.overview_createdtime = date.toUTCString();
                }
            }
        },
        details: function(page) {
                    // To make value element always an Array
                    var dish_asset=page.assets;

                    var connectionVal1 = dish_asset.tables[1].fields.connection.value;
                    var connectionVal2 = dish_asset.tables[2].fields.connection.value;

                    var operationVal1 = dish_asset.tables[1].fields.operation.value;
                    var operationVal2 = dish_asset.tables[2].fields.operation.value;

                    var connectionIdVal1 = dish_asset.tables[1].fields.connectionid.value;
                    var connectionIdVal2 = dish_asset.tables[2].fields.connectionid.value;

                    var urlVal1 = dish_asset.tables[1].fields.icon.value;
                    var urlVal2 = dish_asset.tables[2].fields.icon.value;

                    var paraVal1 = dish_asset.tables[1].fields.parameters.value;
                    var paraVal2 = dish_asset.tables[2].fields.parameters.value;


                    if (!(connectionVal1 instanceof Array)) {
                        var newConnectionVal1 = [connectionVal1];
                        dish_asset.tables[1].fields.connection.value = newConnectionVal1;
                    }
                    if (!(connectionVal2 instanceof Array)) {
                        var newConnectionVal2 = [connectionVal2];
                        dish_asset.tables[2].fields.connection.value = newConnectionVal2;
                    }
                    if (!(operationVal1 instanceof Array)) {
                        var newOperationVal1 = [operationVal1];
                        dish_asset.tables[1].fields.operation.value = newOperationVal1;
                    }
                    if (!(operationVal2 instanceof Array)) {
                        var newOperationVal2 = [operationVal2];
                        dish_asset.tables[2].fields.operation.value = newOperationVal2;
                    }
                    if (!(connectionIdVal1 instanceof Array)) {
                        //var newConnectionVal1 = [connectionIdVal1];
                        dish_asset.tables[1].fields.connectionid.value = [connectionIdVal1];
                    }
                    if (!(connectionIdVal2 instanceof Array)) {
                        //var newConnectionVal2 = [connectionVal2];
                        dish_asset.tables[2].fields.connectionid.value = [connectionIdVal2];
                    }
                    if (!(urlVal1 instanceof Array)) {
                        var newUrlVal1 = [urlVal1];
                        dish_asset.tables[1].fields.icon.value = newUrlVal1;
                    }
                    if (!(urlVal2 instanceof Array)) {
                       var newUrlVal2 = [urlVal2];
                       dish_asset.tables[2].fields.icon.value = newUrlVal2;
                    }

                    if (!(paraVal1 instanceof Array)) {
                        var newParaVal1 = [paraVal1];
                        dish_asset.tables[1].fields.parameters.value = newParaVal1;
                    }
                    if (!(paraVal2 instanceof Array)) {
                       var newParaVal2 = [paraVal2];
                       dish_asset.tables[2].fields.parameters.value = newParaVal2;
                    }

                    page.assets  = dish_asset;

//                        page.assets.tables[1].fields.url.value =  [page.assets.tables[1].fields.url.value];


                    return page;
        },
        lifecycle: function(page) {},
        leftNav: function(page) {
            switch (page.meta.pageName) {
                case 'list':
                    page.leftNav = buildListLeftNav(page, this);
                    break;
                case 'create':
                    page.leftNav=buildAddLeftNav(page,this);
                    break;
                default:
                    page.leftNav = buildDefaultLeftNav(page, this);
                    break;
            }
            return page;
        },
        ribbon: function(page) {
            var ribbon = page.ribbon = {};
            var DEFAULT_ICON = 'icon-cog';
            var assetTypes = [];
            var assetType;
            var assetList = ctx.rxtManager.listRxtTypeDetails();
            for (var index in assetList) {
                assetType = assetList[index];
                if (isActivatedAsset(assetType.shortName)) {
                    assetTypes.push({
                        url: this.buildBaseUrl(assetType.shortName) + '/list',
                        assetIcon: assetType.ui.icon || DEFAULT_ICON,
                        assetTitle: assetType.singularLabel
                    });
                }
            }
            ribbon.currentType = page.rxt.singularLabel;
            ribbon.currentTitle = page.rxt.singularLabel;
            ribbon.currentUrl = this.buildBaseUrl(type) + '/list'; //page.meta.currentPage;
            ribbon.shortName = page.rxt.singularLabel;
            ribbon.query = 'Query';
            ribbon.breadcrumb = assetTypes;
            return page;
        }
    };
};
