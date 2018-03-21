# gitbook-plugin-theme-cfpb
GitBook theme for Consumer Financial Protection Bureau projects.

Modified from the [default theme for GitBook](https://github.com/GitbookIO/theme-default/).

![Image](preview.png)

## Installation

In your GitBook `books.json`, we recommend this plugin configuration:

```
{
  …
  "plugins": [
    "theme-cfpb",
    "-theme-default",
    "-fontsettings",
    "-highlight",
    "-sharing",
    "auto-summary",
    "styles-less",
    "edit-link",
    "prism"
  ],
  "variables": {
    "title": "CFPB Docs"
  }
  …
}
```

Then run `gitbook.js install` and `gitbook.js build` after the [GitBook CLI](https://www.npmjs.com/package/gitbook-cli) is installed.

The minus sign, such as in `"-theme-default"` will uninstall a default plugin.
