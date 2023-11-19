import { ethers } from 'hardhat';

import Deployment from '../test/helpers/deployment';

async function main() {
  const [main] = await ethers.getSigners();
  const [pollutionToken, pollutionMine] = await Deployment.deploy(main);

  console.log("%s: '%s',", 'pollutionToken', pollutionToken.address);
  console.log("%s: '%s',", 'pollutionMine', pollutionMine.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });