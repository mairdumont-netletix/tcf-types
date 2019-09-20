export enum DisplayStatus {
  /**
   * User interface is currently displayed
   */
  VISIBLE = 'visible',
  /**
   * User interface is not yet or no longer displayed
   */
  HIDDEN = 'hidden',
  /**
   * User interface will not show
   * (e.g. GDPR does not apply or TC data is current and does not need renewal)
   */
  DISABLED = 'disabled',
}
