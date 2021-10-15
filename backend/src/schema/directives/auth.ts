import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver, GraphQLSchema } from 'graphql'
import { gql } from 'graphql-tag'

const typeDirectiveArgumentMaps: Record<string, any> = {}

export const authDirectiveTypeDefs = gql`
    directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

    enum Role {
        ADMIN
        USER
    }
`

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

const roles = ['USER', 'ADMIN']

const hasRole = (user: any, requiredRole: string) => {
    const userRoleLevel = roles.indexOf(user.role)
    const requiredRoleLevel = roles.indexOf(requiredRole)

    return (
        userRoleLevel >= 0 &&
        requiredRoleLevel >= 0 &&
        userRoleLevel >= requiredRoleLevel
    )
}
