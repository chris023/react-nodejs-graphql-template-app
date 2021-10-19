import { QueryResolvers } from 'types'

const getSelf: QueryResolvers['getSelf'] = async (_parent, _args, { user }) => user

export { getSelf }
