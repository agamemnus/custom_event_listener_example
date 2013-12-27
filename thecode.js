HTMLElement.prototype.addEventListenerOriginal = HTMLElement.prototype.addEventListener

var custom_event_list = {}
var custom_event_listener_list = {}

HTMLElement.prototype.addEventListener = function (type, listener, useCapture) {
 var test_func = custom_event_list[type]
 if (typeof test_func != "undefined") {
  if (typeof custom_event_listener_list[type] == "undefined") custom_event_listener_list[type] = []
  custom_event_listener_list[type].push ({element: this, listener: listener, useCapture: useCapture})
  return
 }
 this.addEventListenerOriginal (type, listener, useCapture)
}

var a = 0, b = 0
custom_event_list['jump'] = function () {
 if ((a == 5) && (b == 4)) return true
 return false
}

document.body.addEventListener ('jump', function (evt) {
 console.log (evt)
 console.log ('jumped')
})

document.body.addEventListener ('click', function () {a = 5})
document.body.addEventListener ('mouseout', function () {b = 4})
document.body.style.width  = '200px'
document.body.style.height = '200px'
document.body.style.backgroundColor = 'green'

// Run the event  listeners.
setInterval (function () {
 for (var event_name in custom_event_listener_list) {
  if (custom_event_list[event_name] () == false) continue
  var current_list = custom_event_listener_list[event_name]
  current_list.forEach (function (obj) {
   var evt = {type: event_name, currentTarget: obj.element, useCapture: obj.useCapture}
   obj.listener (evt)
  })
 }
}, 2000)
