import { createRegistrationToken as create } from 'utils'
import { MutationResolvers } from 'types'

/**
 * Generates a registration token for invite only signup flows
 */
const createRegistrationToken: MutationResolvers['createRegistrationToken'] =
    async (_parent, { email, roles }, { requestor }) => {
        return create({ businessId: requestor.businessId, email, roles })
    }

export { createRegistrationToken }
