import { createAllFaults } from './createAllFaults';
import { createFault } from './createFault';
import { getFaults } from './getFaults';
import { getFaultsByHostname } from './getFaultsByHostname';
import { getFaultsMetaData } from './getFaultsMetaData';
import { updateFaultByCmId } from './updateFaultByCmId';
import { updateFaultsByHostname } from './updateFaultByHostname';

/**
 * @description
 * Methods for obtaining fault data.
 *
 * NOTE
 * The reason for not using a class is that we can simulate the same functionality using plain
 * functions & storing the values in an object.
 * This way each fault service method can kept in its own file,
 * as opposed to having a 500+ line class file.
 */
export const FaultsService = {
  createAllFaults,
  createFault,
  getFaults,
  getFaultsByHostname,
  getFaultsMetaData,
  updateFaultByCmId,
  updateFaultsByHostname,
};
