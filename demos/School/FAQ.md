> TypeError: Cannot read properties of undefined (reading 'server')

`Server.request()` failed and you have not handled that case. You're passing a
value of type `void` into `School.request()`
