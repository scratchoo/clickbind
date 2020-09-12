(function (root, factory) {

  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.ClickBind = factory();
  }

})(this, function () {

  const bind = function(){

    let bindings = Array.from( document.querySelectorAll('[data-click-bind]') );

    initState(bindings);

    bindings.forEach(function(binding){
      setClickEvent(binding);
    });

  }

  function initState(bindings){

    let uniqueBindingTargets = [];

    bindings.forEach(function(binding){

      let target = binding.getAttribute('data-click-bind');
      let firstTargetValue = document.querySelector(target).value;

      if( !uniqueBindingTargets.includes(target) ){
        uniqueBindingTargets.push(target);
        renderState(binding);
      }

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
    let firstTargetValue = document.querySelector(target).value;


    unifyTargetInputs(target, firstTargetValue);

    // loop through all the [data-click-bind] with same target, then activate/deactivate the active-class
    Array.from(document.querySelectorAll(`[data-click-bind="${target}"]`)).forEach(function(binding){

      // activeClass and bindingValues are specific to each binding, so they should be set in the loop:
      let activeClass = binding.getAttribute('data-active-class');
      let bindingValues = [binding.getAttribute('data-value')].concat( (binding.getAttribute('data-equivalent-values') || '').replace(/\s/g,'').split(',').filter(Boolean)); // filter(Boolean) to prevent array with empty string

      if( bindingValues.includes(firstTargetValue) ){
        binding.classList.add(activeClass);
      }else{
        binding.classList.remove(activeClass);
      }

    });

  }

  function setClickEvent(binding){

    binding.addEventListener('click', function(){

      let activeClass = binding.getAttribute('data-active-class');
      let target = binding.getAttribute('data-click-bind');
      let firstTargetInput = document.querySelector(target);

      if( binding.classList.contains(activeClass) ){
        firstTargetInput.value = ''
      }else{
        firstTargetInput.value = binding.getAttribute('data-value');
      }

      renderState(binding);

    });

  }

  return { bind: bind, test: 'testing' };

});
