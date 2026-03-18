# json-tree-editor

A lightweight, zero-dependency JSON tree editor plugin with optional Monaco integration.

## Quick start

```html
<div id="editor" style="height: 600px;"></div>
<link rel="stylesheet" href="src/json-tree-editor.css">
<script src="src/json-tree-editor.js"></script>
<script>
  const editor = new JsonTreeEditor('#editor', {
    value: { hello: 'world' },
    filename: 'config.json'
  });
  editor.on('change', (data, json) => console.log(json));
</script>
```

## With Monaco

```js
require(['vs/editor/editor.main'], function(monaco) {
  const editor = new JsonTreeEditor('#editor', { monaco });
});
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| defaultMode | 'tree'\|'code' | 'tree' | Initial editor mode |
| theme | 'dark'\|'light'\|'auto' | 'auto' | Color scheme |
| showToolbar | boolean | true | Show/hide toolbar |
| showExport | boolean | true | Show Copy + Save buttons |
| showModeToggle | boolean | true | Show Tree/Code toggle |
| indent | string | '\t' | JSON serialization indent |
| monaco | object | window.monaco | Monaco namespace |
| monacoTheme | string | null | Override Monaco theme |
| monacoOptions | object | {} | Extra Monaco editor options |
| value | object\|string | null | Initial JSON value |
| filename | string | null | Filename label |

## API

| Method | Description |
|---|---|
| getValue() | Deep clone of current data |
| getJSON(indent?) | JSON string |
| setValue(json, filename?) | Load new data |
| setMode('tree'\|'code') | Switch mode |
| expandAll() / collapseAll() | Tree navigation |
| openFile() | File picker |
| copyJSON() | Copy to clipboard |
| downloadJSON() | Trigger download |
| destroy() | Clean up |

## Events: `change`, `load`, `save`, `copy`, `modeChange`

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl/Cmd+S | Download |
| Ctrl/Cmd+O | Open file |
| Alt+E | Expand all |
| Alt+C | Collapse all |

## Theming

Override CSS custom properties on `.jte-root`:
```css
#my-editor { --jte-primary: #e040fb; --jte-key-w: 220px; }
```

MIT License
