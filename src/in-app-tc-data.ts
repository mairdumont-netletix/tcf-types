import { EventStatus } from "./event-status";
import { BitField, NumberField } from "./types";

export interface InAppTCData {
  /**
   * base64url-encoded TC string with segments
   */
  tcString: string;

  /**
   *
   */
  tcfPolicyVersion: 2;

  /**
   *
   */
  cmpId: number;

  /**
   *
   */
  cmpVersion: number;

  /**
   * 1 - GDPR Applies
   * 0 - GDPR Does not apply
   * undefined - unknown whether GDPR applies
   * see the section: "What does the gdprApplies value mean?"
   */
  gdprApplies: 0 | 1;

  /*
   * see addEventListener command
   */
  eventStatus: EventStatus;

  /*
   * 1 - if using a service-specific or publisher-specific TC String
   * 0 - if using a global TC String.
   */
  isServiceSpecific: 0 | 1;

  /**
   * 1 - CMP is using publisher-customized stack descriptions
   * 0 - CMP is NOT using publisher-customized stack descriptions
   */
  useNonStandardStacks: 0 | 1;

  /**
   * Two-letter ISO 3166-1 alpha-2 code.
   *
   * Country code of the country that determines the legislation of
   * reference.  Normally corresponds to the country code of the country
   * in which the publisher's business entity is established.
   */
  publisherCC: string;

  /**
   * 1 - Purpose 1 not disclosed at all. CMPs use PublisherCC to indicate
   * the publisher's country of establishment to help vVendors determine
   * whether the vendor requires Purpose 1 consent.
   *
   * 0 - There is no special Purpose 1 treatmentstatus. Purpose 1 was
   * disclosed normally (consent) as expected by TCF Policy.
   */
  purposeOneTreatment: 0 | 1;

  purpose: {
    /**
     * 01010 -- Purpose bitfield
     *
     * 1 - Consent,
     * 0 - No Consent
     */
    consents: BitField;

    /**
     * 01010 -- Purpose bitfield
     *
     * 1 - Legitimate Interest Established,
     * 0 - No Legitimate Interest Established
     */
    legitimateInterests: BitField;
  },
  vendor: {
    /**
     * 01010 -- Vendor bitfield
     *
     * 1 - Consent,
     * 0 - No Consent
     */
    consents: BitField;

    /**
     * 01010 -- Vendor bitfield
     *
     * 1 - Legitimate Interest Established,
     * 0 - No Legitimate Interest Established
     */
    legitimateInterests: BitField;
  },

  /**
   * 01010 -- Special Feature bitfield
   *
   * 1 - Special Feature Opted Into,
   * 0 - Special Feature NOT Opted Into
   */
  speicalFeatureOptins: BitField,

  publisher: {
    /**
     * 01010 -- Purpose bitfield
     *
     * 1 - Consent,
     * 0 - No Consent
     */
    consents: BitField,

    /**
     * 01010 -- Purpose bitfield
     *
     * 1 - Legitimate Interest Established,
     * 0 - No Legitimate Interest Established
     */
    legitimateInterests: BitField,

    customPurpose: {
      /**
       * 01010 -- Purpose bitfield
       *
       * 1 - Consent,
       * 0 - No Consent
       */
      consents: BitField,

      /**
       * 01010 -- Purpose bitfield
       *
       * 1 - Legitimate Interest Established,
       * 0 - No Legitimate Interest Established
       */
      legitimateInterests: BitField,
    },
    restrictions: {
      /**
       * 0 - Not Allowed
       * 1 - Require Consent
       * 2 - Require Legitimate Interest
       *
       * each position represents vendor id and number represents restriction
       * type 0-2
       */
      [purposeId: number]: NumberField,
    }
  }
}
