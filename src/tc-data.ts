import { CmpStatus } from "./cmp-status";
import { EventStatus } from "./event-status";

/**
 * This object contains both the encoded and unencoded values of the
 * TC String as well as information about the CMP eventStatus and whether
 * or not GDPR applies to this user in this context
 * (see the section "What does the gdprApplies value mean?" for more).
 * If GDPR does not apply to this user in this context then only gdprApplies,
 * tcfPolicyVersion, cmpId and cmpVersion shall exist in the object.
 * If it is unknown just yet whether GDPR Applies to this user in this
 * context or if this is CMP Stub code then the callback shall not
 * be invoked until that gdprApplies is known.
 */
export interface TCData {
  /**
   * base64url-encoded TC string with segments
   */
  tcString: string;

  /**
   *
   */
  tcfPolicyVersion: number;

  /**
   *
   */
  cmpId: number;

  /**
   *
   */
  cmpVersion: number;

  /**
   * true - GDPR Applies,
   * false - GDPR Does not apply,
   * undefined - unknown whether GDPR Applies,
   */
  gdprApplies?: boolean;

  /*
   * see addEventListener command
   */
  eventStatus: EventStatus;

  /**
   * see Ping Status Codes in following table
   */
  cmpStatus: CmpStatus;

  /**
   * If this TCData is sent to the callback of addEventListener: number,
   * the unique ID assigned by the CMP to the listener function registered
   * via addEventListener.
   * Others: undefined.
   */
  listenerId?: number;

  /*
   * true - if using a service-specific or publisher-specific TC String,
   * false - if using a global TC String
   */
  isServiceSpecific: boolean;

  /**
   * true - CMP is using publisher-customized stack descriptions,
   * false - CMP is NOT using publisher-customized stack descriptions
   */
  useNonStandardStacks: boolean;

  /**
   * Two-letter ISO 3166-1 alpha-2 code.
   *
   * Country code of the country that determines the legislation of
   * reference.  Normally corresponds to the country code of the country
   * in which the publisher's business entity is established.
   */
  publisherCC: string;

  /**
   * Only exists on service-specific TC
   *
   * true - Purpose 1 not disclosed at all. CMPs use PublisherCC to
   * indicate the publisher's country of establishment to help vVendors
   * determine whether the vendor requires Purpose 1 consent.
   *
   * false - There is no special Purpose 1 treatmentstatus. Purpose 1 was
   * disclosed normally (consent) as expected by TCF Policy
   */
  purposeOneTreatment: boolean;

  /**
   * Only exists on global-scope TC
   */
  outOfBand: {
    allowedVendors: {
      /**
       * true - Vendor is allowed to use and Out-of-Band Legal Basis,
       * false | undefined - Vendor is NOT allowed to use an Out-of-Band Legal Basis
       */
      [vendorId: number]: boolean;
    },
    discloseVendors: {
      /**
       * true - Vendor has been disclosed to the user,
       * false | undefined - Vendor has not been disclosed to the user
       */
      [vendorId: number]: boolean | undefined;
    }
  },
  purpose: {
    consents: {
      /**
       * true - Consent
       * false - No Consent.
       */
      [purposeId: number]: boolean | undefined;
    },
    legitimateInterests: {
      /**
       * true - Legitimate Interest Established,
       * false - No Legitimate Interest Established
       */
      [purposeId: number]: boolean;
    }
  },
  vendor: {
    consents: {
      /**
       * true - Consent,
       * false - No Consent
       */
      [vendorId: number]: boolean;

    },
    legitimateInterests: {
      /**
       * true - Legitimate Interest Established,
       * false - No Legitimate Interest Established
       */
      [vendorId: number]: boolean;
    }
  },
  specialFeatureOptins: {
    /**
     * true - Special Feature Opted Into,
     * false - Special Feature NOT Opted Into
     */
    [specialFeatureId: number]: boolean;
  },
  publisher: {
    consents: {
      /**
       * true - Consent,
       * false - No Consent
       */
      [purposeId: number]: boolean;
    },
    legitimateInterests: {
      /**
       * true - Legitimate Interest Established,
       * false - No Legitimate Interest Established
       */
      [purposeId: number]: boolean;
    },
    customPurpose: {
      consents: {
        /**
         * true - Consent
         * false - No Consent
         */
        [purposeId: number]: boolean;
      },
      legitimateInterests: {
        /**
         * true - Legitimate Interest Established,
         * false - No Legitimate Interest Established
         */
        [purposeId: number]: boolean;
      },
    },
    restrictions: {
      [purposeId: number]: {
        /**
         * 0 - Not Allowed,
         * 1 - Require Consent,
         * 2 - Require Legitimate Interest
         */
        [vendorId: number]: 0 | 1 | 2;
      }
    }
  }
}
