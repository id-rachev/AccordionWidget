(function() {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,

        CHANGE = "change";

    var Accordion = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            that.template = kendo.template(that.options.template || "<h3 class=\"title\">#= data.title #</h3><div class=\"content\">#= data.content #</div>");

            that._dataSource();
            that._showHideAnimation();                         
        },
        options: {
            name: "Accordion",
            autoBind: true,
            template: ""
        },
        refresh: function() {
            var that = this,
                view = that.dataSource.view(),
                html = kendo.render(that.template, view);

            that.element.html(html);
        },
        _dataSource: function() {
            var that = this;
            that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

            that.dataSource.bind(CHANGE, function() {
                that.refresh();
            });

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        },
        _showHideAnimation: function() {
            var that = this;
            that.element.on("click", ".title", function() {
                var title = $(this),
                    isActive = title.hasClass("active");

                title.parent().find(".active").removeClass("active").next(".content").hide("fast");
                if(!isActive) { title.addClass("active").next(".content").show("fast"); }
            });
        }
    });

    ui.plugin(Accordion);

})(jQuery);