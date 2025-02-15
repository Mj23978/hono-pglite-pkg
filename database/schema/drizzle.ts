import { customType, pgTable, text, boolean, timestamp, integer } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { updatedAt } from '../utils';
import { relations } from 'drizzle-orm';

export const customBytes = customType<{ data: Buffer }>({
	dataType() {
		return 'bytea';
	},
	fromDriver(value: unknown) {
		if (Buffer.isBuffer(value)) return value
		throw new Error('Expected Buffer')
	},
	toDriver(value: Buffer) {
		return value
	}
});

export const users = pgTable('user', { id: text('id').$defaultFn(() => createId()).primaryKey(), username: text('username'), name: text('name').notNull(), email: text('email').notNull(), emailVerified: boolean('emailVerified').default(false).notNull(), role: text('role').default('user').notNull(), twoFactorEnabled: boolean('twoFactorEnabled').default(false).notNull(), locale: text('locale').default('en-US').notNull(), image: text('image'), banned: boolean('banned').default(false).notNull(), banReason: text('banReason'), banExpires: timestamp('banExpires', { mode: 'date', precision: 3 }), lastNotificationCheck: timestamp('lastNotificationCheck', { mode: 'date', precision: 3 }), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$defaultFn(() => updatedAt()).notNull() });

export const sessions = pgTable('session', { id: text('id').$defaultFn(() => createId()).primaryKey(), expiresAt: timestamp('expiresAt', { mode: 'date', precision: 3 }).notNull(), token: text('token').notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$defaultFn(() => updatedAt()).notNull(), ipAddress: text('ipAddress'), userAgent: text('userAgent'), userId: text('userId').notNull(), impersonatedBy: text('impersonatedBy'), activeOrganizationId: text('activeOrganizationId') });

export const accounts = pgTable('account', { id: text('id').$defaultFn(() => createId()).primaryKey(), accountId: text('accountId').notNull(), providerId: text('providerId').notNull(), userId: text('userId').notNull(), accessToken: text('accessToken'), refreshToken: text('refreshToken'), idToken: text('idToken'), accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { mode: 'date', precision: 3 }), refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { mode: 'date', precision: 3 }), scope: text('scope'), password: text('password'), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$defaultFn(() => updatedAt()).notNull() });

export const verifications = pgTable('verification', { id: text('id').$defaultFn(() => createId()).primaryKey(), identifier: text('identifier').notNull(), value: text('value').notNull(), expiresAt: timestamp('expiresAt', { mode: 'date', precision: 3 }).notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$defaultFn(() => updatedAt()).notNull() });

export const passkeys = pgTable('passkey', { id: text('id').$defaultFn(() => createId()).primaryKey(), name: text('name'), publicKey: text('publicKey').notNull(), userId: text('userId').notNull(), credentialID: text('credentialID').notNull(), counter: integer('counter').notNull(), deviceType: text('deviceType').notNull(), backedUp: boolean('backedUp').notNull(), transports: text('transports'), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull() });

export const twoFactors = pgTable('twoFactor', { id: text('id').$defaultFn(() => createId()).primaryKey(), secret: text('secret').notNull(), backupCodes: text('backupCodes').notNull(), userId: text('userId').notNull() });

export const organizations = pgTable('organization', { id: text('id').$defaultFn(() => createId()).primaryKey(), name: text('name').notNull(), logo: text('logo'), currency: text('currency').default('USD').notNull(), slug: text('slug'), locale: text('locale').default('en-US').notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$defaultFn(() => updatedAt()).notNull(), metadata: text('metadata') });

export const members = pgTable('member', { id: text('id').$defaultFn(() => createId()).primaryKey(), role: text('role').notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$defaultFn(() => updatedAt()).notNull(), organizationId: text('organizationId').notNull(), userId: text('userId').notNull() });

export const invitations = pgTable('invitation', { id: text('id').$defaultFn(() => createId()).primaryKey(), organizationId: text('organizationId').notNull(), email: text('email').notNull(), role: text('role'), status: text('status').notNull(), expiresAt: timestamp('expiresAt', { mode: 'date', precision: 3 }).notNull(), inviterId: text('inviterId').notNull() });

export const notifications = pgTable('notification', { id: text('id').$defaultFn(() => createId()).primaryKey(), type: text('type').notNull(), message: text('message').notNull(), data: text('data').notNull(), isRead: boolean('isRead').default(false).notNull(), createdAt: timestamp('createdAt', { mode: 'date', precision: 3 }).defaultNow().notNull(), updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).$defaultFn(() => updatedAt()).notNull(), userId: text('userId').notNull() });

export const usersRelations = relations(users, (helpers) => ({ sessions: helpers.many(sessions, { relationName: 'SessionToUser' }), accounts: helpers.many(accounts, { relationName: 'AccountToUser' }), twofactors: helpers.many(twoFactors, { relationName: 'TwoFactorToUser' }), members: helpers.many(members, { relationName: 'MemberToUser' }), invitations: helpers.many(invitations, { relationName: 'InvitationToUser' }), passkeys: helpers.many(passkeys, { relationName: 'PasskeyToUser' }), Notification: helpers.many(notifications, { relationName: 'NotificationToUser' }) }));

export const sessionsRelations = relations(sessions, (helpers) => ({ user: helpers.one(users, { relationName: 'SessionToUser', fields: [ sessions.userId ], references: [ users.id ] }) }));

export const accountsRelations = relations(accounts, (helpers) => ({ user: helpers.one(users, { relationName: 'AccountToUser', fields: [ accounts.userId ], references: [ users.id ] }) }));

export const passkeysRelations = relations(passkeys, (helpers) => ({ user: helpers.one(users, { relationName: 'PasskeyToUser', fields: [ passkeys.userId ], references: [ users.id ] }) }));

export const twoFactorsRelations = relations(twoFactors, (helpers) => ({ user: helpers.one(users, { relationName: 'TwoFactorToUser', fields: [ twoFactors.userId ], references: [ users.id ] }) }));

export const organizationsRelations = relations(organizations, (helpers) => ({ members: helpers.many(members, { relationName: 'MemberToOrganization' }), invitations: helpers.many(invitations, { relationName: 'InvitationToOrganization' }) }));

export const membersRelations = relations(members, (helpers) => ({ organization: helpers.one(organizations, { relationName: 'MemberToOrganization', fields: [ members.organizationId ], references: [ organizations.id ] }), user: helpers.one(users, { relationName: 'MemberToUser', fields: [ members.userId ], references: [ users.id ] }) }));

export const invitationsRelations = relations(invitations, (helpers) => ({ organization: helpers.one(organizations, { relationName: 'InvitationToOrganization', fields: [ invitations.organizationId ], references: [ organizations.id ] }), user: helpers.one(users, { relationName: 'InvitationToUser', fields: [ invitations.inviterId ], references: [ users.id ] }) }));

export const notificationsRelations = relations(notifications, (helpers) => ({ user: helpers.one(users, { relationName: 'NotificationToUser', fields: [ notifications.userId ], references: [ users.id ] }) }));