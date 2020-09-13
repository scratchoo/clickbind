# clickbind

### Installation

Download clickbind.js or install it via npm:

```
npm install clickbind
```

### Usage

You can bind any element like a div, span or a button... to an input text field (a hidden input in most cases) using its class/id/other-selector

```
<button data-click-bind=".language" data-value="php language" data-active-class="grey-btn">php</button>

<input class="language" />

```

When the above button[data-click-bind] is clicked, the input.language will be filled with the value in the button[data-value] attribute, and the button will have the class "grey-btn" added to it.

When the page load, if the input field is filled with a value equal to the button [data-value] attribute, the button will has the class "grey-btn" automatically.

You can bind multiple [data-click-bind] elements to the same input:

- if the [data-value] of both is similar, clicking one of them will activate the class on both, and the input field will be filled.
- if the [data-value] of the [data-click-bind] element is different, the input will take the [data-value] of the clicked [data-click-bind] and only that button will have its own [data-active-class] added.

Ps: It's also possible to have multiple [data-click-bind] elements bound to the same input field, having the same [data-value] but with different [data-active-class], in this case clicking one [data-click-bind] element will activate all the other similar elements but each one with its own [data-active-class]

Sometimes, the input field can be filled with values that are equivalent to what your [data-click-bind][data-value] is, and you want to bind it based on these values as well, an example of this would be a boolean value "true", and "1", in this case you can add [data-equivalent-values="1"] as follows:

```
<div class="myelement" data-click-bind=".is-a-bachelor" data-active-class="bordered" data-value="true" data-equivalent-values="1">I'm a bachelor</div>

<input class="is-a-bachelor" type="text" />
```

If you have multiple equivalent values, you need to separate them by comma, i.e: `data-equivalent-values="1,yes,ya,ok"`
