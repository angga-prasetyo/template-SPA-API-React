# Styles

In this folder, we will put global styling and some SCSS variables and utilities.

We will put some basic configuration like resetting CSS and font-family into global style since it will be used globally around the project. We also can put some CSS variables like `var(--ctbg-color)` here if scss variables cannot cover it. Make sure to minimalize using SCSS variables globally here since I afraid it will be overriden overtime and hard to debug.

Instead, put the SCSS variables into `styles/scss/variables` folder using `_` as a prefix file name. For example, `_colors.scss` to put your project color palette and will be reusable around the project.

I also create `utils` folder inside `scss` folder to contain some utilities like margin, padding, or even animation. Utilities itself is like CSS class but we can call it inside JSX and extends it inside SCSS file.

Of course you can create mixins folder inside `scss` folder if there is any mixins for the project. Just don't forget to add `_` as a prefix for file name.

You can see the folder structure below.

```
styles/
├─ utils/
│  ├─ _borderRadius.scss
│  ├─ _margin.scss
│  └─ _padding.scss
├─ variables/
│  ├─ _breakpoints.scss
│  └─ _colors_.scss
├─ global.css
└─ README.md
```
