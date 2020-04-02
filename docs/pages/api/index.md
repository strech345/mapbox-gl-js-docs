---
title: API Reference
description: The Mapbox GL JS API documentation to render interactive maps from vector tiles and Mapbox styles.
contentType: API
prependJs:
- "import { version } from '../../../mapbox-gl-js/package.json';"
- "import Note from '@mapbox/dr-ui/note';"
language:
  - JavaScript
---

{{<div className="color-gray mt-neg24 mb12">}}
Current version: [`mapbox-gl.js v{{version}}`](https://github.com/mapbox/mapbox-gl-js/releases)
{{</div>}}

Mapbox GL JS is a JavaScript library that uses WebGL to render interactive maps from [vector tiles](https://docs.mapbox.com/help/glossary/vector-tiles/) and [Mapbox styles](/mapbox-gl-js/style-spec/). It is part of the Mapbox GL ecosystem, which includes [Mapbox Mobile](https://www.mapbox.com/mobile/), a compatible renderer written in C++ with bindings for desktop and mobile platforms.                    

{{<Note title="Pricing for Mapbox GL JS">}}
If you are using Mapbox GL JS v1.0.0 or higher your usage is counted in [map loads](https://docs.mapbox.com/help/glossary/map-loads/). If you are using Mapbox GL JS < v1.0.0, your usage is measured in tile requests.

For more details see [our pricing guide](https://docs.mapbox.com/accounts/overview/pricing/#mapbox-gl-js--v100) or reach out to our [support team](https://support.mapbox.com/hc/en-us).
{{</Note>}}
