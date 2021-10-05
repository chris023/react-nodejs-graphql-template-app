import { createRegistrationToken as create, JsonWebToken } from 'utils'
import { AuthenticationError } from 'apollo-server-errors'
import { MutationResolvers } from 'types'

/**
 * Generates a registration token for invite only signup flows
 */
const createRegistrationToken: MutationResolvers['createRegistrationToken'] =
    async (_parent, { email, roles }, { requestor }) => {
        if (!requestor) {
            throw new AuthenticationError('Error authenticating user')
        }

        return create({ businessId: requestor.businessId, email, roles })
    }

export { createRegistrationToken }
