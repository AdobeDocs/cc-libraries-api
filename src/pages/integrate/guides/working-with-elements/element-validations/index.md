---
keywords:
  - Creative Cloud
  - API Documentation
  - JavaScript
  - CC Libraries API
  - Creative Cloud Libraries API
---

# Implemented Validations

This document catalogues what validation rules are in place for element creation payloads. 
We assume general familiarity with Libraries, and the element creation process.

## Definitions
| Term | Definition |
|------|------------|
| property path (column heading) | Path to property in JSON document. |
| condition (column heading) | The condition that must be fulfilled for a validation to execute. |
| type (column heading) | The JSON type expected for some property value, or the Java type that the JSON value will be coerced into if it is more restrictive then the JSON type and is a primitive type or the boxed equivalent. Additionally, some properties are polymorphous, and may have different validation rules associated with different types. |
| empty (string) | A string containing no characters, e.g., "". |
| blank (string) | A string containing only whitespace, e.g., "      ". |
| always (execution condition) | Indicates that a validation will always be performed, regardless of property value. |
| when present (execution condition) | Indicates that a validation will only be performed if the property value is non-null. |
| well-known (element or representation type) | An element or representation type for which we have implemented bespoke validation logic. |
| well-known (property in paragraph or character style) | A style for which we have implemented bespoke validation logic. |
| supported (element or representation type) | An element or representation type that can be used in requests. | 
| user-uploaded asset | Binary data uploaded before a library element is created referring to the uploaded data. |
| concrete MIME type | A MIME type that is both valid, and does not contain wildcards, e.g., "image/*" is a valid MIME type, but is not concrete, but "image/png" is valid and concrete. |

## JSON Property Path Legend
| Symbol | Description |
|--------|-------------|
| $ | contextual document root, will refer to the last object level named in a heading |
| .aProperty | property access |
| [1] | array index |
| .* | all properties in object |
| [*] | all indexes in array |
| .{a, b, c, d} | a specific set of possible properties |
| [*]\(property=value\) | a selector; all objects in the array where property=value |

## Validation and Type Coercion
There are effectively two layers of processes that sanitize service input. The first is the process that maps input to
models with strongly-typed properties. The second is explicit validation logic that interrogates
payload content after it has been mapped. A payload may be rejected within either layer, but, these errors will appear
differently to the service consumer. For example, if a property value should be coerced into an integer in the
mapping layer, but the JSON type of the value supplied was string, and, that string contained non-numeric
characters, then the service consumer may get a 500 in response as the type coercion would fail. However,
if we had implemented validation that enforces a range for this property, the consumer supplied a valid number that could be
coerced into an integer, and this number fell outside of the allowed range, we would return a 400. Since, in effect,
both processes sanitize input, both are accounted for in this document. 

A couple examples\:

| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $.adbeDesiredLetterSpacing | when present | number | must be between -100 and 500, inclusive | 

In this example, if the supplied value was not coercible into a number, the payload would be rejected.
If the supplied value was coercible, then the validation rule "must be between -100 and 500, inclusive"
would apply.

| Property Path | Condition | Type | Validation |
|----------|---------------|------------|-----------|
| $.vectorColor | when present | boolean | none (coercion only) |

In this example, if the supplied value was not coercible into a boolean, the payload would be rejected.
If the supplied value was coercible, no other validation would occur.


## MIME Types Associated With User-Uploaded Assets
~~~
  private static final String[] assetMimeTypes = {
      "image/*",
      "video/*",
      "text/*",
      "audio/*",
      "application/photoshop",
      "application/ai",
      "application/pdf",
      "application/zip",
      "application/postscript",
      "application/vnd.adobe.indesign-idms",
      "application/x-indesign",
      "application/vnd.adobe.muse-collection",
      "application/vnd.adobe.pstouch",
      "application/vnd.adobe.psremix",
      "application/vnd.adobe.ideas",
      "application/vnd.adobe.ase",
      "application/mxf",
      "application/x-shockwave-flash",
      "application/msword",
      "application/msexcel",
      "application/mspowerpoint",
      "application/vnd.ms-publisher",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  };
~~~

## Valid CSS Units
~~~
  public static final Set<String> cssUnits = Set.of(
      "%",

      // relative units
      "em",
      "ex",
      "cap",
      "ch",
      "ic",
      "rem",
      "lh",
      "rlh",
      "vw",
      "vh",
      "vi",
      "vb",
      "vmin",
      "vmax",

      // absolute lengths
      "cm",
      "mm",
      "q",
      "in",
      "pt",
      "pc",
      "px",

      // angles
      "deg",
      "grad",
      "rad",
      "turn",

      // duration
      "s",
      "ms",

      // frequency
      "hz",
      "khz",

      // resolution
      "dpi",
      "dpcm",
      "dppx"
  );
~~~

## Supported Audio Types
audio/mpeg\
audio/x-mpeg\
audio/mpeg3\
audio/x-mpeg-3\
audio/mp3\
audio/m4a\
audio/wav\
audio/x-wav\
audio/vnd.wave\
audio/wave\
audio/aac\
audio/aacp\
audio/aif\
audio/x-aiff


## Validation Rules

### Reference Structures
The following models are used in specific contexts, and are not used in representation payloads outside of those contexts.

#### Unit
| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $.type | when present | string | must be a valid CSS measurement, case-insensitive; c.f. "Valid CSS Measurements" |
| $.value | when present | number | none (coercion only) |


### postLibraryElementPayload
| Property Path | Condition | Type | Validation |
|----------|---------------|------------|-----------|
| $.type | always | string | must have a valid MIME type that is also concrete (no wildcards) |
| $.client | always | object | must not be null |
| $.client.{app, deviceId, device} | always | string | must not be blank  |
| $.representations | when present | array | none (coercion) |
| $.representations | when present | array | cannot contain more then one representation with the 'primary' relationship |
| $.representations[*] | when present | object | each representation must be valid according to rules associated with representation type |
| $.name | when present | string | none (coercion only) |
| $.source | when present | string | none (coercion only) |

### postLibraryElementPayload.representations[*]
| Property Path | Condition | Type | Validation |
|----------|---------------|------------|-----------|
| $.type | always | string | must be a valid MIME type that is also concrete (no wildcards) |
| $.type | the representation type is well-known | string | representation type must belong to the set of types associated with the element type |
| $.{storage_href, path} | type matches one of the items in "MIME Types Associated With User-Uploaded Assets" list above. | string | storage_href and/or path must not be blank |
| $.linktype | $.type is "application/vnd.adobe.library.link+dcx" | string | must be a valid MIME type that is also concrete (no wildcards) |
| $.linkurl | $.type is "application/vnd.adobe.library.link+dcx" | string |  must not be a blank string |
| $.adobestock#trackingdata | type is "application/vnd.adobe.library.link+dcx" | object | must not be null |
| $.color#data | $.type is "application/vnd.adobe.library.color+dcx" | object | must not be null |
| $.colortheme#data | $.type is "application/vnd.adobe.library.colortheme+dcx" | object | must not be null |
| $.gradient#data | $.type is "application/vnd.adobe.library.gradient+dcx" | object | must not be null |
| $.gradient#data | $.type is "application/vnd.adobe.library.gradient.noise+dcx" | object | must not be null |
| $.audio#data | $.type is a supported audio type; c.f. "Supported Audio Types" above | object | must not be null |
| $.font#data | $.type is "application/vnd.adobe.library.font+dcx" | object | must not be null |
| $.characterstyle#data | $.type is "application/vnd.adobe.library.characterstyle+dcx" | object | must not be null |
| $.paragraphstyle#data | $.type is "application/vnd.adobe.library.paragraphstyle+dcx" | object | must not be null |
| $.relationship | when present | string | none (coercion only) |
| $.md5 | when present | string | none (coercion only) |
| $.etag | when present | string | none (coercion only) |
| $.is_full_size | when present | boolean | none (coercion only) |
| $.is_external_link | when present | boolean | none (coercion only) |
| $.width | when present | long | none (coercion only) |
| $.height | when present | long | none (coercion only) |
| $.content_length | when present | Long | none (coercion only) |
| $.representation_order | when present | Integer | none (coercion only) |
| $.is_preferred_thumbnail | when present | boolean | none (coercion only) |
| $.is_component | when present | boolean |  none (coercion only) |

### Representation Type Validations

#### application/vnd.adobe.color+json (postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.color+json).color#data)
| Property Path | Condition | Type | Validation |
|----------|---------------|------------|-----------|
| $.mode | always | string | must be in set {"RGB", "CMYK", "Lab", "Gray", "HSB", "RGB.tint", "CMYK.tint", "Lab.tint"} | 
| $.value | always | object | must be non-null |
| $.value | when mode is "RGB" or "RGB.tint" | object | must have keys "r", "g", and "b" |
| $.value.{r, g, b} | when mode is "RGB" or "RGB.tint" | Double | values must be between 0 and 255, inclusive |
| $.value | when mode is "CMYK" or "CMYK.tint" | object | must have keys "c", "m", "y", and "k' |
| $.value.{c, m, y, k} | when mode is "CMYK" or "CMYK.tint" | Double | values must be between 0 and 100, inclusive |
| $.value | when mode is "Lab" or "Lab.tint" | Double | must have keys "l", "a", and "b" |
| $.value.l | when mode is "Lab" or "Lab.tint" | Double | must be between 0 and 100, inclusive  |
| $.value.a | when mode is "Lab" or "Lab.tint" | Double | must be between -128 and 127, inclusive |
| $.value.b | when mode is "Lab" or "Lab.tint" | Double | must be between -128 and 127, inclusive  |
| $.value | when mode is "HSB" | object | must have keys "h", "s", and "b" |
| $.value.h | when mode is "HSB" | Double | must be between 0 and 360, inclusive |
| $.value.s | when mode is "HSB" | Double | must be between 0 and 100, inclusive |
| $.value.b | when mode is "HSB" | Double | must be between 0 and 100, inclusive |
| $.value | when mode is "Gray" | Double | must be between 0 and 100, inclusive |
| $.profileName | when present | string | must be non-null |
| $.alpha | when present | Double | must be between 0 and 1, inclusive | 
| $.type | when present | string | must be in set {"process", "spot", "registration", "none"} |
| $.spotColorName |  when type is "spot" | string | must be non-empty string |
| $.tint |  when mode is one of {"RGB.tint", "CMYK.tint", "Lab.tint"} | string | must be between 0 and 100, inclusive |

#### application/vnd.adobe.colortheme+json (postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.colortheme+json).colortheme#data)
| Property Path | Condition | Type | Validation |
|---------------|-----------|-------------------|------------|
| $.swatches | always | array | must contain 5 things | 
| $.swatches[*] | always | array | must be an array |
| $.swatches[*] | always | array | must contain one application/vnd.adobe.color+json where mode is "RGB" |
| $.swatches[\*][*] | always | object | apply application/vnd.adobe.color+json validations |
| $.themeId | when present | string | none (coercion only) | 
| $.baseSwatchIndex | when present | integer | none (coercion only) |
| $.tags | when present | array of strings | none (coercion only) |
| $.rule | when present | string | none (coercion only) |
| $.mood | when present | string | none (coercion only) |

#### application/vnd.adobe.gradient+json (postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.gradient+json).gradient#data)
| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $.type | always | string | value one of {"linear", "radial"} |
| $.stops | always | array | must not be null |
| $.stops[*].color | always | array | must be an array |
| $.stops[*].color | always | array | must contain at least one color where mode is "RGB" |
| $.stops[*].color[\*] | always | array | must be a valid application/vnd.adobe.color+json |
| $.stops[*].phxsInherit | when present | string | must be one of {"foreground", "background"} |
| $.stops[*].offset | when present | Double | must be between 0 and 1, inclusive |
| $.stops[*].midpoint | always | Double | none (coercion only) |
| $.angle | when present | Integer | must be between 0 and 360, inclusive | 
| $.scale | when present | Double | must be greater than 0 |
| $.centerPoint | when present | object | must contain the keys "x", and "y" |
| $.centerPoint.{x, y} | always | Double | values must be between -1 and 1, inclusive |
| $.interpolation | always | string | must be one of {"linear", "euclidean", "spline"} |
| $.opacities  | when present | array | must be an array |
| $.opacities[*].{opacity, midpoint, offset} | when present | Double | must be between 0 and 1, inclusive |
| $.orientation | when present | object | must contain the keys "x1", "x2", "y1", "y2"|
| $.orientation.{x1, x2, y1, y2} | when present | object | values must be between 0 and 1 |
| $.direction | when present | string | must be one of {"horizontal", "vertical" } |
| $.smoothness | when present | Integer | must be between 0 and 4096, inclusive |

#### application/vnd.adobe.gradient.noise+json (postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.gradient.noise+json).gradient#data)
| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $.maximumColor | always | array | is not null, is an array |
| $.minimumColor | always | array | must contain at least one color where mode is "RGB"  |
| $.minimumColor[*] | always | object | is a valid application/vnd.adobe.color+json |
| $.maximumColor | always | array | is not null, is an array |
| $.maximumColor | always | array | must contain at least one color where mode is "RGB"  |
| $.maximumColor[*] | always | object | is a valid application/vnd.adobe.color+json |
| $.randomSeed | always | Double | is not null |
| $.smoothness | when present | Integer | must be between 0 and 4096, inclusive |
| $.type | when present | string | none (coercion only) |
| $.name | when present | string | none (coercion only) |
| $.vectorColor | when present | boolean | none (coercion only) |
| $.showTransparency | when present | boolean | none (coercion only) |

#### application/vnd.adobe.font+json (postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.font+json).font#data)
| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $.name | when present | string | must not be blank |
| $.family | when present | string | must not be blank |
| $.postScriptName | when present | string | must not be blank |
| $.style | when present | string | must not be blank |
| $.typekitFontId | when present | string | must not be blank |
| $.foundry | when present | string | must not be blank |

#### application/vnd.adobe.element.characterstyle+json (postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.characterstyle+json).characterstyle#data)
| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $ | always | any | must contain at least one property |
| $ | always | any | cannot contain any properties from application/vnd.adobe.element.paragraphstyle+json that are type coerced 🚩|
| $.* | when present | any | must not be null |
| $.* | when present, if string | string | must not be blank |  
| $.color[*] | when present | object | must be a valid application/vnd.adobe.color+json |
| $.fontSize | when present | object | must be a valid Unit |
| $.fontFamily | when present | string | must not be blank |
| $.fontStyle | when present | string | must not be blank | 
| $.fontWeight | when present | string | must not be blank | 
| $.fontWeight | when present | Integer | must be between 1 and 1000, inclusive | 
| $.lineHeight | when present | object | must be a valid Unit |
| $.baselineShift | when present | object | must be a valid Unit |
| $.letterSpacing | when present | object | must be a valid Unit |
| $.adbeFont | when present | object | must be a valid application/vnd.adobe.font+json, except, all properties are optional |

#### application/vnd.adobe.element.paragraphstyle+json (postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.paragraphstyle+json).paragraphstyle#data)
| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $ | always | any | all validations from application/vnd.adobe.element.characterstyle+json, except where marked 🚩|
| $.adbeParaAlignment | when present | string | must be one of {"Alignment.LEFT_ALIGN", "Alignment.CENTER_ALIGN", "Alignment.RIGHT_ALIGN", "Alignment.LEFT_JUSTIFIED", "Alignment.CENTER_JUSTIFIED", "Alignment.RIGHT_JUSTIFIED", "Alignment.FULLY_JUSTIFIED"} | 
| $.adbeLeftIndent | when present | object | must be a valid Unit | 
| $.adbeFirstLineIndent | when present | object | must be a valid Unit | 
| $.adbeRightIndent | when present | object | must be a valid Unit | 
| $.adbeSpaceBefore | when present | object | must be a valid Unit | 
| $.adbeSpaceAfter | when present | object | must be a valid Unit | 
| $.adbeMinimumWordSpacing | when present | number | must be between 0 and 1000, inclusive | 
| $.adbeDesiredWordSpacing | when present | number | must be between 0 and 1000, inclusive | 
| $.adbeMaximumWordSpacing | when present | number | must be between 0 and 1000, inclusive | 
| $.adbeMinimumLetterSpacing | when present | number | must be between -100 and 500, inclusive | 
| $.adbeDesiredLetterSpacing | when present | number | must be between -100 and 500, inclusive | 
| $.adbeMaximumLetterSpacing | when present | number | must be between -100 and 500, inclusive | 
| $.adbeMinimumGlyphScaling | when present | number | must be between 50 and 200, inclusive | 
| $.adbeDesiredGlyphScaling | when present | number | must be between 50 and 200, inclusive | 
| $.adbeMaximumGlyphScaling | when present | number | must be between 50 and 200, inclusive | 
| $.adbeParaAutoLeading | when present | number | must be between 0 and 500, inclusive | 
| $.adbeSingleWordJustification | when present | string | must be one of {"Justification.FULLY_JUSTIFIED", "Justification.LEFT_ALIGN", "Justification.CENTER_ALIGN", "Justification.RIGHT_ALIGN"} | 

#### audio/* (see Supported Audio Types) postLibraryElementPayload.representations\[*\](type=application/vnd.adobe.audio+json).audio#data
| Property Path | Condition | Type | Validation |
|---------------|-----------|------|------------|
| $.duration | when present | Double | must be greater than 0 | 
| $.bitrate | when present | Integer | must be greater than 0 | 
| $.channels | when present | Integer | must be greater than 0 | 
| $.tempo | when present | Integer | must be greater than 0 | 