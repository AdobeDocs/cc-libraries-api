# Supported Library Element Types

This document provides detail on currently supported library element types; the amount of information
here should be enough to get started creating any of these types, however, it may not, in certain circumstances,
be completely comprehensive. This document assumes general familiarity with Libraries and the element
creation process.

The element types are:

| Name                    | MIME Type                                        |
| ----------------------- | ------------------------------------------------ |
| Graphics                | application/vnd.adobe.element.image+dcx          |
| Brush                   | application/vnd.adobe.element.brush+dcx          |
| Layer Style             | application/vnd.adobe.element.layerstyle+dcx     |
| Template                | application/vnd.adobe.element.template+dcx       |
| Color                   | application/vnd.adobe.element.color+dcx          |
| Color Theme             | application/vnd.adobe.element.colortheme+dcx     |
| Gradient                | application/vnd.adobe.element.gradient+dcx       |
| Pattern                 | application/vnd.adobe.element.pattern+dcx        |
| Character Style         | application/vnd.adobe.element.characterstyle+dcx |
| Paragraph Style         | application/vnd.adobe.element.paragraphstyle+dcx |
| Text                    | application/vnd.adobe.element.text+dcx           |
| Look                    | application/vnd.adobe.element.look+dcx           |
| Video                   | application/vnd.adobe.element.video+dcx          |
| Animation               | application/vnd.adobe.element.animation+dcx      |
| Motion Graphic Template | application/vnd.adobe.element.graphic+dcx        |
| Model                   | application/vnd.adobe.element.3d+dcx             |
| Material                | application/vnd.adobe.element.material+dcx       |
| Light                   | application/vnd.adobe.element.light+dcx          |

## Graphics

### Element Type

application/vnd.adobe.element.image+dcx

### Description

Represents any still image.

### Allowed Representation Types

The set of types that is allowed is quite expansive, and changes frequently. This includes common image types, file
formats specific to different CC applications, and, in certain contexts, types we can convert to images, including
things like PDFs, Word documents, etc. However, the most common types are:

- image/gif
- image/jpeg
- image/jpg
- image/png
- image/svg+xml

### Representation Requirements

- if the primary representation is not a bitmap, a fullsize bitmap rendition that can be used for thumbnails
- optionally, other renditions depending on what apps may consume the image

### Example Payload

```json
{
	"name": "my-cool-image",
	"type": "application/vnd.adobe.element.image+dcx",
	"client": {
		"deviceId": "MY_COOL_DEVICE_ID",
		"device": "MY_COOL_DEVICE",
		"app": "MY_COOL_APP"
	},
	"representations": [
		{
            "type": "image/svg+xml",
            "relationship": "primary",
            "storage_href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/3f4d2883-f7e5-4d64-bec1-f153ae5d80af"
        },
        {
            "type": "image/png",
            "relationship": "rendition",
            "storage_href": "https://cc-api-storage-stage.adobe.io/assets/adobe-libraries/4dc522a7-af3d-4274-986c-bb1f59bb20d0/ec13e4e1-1c56-4d84-89ad-8df52f42ae8a"
        }
	]
}
```

## Color

### Element Type

application/vnd.adobe.element.color+dcx

### Description

Represents a single color.

### Allowed Representation Types

#### application/vnd.adobe.color+json

Every color representation requires a property named "color#data", the value of which is a JSON structure
that represents the color. This structure may have the following properties:

| Property      | Description                                                                                                              | Required                                | Values                                                                                      | Default Value                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| mode          | The type of color space (e.g. RGB, CMYK, etc...)                                                                         | Yes                                     | "RGB", "CMYK", "Lab", "Gray", "HSB", "RGB.tint", "CMYK.tint", "Lab.tint"                    |                                            |
| profileName   | The name of the color profile (each mode has a default color profile if omitted, so this is always defined).             | No                                      | String - Possible values may depend on app and region                                       | Default value depends on mode - see below. |
| type          | Way of constructing the color (e.g. is it mixed or using a specific ink). See table below for more detailed explanation. | No                                      | "process", "spot", "registration", "none"                                                   | "process"                                  |
| value         | Value of the color based on the mode                                                                                     | Yes                                     | Value depends on mode - see table below.                                                    |                                            |
| alpha         | Opacity of the color                                                                                                     | No                                      | Floating point number in the range 0..1 (0.0 is fully transparent, and 1.0 is fully opaque) | 1                                          |
| spotColorName | Name of the spot color (only relevant for type = "spot")                                                                 | Required only for colors of type "spot" | String - Name of the spot color (catalog + name)                                            |                                            |

'value' will change depending on 'mode' as follows:

| Mode      | Default profileName       | Value                                                                                                                                                                                   |
| --------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CMYK      | U.S. Web Coated (SWOP) v2 | Four properties named "c", "m", "y", and "k". The value of each property is a floating point number in the range 0..100.                                                                |
| CMYK.tint | U.S. Web Coated (SWOP) v2 | The same properties as the CMYK mode, with an additional property named "tint". The value of "tint" is a floating point number in the range 0..100.                                     |
| Gray      | Dot Gain 20%              | A single floating point number in the range 0..100.                                                                                                                                     |
| HSB       | sRGB IEC61966-2.1         | Three properties named "h", "s", and "b". The value of "h" is a floating point number in the range of 0..360 and "s" and "b" are floating point numbers in the range of 0..100          |
| Lab       | CIELAB D50                | Three properties named "l", "a", and "b". The value of "L" is a floating point number in the range 0..100. The values of "a" and "b" are floating point numbers in the range -128..127. |
| Lab.tint  | CIELAB D50                | The same properties as the Lab mode, with an additional property named "tint". The value of "tint" is a floating point number in the range 0..100.                                      |
| RGB       | sRGB IEC61966-2.1         | Three properties named "r", "g", and "b". The value of each property is a floating point number in the range 0..255.                                                                    |
| RGB.tint  | sRGB IEC61966-2.1         | The same properties as the RGB mode, with an additional property named "tint". The value of "tint" is a floating point number in the range 0..100.                                      |

The different color "types" are as follows - note that all colors require the process values for the color mode, even if they're of a non-process type, so that they're supported in apps that only understand process colors.

| Type         | Additional Properties                                     | Description                                                                                                                           | Comments                                                                                                                                                                                                                                              |
| ------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| none         |                                                           | A "none" color is used in print to mean "don't apply any ink"                                                                         | None colors should set the process values to 0% with alpha 0 (e.g. CMYK 0,0,0,0, alpha 0)                                                                                                                                                             |
| process      |                                                           | A process color is one that's obtained by mixing different properties (e.g. mixing inks or light). This is the default type of color. | Note: Even if a color has type other than process, it must still include a value for the color based on the table above. (e.g. CMYK must always have c, m, y, k fields).                                                                              |
| registration |                                                           | A registration color is used in print to mean "apply all the inks" (e.g. 100% process colors plus 100% of any spot color).            | If the type is “registration” – apps that understand this will interpret as a registration color, otherwise will use the process values. Registration colors should set the process values to 100%, with alpha 1 (e.g. CMYK 100,100,100,100, alpha 1) |
| spot         | "spotColorName": Name of the spot color (catalog + name). | A spot color is used in print to mean a specific ink (e.g. using a Pantone color), rather than mixing inks.                           | The spotColorName property holds the name of the catalog and color of the spot color, e.g. "Pantone Metallic Gold 875"                                                                                                                                |

### Representation Requirements

- At least one RGB representation
- optionally, other renditions

### Example postLibraryElement Payload:

```json
{
	"name": "my-color",
	"type": "application/vnd.adobe.element.color+dcx",
	"client": {
		"deviceId": "MY_COOL_DEVICE_ID",
		"device": "MY_COOL_DEVICE",
		"app": "MY_COOL_APP"
	},
	"representations": [
		{
		    "type": "application/vnd.adobe.color+json",
		    "relationship": "primary",
		    "color#data": {
		        "mode": "CMYK",
		        "value": {
	                "c": 100,
	                "m": 79.0585160255432,
	                "y": 39.5178139209747,
	                "k": 31.2565803527832
		        },
		        "type": "process"
		    }
		},
		{
	        "type": "application/vnd.adobe.color+json",
	        "relationship": "rendition",
	        "color#data": {
	            "mode": "RGB",
	            "value": {
	                "r": 12.7313232421875,
	                "g": 56.0341644287109,
	                "b": 89.8001861572266
	            },
	            "type": "process"
	        }
	    }
	]
}
```

## Color Theme

### Element Type

application/vnd.adobe.element.colortheme+dcx

### Description

Represents a color theme, a collection of 5 colors.

### Allowed Representation Types

#### application/vnd.adobe.colortheme+json

The colortheme JSON requires a property named "colortheme#data", containing a structure with the following properties:

| Property        | Description                                                                              | Required                                               | Values     | Default Value |
| --------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------- | ------------- |
| themeId         | Theme ID as stored in Adobe Color                                                        | No                                                     |            |               |
| tags            | An array of tags to help you classify your color theme, e.g., "Citrus", "Colorful", etc. | No                                                     |            |               |
| baseSwatchIndex | Index of the base swatch in the swatches array, used mostly by apps while editing.       | No                                                     | 0, 1, 2, 3 |               |
| rule            | Rule that was applied to base swatch to generate the other swatches.                     | Analogous, Complimentary, Monochromatic, Triad, Custom | No         |               |
| mood            | Rule that was applied while picking colors from a picture.                               | Colorful, Bright, Muted, Dark, Custom                  | No         |               |
| swatches        | See below.                                                                               | Yes                                                    |            |               |

#### Swatches

Swatches should contain an array of exactly 5 arrays. Each array contains objects in the format defined for
Color that are all representations of the same color and must include at least one RGB representation. The primary
representation of any single color will always be at index 0 in the array.

### Representation Requirements

- A application/vnd.adobe.colortheme+json primary representation.

### Example postLibraryElement Payload

```json
{
	"name": "my-cool-colortheme",
	"type": "application/vnd.adobe.element.colortheme+dcx",
	"client": {
		"deviceId": "MY_COOL_DEVICE_ID",
		"device": "MY_COOL_DEVICE",
		"app": "MY_COOL_APP"
	},
	"representations": [
		{
		    "type": "application/vnd.adobe.colortheme+json",
		    "relationship": "primary",
		    "colortheme#data": {
				"tags": ["tag1", "tag2"],
				"baseSwatchIndex": 0,
				"rule" : "analogous",
				"mood" : "colorful",
				"swatches": [
					[
					  {
					    "mode": "CMYK",
					    "value": {
					      "c": 0,
					      "m": 12,
					      "y": 37,
					      "k": 30
					    }
					  },
					  {
					    "mode": "RGB",
					    "value": {
					      "r": 179,
					      "g": 158,
					      "b": 113
					    },
					    "type": "process",
					    "profileName": "sRGB IEC61966-2.1"
					  }
					],
					[
					  {
					    "mode": "CMYK",
					    "value": {
					      "c": 17,
					      "m": 0,
					      "y": 7,
					      "k": 0
					    }
					  },
					  {
					    "mode": "RGB",
					    "value": {
					      "r": 212,
					      "g": 255,
					      "b": 237
					    },
					    "type": "process",
					    "profileName": "sRGB IEC61966-2.1"
					  }
					],
					[
					  {
					    "mode": "CMYK",
					    "value": {
					      "c": 0,
					      "m": 8,
					      "y": 27,
					      "k": 0
					    }
					  },
					  {
					    "mode": "RGB",
					    "value": {
					      "r": 255,
					      "g": 234,
					      "b": 187
					    },
					    "type": "process",
					    "profileName": "sRGB IEC61966-2.1"
					  }
					],
					[
					  {
					    "mode": "CMYK",
					    "value": {
					      "c": 9,
					      "m": 37,
					      "y": 0,
					      "k": 20
					    }
					  },
					  {
					    "mode": "RGB",
					    "value": {
					      "r": 185,
					      "g": 129,
					      "b": 204
					    },
					    "type": "process",
					    "profileName": "sRGB IEC61966-2.1"
					  }
					],
					[
					  {
					    "mode": "CMYK",
					    "value": {
					      "c": 8,
					      "m": 32,
					      "y": 0,
					      "k": 30
					    }
					  },
					  {
					    "mode": "RGB",
					    "value": {
					      "r": 164,
					      "g": 122,
					      "b": 179
					    },
					    "type": "process",
					    "profileName": "sRGB IEC61966-2.1"
					  }
					]
				]
		    }
		}
	]
}
```

## Gradient

### Element Type

application/vnd.adobe.element.gradient+dcx

### Description

Represents a collection of colors (color stops), combined with some algorithm for interpolating between them.

### Allowed Representation Types

application/vnd.adobe.gradient+json

You may also encounter a representation type of "application/vnd.adobe.gradient.noise+json",
which represents a _noise gradient_. This is a custom gradient type used by Photoshop as a mechanism
to represent textures; this gradient type contains additional fields to the ones below.

| Property      | Description                                                                                                                               | Required | Values                                                                                                                                | Default Value | Notes                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| type          | The gradient type. Linear gradients are applied along a single axis. Radial gradients are applied outward from a single point.            | yes      | string, one of "linear", "radial"                                                                                                     |               | noise gradients use "noise"                                                                     |
| angle         | The angle which the gradient is applied across the bounding box.                                                                          | no       | number from 0-360 inclusive (degrees)                                                                                                 | 0             | The angle is measured counterclockwise from the positive x-axis.                                |
| aspectRatio   | For radial gradients, the ratio between the x and y axis of the ellipse (y/x).                                                            | no       | positive non-zero number                                                                                                              | 1.0           | Applies only to radial gradients.                                                               |
| scale         | For radial gradients, scale factor of the x-axis of the ellipse, relative to the width of the bounding box of the container being filled. | no       | positive non-zero number                                                                                                              | 1.0           | Applies only to radial gradients.                                                               |
| centerPoint   | For radial gradients, the center point is the point that the gradient radiates out from.                                                  | no       | a "Point" object (see below)                                                                                                          | (see below)   | Applies only to radial gradients.                                                               |
| stops         |                                                                                                                                           | yes      | an array of arrays of "Color" objects (e.g., "swatches" property in the Colortheme element above, without the limitation of 5 colors) |               | Must include at least RGB format, may include additional formats. Do not include alpha channel. |
| opacities     |                                                                                                                                           | no       | an array of "Opacity" objects (see below)                                                                                             | (see below)   |                                                                                                 |
| interpolation |                                                                                                                                           | no       | string, one of "linear", "euclidean", "spline"                                                                                        | "linear"      |                                                                                                 |

Point:

| Attribute | Description                                               | Required | Values                             | Default Value | Notes                             |
| --------- | --------------------------------------------------------- | -------- | ---------------------------------- | ------------- | --------------------------------- |
| x         | x-axis of centerpoint, relative to edges of bounding box. | no       | Number between -1 and 1 inclusive. | 0.5           | A percentage of the bounding box. |
| y         |                                                           | no       | Number between -1 and 1 inclusive. | 0.5           |                                   |

Opacity:

| Attribute | Description | Required | Values                       | Default Value                                                                                                                   | Notes |
| --------- | ----------- | -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----- |
| opacity   |             | no       | number from 0 to 1 inclusive | 1.0                                                                                                                             |       |
| midpoint  |             | no       | number from 0 to 1 inclusive | 0.5                                                                                                                             |       |
| offset    |             | no       | number from 0 to 1 inclusive | default value will be interpolated relative to index in array, e.g., "[ { opacity: 1, offset: 0 }, { opacity: 1, offset: 1 } ]" |       |

### Representation Requirements

- Primary application/vnd.adobe.gradient+json representation.

### Example postLibraryElement Payload

```json
{
	"name": "my-cool-gradient",
	"type": "application/vnd.adobe.element.gradient+dcx",
	"client": {
		"deviceId": "MY_COOL_DEVICE_ID",
		"device": "MY_COOL_DEVICE",
		"app": "MY_COOL_APP"
		},
	"representations": [
        {
            "id": "d8453c78-4dd4-44c0-ab18-0114e171aa84",
            "type": "application/vnd.adobe.gradient+json",
            "relationship": "primary",
            "gradient#data": {
			    "type": "linear",
			    "angle": 0,
			    "stops": [
			        {
			            "color": [
			                {
			                    "mode": "RGB",
			                    "value": {
			                        "r": 102.0000000000000,
			                        "g": 238.0000000000000,
			                        "b": 207.0000000000000
			                    },
			                    "type": "process",
			                    "profileName": "sRGB IEC61966-2.1"
			                },
			                {
			                    "mode": "CMYK",
			                    "value": {
			                        "c": 48,
			                        "m": 0.0000000000000,
			                        "y": 30.0000000000000,
			                        "k": 0.0000000000000
			                    },
			                    "type": "process",
			                    "profileName": "U.S. Web Coated (SWOP) v2"
			                }
			            ],
			            "midpoint": 0,
			            "offset": 0
			        },
			        {
			            "color": [
			                {
			                    "mode": "RGB",
			                    "value": {
			                        "r": 74.0000000000000,
			                        "g": 96.0000000000000,
			                        "b": 204.0000000000000
			                    },
			                    "type": "process",
			                    "profileName": "sRGB IEC61966-2.1"
			                },
			                {
			                    "mode": "CMYK",
			                    "value": {
			                        "c": 77,
			                        "m": 67.0000000000000,
			                        "y": 0.0000000000000,
			                        "k": 0.0000000000000
			                    },
			                    "type": "process",
			                    "profileName": "U.S. Web Coated (SWOP) v2"
			                }
			            ],
			            "midpoint": 0.5,
			            "offset": 1.0
			        }
			    ],
			    "opacities": [
			        {
			            "opacity": 1.0,
			            "midpoint": 0,
			            "offset": 0
			        },
			        {
			            "opacity": 1.0,
			            "midpoint": 0.5,
			            "offset": 1.0
			        }
			    ],
			    "interpolation": "linear"
			}
        }
	]
}
```

## Character Style

### Element Type

application/vnd.adobe.element.characterstyle+dcx

### Description

Represents a collection of styles that may be applied to characters within some text.

### Allowed Representation Types

#### application/vnd.adobe.characterstyle+json

Every representation of type "application/vnd.adobe.characterstyle+json" should contain a property
named "characterstyle#data". The value of characterstyle#data should be a dictionary containing at least
one property. Each of these properties should represent a style.

There are three categories of styles: standard CSS styles, with the name in camelCase instead
of kebab-case, e.g. "lineHeight" instead of "line-height"; internal styles that are valid across multiple
adobe applications, the names of which will be in camelCase and prefixed with "adbe', e.g., "adbeFont";
and, internal styles only valid within a single application, which are typically prefixed with "adbe"
followed by an abbreviation of the application name and then the style name, e.g.,
"adbeIlstOpenTypePosition" for a style only valid for Adobe Illustrator. Styles in this third
category may change frequently depending on application-specific requirements.

For any style that may have an enumerated value, the value will just be a string, e.g., {"fontStyle": "italic"}.
For any style that may require a list of items, the value should be represented as an array,
e.g., {"fontFeatureSettings": \["aalt", "liga", "flac"\]}. For any style that is measured with
some css unit, the property value should be a dictionary containing a "type" and "value" property
that separate these components, e.g., "56vm" would be represented as {"value": 56, "type": "vm"}.
Additionally, most styles will have their own special requirements.

Due to the variety of constraints within each style, application-derived interrelationships between
styles, and, the possibility that some will change over time in accordance with application-specific
requirements, it may be helpful to try prototyping character styles within a CC app first, before
attempting to create them _ex situ_.

Some frequently used styles:

| Name                | Description                                                                                                                                                                                                                                                                                                    | Sample Value                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| baselineShift       | Same as baseline shift in Photoshop and Illustrator.                                                                                                                                                                                                                                                           | {"value": 0, "type": "em"}                                                                                             |
| color               | An array of colors as in the application/vnd.adobe.color+json representation above, with the primary representation as the first element in the array.                                                                                                                                                         | _see documentation above_                                                                                              |
| fontFamily          | Font family. This is not used by Photoshop and Illustrator as more exact information is used to reliably determine the font.                                                                                                                                                                                   | "Helvetica"                                                                                                            |
| fontFeatureSettings | An array of Open Type features; c.f. [http://www.microsoft.com/typography/otspec/featurelist.htm].<br/>Illustrator supports: ornm, ordn, frac, titl, swsh, dlig, clig, liga, salt, sups, subs, c2sc, smcp<br/>Photoshop supports: ordn, frac, titl, swsh, dlig, liga, salt, sups, subs, ornm, onum, smcp, clig | \["liga", "ordn"\]                                                                                                     |
| fontSize            | TODO: get clarification on this                                                                                                                                                                                                                                                                                | {"value": 20, "type": "pt"}                                                                                            |
| fontStyle           | TODO: get clarification on this                                                                                                                                                                                                                                                                                | "oblique"                                                                                                              |
| fontWeight          | TODO: get clarification on this                                                                                                                                                                                                                                                                                | "bold"                                                                                                                 |
| letterSpacing       | Corresponds to tracking attribute in Illustrator and Photoshop.                                                                                                                                                                                                                                                | {"value": 1, "type": "em"}                                                                                             |
| lineHeight          | Corresponds to leading property in Illustrator and Photoshop.                                                                                                                                                                                                                                                  | {"value": 21, "type": "px"}                                                                                            |
| textDecoration      | Follows the CSS definition of text-decoration; represented as an array of strings.                                                                                                                                                                                                                             |                                                                                                                        |
| textTransform       | Follows the CSS definition of text-transform.                                                                                                                                                                                                                                                                  | \["line-through", "underline"\]                                                                                        |
| whiteSpace          | Used to correspond to the noBreak property in Photoshop and Illustrator. Only supports the value "nowrap", other values are ignored.                                                                                                                                                                           | "nowrap"                                                                                                               |
| adbeFont            | contains a Font object (see below)                                                                                                                                                                                                                                                                             | { "family": "Helvetica Neue", "name": "Helvetica Neue Bold", "postScriptName": "HelveticaNeue-Bold", "style": "Bold" } |

Font object:
| Property | Description |
|----------|-------------|
| name | |
| family | |
| postScriptName | |
| style | |

#### application/vnd.adobe.indesign-idms

A character style may also be represented as an InDesign snippet.

## Representation Requirements

- A mandatory application/vnd.adobe.characterstyle+json representation, which may have the primary relationship,
  or the rendition relationship, in the case where an InDesign snippet is used as the primary.
- Optionally, a primary representation of type application/vnd.adobe.indesign-idms, if the json representation is not primary.
- A mandatory thumbnail rendition, e.g, of type "image/png".

## Example postLibraryElement Payload

```json
{
  "name": "My character style",
  "type": "application/vnd.adobe.element.characterstyle+dcx",
  "client": {
    "deviceId": "DEV_ID",
    "device": "DEV",
    "app": "APP"
  },
  "representations": [
    {
      "id": "76ab62cd-f0fd-4778-ae4f-ce7a2aa4d7d0",
      "type": "application\/vnd.adobe.characterstyle+json",
      "relationship": "primary",
      "is_full_size": false,
      "is_external_link": false,
      "preferredThumbnail": false,
      "representation_order": 0,
      "characterstyle#data": {
        "color": [{
          "mode": "RGB",
          "value": {
            "r": 0,
            "g": 0,
            "b": 0
          },
          "type": "process"
        }],
        "adbeFont": {
          "family": "Helvetica Neue",
          "name": "HelveticaNeue",
          "postScriptName": "HelveticaNeue",
          "style": "Regular"
        },
        "fontFamily": "Helvetica Neue",
        "fontSize": {
          "type": "pt",
          "value": 18
        },
        "adbeIlstAlignment": "StyleRunAlignmentType.ROMANBASELINE",
        "adbeIlstBaselineDirection": "BaselineDirectionType.Standard",
        "adbeIlstBaselinePosition": "FontBaselineOption.NORMALBASELINE",
        "adbeIlstCapitalization": "FontCapsOption.NORMALCAPS",
        "adbeIlstFigureStyle": "FigureStyleType.DEFAULTFIGURESTYLE",
        "adbeIlstOpenTypePosition": "FontOpenTypePositionOption.OPENTYPEDEFAULT",
        "adbeIlstWariChuJustification": "WariChuJustificationType.WARICHUAUTOJUSTIFY",
        "adbeIlstAkiLeft": -1,
        "adbeIlstAkiRight": -1,
        "adbeAutoLeading": true,
        "adbeIlstConnectionForms": false,
        "adbeHorizontalScale": 100,
        "lineHeight": {
          "type": "pt",
          "value": 21.6000003814697
        },
        "adbeIlstOverprintFill": false,
        "adbeIlstOverprintStroke": false,
        "adbeIlstProportionalMetrics": false,
        "adbeIlstRotation": 0,
        "adbeIlstTateChuYokoHorizontal": 0,
        "adbeIlstTateChuYokoVertical": 0,
        "fontFeatureSettings": [
          "clig",
          "liga"
        ],
        "adbeIlstTsume": 0,
        "adbeVerticalScale": 100,
        "adbeIlstWariChuCharactersAfterBreak": 2,
        "adbeIlstWariChuCharactersBeforeBreak": 2,
        "adbeIlstWariChuEnabled": false,
        "adbeIlstWariChuLineGap": 0,
        "adbeIlstWariChuLines": 2,
        "adbeIlstWariChuScale": 50
      }
    },
    {
    	"type": "image/png",
    	"relationship": "rendition",
    	"storage_href": "https://cc-api-storage-stage.adobe.io/id/urn:aaid:sc:US:efb1969b-fed5-4381-836e-6d7a97a14fbf?component_id=602eb2e4-d86d-481f-adc2-d751fc5ca961",
	    "content_length": 158356,
	    "etag": "\"9b4fb626b2ea694ceceda1b5caa7463c\"",
	    "md5": "m0+2JrLqaUzs7aG1yqdGPA==",
	    "version": "0"
    }
  ]
}
```

## Paragraph Style

### Element Type

application/vnd.adobe.element.paragraphstyle+dcx

### Description

Represents a collection of styles that may be applied to paragraphs.

### Allowed Representation Types

#### application/vnd.adobe.paragraphstyle+json

This representation type is almost identical to application/vnd.adobe.characterstyle+json,
except that the set of styles that are considered valid is a superset including all valid
character styles alongside a set of styles that are only valid for paragraphs.

Some frequently used paragraph styles:

| Name                        | Description                                                                                                                                                                                                                                                | Sample Value                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| adbeParaAlignment           | The paragraph alignment. One of:<br/><br/> "Alignment.LEFT_ALIGN"<br/>"Alignment.CENTER_ALIGN"<br/>"Alignment.RIGHT_ALIGN"<br/>"Alignment.LEFT_JUSTIFIED"<br/>"Alignment.CENTER_JUSTIFIED"<br/>"Alignment.RIGHT_JUSTIFIED"<br/>"Alignment.FULLY_JUSTIFIED" | "Alignment.CENTER_ALIGN"    |
| adbeLeftIndent              | The width of the left indent.                                                                                                                                                                                                                              | {"value": 20, "type": "pt"} |
| adbeFirstLineIndent         | The amount to indent the first line.                                                                                                                                                                                                                       | {"value": 20, "type": "pt"} |
| adbeRightIndent             | The width of the right indent.                                                                                                                                                                                                                             | {"value": 20, "type": "pt"} |
| adbeSpaceBefore             | The height of the paragraph space above.                                                                                                                                                                                                                   | {"value": 20, "type": "pt"} |
| adbeSpaceAfter              | The height of the paragraph space below.                                                                                                                                                                                                                   | {"value": 20, "type": "pt"} |
| adbeMinimumWordSpacing      | The minimum word spacing (in percent). A number between 0 and 1000 inclusive.                                                                                                                                                                              | 50                          |
| adbeDesiredWordSpacing      | The desired word spacing (in percent). A number between 0 and 1000 inclusive.                                                                                                                                                                              | 50                          |
| adbeMaximumWordSpacing      | The maximum word spacing (in percent). A number between 0 and 1000 inclusive.                                                                                                                                                                              | 50                          |
| adbeMinimumLetterSpacing    | The minimum letter spacing (in percent). A number between -100 and 500 inclusive.                                                                                                                                                                          | 400                         |
| adbeDesiredLetterSpacing    | The desired letter spacing (in percent). A number between -100 and 500 inclusive.                                                                                                                                                                          | 400                         |
| adbeMaximumLetterSpacing    | The minimum letter spacing (in percent). A number between -100 and 500 inclusive.                                                                                                                                                                          | 400                         |
| adbeMinimumGlyphScaling     | The minimum width of an individual character (in percent). A number between 50 and 200 inclusive.                                                                                                                                                          | 100                         |
| adbeDesiredGlyphScaling     | The desired width of an individual character (in percent). A number between 50 and 200 inclusive.                                                                                                                                                          | 100                         |
| adbeMaximumGlyphScaling     | The maximum width of an individual character (in percent). A number between 50 and 200 inclusive.                                                                                                                                                          | 50                          |
| adbeParaAutoLeading         | The percentage to use for auto leading. A number between 0 and 500 inclusive.                                                                                                                                                                              | 100                         |
| adbeSingleWordJustification | The alignment for lines of text in a paragraph that contain a single word. One of:<br/><br/>"Justification.FULLY_JUSTIFIED”<br/>”Justification.LEFT_ALIGN”<br/>”Justification.CENTER_ALIGN”<br/>"Justification.RIGHT_ALIGN"                                | "Justification.RIGHT_ALIGN" |

### Representation Requirements

The requirements are identical to the character style element, except an application/vnd.adobe.paragraphstyle+json
primary or rendition representation is expected instead of an application/vnd.adobe.characterstyle+json element:

- A mandatory application/vnd.adobe.paragraphstyle+json representation, which may have the primary relationship,
  or the rendition relationship, in the case where an InDesign snippet is used as the primary.
- Optionally, a primary representation of type application/vnd.adobe.indesign-idms, if the json representation is not primary.
- A mandatory thumbnail rendition, e.g, of type "image/png".

### Example postLibraryElement Payload

```json
{
  "adbeParaAlignment": "Alignment.CENTER_ALIGN",
  "adbeLeftIndent": {"type":"pt","value":12},
  "adbeHyphenateWordsLongerThan": 10,
  "adbeHyphenation": true
}
```
