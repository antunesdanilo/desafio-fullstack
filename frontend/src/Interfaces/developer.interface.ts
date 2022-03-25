import LevelInterface from "./level.interface";

export default interface DeveloperInterface {
  developer_id: number;
  level_id: number;
  developer_name: string;
  gender: 'f' | 'm';
  birthday: string;
  hobby: string;
  created_at: string;
  updated_at: string;
  age: number;
  level: LevelInterface;
  level_name: string;
}