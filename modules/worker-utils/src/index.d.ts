import {WorkerObject} from './types';

// TYPES
export {WorkerObject} from './types';

// GENERAL UTILS
export {default as assert} from './lib/env-utils/assert';
export {
  isBrowser,
  isWorker,
  nodeVersion,
  self,
  window,
  global,
  document
} from './lib/env-utils/globals';

// WORKER UTILS
export {processOnWorker} from './lib/worker-utils/process-on-worker';
export {createWorker} from './lib/worker-utils/create-worker';
export {validateWorkerVersion} from './lib/worker-utils/validate-worker-version';
export {default as WorkerFarm} from './lib/worker-farm/worker-farm';
export {default as WorkerPool} from './lib/worker-farm/worker-pool';
export {default as WorkerThread} from './lib/worker-farm/worker-thread';
export {getTransferList} from './lib/worker-farm/get-transfer-list';

// LIBRARY UTILS
export {getLibraryUrl, loadLibrary} from './lib/library-utils/library-utils';

// PARSER UTILS

// PROCESS UTILS
export {default as ChildProcessProxy} from './lib/process-utils/child-process-proxy';

/** A null worker to test that worker processing is functional */
export const NullWorker: WorkerObject;
