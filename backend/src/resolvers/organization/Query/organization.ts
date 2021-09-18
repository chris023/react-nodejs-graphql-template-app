import { IFieldResolver } from 'graphql-resolvers'

const organization: IFieldResolver = async (_parent, { id }, { models }) =>
    await models.Organization.findByPk(id)

export { organization }
