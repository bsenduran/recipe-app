var render = function (theme, data, meta, require) {
    theme('single-col-fluid', {
        title: 'Asset',
        header: [
            {
                partial: 'header',
                context: data
            }
        ],
        ribbon: [
            {
                partial: 'ribbon',
                context: data
            }
        ],
        leftnav: [
            {
                partial: 'control',
                context: data
            }
        ],
        listassets: [
            {
                partial: 'control_panel',
                context: data
            }
        ]
    });
};
