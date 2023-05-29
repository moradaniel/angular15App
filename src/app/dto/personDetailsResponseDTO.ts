export interface RoleDetailsDTO {
  id:number;
  name: string;
}

export interface PersonDetailsResponseDTO {
  id:number;
  name: string;
  roles: RoleDetailsDTO[];
}
