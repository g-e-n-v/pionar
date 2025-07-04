import { App, Button, ColorPicker, Form, Input, Tag } from 'antd'
import { AggregationColor } from 'antd/es/color-picker/color'

import { useAddTag } from '~/api/use-add-tags'
import { genGetTagsKey } from '~/api/use-get-tags'
import { queryClient } from '~/configs/tanstack-query.config'
import { PRESET_COLORS } from '~/constants/colors.constant'
import { required } from '~/utils/form-rule.util'

type FormAddTagValues = {
  color?: AggregationColor
  text: string
}

export function FormAddTag() {
  const { notification } = App.useApp()

  const [form] = Form.useForm<FormAddTagValues>()
  const text = Form.useWatch('text', form)
  const color = Form.useWatch('color', form)

  const addTag = useAddTag()

  const handleAddTag = async () => {
    await addTag.mutateAsync({ color: color?.toHexString(), text })
    await queryClient.invalidateQueries({ queryKey: genGetTagsKey() })
    form.resetFields()
    notification.success({ message: 'Create tag success' })
  }

  return (
    <Form className="flex gap-2" form={form} layout="vertical" onFinish={handleAddTag}>
      <Form.Item label="Color" name="color">
        <ColorPicker presets={[{ colors: PRESET_COLORS, label: 'Presets' }]} showText />
      </Form.Item>

      <Form.Item label="Text" name="text" rules={[required()]}>
        <Input placeholder="Enter tag name" />
      </Form.Item>

      <Form.Item label="Preview">
        <Tag color={color?.toHexString()}>{text || 'placeholder'}</Tag>
      </Form.Item>

      <Form.Item label="​">
        <Button htmlType="submit" type="primary">
          Add tag
        </Button>
      </Form.Item>
    </Form>
  )
}
