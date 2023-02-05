export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type Right = Permission & { canAccess: boolean };
export type ControlList = {
  access: {
    id: string;
    name: string;
    description: string;
    rights: Right[];
  }[];
};
