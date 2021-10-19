import { QueryResolvers } from 'types'

const getSelf: QueryResolvers['getSelf'] = async (_parent, _args, { user }) => {
    return user
}

export { getSelf }
