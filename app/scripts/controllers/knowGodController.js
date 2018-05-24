angular.module('knowGod')
  .controller('KnowGodController', function($routeParams, $scope, $http, $window, page, manifest, languages, ModalService) {
    var knowGod = this;

    languages.loadLanguages().then(function(data){
      knowGod.language = languages;
    })

    manifest.loadManifest().then(function(data){
      knowGod.manifest = manifest;
    })
  
    knowGod.page = page;

    $routeParams.pageNumber = 1;

    var translations = function(language) {
  //    var url = 'https://mobile-content-api.cru.org/languages/'+language+'?include=custom_pages'  ;
      var url = 'https://mobile-content-api.cru.org/translations';
      $http.get(url, {cache: true}).then(function(response){
        knowGod.translations = response.data;
      });      
    };
    translations(1);

    $scope.keys = [];
    $scope.keys.push({ code: 37, action: function() { manifest.prevPage(); }});
    $scope.keys.push({ code: 39, action: function() { manifest.nextPage(); }});
    $scope.keys.push({ code: 27, action: function() { knowGod.closeModal('1'); knowGod.language.langHidden=true;}});
    
    $scope.$on('keydown', function( msg, obj ) {
      var code = obj.code;
      $scope.keys.forEach(function(o) {
        if ( o.code !== code ) { return; }
        o.action();
        $scope.$apply();
      });
    });




    knowGod.openModal = openModal;
    knowGod.closeModal = closeModal;

/*    initController();

    function initController() {
        vm.bodyText = 'This text can be updated in modal 1';
    }
  */  
    function openModal(id){
        ModalService.Open(id);
    }

    function closeModal(id){
        ModalService.Close(id);
    }

  })
  .directive('imageResource', ['manifest', function( manifest ) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.imageResource);
        },
        function(value) {
          element.attr('src', manifest.lookup(String(attrs.imageResource).replace(/'/g,'')));
          element.removeAttr('image-resource');
        });
    };
  }])
  .directive('textAlign', function() {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.textAlign);
        },
        function(value) {
          element.addClass(attrs.textAlign);
          element.removeAttr('text-align');
        });
    };
  })
  .directive('compile', ['$compile', function( $compile ) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.compile);

        },
        function(value) {
          element.html(value);

          $compile(element.contents())(scope);
        });
    };
  }])
  .directive('keyTrap', function() {
    return function( scope, elem ) {
      elem.bind('keydown', function( event ) {
        scope.$broadcast('keydown', { code: event.keyCode } );
      });
    };
  })
  .directive('modal', function Directive(ModalService) {
    return {
      link: function (scope, element, attrs) {
        // ensure id attribute exists
        if (!attrs.id) {
            console.error('modal must have an id');
            return;
        }

        // close modal on background click
        element.on('click', function (e) {
            var target = angular.element(e.target);
            if (target[0] == document.querySelector('.modal')) {
              scope.$evalAsync(Close);
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        var modal = {
            id: attrs.id,
            open: Open,
            close: Close
        };
        ModalService.Add(modal);
    
        // remove self from modal service when directive is destroyed
        scope.$on('$destroy', function() {
            ModalService.Remove(attrs.id);
            element.remove();
        });                

        // open modal
        function Open() {
          element.addClass('show');
          element.removeClass('hide');
          angular.element(document.querySelector('body')).addClass('modal-open');
        }

        // close modal
        function Close() {
          element.addClass('hide');
          element.removeClass('show');
          angular.element(document.querySelector('body')).removeClass('modal-open');
        }
      }
    };
  })
  .directive('events', function() {
    return function( scope, element, attrs ) {
      element.on('click', function(e) {
        var events = attrs.events.split(' ');
        events.forEach(function(el){
          var listeners = document.querySelectorAll('[listeners='+el.replace(':','\\:')+'], [dismiss-listeners='+el.replace(':','\\:')+']');
          listeners.forEach(function(listen){
            listen = angular.element(listen);
            console.log();
            if(listen.attr('dismiss-listeners') && el.split(' ').includes(listen.attr('dismiss-listeners'))) {
              if(listen[0].tagName === 'MODAL') {
                scope.knowGod.closeModal(listen.attr('id'));
              }
              else {
                listen.removeClass('show');
                listen.addClass('hide');
              }
            }
            else if (listen.attr('listeners') && el.split(' ').includes(listen.attr('listeners'))) {
              if(listen[0].tagName === 'MODAL') {
                scope.knowGod.openModal(listen.attr('id'));
              }
              else {
                listen.addClass('show');
                listen.removeClass('hide');
              }
            }
            else {
              console.log('Listener missing!');
            }
            //depending on listener this will be different for each.  Need logical way to choose right action per listener type and state


          });

        });
      });

    };
  });
