/**
 * A worker description
 */
export type WorkerObject = {
  name: string;
  id: string;
  module: string;
  version: string;
  options: object;
  deprecatedOptions?: object;

  process?: (data: any, options?: object) => Promise<any>;
  processInBatches?: (
    iterator: AsyncIterator<any> | Iterator<any>, 
    options: object
  ) => Promise<AsyncIterator<any>>;
};

/**
 * A worker loader defintion that can be used with `@loaders.gl/core` functions
 */
export type WorkerLoaderObject = {
  // WorkerObject
  name: string,
  id: string,
  module: string;
  version: string,
  options: object;
  deprecatedOptions?: object;
  // end WorkerObject

  category?: string;
  extensions: string[],
  mimeTypes: string[],

  binary?: boolean;
  text?: boolean;

  tests?: (((ArrayBuffer) => boolean) | ArrayBuffer | string)[];

  // TODO - deprecated
  supported?: boolean;
  testText?: (string) => boolean;
};

/**
 * A "bundled" loader defintion that can be used with `@loaders.gl/core` functions
 * If a worker loader is supported it will also be supported.
 */
export type LoaderObject = {
  // WorkerObject
  name: string,
  id: string,
  module: string;
  version: string,
  options: object;
  deprecatedOptions?: object;
  // end WorkerObject

  category?: string;
  extensions: string[],
  mimeTypes: string[],

  binary?: boolean;
  text?: boolean;

  tests?: (((ArrayBuffer) => boolean) | ArrayBuffer | string)[];

  // TODO - deprecated
  supported?: boolean;
  testText?: (string) => boolean;

  parse: (arrayBuffer, options, context?) => Promise<any>;
  parseSync?: (arrayBuffer, options, context?) => any;
  parseText?: (string, options) => Promise<any>;
  parseTextSync?: (string, options) => any;
  parseInBatches?: (
    iterator: AsyncIterator<ArrayBuffer> | Iterator<ArrayBuffer>, 
    options: object, 
    context?: object
  ) => Promise<AsyncIterator<any>> | AsyncIterator<any>;
};

/**
 * A writer defintion that can be used with `@loaders.gl/core` functions
 */
export type WriterObject = {
  name: string,

  id: string,
  module: string;
  version: string,

  options: object;
  deprecatedOptions?: object;

  // TODO - are these are needed?
  binary?: boolean;
  extensions?: string[];
  mimeTypes?: string[];

  encode?: (data: any, options: object) => Promise<ArrayBuffer>;
  encodeSync?: (data: any, options?: object) => ArrayBuffer;
  encodeURLtoURL?: (inputUrl: string, outputUrl: string, options?: object) => Promise<string>;
};

export type LoaderContext = {
  fetch?: any;
  loaders?: LoaderObject[];
  url?: string;

  parse?: (data: ArrayBuffer, options?: object) => Promise<any>;
  parseSync?: (data: ArrayBuffer, options?: object) => any;
  parseInBatches?: (data: AsyncIterator<any>, options?: object) => AsyncIterator<any>;
};

/** Types that can be synchronously parsed */
export type SyncDataType = string | ArrayBuffer; // TODO File | Blob can be read synchronously...

/** Types that can be parsed async */
export type DataType = string | ArrayBuffer | File | Blob | Response | ReadableStream;

/** Types that can be parsed in batches */
export type BatchableDataType =
  DataType |
  Iterable<ArrayBuffer> |
  AsyncIterable<ArrayBuffer> |
  Promise<AsyncIterable<ArrayBuffer>>;

/**
 * A FileSystem interface can encapsulate a FileList, a ZipFile, a GoogleDrive etc.
 */
export interface IFileSystem {
  /**
   * Return a list of file names
   * @param dirname directory name. file system root directory if omitted
   */
  readdir(dirname?: string, options?: {recursive?: boolean}): Promise<string[]>;

  /**
   * Gets information from a local file from the filesystem
   * @param filename file name to stat
   * @param options currently unused
   * @throws if filename is not in local filesystem
   */
  stat(filename: string, options?: object): Promise<{size: number}>;

  /**
   * Fetches a local file from the filesystem (or a URL)
   * @param filename
   * @param options
   */
  fetch(filename: string, options?: object): Promise<Response>;
}

type ReadOptions = {buffer?: ArrayBuffer, offset?: number, length?: number, position?: number};
export interface IRandomAccessReadFileSystem extends IFileSystem {
  open(path: string, flags, mode?): Promise<any>;
  close(fd: any): Promise<void>;
  fstat(fd: any): Promise<object>;
  read(fd: any, options?: ReadOptions): Promise<{bytesRead: number, buffer: Buffer}>;
}
