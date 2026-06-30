import { createProdMockServer } from 'vite-plugin-mock/client'
import userMock from './user'
import routesMock from './routes'

export function setupProdMockServer() {
  createProdMockServer([...userMock, ...routesMock])
}
