# Assets

The assets folder consists of three main folders; images, icons, and fonts. Of course, you can create another folder for other needs _(e.g. sounds)_. Just make sure to keep it plural.

For identification, adding prefixes to every file according to the type of asset is recommended. The convention is adding three characters as an abbreviation and underscores twice. For example, if you have svg file for search icons, you should name it `ico__search.svg`.

Also, there is a case when you have a kind of the same purpose but there is a modifier or only a little bit different. For example, sometimes you need two kinds of icon types (e.g. only outline for the base and filled). Therefore you need to add a suffix for identification (e.g. ico\_\_user--filled.svg).

You can see this example below.

```
assets/
├─ fonts/
│  └─ fon__Montserrat_regular.woff2
├─ icons/
│  ├─ ico__right_arrow.svg
│  ├─ ico__search.svg
│  ├─ ico__user.svg
│  └─ ico__user--filled.svg
├─ images/
│  └─ img__logo.webp
├─ json/
│  └─ jso__anim_loading.json
├─ sounds/
│  └─ snd__click.ogg
└─ README.md

```
