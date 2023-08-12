import { stagingUsers, productionUsers, role } from "./users";

const users =
  Cypress.env("APP_ENV") === "production" ? productionUsers : stagingUsers;


const getSuperAdmin = () => users.find((user) => user.role === role.superAdmin);

/**
 * @param {role} - role of the user
 */

const getAdmin = () =>
  users.find((user) => user.role === role.admin);

export {
  role,
  getSuperAdmin,
  getAdmin
};
