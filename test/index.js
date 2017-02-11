import test from 'tape';
import * as Spherium from '../src';

test('submits credentials and returns ', t => {
  t.plan(3);

  Spherium.submitCredentials('superadmin', 'super_cow_powers')
  .then(res => {
    t.ok(res.authenticationScheme);
    t.ok(res.passkey);
    t.ok(res.userId);
  });
});
