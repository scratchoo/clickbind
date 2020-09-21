# clickbind

A very tiny (pure) JavaScript library, to bind HTML elements (div, span, button, etc.) to an input that will take the specified value when this element is clicked.

### Installation

You can add clickbind to your project either by downloading it from this repo, or using it via CDN, or install it with a package manager (NPM/YARN)

Via CDN:

```
https://cdn.jsdelivr.net/npm/clickbind@1.0.1/clickbind.min.js
```

Install it with a package manager like NPM:

```
npm install clickbind
```

Or with YARN:

```
yarn add clickbind
```

### Usage

Once the document is ready, if you are loading ClickBind from the script tag, initialize it as follows:

```
document.addEventListener("DOMContentLoaded", function() {
  ClickBind.bind()
});
```

Or if you are using a module bundler like Webpack, make sure to import it before using it:

```
import ClickBind from 'clickbind';

document.addEventListener("DOMContentLoaded", function() {
  ClickBind.bind()
});
```

You can bind any element like a div, span or a button... to an input text field (a hidden input in most cases) using its class/id/other-selector

```
<button data-click-bind=".language" data-value="php language" data-active-class="grey-btn">php</button>

<input type="text" class="language" />

```

When the above button[data-click-bind] is clicked, the input.language will be filled with the value in the button[data-value] attribute, and the button will have the class "grey-btn" added to it.

When the page load, if the input field is filled with a value equal to the button [data-value] attribute, the button will has the class "grey-btn" automatically.

You can bind multiple [data-click-bind] elements to the same input:

- if the [data-value] of both is similar, clicking one of them will activate the class on both, and the input field will be filled.
- if the [data-value] of the [data-click-bind] element is different, the input will take the [data-value] of the clicked [data-click-bind] and only that button will have its own [data-active-class] added.

PS: It's also possible to have multiple [data-click-bind] elements bound to the same input field, having the same [data-value] but with different [data-active-class], in this case clicking one [data-click-bind] element will activate all the other similar elements but each one with its own [data-active-class]

Sometimes, the input field can be filled with values that are equivalent to what your [data-click-bind][data-value] is, and you want to bind it based on these values as well, an example of this would be a Boolean value "true", and "1", in this case you can add [data-equivalent-values="1"] as follows:

```
<div class="myelement" data-click-bind=".is-a-bachelor" data-active-class="bordered" data-value="true" data-equivalent-values="1">I'm a bachelor</div>

<input type="text" class="is-a-bachelor" />
```

Here, whether the input has the value "true" or "1", they will be considered as the same, and the [data-click-bind] will have the active class added to it.

If you have multiple equivalent values, you need to separate them by comma, i.e: `data-equivalent-values="1,yes,ya,ok"`

#### Binding dynamically added Elements to inputs:

Just add the necessary data attributes to the the added element and call `ClickBind.bind()`, i.e:

```
let element = document.createElement('div');
element.setAttribute('data-click-bind', '.target-input');
element.setAttribute('data-value', 'hello world!');
element.setAttribute('data-active-class', 'primary-bg')
document.body.append(element);
ClickBind.bind(); // bind the newly added element
```

Make sure you call `ClickBind.bind()` whenever you add new [data-click-bind] elements to the page.

### Set other (related) fields to empty on click

In some situation (i.e: sub-category selection) you need to empty some fields that are not directly bound to the [data-click-bind] when it's clicked, in order to achieve this, just add `data-onclick-set-empty='selector1,selector2,...'`

```
<button data-click-bind=".language" data-value="java" data-onclick-set-empty=".popularity">Java</button>

<button data-click-bind=".language" data-value="Rust" data-onclick-set-empty=".popularity">Rust</button>

<input class="language" />
<input class="popularity" />
```

In the above example, each time you click one of the button, the input.popularity will be reset to empty ('')

### Append multiple (clicked) [data-click-bind] values to the same input:

To append multiple values to an input instead of replacing them, just add the data attribute `data-append="true"` to [data-click-bind] element.

```
<button data-click-bind=".browsers" data-value="chrome" data-append="true">Chrome</button>

<button data-click-bind=".browsers" data-value="mozilla firefox" data-append="true">Mozilla Firefox</button>

<button data-click-bind=".browsers" data-value="safari" data-append="true">Safari</button>

<input type="text" class="browsers" />
```

### Summary of available data attributes

`data-click-bind="selector-of-input"` Adding [data-click-bind] to an HTML element will allow you to bind it an input field.

`data-value="value to fill input with"` when [data-click-bind] element is clicked, the input will take this value.

`data-active-class="active-class"` when [data-click-bind] is clicked and the input is filled, the active-class will be added to [data-click-bind]

`data-equivalent-values="value1,value2,value3"` any value here will be considered equivalent to [data-value], for example if you have [data-value="javascript"] and [data-equivalent-values="js,typescript,coffeescript"], whenever the input is filled with one of these values, the related [data-click-bind] will be considered as clicked.

`data-no-value=""` if set, the connected input will take this value
when [data-click-bind] is turned off.

`data-onclick-set-empty="selector1,selector2,selector3"` if this data attribute is set, any selector that match it will be set to '' when the [data-click-bind] element is clicked.

`data-append="true"` the [data-click-bind] element that has data-append set to true will be appended to the existing value in the target input.

### License

This project is under MIT license.
