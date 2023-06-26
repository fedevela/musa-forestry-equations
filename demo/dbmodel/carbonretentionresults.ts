interface ICarbonRetentionResults {
  valuesFLR: IValueFLR[];
  valuePlantedSpecies: string[];
}
interface IValueFLR {
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
  real_teak_potential_emissions_removals?: number;
  real_eucalyptus_potential_emissions_removals?: number;
  real_otherbroadleaf_potential_emissions_removals?: number;
  real_oak_potential_emissions_removals?: number;
  real_pine_potential_emissions_removals?: number;
  real_otherconifer_potential_emissions_removals?: number;
  real_naturalregeneration_potential_emissions_removals?: number;
  real_mangroverestorationtree_potential_emissions_removals?: number;
  real_mangroverestorationshrub_potential_emissions_removals?: number;
  real_agroforestry_potential_emissions_removals?: number;
  real_averageflr20y_potential_emissions_removals?: number;
  real_teak_potential_emissions_removals_rate?: number;
  real_eucalyptus_potential_emissions_removals_rate?: number;
  real_otherbroadleaf_potential_emissions_removals_rate?: number;
  real_oak_potential_emissions_removals_rate?: number;
  real_pine_potential_emissions_removals_rate?: number;
  real_otherconifer_potential_emissions_removals_rate?: number;
  real_naturalregeneration_potential_emissions_removals_rate?: number;
  real_mangroverestorationtree_potential_emissions_removals_rate?: number;
  real_mangroverestorationshrub_potential_emissions_removals_rate?: number;
  real_agroforestry_potential_emissions_removals_rate?: number;
  real_averageflr20y_potential_emissions_removals_rate?: number;
}

export default ICarbonRetentionResults;
