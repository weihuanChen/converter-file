import { Hono } from 'hono'
const hello = new Hono()


hello.get('/', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export default hello;