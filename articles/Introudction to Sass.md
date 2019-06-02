> Sass(Syntactically Awesome Style Sheets) is the most mature, stable, and powerful professional grade CSS extension language in the world.

In the post, I will list some of the most useful Sass features. 

# Nested rules/selectors

```scss
.a {
  color: red;
  .b {
    color: green;

    &:hover {
      color: yellow;
    }
  }
}
```

is equivalent to 

```css
.a {
  color: red;
}
.a .b {
  color: green;
}
.a .b:hover {
  color: yellow;
}
```

# Nested properties - from some namespace

```scss
.a {
  flex: {
    direction: column;
    wrap: nowrap;
  }
}
```

is equivalent to 

```css
.a {
  flex-direction: column;
  flex-wrap: nowrap;
}
```


# Variables

> To define a variable, prefix the name of variable with $: $name-of-variable

## Variables in property value

```scss
$main-color: #fff;

.a {
  color: $main-color;
}

.b {
  color: $main-color;
}
```

is equivalent to 

```css
.a {
  color: #fff;
}

.b {
  color: #fff;
}
```

## Variables in selectors

```scss
$prefix: component;

.#{$prefix} {
  color: #fff;
}

.#{$prefix}-input {
  padding: 10px;
}
```

is equivalent to

```css
.component {
  color: #fff;
}

.component-input {
  padding: 10px;
}
```

# Lists & Maps

> To define a map, wrap the value with parentheses 

```scss
$border-default: 0.05rem solid black; //list
$colors: (main: #521521, secondary: #f27361); // map, parentheses

.a {
  border: $border-default;
  color: map-get($colors, main);
}
```

is equivalent to

```css
.a {
  border: 0.05rem solid black;
  color: #521521;
}
```

# Built-in functions

[Sass built-in functions](https://sass-lang.com/documentation/functions)

# Simple arithmetics

```scss
$size-default: 12px;
$size-in-number: 20;

.a {
  padding: $size-default * 3;
  font-size: $size-default + 1px;
  border: $size-default / 10 solid black;
  margin: $size-in-number * 1px; // turn it into pixel
}
```

is equivalent to

```css
.a {
  padding: 36px;
  font-size: 13px;
  border: 1.2px solid black;
  margin: 20px;
}
```

# Mixin

> Reusable custom function

```scss
@mixin display-flex() {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.a {
  @include display-flex();
}

@mixin media-min-width($width) {
  @media (min-width: $width) {
    @content; // slot/placeholder
  }
}

.b {
  @include media-min-width(40rem) {
    font-size: 150%
  }
}
```

is equivalent to

```css
.a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

@media (min-width: 40rem) {
  .b {
    font-size: 150%;
  }
}
```