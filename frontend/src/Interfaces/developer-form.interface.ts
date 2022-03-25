export default interface DeveloperFormInterface {
  developer_id: number | null;
  level_id: number | undefined;
  developer_name: string;
  gender: 'f' | 'm' | undefined;
  birthday: string;
  hobby: string;
}