import dayjs, { type ConfigType } from 'dayjs'

import { TZ_VIETNAM } from '~/constants/date.constant'

export function formatDatetime(date: NonNullable<ConfigType>) {
  return dayjs.utc(date).tz(TZ_VIETNAM).format('HH:mm:ss DD/MM/YYYY')
}
