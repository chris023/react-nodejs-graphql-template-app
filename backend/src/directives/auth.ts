import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { gql } from 'graphql-tag'
import { Role } from 'types'

/** All roles that can be assigned to a system user in order of increasing permissions */
export const roles: Role[] = [Role.User, Role.Admin, Role.SiteAdmin]

const typeDirectiveArgumentMaps: Record<string, any> = {}

/** Schema defintions for the auth directive */
export const authDirectiveTypeDefs = gql`
    directive @auth(requires: Role = admin) on OBJECT | FIELD_DEFINITION
`

/** Transformer function which modifies a schema to support the @auth directive */
export const authDirectiveTransformer = (schema: GraphQLSchema) =>
    mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
            const authDirective = getDirective(schema, type, 'auth')?.[0]

            if (authDirective) {
                typeDirectiveArgumentMaps[type.name] = authDirective
            }

            return undefined
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
            const authDirective =
                getDirective(schema, fieldConfig, 'auth')?.[0] ??
                typeDirectiveArgumentMaps[typeName]

            if (authDirective) {
                const { requires } = authDirective

                if (requires) {
                    const { resolve = defaultFieldResolver } = fieldConfig

                    fieldConfig.resolve = function (
                        source,
                        args,
                        context,
                        info
                    ) {
                        const { user } = context

                        if (!hasRole(user, requires)) {
                            throw new Error('Not authorized')
                        }

                        return resolve(source, args, context, info)
                    }

                    return fieldConfig
                }
            }
        },
    })

/** Helper to compare user's given role to defined list of roles */
const hasRole = (user: any, requiredRole: Role) => {
    if (!user) {
        return false
    }

    const userRoleLevel = roles.indexOf(user.role)
    const requiredRoleLevel = roles.indexOf(requiredRole)

    return (
        userRoleLevel >= 0 &&
        requiredRoleLevel >= 0 &&
        userRoleLevel >= requiredRoleLevel
    )
}
