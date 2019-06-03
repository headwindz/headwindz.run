I have been using CSS for the last 4 years and never take systematic learning about it. Thanks to the course [CSS - The Complete Guide (incl. Flexbox, Grid and Sass)](https://www.packtpub.com/web-development/css-complete-guide-incl-flexbox-grid-and-sass-video) I get a chance to polish my CSS skills and knowledge. In this post I am not going to give an introduction of CSS by long shot. I will list some points which I don't notice/know/understand before and think might be useful to you.

## Margin collapsing

According to the [spec](https://www.w3.org/TR/CSS21/box.html#collapsing-margins): 

> In CSS, the adjoining margins of two or more boxes (which might or might not be siblings) can combine to form a single margin. Margins that combine this way are said to collapse, and the resulting combined margin is called a collapsed margin.

> Horizontal margins never collapse. 

[Demo](https://codepen.io/n0rush/pen/ZNrzxe)

## Vertical margin and padding does't have effect on inline element

[Demo](https://codepen.io/n0rush/pen/oREvyP)

## Pseudo class vs Pseudo element

### Pseudo class

Pseudo class defines the style of a special state of an element, represented as `:class-name`.

E.g. [:first-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child) and [:last-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/:last-of-type)

Use Case: Build a navigation bar which has n items separated by '|' while the last item doesn't have the separator.

[Demo](https://codepen.io/n0rush/pen/vwQegM)

### Pseudo element

Pseudo element defines the style of a specific part of an element, represented as `:element-name`.

E.g. [::after](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) and [::first-letter](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter)

When would you want to use pseudo element:

* You don’t have control over the html but want to add content. For example, you want to slightly change a third-party component to adapt to your custom needs. 
* Html content without meaning. Just achieve some effect. E.g  [clear float](https://codepen.io/n0rush/pen/arQLqa).

## Border radius can work without border.

```html
<div></div>
```

```css
div {
  width: 100px;
  height: 100px;
  background: #0ff;
  border: none;
  border-radius: 50%;
}
```

[Demo](https://codepen.io/n0rush/pen/yWQKVq)

## background-origin vs background-clip

* [background-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin): sets the background's origin, from the border start, inside the border, or inside the padding. The default is `padding-box`.

* [background-clip](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip): sets whether an element's background extends underneath its border box, padding box, or content box. The default is `border-box`.

[Demo](https://codepen.io/n0rush/pen/byzapL)

## Negative margin can lead to stack

If two elements sit near each other, applying negative margin to one element can make them stack. With [z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index), we can then achieve the same visual effect as `position`;

> The z-index CSS property sets the z-order of a `positioned` element and its descendants or flex items
> A positioned element is an element whose computed position value is either relative, absolute, fixed, or sticky. (In other words, it's anything except static)

[Demo](https://codepen.io/n0rush/pen/zQMWwX)

## Percentage unit

Percentage unit set to element is relative to the containing block. Containing block is subject to the `position` property of the element. 

* For `fixed` `positioned` element, the containing block is viewport.
* For `absolute` `positioned` element with position absolute, the containing block is the closest `positioned` ancestor, `including content and padding`.
* For `static`(default) and `relative` positioned element, the containing block is the closest block element, `including only content`.

[Demo](https://codepen.io/n0rush/pen/NVEwpX)

## [BEM](http://getbem.com/)

> BEM — Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development

To summarize, name the class as: `.block__element—-modifier`

For more details, checkout the [introduction](http://getbem.com/introduction/) 

## Notice

- If you want to follow the latest news/articles for the series of reading notes, Please [「Watch」](https://github.com/n0ruSh/the-art-of-reading)to Subscribe.
