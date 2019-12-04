import Model from './Model'

export interface UserActivationUUID {
  user_id: number
  uuid: string
}

export class UserActivationUUIDModel extends Model<UserActivationUUID> {
  tableName: string = 'user_activation_uuid'
  indexRow: string = 'userId'
  customSqlErrors: Object = {}
}
