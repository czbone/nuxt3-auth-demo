export const userRoles = () => {
  const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers'],
  };

  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));

  return {
    roles,
    roleRights,
  }
}