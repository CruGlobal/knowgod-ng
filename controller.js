angular.module('knowGod', [])
  /*.factory('mcAPIservice', function($http, $sce) {
    var yolo = 'yolo';

    $http.jsonp($sce.trustAsResourceUrl('https://jsonplaceholder.typicode.com/posts/1'), {jsonpCallbackParam: 'callback'}).then(function (data) {
      yolo = data;
    });;

    return yolo;
  })*/
  .value('load_song', '')
  .controller('KnowGodController', function($scope, $http, $window) {
    var knowGod = this;
    knowGod.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];

    var languages = function() {
      var url = 'https://mobile-content-api.cru.org/languages/';
      $http.get(url).then(function(response){
        knowGod.languages = response.data;
      });
    }
    languages();

    var translations = function(language) {
  //    var url = 'https://mobile-content-api.cru.org/languages/'+language+'?include=custom_pages'  ;
      var url = 'https://mobile-content-api.cru.org/translations';
      $http.get(url).then(function(response){
        knowGod.translations = response.data;
      });      
    };
    translations(1);

    var get_xml = function(url, variable) {
      var thing;
      $.get("http://0.0.0.0:8000/knowGodResource/"+url, function( data ) {
        knowGod.page = $(data);
      });
    };
    get_xml('392380f776ebdffe4a0fd286e522d5cad5930f0b14db0554debf409bc7218c3a.xml', knowGod.resource );

    var get_source = function(filename) {
      //return knowGod.resource.find('[filename='+filename+']').attr('src');
    };
//    $window.alert(get_source('kgp-tract-bkg-image-9_1x.jpg'));


    var page_load = function() {
      get_xml('743fa53e8470cd67e1ca12ea05fbd4bd64dea08b7326691cbd888b107a2836ce.xml', knowGod.page);
    };
    page_load();

    var resourced = function() {
//      var url = 'https://mobile-content-api.cru.org/drafts/678/?page_id=5';
      var url = 'https://mobile-content-api.cru.org/languages';
//      $http.get(url).then(function(response){
        knowGod.resources = {
  "page": {
    "-xmlns": "https://mobile-content-api.cru.org/xmlns/tract",
    "-xmlns:content": "https://mobile-content-api.cru.org/xmlns/content",
    "-background-image": "kgp-tract-bkg-image-2_1x.jpg",
    "header": {
      "number": { "content:text": "2" },
      "title": {
        "content:text": {
          "-i18n-id": "4b0da95a-13fa-44ce-8540-ed951dda6979",
          "#text": "We are separated from God by our sin, so we cannot know Him or experience His love."
        }
      }
    },
    "cards": {
      "card": [
        {
          "label": {
            "content:text": {
              "-i18n-id": "417a1866-7865-48b6-8144-9f5318e9d60d",
              "#text": "What is sin?"
            }
          },
          "content:paragraph": [
            {
              "content:text": {
                "-i18n-id": "7743b4d5-3f48-4c69-8062-3e2216cc66a6",
                "#text": "We were created to have a relationship with God but we rejected him and the relationship was broken."
              }
            },
            {
              "content:text": {
                "-i18n-id": "f3a5855f-56cc-4af4-8220-eef262aac39c",
                "#text": "This rejection of God and the building of our lives around anything else is what the Bible calls sin. We show this by having selfish actions and attitudes, by disobeying God or displaying indifference toward Him."
              }
            }
          ]
        },
        {
          "-background-image": "kgp-page-bkg-image-everyone-is-sinful_1x.jpg",
          "-background-image-align": "bottom",
          "label": {
            "content:text": {
              "-i18n-id": "81787028-e394-404e-a6ee-fd58caf571f6",
              "#text": "Everyone is sinful"
            }
          },
          "content:paragraph": {
            "content:text": [
              {
                "-i18n-id": "03346729-5937-4bee-8f49-3511e473ffa0",
                "#text": "\"For everyone has sinned; we all fall short of God's glorious standard.\""
              },
              {
                "-i18n-id": "b59b8b23-53cd-4097-86e4-819c619abde2",
                "#text": "Romans 3:23"
              }
            ]
          }
        },
        {
          "label": {
            "content:text": {
              "-i18n-id": "19d02696-6124-4a1e-9183-15156f3c9bbb",
              "#text": "Sin has consequences"
            }
          },
          "content:paragraph": [
            {
              "content:text": {
                "-i18n-id": "7f82556a-3890-487c-8c37-e498cb254285",
                "#text": "\"For the wages of sin is death, but the free gift of God is eternal life through Christ Jesus our Lord\"  Romans 6:23."
              }
            },
            {
              "content:text": {
                "-i18n-id": "28acdb15-948c-4cc1-a619-4dfc088ace38",
                "#text": "God is perfect and just and will hold us accountable for our sin. There is a penalty for rejecting God."
              }
            },
            {
              "content:image": { "-resource": "kpg-sin-has-consequences-graphic-person.png" },
              "content:text": {
                "-i18n-id": "5b2e6c17-6506-454e-8efa-aeeb2c49af70",
                "#text": "▲ - Holy God  |  Sinful Man"
              }
            },
            {
              "content:text": {
                "-i18n-id": "18b0b51d-37c6-498c-9dad-7556168b87f0",
                "#text": "God is perfect and we are sinful. There is a great gap between us because of our sin."
              }
            },
            {
              "content:text": {
                "-i18n-id": "8101324b-ef7f-4f3e-a2d5-21c52efc48a5",
                "#text": "We may try to bridge this gap through good deeds or following a religion. However, all our efforts fail because they can't solve the problem of sin that keeps us from God."
              }
            }
          ]
        }
      ]
    },
    "call-to-action": {
      "content:text": {
        "-i18n-id": "69451881-ebca-4317-8a53-38f40aa8197d",
        "#text": "The third point gives us the only solution to this problem..."
      }
    }
  }
};

 // response.data;
//      });
    };
    resourced();

 //TODO app - can be removed 
    knowGod.addTodo = function() {
      knowGod.todos.push({text:knowGod.todoText, done:false});
      knowGod.todoText = '';
    };
 
    knowGod.remaining = function() {
      var count = 0;
      angular.forEach(knowGod.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    knowGod.archive = function() {
      var oldTodos = knowGod.todos;
      knowGod.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) knowGod.todos.push(todo);
      });
    };
  });

