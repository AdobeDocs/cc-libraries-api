---
keywords:
  - Creative Cloud
  - API Documentation
  - JavaScript
  - CC Libraries API
  - Creative Cloud Libraries API
---

# Glossary

### Asset

An item of content and data about that content, bound together under a single identifier and with a common lifetime. Assets, in turn, are organized into hierarchical namespaces, and each namespace is managed by a [Repository](#repository). There are three classes of Assets: [Files](#file), [Composites](#composite), and [Directories](#directory).

---

### Component

A unit of content storage within a [Composite](#composite). Composites typically contain tens, hundreds, or thousands of Components bound together via a [Manifest](#manifest).

---

### Composite

An [Asset](#asset) stored in a composite format instead of a traditional, single-file format. Composite formats organize content as a set of [Components](#component) bound together with a [Manifest](#manifest). These formats are built on top of the Digital Composite Technology DCX framework, which describes both the organization of the Components as well as the transfer and synchronization algorithms used to operate on them.

---

### Directory

An [Asset](#asset) that serves as a container for other Assets.

---

### File

An [Asset](#asset) that is not a [Directory](#directory) (e.g., a Photoshop document).

---

### DCX Snapshot

The single-file representation of a [Composite](#composite), stored as a [Universal Container Format (UCF)](#universal-container-format-ucf) package. A Snapshot contains the following:

- MIME-type file, which contains the media type of the Snapshot. This file does not have an extension.
- Manifest file, which is the [Manifest](#manifest). This file does not have an extension.
- Files and folders containing the [Components](#component), which are all stored according to their full paths.

---

### Directory Structure

A Directory Structure is associated with the root [Directory](#directory) of a [Repository](#repository). A Directory Structure can restrict the creation of [Assets](#asset) by name, path, class, media type, access permissions and other rules. Directory Structures are enforced by the system and supersede access control enforcement.

---

### Enterprise Storage Model

A [Directory Structure](#directory-structure) for all [Organizational Repositories](#organizational-repository).

---

### Index Repository

The entry point that clients can use to discover all of the other [Repositories](#repository) that they have access to.

---

### Link Relation

An identifier, associated with a link, that describes the relationship between the current [Resource](#resource) and the linked Resource.

---

### Manifest

A Manifest contains the structure nodes and references all of the [Components](#component) of a [Composite](#composite).

---

### Organizational Repository

A [Storage Repository](#storage-repository) owned by an organization.

---

### Resource

The content and data within an [Asset](#asset). There are multiple content and data Resources associated with each Asset. For example, the Primary Resource contains the full content of an Asset, while the Repository Metadata Resource contains properties about an Asset, as well as associated Resource links.

- **Note**: For a [File](#file), the Primary Resource is a binary large object; for a [Directory](#directory), it is a JSON representation of the the Directory's children; and for a [Composite](#composite), it is a [DCX Snapshot](#dcx-snapshot).

---

### Repository

A partition of content organized in a namespace hierarchy, analogous to a volume or drive in desktop operating systems. For now, there are two types: [Storage Repository](#storage-repository) and [Index Repository](#index-repository).

---

### Storage Repository

A [Repository](#repository) with [Assets](#asset) organized according to either the [User Storage Model](#user-storage-model) or the [Enterprise Storage Model](#enterprise-storage-model).

---

### Universal Container Format (UCF)

A general-purpose container technology that collects a related set of files into a single-file container. UCF is based on the widely used ZIP archival format, and conforms to the OEBPS Container Format guidelines, as well as the Open Document Format 1.0 specification. Off-the-shelf ZIP tools can be used to open, inspect, and extract files from UCF packages.

---

### User Repository

A [Storage Repository](#storage-repository) owned by an individual user.

---

### User Storage Model

A [Directory Structure](#directory-structure) for all [User Repositories](#user-repository).

---

### XCM

The Experience Content Model (XCM) is the set of models applied by the platform to content and content metadata. These models are expressed in [JSON Schema](https://json-schema.org/). Many of the models are based on open and standard vocabularies, including those defined by or incorporated into [XMP](#xmp). XCM leverages some of the meta-properties defined by [XDM](#xdm), but it is not an application of XDM.

---

### XDM

The Experience Data Model (XDM) is a technology for modeling data used at Adobe, along with associated models. It is a stylized use of [JSON Schema](https://json-schema.org/) and [JSON-LD](https://json-ld.org/), and is a publicly documented specification, made available under a Creative Commons license. Content Platform uses meta-properties defined by XDM to augment the JSON Schema-based models defined in [XCM](#xcm).

---

### XMP

The Extensible Metadata Platform (XMP) is an ISO standard for defining and storing metadata in an open-ended set of vocabularies. ([Click here](https://www.adobe.com/devnet/xmp.html) for more information.)
