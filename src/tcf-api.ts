import { GlobalVendorList } from './global-ventor-list';
import { InAppTCData } from './in-app-tc-data';
import { PingReturn } from './ping-return';
import { TCData } from './tc-data';

export interface TCFAPI {
  __tcfapi(
    command: string,
    version: number,
    callback: (...args: any) => void,
    parameter?: any,
  ): void;

  __tcfapi(
    command: 'getTCData',
    version: 2,
    callback: (tcData: TCData, success: boolean) => void,
    /**
     * The vendorIds array contains the integer-value Vendor IDs
     * for Vendors in which transparency and consent is being requested.
     * If the vendorIds argument is not defined the callback will be called
     * with a TCData that includes Transparency and Consent values for
     * all Vendors in the Global Vendor List.
     */
    vendorIds?: number[],
  ): void;

  /**
   * The ping command invokes the callback immediately without any asynchronous
   * logic and returns a PingReturn object for determining whether or not the
   * main CMP script has loaded yet and whether GDPR applies; therefore, the
   * only command required to be on the page in a stub before the rest of the
   * commands are implemented. See the section "What does the gdprApplies
   * value mean?" for more.
   */
  __tcfapi(
    command: 'ping',
    version: 2,
    callback: (pingReturn: PingReturn) => void,
  ): void;

  /**
   * Registers a callback function with a CMP.
   * The callback will be invoked with the TCData object as an argument
   * whenever the TC String is changed and a new one is available.
   */
  __tcfapi(
    command: 'addEventListener',
    version: 2,
    callback: (tcData: TCData, success: boolean) => void,
  ): void;

  /**
   * Unregisters a previos registred callback function.
   */
  __tcfapi(
    command: 'removeEventListener',
    version: 2,
    callback: (success: boolean) => void,
    // the unique ID assigned by the CMP to the registered callback (via addEventListener)
    listenerId: number,
  ): void;
}

/**
 * A CMP may choose to support two optional API commands:
 * 'getInAppTCData' and 'getVendorList'
 */
export interface TCFAPIOptional {
  /**
   * A mobile in-app CMP that uses a web-based UI in a mobile web view may
   * choose to implement API calls with this command for the purpose of
   * retrieving the TC String and pre-parsed TC signals from that web-based
   * UI for the purpose of storing them in the NSUserDefaults(iOS)
   * or SharedPreferences(Android).
   */
  __tcfapi(
    command: 'getInAppTCData',
    version: 2,
    callback: (inAppTCData: InAppTCData, success: boolean) => void,
  ): void;

  /**
   * Calling with this command and a valid vendorListVersion parameter shall
   * return a GlobalVendorList object to the callback function.
   */
  __tcfapi(
    command: 'getVendorList',
    version: 2,
    callback: (gvl: GlobalVendorList, success: boolean) => void,
    /**
     * The caller may specify a Global Vendor List version number with the
     * vendorListVersion parameter. If no version is specified, the Global
     * Vendor List version returned shall be the same as that which is encoded
     * in the current TC String – If no TC String exists the latest version
     * of the Global Vendor List shall be returned.
     * The calling function may also pass 'LATEST' as the argument to the
     * vendorListVersion parameter to explicitly receive the latest Global
     * Vendor List version as the GlobalVendorList object.
     *
     * If an invalid vendorListVersion argument is passed with the getVendorList
     * command the callback function shall receive a null argument for the
     * GlobalVendorList parameter and the success parameter shall receive a
     * false argument. Valid vendorListVersions are integers
     * (or integer strings) greater than 1.
     * The success parameter shall receive a false argument for any
     * unsuccessful call with the getVendorList command. (eg. invalid
     * vendorListVersion argument, network error, etc…)
     */
    parameter?: number | string,
  ): void;
}

export type WindowWithTCF = Window & TCFAPI & TCFAPIOptional;
