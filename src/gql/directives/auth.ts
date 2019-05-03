import * as ApolloServerKoa from 'apollo-server-koa'

class AuthDirective extends ApolloServerKoa.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // 对用户年龄进行校验
    // const age = this.args.age;
    // 指令的实现方式是将resolvoer进行hack，因此指令本质也是resolver
    const realResolve = field.resolve

    field.resolve = async function(root, query, context, info) {
      if (!context.me) throw new Error('Plz Log In First')
      else return await realResolve.call(this, root, query, context, info)
    }
  }
}

export default {
  def: `directive @auth on FIELD_DEFINITION`,
  directives: {
    auth: AuthDirective,
  },
}
