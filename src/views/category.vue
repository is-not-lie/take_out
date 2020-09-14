<template>
  <div>
    <Form @submit="submit">
      <Item :role="[{required: true, msg: '用户名不能为空'}]">
        <Input name="username"/>
      </Item>
      <Item>
        <Input name="pwd" type="password"/>
      </Item>
      <Item>
        <Input type="submit" />
      </Item>
    </Form>
  </div>
</template>

<script>
import Form from '@com/form'
const { Item, Input } = Form
export default {
  name: 'category',
  components: { Form, Item, Input },
  setup () {
    const submit = val => console.log(val)
    return { submit }
  }
}
</script>

<style lang="scss" scoped>

</style>
