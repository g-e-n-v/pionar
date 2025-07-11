import dayjs, { type ConfigType } from 'dayjs'

export const formatDatetime = (date: NonNullable<ConfigType>) =>
  dayjs(date).format('HH:mm:ss DD/MM/YYYY')
