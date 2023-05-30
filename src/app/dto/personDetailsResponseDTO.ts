import {RoleDetailsResponseDTO} from "./roleDetailsResponseDTO";


export interface PersonDetailsResponseDTO {
  id:number;
  name: string;
  roles: RoleDetailsResponseDTO[];
}
