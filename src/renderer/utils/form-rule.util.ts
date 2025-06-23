import { Rule } from 'antd/es/form'

export const required = (message = 'This field is required'): Rule => ({
  message,
  required: true
})
