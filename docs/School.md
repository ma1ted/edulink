# **School**

**extends** [EduLink](https://google.com)

The starting point for interacting with the API.

## **Constructor**

```typescript
new School(schoolCode: string)
```

<hr>

## **Properties**

<br>

<hr>

## **Methods**

<br>

### [.request()](https://google.com)

| Parameter    | Type     | Description                                   |
| :----------- | :------- | :-------------------------------------------- |
| `schoolCode` | `string` | The school identifier provided by the school. |

:::tip

The school code is usually some part of the name of the school, or an
abbreviation of it.

:::info

The school's postcode also works in place of the school code issued.

#### Arguments

- `schoolCode`
  - The school identifier provided by your school.
  - Alternatively, the school's postcode is also valid here.

#### Result

- `server`
- `id`
- `externalLogins`
  - An object containing links to alternative login methods.
  - Provided in a `provider: link` format.
- `externalLoginsOnly`
  - Whether the only available login methods are those listed in
    `externalLogins` or not.
- `logo`
  - The school's logo, encoded in base 64.
