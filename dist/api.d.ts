import { BundlesAndFileTokens, ExploreOptions, ExploreResult, Bundle } from './index';
/**
 * Analyze bundle(s)
 */
export declare function explore(bundlesAndFileTokens: BundlesAndFileTokens, options?: ExploreOptions): Promise<ExploreResult>;
/**
 * Expand list of file tokens into a list of bundles
 */
export declare function getBundles(fileTokens: string[]): Bundle[];
export declare function getBundleName(bundle: Bundle): string;
