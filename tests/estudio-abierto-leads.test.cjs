const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const reports = fs.readFileSync(path.join(root, 'app/lib/estudioAbiertoReports.js'), 'utf8').replace('export const', 'const');
const route = fs.readFileSync(path.join(root, 'app/api/estudio-abierto-leads/route.js'), 'utf8').replace(/^import .*;\n/gm, '').replaceAll('export ', '');
const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
const validLead = { name: 'Ana García', company: 'Acme', rubro: 'Tecnología', role: 'Directora', phone: '+51 987 261 483', email: 'ana@example.com', termsAccepted: true };

function setup({ failAppend = false } = {}) {
  const calls = [];
  const context = vm.createContext({
    crypto, Buffer, URLSearchParams,
    console: { error() {} },
    process: { env: {
      ESTUDIO_ABIERTO_SHEET_ID: 'isolated-sheet',
      GOOGLE_SERVICE_ACCOUNT_EMAIL: 'isolated@example.com',
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: privateKey.export({ type: 'pkcs8', format: 'pem' }),
    } },
    NextResponse: { json: (body, options = {}) => ({ body, status: options.status || 200 }) },
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (url.includes('oauth2.googleapis.com')) return { ok: true, json: async () => ({ access_token: 'isolated-token', expires_in: 3600 }) };
      if (options.method === 'POST' && failAppend) return { ok: false };
      return { ok: true, json: async () => ({ values: [['correo', 'fuente', 'nombre']] }) };
    },
  });
  vm.runInContext(`${reports}\n${route}\nthis.post = POST;`, context);
  return { calls, post: (payload) => context.post({ json: async () => payload, headers: new Headers() }) };
}

test('IA leads retain their study source and follow the existing sheet column order', async () => {
  const { post, calls } = setup();
  const result = await post({ ...validLead, study: 'ia' });
  assert.equal(result.status, 200);
  const append = calls.find(({ url }) => url.includes(':append'));
  assert.deepEqual(JSON.parse(append.options.body).values[0].slice(0, 3), ['ana@example.com', 'estudio-abierto-ia', 'Ana García']);
  assert.ok(append.url.includes('valueInputOption=RAW'));
});

test('existing education submissions without study keep their original source', async () => {
  const { post, calls } = setup();
  assert.equal((await post(validLead)).status, 200);
  const append = calls.find(({ url }) => url.includes(':append'));
  assert.equal(JSON.parse(append.options.body).values[0][1], 'estudio-abierto-informe-final');
});

test('unknown study and missing consent never call the sheet', async () => {
  for (const payload of [{ ...validLead, study: 'unknown' }, { ...validLead, study: '__proto__' }, { ...validLead, study: 'ia', termsAccepted: false }]) {
    const { post, calls } = setup();
    assert.equal((await post(payload)).status, 400);
    assert.equal(calls.length, 0);
  }
});

test('sheet failure cannot return a successful registration', async () => {
  const { post } = setup({ failAppend: true });
  const result = await post({ ...validLead, study: 'ia' });
  assert.equal(result.status, 500);
  assert.equal(result.body.ok, false);
});
