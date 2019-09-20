export enum CmpStatus {
  /**
   * CMP not yet loaded – stub still in place
   */
  STUB = 'stub',
  /**
   * CMP is loading
   */
  LOADING = 'loading',
  /**
   * CMP is finished loading
   */
  LOADED = 'loaded',
  /**
   * CMP is in an error state.
   *
   * A CMP shall not respond to any other API requests if this cmpStatus
   * is present. A CMP may set this status if, for any reason, it is unable
   * to perform the operations in compliance with the TCF.
   */
  ERROR = 'error',
}
