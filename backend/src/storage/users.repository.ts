interface User {
  name: string;
  surname: string;
  city: string;
  locality: string;
}

let users: User[] = [];
//let currentId = 1;

export const userRepo = {
  findByName: (name: string) => users.find((u) => u.name === name),
  create: (data: {
    name: string;
    surname: string;
    city: string;
    locality: string;
  }) => {
    users.push(data);
    return data;
  },
  findAll: () => users,
};
