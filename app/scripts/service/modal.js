angular.module('knowGod')
  .factory('ModalService', function Service() {
    var modals = []; // array of modals on the page
    var service = {};

    service.Add = Add;
    service.Remove = Remove;
    service.Open = Open;
    service.Close = Close;

    return service;

    function Add(modal) {
      // add modal to array of active modals
      modals.push(modal);
    }
    
    function Remove(id) {
      // remove modal from array of active modals
      var modalToRemove = _.findWhere(modals, { id: id });
      modals = _.without(modals, modalToRemove);
    }

    function Open(id) {
      // open modal specified by id
      var modal = modals.find(function(el) {
        if(el.id == id) {
          return el;
        }
      });
      modal.open();
    }

    function Close(id) {
      // close modal specified by id
      var modal = modals.find(function(el) {
        if(el.id == id) {
          return el;
        }
      });
      modal.close();
    }
  });
