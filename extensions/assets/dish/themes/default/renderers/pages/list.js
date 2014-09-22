var render = function(theme, data, meta, require) {
    theme('wide-fluid', {
        title: 'Asset',
        header: [{
            partial: 'header',
            context: data
        }],
        ribbon: [{
            partial: 'ribbon',
            context: data
        }],
        listassets: [{
            partial: 'list-assets',
            context: data
        }]
    });
};