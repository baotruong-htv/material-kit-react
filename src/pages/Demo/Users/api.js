import localforage from "localforage";

export async function seedData(initialUsers) {
  const users = await localforage.getItem("users");
  !users && localforage.setItem("users", initialUsers);
}

export async function getUsers() {
  return (await localforage.getItem("users")) || [];
}

export async function getUserById(id) {
  const users = await getUsers();
  return users.find((user) => user.id == id);
}

export async function deleteUsers(ids) {
  const users = await getUsers();
  if (users) {
    const newUsers = users.filter((user) => !ids.includes(user.id));
    await localforage.setItem("users", newUsers);
  }
}

export async function createUser(user) {
  const users = await getUsers();
  await localforage.setItem("users", [
    {
      id: users.length + 1,
      ...user,
    },
    ...users,
  ]);
}
