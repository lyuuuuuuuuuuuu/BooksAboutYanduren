var dropdown =   require('./dropdown');
var sidebar =    require('./sidebar');
var toolbar =    require('./toolbar');

var gitbook = window.gitbook;

function init() {
    // Init sidebar
    sidebar.init();

    // Bind dropdown
    dropdown.init();

    // Add action to toggle sidebar
    toolbar.createButton({
        index: 0,
        icon: 'fa fa-align-justify',
        onClick: function(e) {
            e.preventDefault();
            sidebar.toggle();
        }
    });
}

gitbook.events.on('start', init);

gitbook.sidebar = sidebar;
gitbook.toolbar = toolbar;
