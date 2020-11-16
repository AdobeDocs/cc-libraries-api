# Event Properties

<br/>

This page describes the properties of Creative Cloud Libraries events. For direction on subscribing to these events, see [Configuring Webhooks for Created Cloud Libraries Events](../../guides/configuring-events-webhooks/index.md).

- **Note**: To see a sample event, [click here](../../references/sample-event/index.json).

<br/>

**id** _string_

The generated unique ID of the event.

<br/>

---

<br/>

**source** _string_

The partition key, which, in the case of CC Libraries events, is the [Repository](../../references/glossary/index.md#repository) ID.

<br/>

---

<br/>

**specversion** _string_

<br/>

---

<br/>

**type** _string_

The type of event.

<br/>

---

<br/>

**datacontenttype** _string_

The content type of the `data` object.

<br/>

---

<br/>

**dataschema** _string_

The URN of the Events Schema.

<br/>

---

<br/>

**time** _string_

The timestamp of the event creation.

<br/>

---

<br/>

**xactionid** _string_

The request ID, which is used for debugging.

<br/>

---

<br/>

**recipient** _object_

The IMS user ID and application client ID of the recipient of the event.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

<br/>

</summary>

---

<br/>

**userid** _string_

The IMS user ID of the recipient of the event.

<br/>

---

<br/>

**clientid** _string_

The application client ID of the recipient of the event.

<br/>

</details>

---

<br/>

**dataschemaversion** _string_

The version of the Events Schema.

<br/>

---

<br/>

**data** _object_

The event object.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

<br/>

</summary>

---

 <br/>

**xdmEntity** _object_

The [XDM](../../references/glossary/index.md#xdm) Entity object, which contains a list of changed [Resources](../../references/glossary/index.md#resource) that represent the [Asset](../../references/glossary/index.md#asset) change.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

<br/>

</summary>

---

 <br/>

**event:resources** _object_

An object containing all the Resource Change objects related to the event. [Resource](../../references/glossary/index.md#resource) changes are identified by the [link relation](../../references/glossary/index.md#link-relation.md) associated with the Resource.

- Note: There is always a Resource Change object for the Repository Metadata Resource, even if this Resource was not affected by the action that triggered the event. This is because the Repository Metadata Resource is required to be embedded in the event.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

<br/>

</summary>

---

<br/>

**&lt;link relation&gt;** _object_

The Resource Change object, which describes how a particular [Resource](../../references/glossary/index.md#resource) was affected by the [action](../../references/actions.md) that triggered the event.

- Note: The property will be the [link relation](../../references/glossary/index.md#link-relation.md) associated with the Resource (e.g., ht<span>tp://ns.adobe.com.adobecloud/rel/metadata/repository</span>).

<details>

<br/>

<summary>(show/hide child properties)

<br/>

<br/>

</summary>

---

<br/>

**event:action** _string_

Specifies the type of change to the [Resource](../../references/glossary/index.md#resource). Possible values are: `created`, `updated`, `deleted` and `none`. `none` is used, for example, to embed the Repository Metadata, when this Resource was not affected by the action that triggered the event.

<br/>

---

<br/>

**event:embedded** _object_

The embedded JSON representation of the [Resource](../../references/glossary/index.md#resource).

</details>

<br/>

---

<br/>

**event:sequence** _number_

A sequence number of the event that is unique within the current [Repository](../../references/glossary/index.md#repository). It is used to detect out-of-sequence events.

 <br/>

---

<br/>

**event:repository** _object_

Data about the [Repository](../../references/glossary/index.md#repository) of the [Asset](../../references/glossary/index.md#asset) affected by the event.

<details>

<br/>

<summary>(show/hide child properties)

<br/>

<br/>

</summary>

---

<br/>

**repo:owner** _object_

The ID and owner type of the [Repository](../../references/glossary/index.md#repository).

<details>

<br/>

<summary>(show/hide child properties)

<br/>

<br/>

</summary>

---

<br/>

**id** _string_

The ID of the [Repository](../../references/glossary/index.md#repository) owner (i.e., the IMS user ID or IMS org ID).

<br/>

---

**type** _string_

The type of [Repository](../../references/glossary/index.md#repository) owner. Legal values are `user` (for a [User Repository](../../references/glossary/index.md#user-repository) owner) and `org` (for an [Organizational Repository](../../references/glossary/index.md#organizational-repository) owner).

</details>

<br/>

</details>

</details>

</details>

</details>

---
