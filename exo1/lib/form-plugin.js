'use strict';
//name mail sexe
(function ($) {
  $.fn.myForm = function (options) {
    this.settings = $.extend({
      'form': {
        'id': '',
        'type': '',
        'name': '',
        'required': true,
        'placeholder': '',
        'value': this.nodeValue,
        'options': {
          'error': '',
          'regex': '[a-zA-Z0-9]{3,}',
          'class': ''
        }
      },
      'css': {
        padding: '10px',
        margin: '10px',
        color: 'black'
      },
      'cssError': {
        padding: '10px',
        margin: '10px',
        color: 'red'
      },
      'cssSubmitBtn': {
        padding: '10px',
        margin: '10px',
        color: 'black',
        backgroundColor: 'yellow',
        width: '50px'
      },
      'el': $(this) || []
    }, options);

    var el = this.settings.el;
    var form = this.settings.form;
    var css = this.settings.css;
    var cssError = this.settings.cssError;
    var cssSubmitBtn = this.settings.cssSubmitBtn;
    var priv = {};

    // Public Methods - External methods
    Object.assign(this, {});

    // Private Methods - Internal methods
    Object.assign(priv, {
        'generator': function (form) {
          form.forEach(function (input) {
            //TODO: here will need to be added other types
            if (input.type === 'text') {
              $('.plugin-form').append(priv.input(input));
            }
          });
        },
        'input': function (input) {
          return $('<input/>', {
            value: input.value || '',
            type: input.type,
            name: input.name,
            placeholder: input.placeholder || ''
          }).css(css);
        },
        'init': function () {
          el.append('<form class="plugin-form"></form>');
          priv.addSubmitButton();
          this.generator(form);
        },
        'addSubmitButton': function () {
          var submitBtn = $('<button class ="btn" id="form-submit">Confirmer</button>')
            .css(cssSubmitBtn).click(function () {
              priv.checkForm();
            });
          el.find('.plugin-form').after(submitBtn);
        },
        'checkForm': function () {
          for (var i = 0; i < form.length; i++) {
            if(form[i].type == 'text') {
              var regex = RegExp(form[i].options.regex);

              // var value = form[i].v;
              console.log(form[i].value);
              if (!regex.test(value)) {
                $('.form-submit').after('<div></div>', {
                  'class': form[i].options.class,
                  'text': form[i].options.error
                }).css(cssError);
              }
            }
          }
        },
      });
      // console.log(this);
      // Initialise the plugin
      priv.init();
    return this;
  };
}(jQuery));
