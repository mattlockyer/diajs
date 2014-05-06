# Dia.js

Simple, Plain, Customizable JS Dialogs.

### Dependencies

jQuery (load from google if not in page)

### Setup

```html
<script src="dia.js"></script>
```

### How to:

#### Alert

```js
DIA.alert('Hip Hop, Horray');
```

#### Confirm

```js
DIA.confirm('Which type of music do you prefer?', function(value) {
  console.log(value);
}, {'Hip Hop':'Hooray', 'Metal':'Burn Everything'});
```

#### Prompt

```js
DIA.prompt('How old are you?', function(value) {
  console.log(value);
}, 'my age', {'Yes, that is correct'});
```
