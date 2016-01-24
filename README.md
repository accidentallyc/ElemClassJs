# ElemClassJs
A fast way and easy way to create dynamic elements in javascript.

## Samples

**To generate this**
```html
<body>
<h1>hello world</h1>
<div>
  <input value="test" />
  <button>submit</button>
</div>
</body>
```

**Do this**
```js
body(
  h1("hello world"),
  div(
    input.attr("value","test"),
    button("submit")
  )
)
```

### Play with it on plunker!
[Plunker](https://plnkr.co/edit/sCElw27J7qfzYSXpdkue?p=preview)

## Installation
The script is meant to be modified slightly.

