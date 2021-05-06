export enum CmpStatus {
  /**
   * CMP not yet loaded – stub still in place
   */
  STUB = 'stub',
  /**
   * CMP is loading
   *
   * @deprecated this status is not distinct and will be removed in a future version
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
  /**
   * User interface is currently displayed
   */
  VISIBLE = 'visible',
  /**
   * User interface is not yet or no longer displayed
   */
  HIDDEN = 'hidden',
  /**
   * User interface will not show (e.g. GDPR does not apply or TC data is current and does not need renewal)
   */
  DISABLED = 'disabled',
}
