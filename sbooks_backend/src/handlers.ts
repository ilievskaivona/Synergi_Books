/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict'

import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'
import { API_KEY, apiKeyHeader, commonSchema } from './schemas/common.schema'

/**
 * Returns 401 error on not-authorized request
 */
export const checkAuthHeader = (
	request: FastifyRequest,
	reply: FastifyReply,
	done: HookHandlerDoneFunction
): void => {
	if (!request.url.includes('/docs') &&
		(!request.headers[apiKeyHeader.toLowerCase()] ||
				request.headers[apiKeyHeader.toLowerCase()] !== API_KEY)
	) {
		reply.code(401)

		done(new Error())
	} else {
		done()
	}
}

/**
 * Implement default schema if not presented
 */
export const defaultHandler = (options: any = {}): void => {
	if (!options.schema) {
		options.schema = commonSchema
	}

	if (options.path.includes('/docs')) {
		delete options.schema.headers
	}
}

/**
 * Add response payload to reply for logging
 */
export const addResponsePayload = (
	_request: FastifyRequest,
	reply: FastifyReply,
	payload: string,
	done: HookHandlerDoneFunction
) => {
	Object.assign(reply, { payload })
	done()
}