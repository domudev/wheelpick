# Icons

## Principle

We use [heroicons](https://heroicons.com/) and embed the SVG in Angular components
Since these components are pretty simple, we create them without tests, stylesheet and embed the template into the .ts file.

Additionally we use a separate module for icons, where we declare and export them from into the main app module.

Issue the following command to create such a component:

```shell
ng g component icons/<MyIcon> --skip-tests --export --style none --prefix icon --type icon --module icons -t
```

Inside the component, paste the heroicon SVG into the template and remove the class `h-6` and `w-6`.

## Usage

Now you can use it as a regular Angular Component

```html
...
<icon-something class="..."></icon-something>
...
```
