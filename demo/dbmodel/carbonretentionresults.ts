interface ICarbonRetentionResults {
  country: string;
  plantedspecies: string;
  projectname: string;
  state: string;
  valueSumHectares: number;
  real_eucalyptus?: number;
  real_teak?: number;
  real_otherbroadleaf?: number;
  real_naturalregeneration?: number;
  real_averageflr20y?: number;
  real_natregen?: number;
  real_oak?: number;
  real_mangroverestorationtree?: number;
  real_averageplantation?: number;
  real_otherconifer?: number;
  real_agroforestry?: number;
  real_coastal?: number;
  real_pine?: number;
  real_mangroverestorationshrub?: number;
  real_averagemangrove?: number;
}

export default ICarbonRetentionResults;
