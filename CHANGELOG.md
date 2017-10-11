v1.0.1
---
Install dependencies.

v1.0.0
---
This greatly simplifies the logic of the plugin + adds eval tests to make sure the code actually runs!

Special Thanks @shnhrrsn

v0.0.7
---
Reworked transform to use a helper function.

v0.0.5
---
Update modules

v0.0.4
---
Fix: bracket not working.

  **before**

  ```js
  foo[bar].isNil
  ```

  **after**

  ```js
  foo[bar] === null || foo[bar] === undefined
  ```

v0.0.3
---
Fix: this.someVar.isNil not working.

  **before**

  ```js
  if (this.someVar.isNil) {
    console.log('nil')
  }

  // become

  if (someVar === null || someVar === undefined) {
      console.log('nil')
  }
  ```

  **Revised**

  ```js
  if (this.someVar.isNil) {
    console.log('nil')
  }

  // become

  if (this.someVar === null || this.someVar === undefined) {
      console.log('nil')
  }
  ```
