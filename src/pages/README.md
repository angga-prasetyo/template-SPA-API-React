# Pages

Since we aren't using meta-framework like _Next.js_ or _Remix_, we must set the router by ourselves. This means, that the `pages` folder, will be extremely freestyle if we don't agree with one convention.

That being said, I recommend using the pages folder based on their modules/features and submodules to prevent any confusion.

For example, login and register should be inside of the `authentication` feature, because the goal of them is to authenticate the user. Another example is if we have a `product` that consists of two products, `fresh food` and `frozen food`, we should put those into the `product` folder since both of them are submodules of the `product` module.

Another thing is, you see there are some suffixes before file extension. This is used for files that are exclusively used in modules/submodules. For example, we see `login.hook.tsx` there. We put all the logic code here to split it from UI code for readable reasons. This same goes with constants, and styles (use modules if you are using css-modules).

There is also `index.tsx` file. We need it to put the page that we create from `*.page.tsx` file here and add some extra steps like error boundary to boost UX and lazy-loading to boost app performance. Of course, you can put one of them in that `index.tsx` if you only need one of them. If you don't need both of them, just keep using `index.tsx` to keep it tidy.

You can see this example below.

```
pages/
├─ auth/
│  ├─ login/
│  │  ├─ index.tsx
│  │  ├─ hook.ts
│  │  └─ page.tsx
│  └─ register/
├─ home/
└─ product/
   ├─ fresh_food/
   └─ frozen_food/
      ├─ FrozenFood.constant.ts
      ├─ FrozenFood.hook.ts
      ├─ FrozenFood.page.tsx
      ├─ FrozenFood.style.scss
      └─ index.tsx
```
