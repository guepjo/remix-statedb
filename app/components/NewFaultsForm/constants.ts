type FabricTypes =
  | 'ei4'
  | 'ei-ltx1'
  | 'corp-ltx1'
  | 'corp-lva1'
  | 'corp-lca1'
  | 'prod-ltx1'
  | 'prod-lva1'
  | 'prod-lor1';

export const FABRIC_OPTIONS: Array<{ title: FabricTypes; value: FabricTypes }> = [
  {
    title: 'ei4',
    value: 'ei4',
  },
  {
    title: 'ei-ltx1',
    value: 'ei-ltx1',
  },
  {
    title: 'corp-ltx1',
    value: 'corp-ltx1',
  },
  {
    title: 'corp-lva1',
    value: 'corp-lva1',
  },
  {
    title: 'corp-lca1',
    value: 'corp-lca1',
  },
  {
    title: 'prod-ltx1',
    value: 'prod-ltx1',
  },
  {
    title: 'prod-lva1',
    value: 'prod-lva1',
  },
  {
    title: 'prod-lor1',
    value: 'prod-lor1',
  },
];

export const FABRIC_GROUPS = ['corp', 'ei', 'prod'];
export const TEAMS = ['dctechs', 'sysops'];
