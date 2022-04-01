import _ from 'lodash'

function handleClick(){
  var element = document.createElement('div')
  // element.innerHTML =  "Bill Gates";
  element.innerHTML =  _.join(['Bill', 'Gates'], '~~~');
  document.body.appendChild(element);
}

export default handleClick;