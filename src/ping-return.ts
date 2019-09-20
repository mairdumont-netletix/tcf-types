import { CmpStatus } from "./cmp-status";
import { DisplayStatus } from "./display-status";

/**
 * This object contains information about the loading status and
 * configuration of the CMP.
 */
export interface PingReturn {
  /**
   * true - GDPR Applies,
   * false - GDPR Does not apply,
   * undefined - unknown whether GDPR Applies
   */
  gdprApplies?: boolean;

  /**
   * true - CMP main script is loaded,
   * false - still running stub
   */
  cmpLoaded: boolean;

  /**
   * see Ping Status Codes in following table
   */
  cmpStatus: CmpStatus;

  /**
   * see Ping Status Codes in following table
   */
  displayStatus: DisplayStatus;

  /**
   * version of the CMP API that is supported, e.g. "2.0"
   */
  apiVersion: string;

  /**
   * CMPs own/internal version that is currently running,
   * undefined if still the stub
   */
  cmpVersion?: number;

  /**
   * IAB Assidned CMP ID,
   * undefined if still the stub
   */
  cmpId?: number;

  /**
   * Version of the GVL currently loaded by the CMP,
   * undefined if still the stub
   */
  gvlVersion?: number;

  /**
   * Number of the supported TCF version,
   * undefined if still the stub
   */
  tcfPolicyVersion?: number;
}
