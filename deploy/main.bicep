@description('Static Web App location.')
@allowed(['westus2','centralus','eastus2','westeurope','eastasia'])
param staticWebAppLocation string

resource staticWebApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: 'peclr-stapp'
  location: staticWebAppLocation
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    branch: 'main'
    provider: 'GitHub'
    repositoryUrl: 'https://github.com/gabrielweyer/pe-clr-viewer'
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
  }
}
