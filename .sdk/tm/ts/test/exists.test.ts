
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DigitaloceanSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DigitaloceanSDK.test()
    equal(testsdk instanceof DigitaloceanSDK, true,
      'DigitaloceanSDK.test() must return a client synchronously')
  })

})
