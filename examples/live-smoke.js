// Read-only live smoke test against the real DigitalOcean API.
// Usage: DIGITALOCEAN_TOKEN=... node examples/live-smoke.js
const { DigitaloceanSDK } = require('../ts')

async function main() {
  const client = new DigitaloceanSDK({ apikey: process.env.DIGITALOCEAN_TOKEN })

  const checks = {
    'Account.load': async () => (await client.Account().load({})).data(),
    'Region.list': async () => (await client.Region().list({})).length,
    'Size.list': async () => (await client.Size().list({})).length,
    'Droplet.list': async () => (await client.Droplet().list({})).length,
    'SshKey.list': async () => (await client.SshKey().list({})).length,
  }

  for (const [name, fn] of Object.entries(checks)) {
    try {
      const out = await fn()
      console.log('PASS', name, typeof out === 'object' ? JSON.stringify(out).slice(0, 120) : out)
    } catch (err) {
      console.log('FAIL', name, err?.message?.slice(0, 200))
    }
  }
}

main()
