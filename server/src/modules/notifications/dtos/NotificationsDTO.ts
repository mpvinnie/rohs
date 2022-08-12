export interface ICreateNotificationDTO {
  recipient_id: string
  content: string
}

export interface IListProviderNotificationsDTO {
  recipient_id: string
}

export interface IMarkNotificationAsReadDTO {
  recipient_id: string
  notification_id: string
}
