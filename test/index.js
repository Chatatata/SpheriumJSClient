import test from 'tape';
import * as Spherium from '../src';

test('submits credentials and returns concrete authentication artifact', async t => {
  t.plan(3);

  const response = await Spherium.submitCredentials('superadmin', 'super_cow_powers');

  t.ok(response.authenticationScheme);
  t.ok(response.passkey);
  t.ok(response.userId);
});

test('submits insecure authentication handle and returns passphrase', async t => {
  const passkey = await Spherium.submitCredentials('superadmin', 'super_cow_powers').passkey;

  const response = await Spherium.submitInsecureAuthenticationHandle(passkey);

  t.ok(response);
});
