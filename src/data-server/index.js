const heatPumps = require('./data/heatPumps.json');
const installationMaterials = require('./data/installationMaterials.json');
const tools = require('./data/tools.json');
const orders = require('./data/orders.json');

module.exports = () => ({
  heatPumps,
  installationMaterials,
  tools,

  orders,
});
