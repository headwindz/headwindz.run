## Components

> A component in React, is a function or a class which optionally accepts input/props and returns a React `element`

type definition for components:

```typescript
interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
  new (props: P, context?: any): Component<P, S>;
  propTypes?: WeakValidationMap<P>;
  contextType?: Context<any>;
  contextTypes?: ValidationMap<any>;
  childContextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement | null;
  propTypes?: WeakValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}
```

E.g. a `Button` component

```typescript
function FunctionButton(props) {
  const { onClick, children } = props;
  return <button onClick={onClick}> { children } </button>
}

class KlassButton {
  render() {
    const { onClick, children } = this.props;
    return <button onClick={onClick}> { chidlren } </button>
  }
}
```

## Instances

An instance is what you refer to as this in the `component` class you write. It is useful for storing local state and reacting to the lifecycle events.

Function components don’t have instances at all. 

## Elements

> An element is a plain object describing a component instance or DOM node and its desired properties. It contains only information about the component type (for example, a Button), its properties (for example, its color), and any child elements inside it. An element is not an actual instance. Rather, it is a way to tell React what you want to see on the screen. You can’t call any methods on the element. It’s just an immutable description object with two fields: type: (string | ReactClass) and props: Object

```typescript
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
  type: T;
  props: P;
  key: Key | null;
}
```

`type` can not only be custom function and class components, but also native html component.

```typescript
type ElementType<P = any> =
  {
    [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K] ? K : never
  }[keyof JSX.IntrinsicElements] |
ComponentType<P>;

type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

interface IntrinsicElements {
  a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
  button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  canvas: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
  ...
}
```

Each time a JSX is used, it's converted to `React.createElement` call which returns a react element.

```jsx
<FunctionButton onClick={console.log}> hello </FunctionButton>
                  
// is equivalent to

React.createElement({
  $$typeof: Symbol(react.element),
  type: FunctionButton,
  props: {
    {children: " hello ", onClick: ƒ}
  }
})
```

To check whether a variable is a react element, we can use `isValidElement`

```typescript
function isValidElement<P>(object: {} | null | undefined): object is ReactElement<P>;
```

```typescript
import { isValidElement } from 'react'

isValidElement('hello'); // false
isValidElement(<div>a</div>); // true
```

## ReactNode

Basically can be `anything`

```typescript
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
type ReactText = string | number;
type ReactChild = ReactElement | ReactText
type ReactFragment = {} | ReactNodeArray;
interface ReactNodeArray extends Array<ReactNode> {}
```