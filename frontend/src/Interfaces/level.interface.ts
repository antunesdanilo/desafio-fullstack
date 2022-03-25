import DeveloperInterface from "./developer.interface";

export default interface LevelInterface {
  level_id: number;
  level_name: string;
  created_at: string;
  updated_at: string;
  developers: DeveloperInterface[];
  developers_count: number;
}