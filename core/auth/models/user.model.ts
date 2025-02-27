interface RoleModel {
  role: string;
}

interface CompanyRoleModel {
  role: RoleModel;
}

export interface UserModel {
  avatar: string;
  first_name: string;
  id: string;
  last_name: string;
  updated_at: string | null;
  status: string | null;
  created_at: string;
  company_roles: CompanyRoleModel[];
}
