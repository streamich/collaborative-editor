# Collaborative plain text editor binding

This package provides bindings a generic implementation for binding any plain
text editor to a JSON CRDT string.


## Usage

Installation:

```
npm install json-joy collaborative-editor
```

Usage:

```ts
import {StrBinding, EditorFacade} from 'collaborative-editor';

const editor: EditorFacade = {
  // ...
};

const str = model.api.str(['path', 'to', 'string']);
const binding = new StrBinding(str, editor);
binding.bind();

// When done, unbind the binding.
binding.unbind();
```


## Preview

- See [demo](https://streamich.github.io/collaborative-editor).
- See sample [editor implementation](./src/SimpleHtmlInputEditor.ts) on top of `<input>` and `<textarea>` elements.
