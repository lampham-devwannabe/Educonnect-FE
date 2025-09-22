import { createHttp } from '../services/httpFactory'

export const testApi = createHttp('https://jsonplaceholder.typicode.com')
const test = await testApi.get('/todos/1')
console.log(test.data)
export default function TestPage() {
  return <div>Test Page</div>
}
