import mock from './mock';
import './db/auth-db';
import './db/dosage-history-db';

mock.onAny().passThrough();
