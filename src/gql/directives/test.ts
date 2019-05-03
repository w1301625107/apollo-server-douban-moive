import * as ApolloServerKoa from 'apollo-server-koa'

class TestDirective extends ApolloServerKoa.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // 指令的实现方式是将resolvoer进行hack，因此指令本质也是resolver
    const realResolve = field.resolve

    field.resolve = async function(root, query, context, info) {
      console.log('yes i have succeseded')
      return await realResolve.call(this, root, query, context, info)
    }
  }
}

export default {
  def: `directive @test on FIELD_DEFINITION`,
  directives: {
    test: TestDirective,
  },
}
