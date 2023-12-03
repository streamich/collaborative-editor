# Collaborative plain text editor binding

This package provides bindings a generic implementation for binding any plain
text editor to a JSON CRDT string.


## Usage

Installation:

```
npm install json-joy collaborative-editor
```

Simple integration for any plain text editor:

```ts
import {StrBinding, EditorFacade} from 'collaborative-editor';
import {Model} from 'json-joy/es2020/json-crdt';

const str = model.api.str(['path', 'to', 'string']);
const unbind = StrBinding.bind(str, {
  get: () => input.value,
  set: (value: string) => input.value = value,
}, true);
```

A detailed integration:

```ts
import {StrBinding, EditorFacade} from 'collaborative-editor';

const editor: EditorFacade = {
  // ...
};

const str = model.api.str(['path', 'to', 'string']);
const binding = new StrBinding(str, editor);
binding.syncFromModel();
binding.bind(polling);

// When done, unbind the binding.
binding.unbind();
```


## Preview

- See [demo](https://streamich.github.io/collaborative-editor).
- See sample [editor implementation](./src/SimpleHtmlInputEditor.ts) on top of `<input>` and `<textarea>` elements.
