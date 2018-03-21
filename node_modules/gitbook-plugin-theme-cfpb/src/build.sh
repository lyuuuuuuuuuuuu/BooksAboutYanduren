#! /bin/bash

# Cleanup folder
rm -rf _assets

# Recreate folder
mkdir -p _assets/website/

# Compile JS
browserify src/js/core/index.js | uglifyjs -mc > _assets/website/gitbook.js
browserify src/js/theme/index.js | uglifyjs -mc > _assets/website/theme.js

# Compile Website CSS
lessc -clean-css src/less/website.less _assets/website/style.css

# Copy Capital Framework JS
cp node_modules/capital-framework/dist/capital-framework.min.css _assets/website/capital-framework.min.css

# Copy Capital Framework JS
cp node_modules/capital-framework/dist/capital-framework.min.js _assets/website/capital-framework.min.js
