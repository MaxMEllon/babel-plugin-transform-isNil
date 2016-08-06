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
