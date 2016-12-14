'use strict';

(function ($) {
  $.fn.MyTodo = function (options) {
    this.settings = $.extend({
      'placeholder': 'Mon texte',
      'el': $(this) || []
    }, options);

    var el = this.settings.el;
    var priv = {};

    // Public Methods - External methods
    Object.assign(this, {
      /**
       * Get the value after keypress "enter"
       */
      'getValue': function (callback) {
        el.on('keyup', function (e) {
          if (e.keyCode == 13) {
            callback(e, el.val());

            el.val('');
          }
        });

        return this;
      },
      /**
       * Generate li element with a value
       */
      'setTask': function (value) {
        if (! value.length) {
          return this;
        }

        $('body').append('<li>' + value + '</li>');

        return this;
      }
    });

    // Private Methods - Internal methods
    Object.assign(priv, {
      'style': function () {
        el.css({
          'padding': 10,
          'fontSize': 15,
          'border-radius': 5,
          'border': '1px solid #eaeaea',
        });

        return this;
      },
      /**
       * Initialize the plugin
       */
      'init': function () {
        priv.style();

        el.attr('placeholder', this.settings.placeholder);

        // Set a new task after touch "enter"
        this.getValue(function(e, value) {
          this.setTask(value);
        }.bind(this));

        return this;
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();

    return this;
  };
}(jQuery));