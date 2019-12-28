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
        'options': {
          'error': 'erreur',
          'regex': /\w{2,}/,
          'className': 'error'
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
      },
      'cssSuccess': {
        padding: '10px',
        margin: '10px',
        width:'50px',
        heigth:'30px',
        backgroundColor: 'green'
      },
      'el': $(this) || []
    }, options);

    var el = this.settings.el;
    var form = this.settings.form;
    var css = this.settings.css;
    var cssError = this.settings.cssError;
    var cssSubmitBtn = this.settings.cssSubmitBtn;
    var cssSuccess = this.settings.cssSuccess;
    var priv = {};

    // Public Methods - External methods
    Object.assign(this, {});

    // Private Methods - Internal methods
    Object.assign(priv, {
        'generator': function (formArray) {
          for(var k= 0; k < formArray.length; k++) {
            if (formArray[k].type === 'text') {
                $('.plugin-form').append(priv.input(formArray[k]));
              }
          }
        },
        'input': function (input) {
          return $('<input/>', {
            value: input.value || '',
            type: input.type,
            name: input.name,
            id : input.id,
            required : input.required,
            placeholder: input.placeholder || ''
          }).css(css).focusout(function(){
            priv.checkForm(input);
          });
        },
        'init': function () {
          el.append('<form class="plugin-form"></form>');
          $('.plugin-form').after('<div class="block-error"></div>');
          priv.addSubmitButton();
          this.generator(form);
        },
        'addSubmitButton': function () {
          var submitBtn = $('<button class ="btn" id="form-submit">Confirmer</button>')
            .css(cssSubmitBtn).click(function () {

                var sentEl = $('<div class="sent">Envoyé</div>').css(cssSuccess);
                $('#form-submit').after(sentEl);
              // }
            });
          el.find('.plugin-form').after(submitBtn);
        },
        'checkForm': function (input) {
          var regex = RegExp(input.options.regex);
          if ($('#' + input.id).prop('required')) {
            if (regex.test($('#app input[name="' + input.name + '"]').val())) {
              if (document.querySelector('.' + input.options.className)) {
                $('.block-error .' + input.options.className).remove('.' + input.options.className);
              }
            } else {
              var errorDiv = $('<div class="' + input.options.className + '">' + input.options.error + '</div>').css(cssError);
              if (document.querySelector('.block-error .' + input.options.className)) {
                $('.block-error .' + input.options.className).replaceWith(errorDiv);
              } else {
                $('.block-error').append(errorDiv);
              }
            }
          }
          if(document.querySelector('.block-error').hasChildNodes()) {
            document.querySelector('#form-submit').disabled = true;
            $('#form-submit').css('opacity','0.4');
          } else {
            $('#form-submit').css('opacity', '1');
            document.querySelector('#form-submit').disabled = false;
          }
        },

      });

      // Initialise the plugin
      priv.init();
    return this;
  }
}(jQuery));
