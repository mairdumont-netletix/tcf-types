import { DateString } from "./types";

/**
 * Information published for each Purpose
 */
export interface PurposeInfo {
  id: number;
  name: string;
  description: string;
  descriptionLegal: string;
  /**
   * OPTIONAL, default=true,
   *
   * false means CMPs should never afford users the means to provide an opt-in consent choice
   */
  consentable?: boolean;
  /**
   * OPTIONAL, default=true,
   *
   * false means CMPs should never afford users the means to exercise a right to object
   */
  rightToObject?: boolean;
}

/**
 * Information published for each feature.
 */
export interface FeatureInfo {
  id: number;
  name: string;
  description: string;
  descriptionLegal: string;
}

/**
 * Information published for each vendor.
 *
 * Constraints:
 *   - Either purposes OR legIntPurposes can be missing/empty, but not both.
 *   - A Purpose id must not be present in both purposes and legIntPurposes
 *   - A Purpose id listed in flexiblePurposes must have been declared in one
 *     of purposes or legIntPurposes.
 *   - Purpose id values included in the three purpose fields must be in the
 *     range from 1 to N, where N is the highest purpose id published in this
 *     GVL file.
 */
export interface VendorInfo {
  /**
   * REQUIRED
   */
  id: number;

  /**
   * REQUIRED
   */
  name: string;

  /**
   * array of positive integers
   */
  purposes: number[];

  /**
   * Array of positive integers, OPTIONAL.
   * Array may be empty.
   * List of Special Purposes declared as performed on
   * the legal basis of a legitimate interest.
   */
  specialPurposes: number[];

  /**
   * REQUIRED.
   * Array may be empty.
   * List of purpose ids declared as performed on the legal basis of consent.
   */
  legIntPurposes: number[];

  /**
   * Array of positive integers, OPTIONAL.
   * Array may be empty.
   *
   * List of purpose ids where the vendor is flexible regarding the legal basis;
   * they will perform the processing based on consent or a legitimate interest.
   * The 'default' is determined by which of the other two mutually-exclusive
   * purpose fields is used to declare the purpose for the vendor.
   */
  flexiblePurposes: number[];

  /**
   * Array of positive integers, OPTIONAL.
   * Array may be empty.
   *
   * List of Features the Vendor may utilize when performing some declared
   * Purposes processing.
   */
  features: number[];

  /**
   * Array of positive integers, OPTIONAL.
   * Array may be empty.
   * List of Special Features the Vendor may utilize when performing
   * some declared Purposes processing.
   */
  specialFeatures: number[];

  /**
   * url string, REQUIRED URL to the Vendor's privacy policy document.
   */
  policyUrl: string;

  /**
   * DateString ("2019-05-28T00:00:00Z") OPTIONAL,
   * If present, vendor is considered deleted after this date/time
   * and MUST NOT be established to users.
   */
  deletedDate: DateString;

  /**
   * object specifying the vendor's http GET request length limit, OPTIONAL.
   * Has the following members & values.
   *
   * If a vendor entry does not include this attribute then the vendor
   * has no overflow options and none can be inferred.
   */
  overflow?: {
    // 32 or 128 are supported options
    httpGetLimit: 32 | 128;
  }
}

export interface StackInfo {
  id: number;
  name: string;
  description: string;
  purposes: number[];
  specialFeatures: number[];
}

export interface GlobalVendorList {
  /**
   * GlobalVendorList format version
   */
  gvlSpecificationVersion: 2;

  /**
   * Version of the file content, incremented with each published file change.
   */
  vendorListVersion: number;

  /**
   * The TCF MO will increment this value whenever a GVL change
   * (such as adding a new Purpose or Feature or a change in Purpose wording)
   * legally invalidates existing TC Strings and requires CMPs to
   * re-establish transparency and consent from users.
   *
   * TCF Policy changes should be relatively infrequent and only occur when
   * necessary to support changes in global mandate.
   * If the policy version number in the latest GVL is different from the
   * value in your TC String, then you need to re-establish transparency
   * and consent for that user.
   * A version 1 format TC String is considered to have a version value of 1.
   */
  tcfPolicyVersion: number;

  /**
   * last modification date, e.g. "2018-05-28T00:00:00Z"
   */
  lastUpdated: DateString;

  /**
   * A list of defined purposes
   */
  purposes: {
    [purposeId: number]: PurposeInfo;
  };

  specialPurposes: {
    [specialPurposeId: number]: PurposeInfo;
  };

  features: {
    [featureId: number]: FeatureInfo;
  };

  /**
   * Special features differ from simple features in that CMPs MUST provide
   * users with a means to signal an opt-in choice as to whether vendors
   * may employ the feature when performing any purpose processing.
   * See Policies for specifics.
   */
  specialFeatures: {
    [specialFeatureId: number]: FeatureInfo;
  };

  vendors: {
    [vendorId: number]: VendorInfo;
  };

  stacks: {
    [stackId: number]: StackInfo;
  }
}
