'use strict';
//name mail sexe
(function ($) {
  $.fn.myForm = function (options) {
    this.settings = $.extend({
      'form': [],
      'css': {
          padding: '10px',
          margin: '10px',
          color: 'black'
      },
      'el': $(this) || []
    }, options);

    var el = this.settings.el;
    var form = this.settings.form;
    var css = this.settings.css;
    var priv = {};

    // Public Methods - External methods
    Object.assign(this, {});

    // Private Methods - Internal methods
    Object.assign(priv, {
      'generator': function(form) {
        form.forEach(function(input){
          if(input.type === 'text') {
            $('.plugin-form').append(priv.input(input));
          }
        });
      },
      'input': function(input) {
        return $('<input/>', {
          value: input.value || '',
          type: input.type,
          name: input.name,
          placeholder: input.placeholder || '',
          keypress: function () {
            var regex = RegExp(input.options.regex);
            var value = $(this).val();

            if (!regex.test(value)) {
              // console.log('error');
              el.append($('div', {
                class: input.options.class,
                text: input.options.error,
              }))}
          }
        }).css(css);
      },
      'init': function () {
        el.append('<form class="plugin-form"></form>');
        this.generator(form);
      },
    });
    // console.log(this);
    // Initialise the plugin
    priv.init();
    return this;
  }
}(jQuery));
