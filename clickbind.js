/*
  ClickBind v1.0.6
  Created by: Scratchoo <scratchoo.com>
  Under: MIT license
*/

(function (root, factory) {

  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.ClickBind = factory();
  }

})(this, function () {

  function trim (string, char) {
    if (char === "]") char = "\\]";
    if (char === "\\") char = "\\\\";
    return string.replace(new RegExp(
      "^[" + char + "]+|[" + char + "]+$", "g"
    ), "");
  }

  function toggleAll(selector, condition){
    Array.from(document.querySelectorAll(selector)).forEach(function(element){
      let activeClass = element.getAttribute('data-active-class');
      if(element.getAttribute('data-click-bind') && element.classList.contains(activeClass) == condition.shouldHasActiveClass){
        const event = new Event('click');
        element.dispatchEvent(event);
      }
    });
  }

  const activateAll = function(selector){
    toggleAll(selector, { shouldHasActiveClass: false });
  }

  const deactivateAll = function(selector){
    toggleAll(selector, { shouldHasActiveClass: true });
  }

  const bind = function(){

    // select all [data-click-bind] that are not already initialized by initState (which set them with a [data-click-binded=true])
    let bindings = Array.from( document.querySelectorAll('[data-click-bind]:not([data-click-binded="true"])') );

    initState(bindings);

  }

  function initState(bindings){

    let uniqueBindingTargets = [];

    bindings.forEach(function(binding){

      let target = binding.getAttribute('data-click-bind');

      setClickEvent(binding);

      if( !uniqueBindingTargets.includes(target) ){
        uniqueBindingTargets.push(target);
        renderState(binding);
      }

      // set data-click-binded to true so next time if we add any [data-click-bind] element dynamically, the click event won't be attached twice, also we prevent extra loop through the "already" treated elements.
      binding.setAttribute('data-click-binded', true);

    });

  }

  // based on the first target input set the same value to all inputs with the same target/selector
  function unifyTargetInputs(target, firstTargetValue){

    let targetInputs = Array.from(document.querySelectorAll(target));

    targetInputs.forEach(function(targetInput){
      targetInput.value = firstTargetValue;
    });

  }

  // rendering the state of the binding (selected or not)
  function renderState(binding){

    let target = binding.getAttribute('data-click-bind');
    let input = document.querySelector(target);
    if(input){
      var firstTargetValue = input.value;
    }else{
      var firstTargetValue = ''
    }

    unifyTargetInputs(target, firstTargetValue);

    // loop through all the [data-click-bind] with same target, then activate/deactivate the active-class
    Array.from(document.querySelectorAll(`[data-click-bind="${target}"]`)).forEach(function(binding){

      // activeClass and bindingValues are specific to each binding, so they should be set in the loop:
      let activeClass = binding.getAttribute('data-active-class');
      let bindingValues = [binding.getAttribute('data-value')].concat( (binding.getAttribute('data-equivalent-values') || '').replace(/\s/g,'').split(',').filter(Boolean)); // filter(Boolean) to prevent array with empty string

      let isAppend = binding.getAttribute('data-append') == 'true';

      if(isAppend){
        let inputValues = firstTargetValue.split(',');
        let isFounded = inputValues.some( ai => bindingValues.includes(ai) );
        if(isFounded){
          binding.classList.add(activeClass);
        }else{
          binding.classList.remove(activeClass);
        }
      }else{
        if( bindingValues.includes(firstTargetValue) ){
          binding.classList.add(activeClass);
        }else{
          binding.classList.remove(activeClass);
        }
      }

    });

  }

  function setClickEvent(binding){

    binding.addEventListener('click', function(){

      // empty other-related fields if set via [data-onclick-set-empty]
      emptyExtraFields(binding.getAttribute('data-onclick-set-empty'));

      let activeClass = binding.getAttribute('data-active-class');
      let target = binding.getAttribute('data-click-bind');
      let firstTargetInput = document.querySelector(target);

      let isAppend = binding.getAttribute('data-append') == 'true';
      let bindingValue = binding.getAttribute('data-value');

      if(firstTargetInput){
        if( binding.classList.contains(activeClass) ){
          if(isAppend && firstTargetInput.value.indexOf(',') > -1){
            // turn input values to an array of values
            let inputValuesArr = firstTargetInput.value.split(',');
            // remove bindingValue from the array
            inputValuesArr.splice(inputValuesArr.indexOf(bindingValue), 1);
            // join array values back to string values separated by ','
            firstTargetInput.value = inputValuesArr.join(',');
            // TODO: (note to self) maybe the following line has no effect and should be deleted, to check later:
            firstTargetInput.value = trim(firstTargetInput.value, ',');
          }else{
            firstTargetInput.value = binding.getAttribute('data-no-value') || '';
          }
        }else{
          if(isAppend){
            firstTargetInput.value += `,${bindingValue}`;
            firstTargetInput.value = trim(firstTargetInput.value, ',');
          }else{
            firstTargetInput.value = bindingValue;
          }
        }
      }

      renderState(binding);

    });

  }

  // sometimes when [data-click-bind] selection/click change, we want to reset some other related fields (that maybe some sub-category of the main bound input), this function takes the [data-onclick-set-empty] attribute value, and use it to empty the specifid selector on that value.
  function emptyExtraFields(fieldsToEmpty){
    if(fieldsToEmpty){
      Array.from(fieldsToEmpty.split(',')).forEach(function(selector){
        let fields = document.querySelectorAll(selector);
        Array.from(fields).forEach(function(field){
          if(field){
            field.value = '';
          }
        });
      });
      Array.from(document.querySelectorAll('[data-click-bind]')).forEach(function(binding){
        renderState(binding);
      });
    }
  }

  return {
    bind: bind,
    activateAll: activateAll,
    deactivateAll: deactivateAll
  };

});
